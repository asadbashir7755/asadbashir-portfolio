# committodeploy.dev

Portfolio site for Asad Bashir, DevOps Engineer.

Next.js (App Router) · TypeScript · Tailwind CSS v4 · deployed on Vercel.

## The one rule

**All content lives in [`content/site.ts`](content/site.ts).** Components import
from it and render it; nothing is hardcoded in JSX. The JSON-LD structured data
in [`lib/schema.ts`](lib/schema.ts) is derived from the same objects, so the
visible page and what search engines read can never drift apart.

To change a word on the site, change it in `content/site.ts`.

Blog posts are the one exception: they are markdown files in `content/posts/`.

## Layout

```
app/
  layout.tsx              root metadata, fonts, header/footer
  page.tsx                home, composes every section
  globals.css             design tokens + article typography
  opengraph-image.tsx     social card, generated from site.ts
  icon.tsx                favicon, generated
  sitemap.ts              generated from site.ts + posts
  robots.ts               generated
  llms.txt/route.ts       plain-text summary for AI crawlers
  not-found.tsx
  blog/
    page.tsx              index
    [slug]/page.tsx       post, statically generated
components/
  layout/                 Header, Footer
  sections/               Hero, About, Skills, Experience, Projects,
                          Achievements, Certifications, Faq, Writing, Contact
  blog/PostCard.tsx
  ui/                     Section, Reveal, RevealObserver, JsonLd
content/
  site.ts                 <- single source of truth
  posts/*.md              blog posts
lib/
  blog.ts                 markdown -> HTML at build time
  schema.ts               JSON-LD builders
```

## Commands

```bash
npm run dev         # http://localhost:3000
npm run build       # production build
npm run start       # serve the production build
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
```

## Adding a blog post

Create `content/posts/<slug>.md`:

```markdown
---
title: 'Post title'
date: '2026-05-01'
author: 'Asad Bashir'
description: 'One or two sentences. Used for meta description and OG.'
category: 'Kubernetes'
tags: ['Kubernetes', 'Helm']
image: '/images/blogs/<slug>/cover.png'
readTime: '8 min read'
---

Body in markdown.
```

The route, sitemap entry, JSON-LD, and index card are all generated from that.
Nothing else needs updating.

Markdown is rendered to HTML **on the server at build time**, so posts ship as
static HTML with no markdown parser in the client bundle, this is what makes
the writing indexable.

## Before going live

Open items are marked `// TODO:` in `content/site.ts`:

- `achievements`, three placeholder entries, including the IngressNightmare
  (CVE-2025-1974) remediation. **These are placeholders, not claims.** Fill in
  the real details or delete the entries; the section hides itself when the
  array is empty.
- `certifications`, add the Credly badge URL and year for AWS Cloud Practitioner.
- `contact.phone`, confirm the `+92` country code.
- `person.location`, add if you want it in the Person schema.
- `skills` (`iac`), Terraform is deliberately absent. Add it when there is real
  project experience behind it; the FAQ currently states it is a gap.

Also confirm before launch:

- The ECS Fargate post says "internship at CyberoidTech" while `site.ts` lists
  CyberoidTech as **DevOps Engineer** and Techinn360 as the internship. One of
  the two is wrong.
- `avatar.png` is a centre-crop of the original phone photo. A proper square
  headshot would be better.

## Deployment

Vercel builds on push to `main` via the Git integration. `.github/workflows/ci.yml`
runs typecheck, lint and build on pull requests so failures surface before Vercel
builds.

Set the custom domain to `committodeploy.dev` in the Vercel project. The origin
is read from `site.meta.url` for canonical URLs, sitemap and JSON-LD, change it
there if the domain changes.

Response headers (CSP, HSTS, X-Frame-Options, Permissions-Policy) are defined in
[`next.config.ts`](next.config.ts).
