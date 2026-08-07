import { site } from '@/content/site'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'

/**
 * Measurable outcomes, kept separate from Experience (what the job was) and
 * Projects (what was built). Content lives in site.achievements.
 *
 * The section renders nothing at all when the array is empty, so unused
 * placeholder entries can simply be deleted from content/site.ts.
 */
export function Achievements({ index }: { index: string }) {
  const copy = site.sections.achievements
  const { achievements } = site
  if (achievements.length === 0) return null

  return (
    <Section
      id="achievements"
      index={index}
      label={copy.label}
      title={copy.title}
      intro={copy.intro}
    >
      <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
        {/* Keyed by index, not by title: this list is static and never reordered
            or filtered, and two entries in site.ts can legitimately share a
            title (the placeholders do). */}
        {achievements.map((item, i) => (
          <Reveal key={i} delay={i * 50} className="h-full bg-bg">
            <article className="flex h-full flex-col p-6 sm:p-7">
              <p className="font-mono text-xs text-accent">
                {String(i + 1).padStart(2, '0')}
              </p>

              <h3 className="mt-4 text-base font-semibold tracking-tight text-fg">{item.title}</h3>

              <p className="mt-3 flex-grow text-sm leading-relaxed text-fg-muted">
                {item.description}
              </p>

              <div className="mt-5 border-t border-line pt-4">
                <p className="font-mono text-[11px] tracking-[0.16em] text-fg-faint uppercase">
                  Impact
                </p>
                <p className="mt-2 text-sm leading-relaxed text-fg">{item.impact}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export default Achievements
