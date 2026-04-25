export const experience = [
    {
        role: "DevOps Engineer",
        company: "CyberoidTech",
        duration: "Mar 2026 – Present",
        description: "Working on real client projects in production environments, handling cloud infrastructure, CI/CD pipelines, security scanning, and secrets management.",
        tasks: [
            "Built CI/CD pipelines with GitHub Actions using OIDC-based AWS authentication — no static credentials needed",
            "Pushed Docker images to AWS ECR and automated deployments to EC2 via GitHub Actions workflows",
            "Worked on ECS Fargate production setup: cluster creation, IAM Task Execution Roles, Task Definitions with Secrets Manager integration, and ALB with path-based routing",
            "Integrated Snyk (dependency + SAST) and Trivy image scanning into CI pipelines — blocking deployments on critical vulnerabilities",
            "Debugged live staging issues: NEXT_PUBLIC_* build-time variable injection, env file conflicts between containers, and RDS Security Group misconfiguration",
            "Worked with ArgoCD GitOps architecture, HashiCorp Vault (Kubernetes auth), and External Secrets Operator for secure secrets management"
        ]
    },
    {
        role: "DevOps Intern",
        company: "Techinn360",
        duration: "Dec 2025 – Feb 2026",
        description: "Built and maintained DevOps infrastructure for real projects, focusing on CI/CD automation, containerization, and AWS cloud setup.",
        tasks: [
            "Built and maintained GitHub Actions CI/CD pipelines, reducing manual deployment time by ~50–60%",
            "Containerized applications using Docker and managed multi-service environments with Docker Compose",
            "Deployed and configured AWS infrastructure: EC2, RDS, S3, and CloudFront with WAF for security and scalability",
            "Configured automated RDS backups and resolved production issues including server storage limits with minimal downtime"
        ]
    },
    {
        role: "Hands-On DevOps Projects",
        company: "Self-Initiated",
        duration: "2024 – 2025",
        description: "Built real-world DevOps infrastructure independently to strengthen practical skills across cloud, Kubernetes, monitoring, and automation.",
        tasks: [
            "Set up full Kubernetes stack in Minikube: ArgoCD, HashiCorp Vault, External Secrets Operator, Helm charts, and kube-prometheus-stack with Loki + Promtail",
            "Automated multi-server provisioning using Ansible playbooks and roles",
            "Configured ALB + Auto Scaling Groups for EC2-based applications",
            "Designed AWS VPC architecture with public/private subnets, route tables, security groups, and NAT gateway",
            "Built CI/CD pipelines using Jenkins integrating GitHub and Docker",
            "Wrote Bash scripts for automation, backup, and monitoring tasks"
        ]
    },
    {
        role: "MERN Stack Developer",
        company: "Academic & Freelance Projects",
        duration: "2023 – 2024",
        description: "Developed full-stack web applications with real-world functionality including payments, authentication, and cloud deployment.",
        tasks: [
            "Built Final Year Project — Furnished Home Rental Platform with Stripe payments, real-time availability, AI assistant, and admin panel",
            "Developed Heavy Machinery Selling Platform with search, filtering, inventory management, and AWS deployment",
            "Designed and built REST APIs with authentication, authorization, and CRUD operations",
            "Deployed applications to AWS S3, EC2, and Vercel environments"
        ]
    }
];