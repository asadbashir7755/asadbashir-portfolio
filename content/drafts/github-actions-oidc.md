---
title: "GitHub Actions + OIDC Auth with AWS: No More Static Credentials"
date: "2026-04-20"
author: "Asad Bashir"
description: "How I eliminated static AWS credentials from CI/CD pipelines using OIDC-based authentication with GitHub Actions, covering ECR image builds, EC2 deployments, and Snyk + Trivy security scanning."
category: "CI/CD"
tags: ["GitHub Actions", "AWS", "OIDC", "ECR", "EC2", "Snyk", "Trivy", "DevOps"]
readTime: "10 min read"
---

# GitHub Actions + OIDC Auth with AWS: No More Static Credentials

One of the first things I worked on was fixing a security problem in the CI/CD pipelines, **static AWS credentials stored in GitHub Secrets**. Long-lived `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` sitting in a repository is a real risk. If they leak, anyone can access your AWS account.

The solution was **OIDC-based authentication**, GitHub Actions talks directly to AWS using a trusted identity token. No static credentials needed at all.

This is exactly what I implemented. Here's how it works and how I set it up.

---

## The Problem with Static Credentials

Before OIDC, the pipeline looked like this:

```yaml
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v2
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: eu-north-1
```

This works but has real problems:
- Credentials never expire: if leaked, attacker has permanent access
- Rotating them is manual and easy to forget
- Every developer who needs pipeline access needs to know these secrets

---

## How OIDC Works

OIDC (OpenID Connect) allows GitHub Actions to prove its identity to AWS without any passwords or keys.

The flow is:

```
GitHub Actions job starts
        ↓
GitHub generates a short-lived JWT token
(contains repo name, branch, workflow info)
        ↓
GitHub Actions sends this token to AWS STS
        ↓
AWS verifies the token against GitHub's OIDC provider
        ↓
AWS returns temporary credentials (valid for ~1 hour)
        ↓
Pipeline uses these credentials, they expire automatically
```

No static secrets anywhere. Clean.

---

## Step 1: Create OIDC Identity Provider in AWS

Go to **AWS IAM → Identity Providers → Add Provider**

- Provider type: **OpenID Connect**
- Provider URL: `https://token.actions.githubusercontent.com`
- Audience: `sts.amazonaws.com`

Click **Get thumbprint** then **Add provider**.

This tells AWS, "trust tokens coming from GitHub Actions".

---

## Step 2: Create IAM Role with Trust Policy

Create a new IAM Role. The trust policy defines **which GitHub repo** is allowed to assume this role:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::489889953028:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:asadbashir7755/clubsoft:*"
        }
      }
    }
  ]
}
```

The `sub` condition locks this role to only your specific repository, no other repo can assume it.

Then attach permissions to this role, for our pipeline we needed:
- `AmazonEC2ContainerRegistryFullAccess`: push images to ECR
- `AmazonEC2FullAccess`: deploy to EC2

---

## Step 3: Update GitHub Actions Workflow

Now update your workflow to use OIDC instead of static credentials:

```yaml
name: Deploy to AWS

on:
  push:
    branches: [main]

permissions:
  id-token: write    # Required for OIDC
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v3
        with:
          role-to-assume: arn:aws:iam::489889953028:role/github-actions-deploy-role
          aws-region: eu-north-1

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1

      - name: Build and push Docker image to ECR
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/clubsoft-backend:$IMAGE_TAG .
          docker push $ECR_REGISTRY/clubsoft-backend:$IMAGE_TAG

      - name: Deploy to EC2 via SSH
        uses: appleboy/ssh-action@v0.1.10
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ubuntu
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            docker pull ${{ steps.login-ecr.outputs.registry }}/clubsoft-backend:${{ github.sha }}
            docker stop backend || true
            docker rm backend || true
            docker run -d --name backend -p 3000:3000 \
              ${{ steps.login-ecr.outputs.registry }}/clubsoft-backend:${{ github.sha }}
```

Key thing here, `permissions: id-token: write` is required. Without it GitHub won't generate the OIDC token for the job.

---

## Step 4: Adding Snyk + Trivy Security Scanning

After setting up the deployment pipeline, I integrated **Snyk** and **Trivy** to block vulnerable images from reaching production.

```yaml
      - name: Run Snyk dependency scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=critical

      - name: Run Trivy image scan
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: ${{ steps.login-ecr.outputs.registry }}/clubsoft-backend:${{ github.sha }}
          format: table
          exit-code: 1
          severity: CRITICAL,HIGH
```

`exit-code: 1` means if Trivy finds a CRITICAL or HIGH vulnerability, the pipeline **fails and stops**. The broken image never gets deployed.

---

## Full Pipeline Flow

```
Push to main branch
        ↓
GitHub Actions triggers
        ↓
OIDC token generated by GitHub
        ↓
AWS verifies token → returns temp credentials
        ↓
Snyk scans dependencies
        ↓
Docker image built
        ↓
Trivy scans the image
        ↓
Image pushed to ECR
        ↓
EC2 pulls new image and restarts container
```

---

## What I Learned

- `permissions: id-token: write` is easy to forget: pipeline fails silently without it
- Trust policy `sub` condition must match your exact repo path: wrong repo = access denied
- Snyk scans code dependencies, Trivy scans the final Docker image: both are needed
- `exit-code: 1` in Trivy is important: without it the scan runs but never blocks deployment
- Temporary credentials from OIDC expire in ~1 hour: perfect for CI/CD, useless if leaked

---

## Conclusion

Replacing static AWS credentials with OIDC was one of the best improvements I made to the pipeline at CyberoidTech. Zero long-lived secrets, automatic expiry, and repo-scoped access, it's the right way to do CI/CD with AWS.

Combined with Snyk and Trivy scanning, every deployment now goes through security checks automatically before anything reaches production.

This is production-level security practice, and it's not that complicated to set up once you understand the flow.