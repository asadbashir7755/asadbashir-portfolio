/**
 * SINGLE SOURCE OF TRUTH.
 *
 * Every piece of user-facing copy on this site lives here. Components import
 * from this file and render it; they never hardcode content. The JSON-LD
 * structured data in `lib/schema.ts` is derived from these same objects, so
 * search engines and humans can never see different facts.
 *
 * Rule of thumb: if you want to change a word on the site, change it here.
 *
 * Entries marked `// TODO:` are intentionally unfilled. Nothing in this file
 * has been invented, placeholders stay placeholders until the real details
 * are added.
 */

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface SiteMeta {
  /** Canonical origin, no trailing slash. Used for canonical URLs + sitemap. */
  url: string
  title: string
  /** Shown as the browser-tab title on inner pages: "Page, titleSuffix". */
  titleSuffix: string
  description: string
  locale: string
  keywords: string[]
}
/* Note: there is no `ogImage` field. The social card is generated from this
 * same content by app/opengraph-image.tsx, so there is nothing to keep in sync. */

export interface Person {
  name: string
  /** Professional headline, used in <h1>, JSON-LD jobTitle and OG tags. */
  title: string
  /** One-line positioning statement. */
  tagline: string
  /** Longer bio used in About and JSON-LD `description`. */
  bio: string[]
  /** Optional, omitted from JSON-LD entirely when undefined. */
  location?: string
}

export interface Skill {
  name: string
  /** Short context: where this was actually used. Keeps the list from reading as a keyword dump. */
  note?: string
  /**
   * Optional sub-group within a category. Used inside `Cloud` to separate AWS
   * from Hetzner and RunPod, so the section shows multi-cloud experience
   * without splitting it into three top-level categories.
   */
  group?: string
}

export interface SkillCategory {
  id: string
  label: string
  skills: Skill[]
}

export interface Role {
  company: string
  role: string
  /** Human-readable, e.g. "Dec 2025 - Present". */
  period: string
  /** ISO 8601 (YYYY-MM) for JSON-LD. */
  startDate: string
  /** ISO 8601 (YYYY-MM), or null when current. */
  endDate: string | null
  summary: string
  highlights: string[]
}

/** One section on a project detail page. */
export interface ProjectSection {
  heading: string
  body: string[]
}

export interface Project {
  slug: string
  title: string
  /** One line. This is all the homepage card shows, to keep the grid short. */
  summary: string
  /** Fuller description, used as the intro on /projects/[slug]. */
  description: string
  stack: string[]
  /** Repository URL, or null when the work lives in a private client repo. */
  repo: string | null
  demo: string | null
  /** External write-up URL for this project, or null. */
  writeup: string | null
  /**
   * Detail sections rendered on /projects/[slug]. Add or expand these freely;
   * the page renders whatever is here and no component needs changing.
   */
  details: ProjectSection[]
}

export interface Achievement {
  title: string
  description: string
  /** The measurable outcome. This is the part that carries the weight. */
  impact: string
}

