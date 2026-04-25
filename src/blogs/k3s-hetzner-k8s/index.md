---
title: "Kubernetes Local Stack: ArgoCD, Vault, External Secrets, and Full Monitoring on k3s"
date: "2026-04-25"
author: "Asad Bashir"
description: "How I built a full production-replica Kubernetes environment on k3s on a Hetzner server — ArgoCD for GitOps, HashiCorp Vault for secrets, External Secrets Operator, Helm, and kube-prometheus-stack with Loki and Promtail."
category: "Kubernetes"
tags: ["Kubernetes", "k3s", "Hetzner", "ArgoCD", "Vault", "Helm", "Prometheus", "Loki", "DevOps"]
image: "/images/blogs/k3s-hetzner-k8s/cover.png"
readTime: "12 min read"
---

# Kubernetes Local Stack: ArgoCD, Vault, External Secrets, and Full Monitoring on k3s

I wanted a real Kubernetes environment to practice on — not just Minikube on my laptop, but something closer to actual production. So I spun up a **Hetzner Cloud server** and installed **k3s** on it. Hetzner gives you a decent server for around $4-5/month which is perfect for this kind of hands-on learning.

This blog covers the full stack I built — ArgoCD, HashiCorp Vault, External Secrets Operator, and a complete monitoring setup with Prometheus, Grafana, Loki, and Promtail.

---

## Why Hetzner + k3s?

**Hetzner** is a German cloud provider — cheap, fast, and reliable. A CX21 instance (2 vCPU, 4GB RAM) costs around €4/month. That's enough to run a full k3s cluster with all these tools.

**k3s** is a lightweight Kubernetes distribution by Rancher. It's a single binary, uses less memory than full K8s, and is perfect for single-node setups. It's also what many production teams use for smaller workloads.

---

## What I Built

```
Hetzner Cloud Server (Ubuntu 22.04)
└── k3s (single node cluster)
    ├── ArgoCD              → GitOps continuous deployment
    ├── HashiCorp Vault     → Secrets management (Kubernetes auth)
    ├── External Secrets Operator → Sync Vault secrets into K8s
    ├── Helm                → Package management
    └── kube-prometheus-stack
        ├── Prometheus      → Metrics collection
        ├── Grafana         → Dashboards and visualization
        ├── Loki            → Log aggregation
        └── Promtail        → Log shipping from pods
```

---

## Step 1 — Provision Hetzner Server

I created a **CX21 instance** on Hetzner Cloud:
- OS: Ubuntu 22.04
- Location: Nuremberg (eu-central)
- 2 vCPU, 4GB RAM, 40GB SSD

After SSH into the server:

```bash
ssh root@<hetzner-server-ip>

# Update system first
apt update && apt upgrade -y
```

---

## Step 2 — Install k3s

k3s installs with a single command:

```bash
curl -sfL https://get.k3s.io | sh -
```

After installation verify the cluster is running:

```bash
kubectl get nodes
# NAME        STATUS   ROLES                  AGE   VERSION
# hetzner-1   Ready    control-plane,master   1m    v1.28.5+k3s1
```

Copy the kubeconfig to access from your local machine:

```bash
# On server
cat /etc/rancher/k3s/k3s.yaml

# Copy this to your local machine at ~/.kube/config
# Replace 127.0.0.1 with your Hetzner server IP
```

---

## Step 3 — Install Helm

Helm is needed to install everything else:

```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Verify
helm version
```

---

## Step 4 — Install ArgoCD

ArgoCD handles GitOps — it watches a Git repository and automatically syncs changes to the cluster.

```bash
# Create namespace
kubectl create namespace argocd

# Install ArgoCD using Helm
helm repo add argo https://argoproj.github.io/argo-helm
helm repo update
helm install argocd argo/argo-cd -n argocd

# Wait for pods to be ready
kubectl get pods -n argocd -w
```

Access ArgoCD UI:

```bash
# Port forward to access locally
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Get initial admin password
kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath="{.data.password}" | base64 -d
```

Open `https://localhost:8080` — login with `admin` and the password above.

---

## Step 5 — Install HashiCorp Vault

Vault manages secrets securely. I used **Kubernetes auth method** — pods authenticate to Vault using their Kubernetes service account tokens.

```bash
# Add Vault helm repo
helm repo add hashicorp https://helm.releases.hashicorp.com
helm repo update

# Install Vault
kubectl create namespace vault
helm install vault hashicorp/vault -n vault \
  --set "server.dev.enabled=true"

# Verify
kubectl get pods -n vault
```

Initialize Vault and enable Kubernetes auth:

