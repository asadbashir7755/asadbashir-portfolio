import { site } from '@/content/site'
import { getAllPosts } from '@/lib/blog'

/**
 * /llms.txt — a plain-text summary for AI crawlers and answer engines.
 *
 * Generated from content/site.ts rather than hand-maintained, so it cannot
 * drift out of sync with the rendered site. Kept deliberately short; this is
 * a nice-to-have, not the main SEO strategy.
 */
export const dynamic = 'force-static'

export function GET() {
  const { person, meta, contact, social, certifications, skills, experience, faq } = site

  const lines = [
    `# ${person.name}`,
    '',
    `> ${person.title}. ${person.tagline}`,
    '',
    ...person.bio,
    '',
    '## Contact',
    `- Website: ${meta.url}`,
    `- Email: ${contact.email}`,
    ...social.map((s) => `- ${s.label}: ${s.href}`),
    '',
    '## Core skills',
    ...skills.map((c) => `- ${c.label}: ${c.skills.map((s) => s.name).join(', ')}`),
    '',
    '## Experience',
    ...experience.map((r) => `- ${r.role}, ${r.company} (${r.period}) — ${r.summary}`),
    '',
    '## Certifications',
    ...certifications.map(
      (c) => `- ${c.name} (${c.status === 'earned' ? 'earned' : 'in progress'})`,
    ),
    '',
    '## Writing',
    ...getAllPosts().map((p) => `- [${p.title}](${meta.url}/blog/${p.slug}): ${p.description}`),
    '',
    '## FAQ',
    ...faq.flatMap((f) => [`Q: ${f.question}`, `A: ${f.answer}`, '']),
  ]

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
