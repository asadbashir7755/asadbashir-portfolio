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
/**
 * Chips per category on the homepage. Cloud carries fourteen entries, which
 * wrapped to several rows and made this section taller than the rest.
 *
 * Seven rather than eight because the overflow marker sits inline at the end of
 * the row: at eight, Cloud pushed it onto a line of its own where a bare "+4"
 * read as a rendering fault rather than a control. It is now a "more" link to
 * that category on /skills.
 */
const MAX_PER_CATEGORY = 7

export function Skills({ index }: { index: string }) {
  const copy = site.sections.skills

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
                {category.skills.slice(0, MAX_PER_CATEGORY).map((skill, si) => (
                  <li
                    key={si}
                    className="rounded border border-line bg-surface px-2 py-1 text-[13px] text-fg-muted"
                  >
                    {skill.name}
                  </li>
                ))}
                {category.skills.length > MAX_PER_CATEGORY ? (
                  <li>
                    <Link
                      href={`/skills#${category.id}`}
                      className="inline-block rounded border border-line-strong px-2 py-1 text-[13px] text-accent transition-opacity hover:opacity-80"
                    >
                      more
                    </Link>
                  </li>
                ) : null}
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
            Every tool, with where each was used →
          </Link>
        </div>
      </Reveal>
    </Section>
  )
}

export default Skills
