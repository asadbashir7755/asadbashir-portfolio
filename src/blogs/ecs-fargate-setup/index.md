---
title: "ECS Fargate Production Setup: What I Actually Did"
date: "2026-04-22"
author: "Asad Bashir"
description: "A practical walkthrough of setting up ECS Fargate in a real production environment — covering cluster creation, IAM roles, Secrets Manager integration, and ALB path-based routing for two services."
category: "AWS"
tags: ["AWS", "ECS", "Fargate", "Docker", "IAM", "Secrets Manager", "ALB"]
image: "/images/blogs/ecs-fargate-setup/cover.png"
readTime: "10 min read"
---

# ECS Fargate Production Setup: What I Actually Did at My Internship

During my internship at CyberoidTech, I worked on setting up a real ECS Fargate production environment for a client project called **ClubSoft**. This is not a tutorial — this is what I actually configured, the issues I ran into, and how I fixed them.

---

## What We Were Deploying

ClubSoft had two services that needed to run as containers on AWS:
- A **backend API** (Node.js)
- A **frontend** (Next.js)

Both needed to be deployed on ECS Fargate with a shared **Application Load Balancer (ALB)** using path-based routing to direct traffic to the right service.

---

## Step 1 — Creating the ECS Cluster

First step was creating the ECS cluster. We used **Fargate launch type** — meaning no EC2 instances to manage. AWS handles the underlying infrastructure completely.

```bash
# We created it via AWS Console
# Cluster type: AWS Fargate (serverless)
# No EC2 instances needed
```

Simple part — the real work started with IAM roles and Task Definitions.

---

## Step 2 — IAM Roles Setup

This is where most people get confused. ECS Fargate needs **two separate IAM roles**:

### Task Execution Role
This role is used by ECS itself to:
- Pull Docker images from ECR
- Write logs to CloudWatch
- Fetch secrets from Secrets Manager

```json
{
  "Effect": "Allow",
  "Action": [
    "ecr:GetAuthorizationToken",
    "ecr:BatchGetImage",
    "logs:CreateLogStream",
    "logs:PutLogEvents",
    "secretsmanager:GetSecretValue"
  ],
  "Resource": "*"
}
```

### Task Role
This role is used by your **application code** at runtime — for example if your app needs to access S3 or other AWS services.

Getting these two roles mixed up caused me a few headaches early on.

---

## Step 3 — Task Definition with Secrets Manager

The Task Definition is the blueprint for your container — CPU, memory, image, environment variables, and secrets.

The key thing I implemented was **pulling secrets directly from AWS Secrets Manager** inside the Task Definition — so no hardcoded environment variables anywhere.

```json
"secrets": [
  {
    "name": "DATABASE_URL",
    "valueFrom": "arn:aws:secretsmanager:eu-north-1:489889953028:secret:clubsoft/db-url"
  },
  {
    "name": "JWT_SECRET",
    "valueFrom": "arn:aws:secretsmanager:eu-north-1:489889953028:secret:clubsoft/jwt-secret"
  }
]
```

ECS injects these as environment variables at container startup — your app code reads them normally with `process.env.DATABASE_URL`. Clean and secure.

---

## Step 4 — ALB with Path-Based Routing

Instead of two separate load balancers, we used **one ALB with path-based routing** to direct traffic:

- `clubsoft.com/api/*` → backend service
- `clubsoft.com/*` → frontend service

This is configured through **Listener Rules** on the ALB:

```
Rule 1: IF path starts with /api → forward to backend target group
Rule 2: IF path is /* → forward to frontend target group
```

Each ECS service was registered to its own **Target Group** with health checks configured.

---

## Real Issues I Debugged

### 1. RDS Security Group Misconfiguration
The backend container couldn't connect to RDS PostgreSQL. The error was a connection timeout. Root cause — the RDS Security Group was only allowing inbound from EC2 instances, not from the ECS task's security group.

**Fix:** Added an inbound rule to RDS Security Group allowing port `5432` from the ECS tasks security group.

### 2. Next.js NEXT_PUBLIC_* Variable Injection
Next.js `NEXT_PUBLIC_*` variables are **baked in at build time** — not runtime. So passing them as Secrets Manager secrets in ECS did nothing because the image was already built without them.

**Fix:** These variables had to be passed as **build arguments** during the Docker image build in the CI/CD pipeline — not as runtime secrets.

### 3. Env File Conflicts Between Containers
Both services shared some environment variable names but with different values. When testing locally with Docker Compose, one `.env` file was being picked up by both containers.

**Fix:** Separated env files per service in Docker Compose and made sure each ECS Task Definition had its own isolated secret references.

---

## Final Architecture

```
Internet
    ↓
ALB (Application Load Balancer)
    ↓
Listener Rules (path-based routing)
    ↓              ↓
Frontend TG    Backend TG
    ↓              ↓
ECS Service    ECS Service
(Next.js)      (Node.js API)
    ↓              ↓
Fargate Tasks  Fargate Tasks
               ↓
              RDS PostgreSQL
```

---

## What I Learned

- IAM Task Execution Role vs Task Role — they are different and both needed
- Secrets Manager integration in Task Definitions keeps credentials out of code completely
- Path-based routing on a single ALB is cleaner and cheaper than multiple load balancers
- Next.js build-time variables cannot be injected at runtime — know your framework
- Always check Security Group rules first when containers can't reach databases

---

## Conclusion

ECS Fargate is genuinely great for production — no server management, auto scaling, and tight AWS integration. But the details matter: IAM roles, secrets injection, networking, and understanding your application's build vs runtime requirements.

This was real production work. The debugging was frustrating at times but that's where the actual learning happens.

---