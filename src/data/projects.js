export const projects = [
    {
        title: "ECS Fargate Production Setup",
        description: "Worked on real client ECS Fargate production environment: cluster creation, IAM Task Execution Roles, Task Definitions with AWS Secrets Manager integration, and ALB with path-based routing for two services.",
        tech: ["AWS ECS", "Fargate", "IAM", "Secrets Manager", "ALB", "Docker"],
        github: null,
        demo: null
    },
    {
        title: "GitHub Actions CI/CD with OIDC Auth",
        description: "Built CI/CD pipelines with GitHub Actions using OIDC-based AWS authentication — eliminating static credentials. Automated Docker image builds, ECR pushes, and EC2 deployments with Snyk and Trivy security scanning integrated to block vulnerable deployments.",
        tech: ["GitHub Actions", "OIDC", "AWS ECR", "EC2", "Snyk", "Trivy", "Docker"],
        github: "https://github.com/asadbashir7755/CICD_PROJECT.git",
        demo: null
    },
    {
        title: "Kubernetes Local Stack (Minikube)",
        description: "Set up a full production-replica Kubernetes environment in Minikube: ArgoCD for GitOps, HashiCorp Vault with Kubernetes auth, External Secrets Operator, Helm charts, and kube-prometheus-stack with Loki and Promtail for full observability.",
        tech: ["Kubernetes", "ArgoCD", "Vault", "Helm", "Prometheus", "Loki", "Minikube"],
        github: "https://github.com/asadbashir7755",
        demo: null
    },
    {
        title: "AWS VPC Architecture",
        description: "Designed and implemented a complete AWS VPC architecture following best practices: public and private subnets, route tables, security groups, NAT gateway, ALB, and Auto Scaling Groups for EC2-based applications.",
        tech: ["AWS VPC", "EC2", "ALB", "Auto Scaling", "NAT Gateway", "Security Groups"],
        github: "https://github.com/asadbashir7755",
        demo: null
    },
    {
        title: "Ansible Multi-Server Provisioning",
        description: "Automated provisioning and configuration of multiple servers using Ansible playbooks, roles, variables, conditionals, and inventory management. Includes EC2 automation using collections and passwordless SSH setup.",
        tech: ["Ansible", "Linux", "SSH", "AWS EC2", "Bash"],
        github: "https://github.com/asadbashir7755/Ansibel_Projects.git",
        demo: null
    },
    {
        title: "Furnished Home Rentals Platform",
        description: "Final Year Project. Full MERN platform with advanced search, Stripe payments, real-time availability, AI assistant, and admin panel for listings and reservations.",
        tech: ["React", "Node.js", "Express", "MongoDB", "Stripe", "AWS"],
        github: "https://github.com/asadbashir7755/Furnished-Home-Rental-FYP.git",
        demo: null
    }
];