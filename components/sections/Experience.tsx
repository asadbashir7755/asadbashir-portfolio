import { site } from '@/content/site'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'

/**
 * Vertical rail rather than cards. Dates sit in a monospace gutter so the eye
 * can scan chronology without reading every bullet.
 *
 * Spacing note: the separator and bottom padding live on the <li> itself.
 * They were previously on an inner <div> that was the only child of the li,
 * so `last:pb-0` matched every entry and collapsed the gap between all roles.
 */
export function Experience({ index }: { index: string }) {
  const copy = site.sections.experience
  return (
    <Section id="experience" index={index} label={copy.label} title={copy.title}>
      <ol>
        {site.experience.map((role, i) => (
          <Reveal
            as="li"
            key={`${role.company}-${role.startDate}`}
            delay={i * 50}
            className="border-t border-line pt-8 pb-12 first:border-t-0 first:pt-0 last:pb-0"
          >
            <div className="grid gap-x-10 gap-y-4 md:grid-cols-[10rem_1fr]">
              {/* Date gutter. On mobile it sits above the role as an eyebrow. */}
              <p className="font-mono text-xs tracking-wide text-accent md:pt-1 md:text-fg-faint">
                {role.period}
              </p>

              <div>
                <h3 className="text-lg font-semibold tracking-tight text-fg">
                  {role.role}
                  <span className="text-fg-faint"> · </span>
                  <span className="text-accent">{role.company}</span>
                </h3>

                <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-fg-muted">
                  {role.summary}
                </p>

                <ul className="mt-6 space-y-3">
                  {role.highlights.map((point, pi) => (
                    <li key={pi} className="flex gap-3.5 text-sm leading-relaxed text-fg-muted">
                      <span
                        className="mt-2.5 h-px w-3 shrink-0 bg-accent-line"
                        aria-hidden="true"
                      />
                      <span className="max-w-2xl">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}

export default Experience