```bash
# Exec into Vault pod
kubectl exec -it vault-0 -n vault -- /bin/sh

# Enable Kubernetes auth
vault auth enable kubernetes

# Configure Kubernetes auth
vault write auth/kubernetes/config \
  kubernetes_host="https://$KUBERNETES_PORT_443_TCP_ADDR:443"

# Create a policy
vault policy write app-policy - <<EOF
path "secret/data/*" {
  capabilities = ["read"]
}
EOF

# Create a role
vault write auth/kubernetes/role/app-role \
  bound_service_account_names=default \
  bound_service_account_namespaces=default \
  policies=app-policy \
  ttl=24h
```

---

## Step 6 — Install External Secrets Operator

External Secrets Operator (ESO) syncs secrets from Vault into Kubernetes Secrets automatically — so your apps just read normal K8s secrets without knowing about Vault at all.

```bash
helm repo add external-secrets https://charts.external-secrets.io
helm repo update

kubectl create namespace external-secrets
helm install external-secrets external-secrets/external-secrets \
  -n external-secrets

# Verify
kubectl get pods -n external-secrets
```

Create a SecretStore pointing to Vault:

```yaml
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: vault-backend
  namespace: default
spec:
  provider:
    vault:
      server: "http://vault.vault.svc.cluster.local:8200"
      path: "secret"
      version: "v2"
      auth:
        kubernetes:
          mountPath: "kubernetes"
          role: "app-role"
```

Create an ExternalSecret to pull a specific secret:

```yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: app-secret
  namespace: default
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: vault-backend
    kind: SecretStore
  target:
    name: app-secret
    creationPolicy: Owner
  data:
    - secretKey: DATABASE_URL
      remoteRef:
        key: secret/app
        property: DATABASE_URL
```

ESO creates a real Kubernetes Secret from this — your app reads it normally.

---

## Step 7 — Install kube-prometheus-stack with Loki

This single Helm chart installs Prometheus, Grafana, and Alertmanager together.

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

kubectl create namespace monitoring
helm install kube-prometheus-stack \
  prometheus-community/kube-prometheus-stack \
  -n monitoring

# Verify all pods running
kubectl get pods -n monitoring
```

Now install **Loki + Promtail** for log aggregation:

```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

# Install Loki
helm install loki grafana/loki-stack \
  -n monitoring \
  --set promtail.enabled=true \
  --set loki.enabled=true
```

Access Grafana:

```bash
kubectl port-forward svc/kube-prometheus-stack-grafana \
  -n monitoring 3000:80

# Default credentials
# Username: admin
# Password: prom-operator
```

In Grafana — add Loki as a data source, then you can query logs from all pods in real time.

---

## Real Issues I Hit

### 1. k3s uses its own kubeconfig path
k3s doesn't use `~/.kube/config` by default. Commands like `helm` and `kubectl` failed until I exported:

```bash
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
```

### 2. Vault in dev mode doesn't persist data
Dev mode is great for testing but Vault resets on every pod restart. For anything persistent, use the file or integrated storage backend.

### 3. Hetzner firewall blocked ports
By default Hetzner's firewall blocked all inbound traffic except SSH. Had to open ports for NodePort services manually in Hetzner Cloud firewall settings.

### 4. ESO SecretStore authentication errors
ESO kept failing with permission denied from Vault. Root cause was the Kubernetes auth role `bound_service_account_namespaces` didn't include the namespace where ESO was running.

**Fix:** Updated the Vault role to include the `external-secrets` namespace.

---

## Final Stack Overview

```
Hetzner CX21 Server
└── k3s cluster
    ├── argocd namespace      → GitOps, watching deploy branch on GitHub
    ├── vault namespace       → Secrets storage with K8s auth
    ├── external-secrets ns   → Syncing Vault secrets to K8s secrets
    ├── monitoring namespace
    │   ├── Prometheus        → Scraping metrics from all namespaces
    │   ├── Grafana           → Dashboards for metrics + logs
    │   ├── Loki              → Storing logs from all pods
    │   └── Promtail          → Collecting logs and shipping to Loki
    └── default namespace     → Sample app using all of the above
```

---

## What I Learned

- k3s is production-ready — not just a toy, real teams use it
- Hetzner is genuinely good value for self-hosted K8s practice
- Vault Kubernetes auth is cleaner than static tokens — pods authenticate automatically
- External Secrets Operator removes the need to hardcode secrets anywhere in manifests
- kube-prometheus-stack + Loki gives you full observability in one setup
- Always check firewall rules when services are unreachable on cloud servers

---

## Conclusion

This setup gave me a real production-like Kubernetes environment for under €5/month. Everything here — ArgoCD, Vault, External Secrets, Prometheus, Loki — is what real DevOps teams run in production.

Building it from scratch on a raw Hetzner server taught me far more than any managed service would. When things broke I had to actually understand why — no cloud console to hide behind.

If you want to get serious about Kubernetes, skip the managed services for learning and build it yourself on a cheap Hetzner instance.