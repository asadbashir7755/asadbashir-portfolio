import { site } from '@/content/site'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'

/**
 * Combines what used to be two things: the blog preview and the achievements
 * list. Both were saying "here is a piece of work worth reading about", and
 * the blog half was rendering an empty state because there was nothing to show.
 *
 * Cards link straight out to Medium rather than to a local route, so there is
 * no /blog surface to keep alive. Content lives in site.fieldNotes; the section
 * hides itself when that array is empty, so unfinished entries can just be
 * deleted rather than left to reach the live site.
 */
export function FieldNotes({ index }: { index: string }) {
  const copy = site.sections.fieldNotes
  const { fieldNotes } = site
  if (fieldNotes.length === 0) return null

  return (
    <Section
      id="field-notes"
      index={index}
      label={copy.label}
      title={copy.title}
      intro={copy.intro}
    >
      <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
        {/* Keyed by index: this list is static, never reordered or filtered,
            and the placeholder entries can legitimately share a title. */}
        {fieldNotes.map((note, i) => (
          <Reveal key={i} delay={i * 50} className="h-full bg-bg">
            <article className="flex h-full flex-col p-6 sm:p-7">
              <p className="font-mono text-xs text-accent">
                {String(i + 1).padStart(2, '0')}
              </p>

              <h3 className="mt-4 text-base font-semibold tracking-tight text-fg">
                {note.title}
              </h3>

              <p className="mt-3 flex-grow text-sm leading-relaxed text-fg-muted">
                {note.description}
              </p>

              <div className="mt-6">
                <a
                  href={note.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[13px] text-accent transition-opacity hover:opacity-80"
                >
                  Read more <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export default FieldNotes