export interface Certification {
  name: string
  issuer: string
  status: 'earned' | 'in-progress'
  /** Year earned, or target for in-progress. Optional where unknown. */
  year?: string
  /** Public verification URL if one exists. */
  credentialUrl?: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface NavItem {
  label: string
  href: string
}

/** Heading copy for one section. The numeric index is assigned at render time. */
export interface SectionCopy {
  /** Short uppercase label in the eyebrow, e.g. "SKILLS". */
  label: string
  title: string
  intro?: string
}

export type SectionKey =
  | 'about'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'achievements'
  | 'certifications'
  | 'faq'
  | 'fieldNotes'
  | 'contact'

export interface SiteContent {
  meta: SiteMeta
  person: Person
  nav: NavItem[]
  /** All section heading copy, so no component hardcodes user-facing text. */
  sections: Record<SectionKey, SectionCopy>
  hero: {
    /** Rendered in the terminal panel as the executed command. */
    command: string
    /** Static key/value output lines under the command. */
    output: { key: string; value: string }[]
    primaryCta: { label: string; href: string }
    secondaryCta: { label: string; href: string }
  }
  about: {
    heading: string
    body: string[]
    /**
     * Shown beside the bio in place of a portrait. A real snippet of work is
     * stronger evidence to an engineer reading this than a photo is.
     */
    snippet: {
      filename: string
      caption: string
      /** Rendered verbatim in a <pre>. Keep lines under ~46 chars for mobile. */
      code: string
    }
  }
  skills: SkillCategory[]
  experience: Role[]
  projects: Project[]
  achievements: Achievement[]
  certifications: Certification[]
  faq: FaqItem[]
  contact: {
    heading: string
    body: string
    email: string
    /** E.164 for tel: links. */
    phone: string
    /** Human-readable phone. */
    phoneDisplay: string
    resume: string
  }
  social: { label: string; href: string; handle: string }[]
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const SITE_URL = 'https://committodeploy.dev'

export const site: SiteContent = {
  meta: {
    url: SITE_URL,
    title: 'Asad Bashir | DevOps Engineer',
    titleSuffix: 'Asad Bashir',
    description:
      'DevOps engineer working on production AWS infrastructure: GitHub Actions CI/CD with OIDC authentication, ECS Fargate, Kubernetes with ArgoCD and Vault, and container security scanning with Snyk and Trivy.',
    locale: 'en_US',
    // Only list what the rest of this file can actually back up, a keyword
    // that does not appear in the visible content is what search engines
    // discount.
    keywords: [
      'DevOps Engineer',
      'AWS',
      'Terraform',
      'Kubernetes',
      'CI/CD',
      'GitHub Actions',
      'ECS Fargate',
      'ArgoCD',
      'HashiCorp Vault',
      'Docker',
      'GitOps',
      'Hetzner',
      'Supabase',
    ],
  },

  person: {
    name: 'Asad Bashir',
    title: 'DevOps Engineer',
    tagline: 'I build the pipelines and infrastructure that put code in production safely.',
    bio: [
      'I work on production cloud infrastructure for real client projects: CI/CD pipelines, container orchestration, secrets management, and the security scanning that stops bad builds from shipping.',
      'Most of my day-to-day is AWS, Terraform and GitHub Actions: provisioning infrastructure as code, replacing static credentials with OIDC-based authentication, getting services onto ECS Fargate behind an ALB, and wiring Snyk and Trivy into pipelines so vulnerable images never reach a registry.',
      'Outside client work I run a full Kubernetes stack: ArgoCD for GitOps, Vault and External Secrets Operator for secrets, and kube-prometheus-stack with Loki for observability. The fastest way to understand a tool is to operate it when nobody is on call but you.',
    ],
    // TODO: add city/country if you want it in JSON-LD and the contact block.
    // Omitted rather than guessed, it is not stated anywhere in the current site.
    location: undefined,
  },

  nav: [
    { label: 'About', href: '/#about' },
    { label: 'Skills', href: '/#skills' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Field Notes', href: '/#field-notes' },
    { label: 'Contact', href: '/#contact' },
  ],

  sections: {
    about: { label: 'About', title: 'About' },
    skills: {
      label: 'Skills',
      title: "Tools I've actually shipped with",
      intro:
        'Grouped by what they do. The note under each is where it was used. If there is no note, treat it as working familiarity rather than production depth.',
    },
    experience: { label: 'Experience', title: "Where I've done the work" },
    projects: {
      label: 'Projects',
      title: "Infrastructure I've built",
      intro:
        'Client work sits alongside self-directed builds. Where a repository is private, it says so rather than linking somewhere unhelpful.',
    },
    achievements: {
      label: 'Achievements',
      title: 'Outcomes worth naming',
      intro: 'Specific problems, and what changed as a result.',
    },
    certifications: { label: 'Certifications', title: 'Credentials & training' },
    faq: {
      label: 'FAQ',
      title: 'Questions I get asked',
      intro: 'Direct answers to what recruiters and engineers ask most often.',
    },
    fieldNotes: {
      label: 'Field Notes',
      title: 'Field Notes',
      intro: 'Write-ups from production work.',
    },
    contact: { label: 'Contact', title: 'Get in touch' },
  },

  hero: {
    command: 'whoami --verbose',
    output: [
      { key: 'role', value: 'DevOps Engineer' },
      { key: 'focus', value: 'AWS · Hetzner · Terraform · Kubernetes' },
      { key: 'currently', value: 'CyberoidTech' },
      { key: 'shipping', value: 'OIDC pipelines, ECS Fargate, GitOps' },
    ],
    primaryCta: { label: 'View experience', href: '#experience' },
    secondaryCta: { label: 'Read the notes', href: '#field-notes' },
  },

  about: {
    heading: 'About',
    // Kept to three short paragraphs. Each one covers a distinct thing:
    // Kubernetes, DevSecOps and compliance, then what I optimise for. The
    // detail behind each lives in Experience and Projects rather than here.
    // Three short paragraphs, and they are the only visible copy in About.
    // person.bio is not rendered here any more, it only feeds JSON-LD.
    body: [
      // Deliberately provider-agnostic. Naming a specific cloud or distribution
      // here invited the reader to assume that was the only one. The Skills and
      // Experience sections carry the specifics.
      'I run production infrastructure in the cloud: Kubernetes workloads across managed and self-managed clusters, Helm charts in place of hand-written YAML, and ArgoCD so the cluster matches Git rather than whatever someone applied by hand. Terraform provisions it and GitHub Actions ships it.',
      // TODO: confirm this matches what you actually did. Delve was compliance
      // automation, SOC 2 and GDPR the frameworks named. Narrow it if needed.
      'Security is part of that job, not a separate one. Snyk and Trivy gate the pipeline, secrets come from Vault, CI authenticates over OIDC with no stored keys. It also has to survive an audit, so I have worked with Delve on compliance automation and on the infrastructure side of SOC 2 and GDPR.',
      'What I optimise for is the boring kind of reliability. Credentials that expire on their own, pipelines that fail loudly before production does, and infrastructure someone else can read six months later without calling me.',
    ],
    // Replaces the portrait that used to sit here. This is the actual change
    // that took static AWS keys out of CI: the workflow requests an OIDC token
    // and assumes a role, so there is no long-lived secret left to leak.
    snippet: {
      filename: '.github/workflows/deploy.yml',
      caption: 'How the pipelines authenticate to AWS, with no stored keys.',
      // Lines kept short deliberately: this renders in a narrow column on a
      // phone, and a long line turns into a horizontal scrollbar.
      code: `permissions:
  id-token: write
  contents: read

- uses: configure-aws-credentials@v4
  with:
    role-to-assume: \${{ secrets.ROLE_ARN }}
    aws-region: eu-north-1

# no AWS_SECRET_ACCESS_KEY anywhere`,
    },
  },

  skills: [
    {
      id: 'cloud',
      label: 'Cloud',
      skills: [
        { name: 'AWS EC2', note: 'Deployments, Auto Scaling Groups', group: 'AWS' },
        { name: 'AWS ECS Fargate', note: 'Production cluster, task definitions', group: 'AWS' },
        { name: 'AWS ECR', note: 'Image registry in CI', group: 'AWS' },
        { name: 'AWS S3 & CloudFront', note: 'Static hosting, CDN', group: 'AWS' },
        { name: 'AWS ALB', note: 'Path-based routing across services', group: 'AWS' },
        { name: 'AWS IAM', note: 'Task execution roles, OIDC trust policies', group: 'AWS' },
        { name: 'AWS Client VPN', note: 'Private network access to internal resources', group: 'AWS' },
        { name: 'VPC & Networking', note: 'Public/private subnets, NAT, route tables', group: 'AWS' },
        { name: 'Linux', note: 'CentOS, Ubuntu server administration', group: 'AWS' },

        // Grouped as "Other providers" rather than one group per vendor: RunPod
        // alone made a one-item group, which read as a formatting mistake.
        // k3s is intentionally NOT listed here, it lives once, under
        // Containers & Orchestration, with the Hetzner detail in its note.
        {
          name: 'Hetzner Cloud',
          note: 'Provisioning and managing cloud servers',
          group: 'Other providers',
        },
        {
          name: 'Hetzner Object Storage',
          note: 'S3-compatible buckets',
          group: 'Other providers',
        },
        {
          name: 'RunPod',
          note: 'GPU infrastructure for model deployment',
          group: 'Other providers',
        },
      ],
    },
    {
      id: 'iac',
      label: 'Infrastructure as Code',
      skills: [
        { name: 'Terraform', note: 'Production infrastructure provisioning' },
        { name: 'Ansible', note: 'Playbooks, roles, multi-server inventories' },
        { name: 'Helm', note: 'Chart-based Kubernetes releases' },
        { name: 'Bash', note: 'Automation, backup and monitoring scripts' },
        { name: 'YAML / JSON', note: 'Manifests, task definitions, workflows' },
      ],
    },
    {
      id: 'databases',
      label: 'Databases',
      skills: [
        { name: 'Supabase', note: 'Postgres, auth, storage' },
        { name: 'Row Level Security (RLS)', note: 'Postgres policy-based access control' },
        { name: 'PostgreSQL', note: 'Schema design and queries' },
        { name: 'AWS RDS', note: 'Automated backups, SG troubleshooting' },
        { name: 'MongoDB', note: 'Document modelling for Node applications' },
      ],
    },
    {
      id: 'containers',
      label: 'Containers & Orchestration',
      skills: [
        { name: 'Docker', note: 'Image builds, multi-stage, registries' },
        { name: 'Docker Compose', note: 'Multi-service local environments' },
        { name: 'Kubernetes', note: 'Cluster operations, workloads, networking' },
        { name: 'kubeadm', note: 'Bootstrapping and upgrading clusters' },
        // The single k3s entry on the site. Do not add another under Cloud.
        { name: 'k3s', note: 'Self-managed cluster on a Hetzner cloud server' },
        { name: 'ArgoCD', note: 'GitOps continuous delivery' },
      ],
    },
    {
      id: 'cicd',
      label: 'CI/CD',
      skills: [
        { name: 'GitHub Actions', note: 'OIDC auth, matrix builds, deploy workflows' },
        { name: 'Jenkins', note: 'Pipelines integrating GitHub and Docker' },
        // TODO: confirm this is Bitbucket (Atlassian), not GitBucket (the
        // self-hosted Java app). They are different products and the note below
        // assumes Bitbucket Pipelines.
        { name: 'Bitbucket', note: 'Repository hosting and Bitbucket Pipelines' },
        { name: 'GitOps', note: 'Declarative delivery via ArgoCD' },
        { name: 'Git', note: 'Branching strategies, PR-based workflows' },
      ],
    },
    {
      id: 'devsecops',
      label: 'DevSecOps',
      skills: [
        { name: 'Snyk', note: 'Dependency and SAST scanning as a blocking pipeline gate' },
        { name: 'Trivy', note: 'Container image vulnerability scanning before push' },
        { name: 'HashiCorp Vault', note: 'Kubernetes auth method' },
        { name: 'External Secrets Operator', note: 'Syncing secrets into clusters' },
        { name: 'AWS Secrets Manager', note: 'Injected into ECS task definitions' },
        { name: 'OIDC Authentication', note: 'Removed static AWS keys from CI' },
        { name: 'AWS WAF', note: 'Edge filtering in front of CloudFront' },
        { name: 'Least-privilege IAM', note: 'Scoped roles and policies per service' },
      ],
    },
    {
      // TODO: check each note below against what you actually did. Anything you
      // cannot talk through in an interview should be deleted rather than left
      // here, since this is the section an auditor-minded reader will probe.
      id: 'compliance',
      label: 'Compliance',
      skills: [
        { name: 'Delve', note: 'Compliance automation' },
        { name: 'SOC 2', note: 'Infrastructure controls and evidence collection' },
        { name: 'GDPR', note: 'Data residency, retention and access control' },
        { name: 'AWS KMS', note: 'Encryption at rest for storage and databases' },
        { name: 'CloudTrail & audit logging', note: 'Traceability of who changed what' },
        { name: 'Container Insights', note: 'AWS compliance and monitoring checks' },
      ],
    },
    {
      id: 'observability',
      label: 'Observability',
      skills: [
        { name: 'Prometheus', note: 'kube-prometheus-stack' },
        { name: 'Grafana', note: 'Dashboards and alerting' },
        { name: 'Loki & Promtail', note: 'Cluster-wide log aggregation' },
        { name: 'CloudWatch', note: 'AWS-native metrics and logs' },
      ],
    },
    {
      id: 'development',
      label: 'Development',
      skills: [
        { name: 'JavaScript / TypeScript' },
        { name: 'Node.js & Express', note: 'REST API design' },
        { name: 'React', note: 'Including this site' },
        { name: 'Nginx', note: 'Reverse proxy, TLS termination' },
      ],
    },
  ],

  experience: [
    {
      company: 'CyberoidTech',
      role: 'DevOps Engineer',
      period: 'Dec 2025 - Present',
      startDate: '2025-12',
      endDate: null,
      summary:
        'Production infrastructure for client projects: cloud, CI/CD, security scanning and secrets management.',
      // Only the first three render on the homepage (see MAX_HIGHLIGHTS in
      // Experience.tsx), so these are ordered most-significant-first.
      highlights: [
        'Implemented the Kubernetes delivery stack: ArgoCD for GitOps, HashiCorp Vault with the Kubernetes auth method, External Secrets Operator for cluster secrets, Helm charts replacing hand-written manifests, and kube-prometheus-stack with Loki and Promtail for metrics and logs.',
        'Replaced long-lived AWS access keys in GitHub Actions with OIDC-based authentication, removing static credentials from CI entirely.',
        'Built out an ECS Fargate production environment: cluster setup, IAM task execution roles, task definitions wired to Secrets Manager, and an ALB with path-based routing across two services.',
        'Integrated Snyk (dependency + SAST) and Trivy image scanning as blocking pipeline gates, so critical vulnerabilities stop a deployment rather than reaching production.',
        'Responded to CVE-2025-1974 (IngressNightmare) by blocking port 8443 and hardening ingress configuration across the cluster.',
        'Automated Docker image builds, ECR pushes and EC2 deployments through GitHub Actions workflows.',
        'Debugged live staging failures including NEXT_PUBLIC_* build-time variable injection, env file collisions between containers, and an RDS security group misconfiguration.',
      ],
    },
    {
      company: 'Techinn360',
      role: 'DevOps Intern',
      period: 'Jun 2025 - Nov 2025',
      startDate: '2025-06',
      endDate: '2025-11',
      summary:
        'CI/CD automation, containerization and AWS infrastructure for live projects.',
      highlights: [
        'Built and maintained GitHub Actions pipelines, cutting manual deployment time by roughly 50-60%.',
        'Containerized applications with Docker and managed multi-service environments using Docker Compose.',
        'Deployed and configured AWS infrastructure: EC2, RDS, S3, and CloudFront fronted by WAF.',
        'Configured automated RDS backups and resolved a production server storage limit with minimal downtime.',
      ],
    },
    {
      company: 'Self-directed',
      role: 'Infrastructure Projects',
      period: '2024 - 2025',
      startDate: '2024-01',
      endDate: '2025-05',
      summary:
        'Built and operated real infrastructure independently to develop depth across cloud, Kubernetes and automation.',
      highlights: [
        'Ran a self-managed k3s cluster on Hetzner to build depth before doing the same work in production.',
        'Automated multi-server provisioning with Ansible playbooks and roles.',
        'Designed an AWS VPC architecture with public and private subnets, route tables, security groups and a NAT gateway.',
        'Configured ALB and Auto Scaling Groups for EC2-backed applications.',
        'Built Jenkins CI/CD pipelines integrating GitHub and Docker.',
      ],
    },
    {
      company: 'Academic & Freelance',
      role: 'Full-Stack Developer',
      period: '2023 - 2024',
      startDate: '2023-01',
      endDate: '2024-12',
      summary:
        'Full-stack web applications with payments, authentication and cloud deployment.',
      highlights: [
        'Built a furnished home rental platform with Stripe payments, real-time availability and an admin panel, delivered as a final year project with distinction.',
        'Developed a heavy machinery marketplace with search, filtering and inventory management.',
        'Designed REST APIs with authentication, authorization and full CRUD.',
      ],
    },
  ],

  projects: [
    {
      slug: 'github-actions-oidc',
      title: 'Keyless CI/CD with GitHub Actions and AWS OIDC',
      summary: 'Took static AWS keys out of CI entirely by moving pipelines onto OIDC.',
      description:
        'Removed static AWS credentials from CI by moving to OIDC-based authentication. Pipelines now assume a short-lived role to build images, push to ECR and deploy to EC2, with Snyk and Trivy scanning as blocking gates before anything ships.',
      stack: ['GitHub Actions', 'OIDC', 'AWS IAM', 'ECR', 'EC2', 'Snyk', 'Trivy'],
      repo: 'https://github.com/asadbashir7755/wanderlust-jenkins-cicd',
      demo: null,
      writeup: null,
      details: [
        {
          heading: 'The problem',
          body: [
            'CI held long-lived AWS access keys in repository secrets. They never expired, they were valid from anywhere, and rotating them meant touching every workflow that used them.',
          ],
        },
        {
          heading: 'How it works now',
          body: [
            'GitHub Actions requests an OIDC token, and AWS trusts that token through an IAM identity provider. The workflow assumes a role scoped to the repository and branch, and receives credentials that expire when the job ends.',
            'Nothing long-lived is stored. There is no key to leak, and no rotation to forget.',
          ],
        },
        {
          heading: 'Security gates',
          body: [
            'Snyk covers dependencies and SAST, Trivy scans the built image. Both run as blocking steps, so a critical finding fails the build rather than producing a warning nobody reads.',
          ],
        },
      ],
    },
    {
      slug: 'ecs-fargate',
      title: 'ECS Fargate Production Environment',
      summary: 'Client production platform on ECS Fargate, with VPN-only access to internal services.',
      description:
        'Client production platform on ECS Fargate: a custom VPC with public and private subnets across availability zones, an ECS cluster running multiple services, and IAM task execution roles with task definitions pulling configuration from Secrets Manager. Traffic splits across an internet-facing load balancer for public routes and an internal one for service-to-service calls, with AWS Client VPN as the only way into internal endpoints. A multi-tenant RDS instance sits in private subnets, and Snyk and Trivy run as blocking gates in the pipeline.',
      stack: [
        'ECS Fargate',
        'VPC',
        'Multi-AZ Subnets',
        'ALB',
        'Internal Load Balancer',
        'AWS Client VPN',
        'Multi-tenant RDS',
        'Secrets Manager',
        'IAM',
        'Snyk',
        'Trivy',
        'Docker',
      ],
      repo: null,
      demo: null,
      writeup: null,
      details: [
        {
          heading: 'Network layout',
          body: [
            'A custom VPC with public and private subnets spread across availability zones. Public subnets carry only the internet-facing load balancer. Everything that runs application code sits in private subnets with no public address.',
          ],
        },
        {
          heading: 'Two load balancers, on purpose',
          body: [
            'The internet-facing balancer handles public routes. A second, internal balancer handles service-to-service traffic, so internal calls never leave the VPC or pass through a public listener.',
            'Internal endpoints are reachable only over AWS Client VPN. There is no public route to them at all, which means an admin interface is not one misconfigured security group away from being exposed.',
          ],
        },
        {
          heading: 'Services and data',
          body: [
            'The ECS cluster runs multiple services, each with its own task definition and IAM task execution role, so a service can only reach what it needs.',
            'Configuration and credentials come from Secrets Manager at task start rather than being baked into images. A multi-tenant RDS instance sits in private subnets, reachable only from the task security group.',
          ],
        },
        {
          heading: 'DevSecOps',
          body: [
            'Snyk and Trivy run as blocking pipeline gates, so a vulnerable image never reaches the registry, let alone the cluster.',
          ],
        },
      ],
    },
    {
      slug: 'shopix-aws-production',
      title: 'Shopix Production AWS Infrastructure',
      summary: 'Full-stack ecommerce on a custom VPC, with no static AWS keys and no open SSH.',
      description:
        'A full-stack ecommerce platform on a custom VPC across two availability zones: an internet-facing ALB in public subnets, application servers in private subnets, and RDS MySQL with no public exposure. Deploys run through GitHub Actions using OIDC, so no static AWS keys exist anywhere, and server access is through SSM rather than open SSH.',
      stack: ['AWS', 'VPC', 'ALB', 'RDS', 'ECR', 'SSM', 'OIDC', 'GitHub Actions', 'Docker'],
      repo: 'https://github.com/asadbashir7755/shopix-aws-production',
      demo: null,
      writeup: null,
      details: [
        {
          heading: 'Architecture',
          body: [
            'Six subnets across two availability zones. The ALB sits in the public pair, application servers in the private pair, and RDS MySQL in a third pair with no public access. A NAT gateway gives private instances outbound access for pulling images and packages, with no inbound path back.',
          ],
        },
        {
          heading: 'Access',
          body: [
            'No SSH port is open anywhere in the stack. Instance access goes through AWS Systems Manager, which means no key material to distribute and every session logged.',
            'Deploys authenticate through GitHub OIDC and assume a role, so there are no static AWS credentials in the pipeline.',
          ],
        },
        {
          heading: 'Status',
          body: [
            'The infrastructure was built, deployed and verified, then torn down to avoid running cost. The repository holds the configuration, architecture diagram and screenshots from the running system.',
          ],
        },
      ],
    },
    {
      slug: 'kubernetes-stack',
      title: 'Production-Replica Kubernetes Stack',
      summary: 'A full GitOps cluster on k3s: ArgoCD, Vault, Helm and the Prometheus stack.',
      description:
        'A full GitOps cluster on k3s running on a Hetzner cloud server: ArgoCD for continuous delivery, HashiCorp Vault with the Kubernetes auth method, External Secrets Operator, Helm-managed releases, and kube-prometheus-stack with Loki and Promtail for metrics and logs.',
      stack: ['k3s', 'ArgoCD', 'Vault', 'Helm', 'Prometheus', 'Loki'],
      repo: 'https://github.com/asadbashir7755/kubernetes-projects',
      demo: null,
      writeup: null,
      details: [
        {
          heading: 'Why build it',
          body: [
            'Running a cluster you own, where nobody else is on call, is the fastest way to understand what the managed version is doing for you. This one was built to mirror a production setup rather than a demo.',
          ],
        },
        {
          heading: 'Delivery',
          body: [
            'ArgoCD watches the repository and reconciles the cluster to match it, so the deployed state is whatever is in Git. Releases are Helm charts rather than loose manifests, which makes a rollback a version change instead of an archaeology exercise.',
          ],
        },
        {
          heading: 'Secrets and observability',
          body: [
            'Vault holds the secrets, using the Kubernetes auth method so pods authenticate with their service account rather than a stored token. External Secrets Operator syncs them into the cluster as needed.',
            'kube-prometheus-stack covers metrics, with Loki and Promtail aggregating logs across workloads.',
          ],
        },
      ],
    },
    {
      slug: 'ansible-provisioning',
      title: 'Ansible Multi-Server Provisioning',
      summary: 'Role-based provisioning across environments, with Vault-encrypted secrets per environment.',
      description:
        'Automated provisioning and configuration across multiple servers using playbooks, roles, variables and conditionals, including EC2 automation via Ansible collections and passwordless SSH bootstrapping.',
      stack: ['Ansible', 'Linux', 'SSH', 'EC2', 'Bash'],
      repo: 'https://github.com/asadbashir7755/ansible-learning',
      demo: null,
      writeup: null,
      details: [
        {
          heading: 'Structure',
          body: [
            'Playbooks split into roles so the same building blocks serve different hosts, with variables and conditionals handling the differences between them rather than separate copies per environment.',
          ],
        },
        {
          heading: 'Secrets',
          body: [
            'Staging and production each carry their own Ansible Vault file, encrypted with AES256. The same playbooks run against both, and no credential appears in plaintext at any point.',
          ],
        },
      ],
    },
    {
      slug: 'rental-platform',
      title: 'Furnished Home Rentals Platform',
      summary: 'MERN rental marketplace with Stripe payments and an admin panel. Final year project.',
      description:
        'Full-stack rental marketplace with advanced search, Stripe payments, real-time availability and an admin panel for landlords to manage listings and reservations. Final year project, graded with distinction.',
      stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'AWS'],
      repo: 'https://github.com/asadbashir7755/furnished-home-rental',
      demo: null,
      writeup: null,
      details: [
        {
          heading: 'What it does',
          body: [
            'Search and filtering over listings, real-time availability so two people cannot book the same dates, Stripe payments, and an admin panel for managing listings and reservations.',
          ],
        },
        {
          heading: 'Where it led',
          body: [
            'This is the project that pulled me toward infrastructure. Getting it deployed and keeping it running turned out to be the harder and more interesting half, and the CI pipeline built around it is a separate repository.',
          ],
        },
      ],
    },
  ],

  /**
   * ACHIEVEMENTS, measurable production outcomes, distinct from the day-to-day
   * work listed under `experience` and the builds listed under `projects`.
   *
   * These are placeholders. Replace the copy in each entry with the real
   * details; the section renders whatever is in this array, so no component
   * changes are needed. Delete any entry you do not use, the section hides
   * itself automatically when the array is empty.
   *
   * `impact` should be the concrete, defensible outcome: a number, a duration,
   * a risk removed. It is the line an interviewer will ask you to expand on.
   */
  achievements: [
    // Empty on purpose: the section hides itself when this array is empty, so
    // no placeholder text can reach the live site. Uncomment the template and
    // fill in real details to bring the section back.
    //
    // Start with the IngressNightmare (CVE-2025-1974) remediation. To write it
    // up you need: the affected ingress-nginx version, which cluster or
    // environment, how the upgrade or mitigation rolled out without dropping
    // traffic, and how downtime was actually measured.
    //
    // {
    //   title: 'IngressNightmare (CVE-2025-1974) remediation',
    //   description:
    //     'What the vulnerability exposed, how you found the affected clusters, and the remediation path.',
    //   impact: 'The measurable result, downtime during rollout, clusters patched, time to remediation.',
    // },
  ],

  certifications: [
    {
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      status: 'earned',
      // TODO: add `year` and `credentialUrl` (your Credly badge link).
      // A verifiable badge link is worth more than the line of text alone.
    },
    {
      name: 'AWS Certified Solutions Architect - Associate (SAA-C03)',
      issuer: 'Amazon Web Services',
      status: 'in-progress',
    },
    {
      name: 'Linux Administration',
      issuer: 'Course: CentOS & Ubuntu administration, shell scripting, user and permission management',
      status: 'earned',
    },
    {
      name: 'Ansible Automation',
      issuer: 'School of DevOps (Udemy): playbooks, roles, loops, server automation',
      status: 'earned',
    },
    {
      name: 'MERN Stack Development',
      issuer: 'Course: MongoDB, Express, React, Node.js',
      status: 'earned',
    },
  ],

  /**
   * FAQ, trimmed to the three questions whose answers are NOT already visible
   * elsewhere on the page. The previous nine largely restated About, Skills,
   * Experience and Projects, which is duplicate content for both readers and
   * search engines.
   *
   * Rule for adding one: if a visitor could answer it by scrolling, it does not
   * belong here. This block also feeds FAQPage structured data.
   */
  faq: [
    {
      question: 'What infrastructure-as-code tools has Asad used?',
      answer:
        'Terraform for provisioning infrastructure in production, Ansible for server provisioning and configuration management across multiple hosts, and Helm for Kubernetes releases. Pipeline and cluster configuration is version-controlled the same way application code is.',
    },
    {
      question: 'Has he worked with cloud providers other than AWS?',
      answer:
        'Yes. Alongside AWS he has worked with Hetzner Cloud, provisioning servers, running a self-managed k3s Kubernetes cluster on them, and using Hetzner S3-compatible object storage, and with RunPod for GPU infrastructure to deploy models. The tooling around them (Terraform, Ansible, containers, GitOps) transfers across providers.',
    },
    {
      question: 'What database experience does he have?',
      answer:
        'Supabase and PostgreSQL, including Row Level Security policies for access control at the database layer rather than only in application code. Also AWS RDS in production, where he configured automated backups and resolved security group misconfigurations, and MongoDB for Node.js applications.',
    },
  ],

  contact: {
    heading: 'Get in touch',
    body: 'Open to DevOps, platform and cloud infrastructure roles. If you have a pipeline that keeps breaking or infrastructure that needs a second pair of eyes, send a note.',
    email: 'asadbashir2229526@gmail.com',
    // Converted from the locally-formatted 03400569133 to E.164 for tel: links.
    // TODO: confirm the country code is correct (+92 assumed) before launch.
    phone: '+923400569133',
    phoneDisplay: '+92 340 0569133',
    resume: '/asad-bashir-cv.pdf',
  },

  /**
   * These URLs are the `sameAs` array in the Person schema, they are how
   * search engines connect this site to the same real person elsewhere.
   * Keep them canonical: no tracking parameters, no shortlinks.
   */
  social: [
    {
      label: 'GitHub',
      href: 'https://github.com/asadbashir7755',
      handle: '@asadbashir7755',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/asad-bashir-772b73299',
      handle: 'asad-bashir',
    },
  ],
}

export default site
