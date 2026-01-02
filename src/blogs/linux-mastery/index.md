---
title: "Linux System Administration: My Foundation for DevOps Engineering"
date: "2025-05-20"
author: "Asad Bashir"
description: "A practical overview of Linux system administration skills I developed using CentOS and Ubuntu as part of my DevOps journey, covering real-world tasks, automation, and production use cases."
category: "Linux"
tags: ["Linux", "CentOS", "Ubuntu", "System Administration", "DevOps", "Bash"]
image: "/images/blogs/linux-mastery/cover.png"
readTime: "9 min read"
----------------------

# Linux System Administration: My Foundation for DevOps Engineering

Linux is the backbone of modern infrastructure, cloud platforms, and DevOps tooling. As an aspiring DevOps Engineer, I have worked extensively with **CentOS and Ubuntu** to understand how real production servers are managed, secured, and automated.

This blog focuses on **what I practically accomplished**, not just theoretical concepts. These Linux skills later became the foundation for my work with **AWS, Docker, Ansible, and CI/CD pipelines**.

---

## 1. Linux Distributions I Worked With

I gained hands-on experience with the following Linux distributions:

* **CentOS**

  * Used as a **control node** for Ansible automation
  * Practiced enterprise-style system administration tasks

* **Ubuntu**

  * Used on **local machines and AWS EC2 instances**
  * Commonly used in cloud and production environments

Working with both helped me understand distribution-level differences while strengthening my Linux fundamentals.

---

## 2. Linux File System & Directory Structure (Hands-On)

Understanding the Linux File System Hierarchy (FHS) is essential for troubleshooting, automation, and application deployment.

![Linux File System Hierarchy](/images/blogs/linux-mastery/fs-hierarchy.png)

### Key Directories I Used Regularly

* **/etc** – Configuration files (SSH, system services, Nginx)
* **/var/log** – Log files for debugging and monitoring
* **/opt** – Custom scripts and automation tools
* **/home** – User environments and SSH key management
* **/usr/bin & /bin** – System binaries used in scripts

These directories became critical during server configuration and automation tasks.

---

## 3. User, Group & Permission Management

Security and stability start with proper user and permission management.

### Tasks I Practiced

* Creating dedicated system users
* Configuring **passwordless SSH access**
* Applying **least-privilege permissions**
* Managing file ownership for deployed applications

```bash
# Create a new user
useradd devopsuser

# Change ownership of application directory
chown -R devopsuser:devopsuser /var/www/html

# Apply secure permissions
chmod 755 /var/www/html
```

These practices were later automated using **Ansible playbooks**.

---

## 4. Process & Service Management with systemd

Managing system services is a core responsibility of a DevOps Engineer.

### What I Practiced

* Managing services using `systemctl`
* Debugging failed services
* Restarting services after configuration changes
* Enabling services at system startup

```bash
# Check service status
systemctl status nginx

# Restart a service
systemctl restart nginx

# Enable service at boot
systemctl enable nginx
```

![systemctl Service Status](/images/blogs/linux-mastery/systemctl-status.png)

This experience was essential when deploying applications on **AWS EC2**.

---

## 5. Networking & Connectivity Troubleshooting

Networking issues are common in production environments. I practiced diagnosing and resolving them using:

* `ss` and `netstat` – Port and socket inspection
* `curl` – Application-level connectivity testing
* `ping` and `traceroute` – Network reachability
* SSH troubleshooting between machines

![Linux Networking Troubleshooting Flow](/images/blogs/linux-mastery/networking-flow.png)

These skills helped me debug application access issues and configure **AWS Security Groups** correctly.

---

## 6. Cron Jobs & Task Automation

Automation is a key DevOps responsibility. I used `cron` to schedule recurring tasks.

### Automated Tasks

* Server backup scripts
* Log cleanup and maintenance
* Periodic system jobs

```bash
# Run backup script every day at 2 AM
0 2 * * * /opt/scripts/backup.sh >> /var/log/backup.log 2>&1
```

This laid the foundation for CI/CD and infrastructure automation.

---

## 7. Bash Scripting (Practical Usage)

I used Bash scripting to automate repetitive system administration tasks, including:

* Disk usage monitoring
* Service health checks
* Cleanup and maintenance scripts
* Supporting CI/CD pipelines

These scripts improved efficiency and reduced manual effort.

---

## 8. Repository Structure & Learning Evidence

Below is a snapshot of my GitHub repository, where I organized Linux commands, scripts, notes, and hands-on practice.

![Linux Practice Repository Structure](/images/blogs/linux-mastery/linux-repo-structure.png)

This repository demonstrates consistent hands-on learning and real system administration practice.

---

## How Linux Shaped My DevOps Journey

My Linux experience became the foundation for:

* Docker and containerization
* Ansible automation
* AWS EC2 server management
* Jenkins CI/CD pipelines
* Security and performance troubleshooting

---

## Conclusion

Linux system administration is not a one-time skill—it is a continuous practice. By working hands-on with **CentOS and Ubuntu**, I built the confidence to manage real servers, automate infrastructure, and support production deployments.

This Linux foundation now powers everything I do as a DevOps Engineer.
