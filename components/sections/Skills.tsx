import Link from 'next/link'
import { site } from '@/content/site'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'

/**
 * Homepage skills summary, chips only, no per-skill notes.
 *
 * The annotated band layout is right for /skills but wrong for the homepage:
 * its inner grid collapses to a single column on mobile, so eight categories
 * of six annotated entries became ~48 stacked rows and roughly four phone
 * screens of scrolling on its own.
 *
 * Chips wrap instead of stacking, so the same information costs two or three
 * lines per category at any width. The full annotated list, which is the part
 * that proves depth, lives one click away on /skills.
 */
export function Skills({ index }: { index: string }) {
  const copy = site.sections.skills
  const total = site.skills.reduce((n, c) => n + c.skills.length, 0)

  return (
    <Section id="skills" index={index} label={copy.label} title={copy.title}>
      <ul className="space-y-6">
        {site.skills.map((category, i) => (
          <Reveal as="li" key={category.id} delay={i * 30}>
            <div className="grid gap-x-8 gap-y-2.5 md:grid-cols-[11rem_1fr]">
              <h3 className="font-mono text-xs tracking-[0.16em] text-accent uppercase md:pt-1">
                {category.label}
              </h3>

              <ul className="flex flex-wrap gap-1.5">
                {category.skills.map((skill, si) => (
                  <li
                    key={si}
                    className="rounded border border-line bg-surface px-2 py-1 text-[13px] text-fg-muted"
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal>
        <div className="mt-8 border-t border-line pt-6">
          <Link
            href="/skills"
            className="font-mono text-sm text-accent transition-opacity hover:opacity-80"
          >
            All {total} tools, with where each was used →
          </Link>
        </div>
      </Reveal>
    </Section>
  )
}

export default Skills
