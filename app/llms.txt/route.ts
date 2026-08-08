import { site } from '@/content/site'

/**
 * /llms.txt — https://llmstxt.org
 *
 * Structure required by the spec, in order:
 *   1. H1 with the site/project name        (the only REQUIRED element)
 *   2. Blockquote — short summary with key information
 *   3. Free-form markdown (any block except headings) with detail
 *   4. Zero or more H2 sections, each a "file list": markdown list items of
 *      `[name](url)` followed optionally by `: notes`
 *
 * An H2 named exactly "Optional" is special: agents may skip those URLs when
 * they need a shorter context, so it holds secondary material only.
 *
 * This previously put facts under H2 headings ("Core skills", "Experience",
 * "Certifications", "FAQ") with no hyperlinks in them, and listed contact
 * details as bare URLs. Both break the spec: H2 sections are link lists, and
 * plain URLs are not markdown links. Non-link detail belongs in the free-form
 * block above the first H2, which is where it now lives.
 *
 * Lighthouse's Agentic Browsing audit additionally requires an H1, at least one
 * `[text](url)` markdown link, and more than 50 characters — all satisfied here.
 *
 * Generated from content/site.ts so it cannot drift from the rendered site.
 */
export const dynamic = 'force-static'

export function GET() {
  const { person, meta, contact, social, certifications, skills, experience } = site
  const url = meta.url

  const lines: string[] = [
    // 1. H1 — required.
    `# ${person.name}`,
    '',
    // 2. Blockquote summary.
    `> ${person.title} — ${person.tagline} Working in production on AWS, Terraform, Kubernetes and CI/CD.`,
    '',
    // 3. Free-form detail. No headings in this block, per the spec.
    ...person.bio.flatMap((p) => [p, '']),
    `**Focus:** ${skills.map((c) => c.label).join(', ')}.`,
    '',
    `**Currently:** ${experience[0].role} at ${experience[0].company} (${experience[0].period}).`,
    '',
    '**Experience:**',
    ...experience.map((r) => `- ${r.role}, ${r.company} (${r.period}) — ${r.summary}`),
    '',
    '**Certifications:**',
    ...certifications.map(
      (c) => `- ${c.name} — ${c.status === 'earned' ? 'earned' : 'in progress'}`,
    ),
    '',
    // 4. H2 file lists. Every item is a markdown hyperlink.
    '## Pages',
    `- [Home](${url}): Overview, experience, projects and contact details.`,
    `- [Skills](${url}/skills): Every tool grouped by category, each with a note on where it was used in production.`,
    '',
  ]


  lines.push(
    '## Profiles',
    ...social.map((s) => `- [${s.label}](${s.href}): ${s.handle}`),
    `- [Email](mailto:${contact.email}): Direct contact.`,
    '',
    // Secondary material — agents may skip this section entirely.
    '## Optional',
    `- [Résumé (PDF)](${url}${contact.resume}): Full work history and education.`,
    `- [Sitemap](${url}/sitemap.xml): Every indexable URL on the site.`,
    '',
  )

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
