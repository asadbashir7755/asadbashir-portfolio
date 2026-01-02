---
title: "Automating Deployments with Jenkins & Docker"
date: "2025-02-15"
author: "Asad Bashir"
description: "A comprehensive guide on setting up a CI/CD pipeline using Jenkins to build and deploy Docker containers automatically."
category: "CI/CD"
tags: ["Jenkins", "Docker", "DevOps", "Automation"]
image: "/blog-jenkins.png"
readTime: "5 min read"
---

# Automating Deployments with Jenkins & Docker

In the world of **DevOps**, automation is key. Today, we'll explore how to set up a robust CI/CD pipeline.

## Why Jenkins?

Jenkins is the most widely adopted open-source automation server. It provides hundreds of plugins to support building, deploying, and automating any project.

### Prerequisites

- A running Jenkins server
- Docker installed on the agent
- Access to a Git repository

## The Pipeline Script

Here is a sample `Jenkinsfile` to get started:

```groovy
pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/my-repo/app.git'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my-app:latest .'
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'docker run -d -p 8080:80 my-app:latest'
            }
        }
    }
}
```

## Conclusion

By integrating Jenkins and Docker, you ensure that every commit is tested and deployed in a consistent environment. This reduces "it works on my machine" issues and speeds up delivery.
