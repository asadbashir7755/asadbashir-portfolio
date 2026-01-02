---
title: "Mastering Kubernetes: Pods, Services, and Deployments"
date: "2025-03-10"
author: "Asad Bashir"
description: "Understanding the core components of Kubernetes is essential for scaling applications. Dive into Pods, Services, and Deployments."
category: "Kubernetes"
tags: ["Kubernetes", "K8s", "Orchestration", "Cloud"]
image: "/blog-k8s.png"
readTime: "8 min read"
---

# Mastering Kubernetes

Kubernetes (K8s) is the de facto standard for container orchestration. Let's break down the basics.

## 1. Pods

A **Pod** is the smallest deployable unit in K8s. It usually contains a single container.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
    ports:
    - containerPort: 80
```

## 2. Services

Services allow you to expose your application to the network.

| Service Type | Description |
| :--- | :--- |
| **ClusterIP** | Exposes the service on a cluster-internal IP. |
| **NodePort** | Exposes the service on each Node's IP at a static port. |
| **LoadBalancer** | Exposes the service externally using a cloud provider's load balancer. |

## 3. Deployments

Deployments manage the creation and scaling of Pods. They allow for zero-downtime updates.

> "Kubernetes is complex, but powerful. Mastering it opens doors to almost any cloud engineering role."

Happy Scaling! 🚀
