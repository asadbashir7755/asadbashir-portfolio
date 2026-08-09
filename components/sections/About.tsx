import { site } from '@/content/site'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'

/**
 * The portrait that used to sit in the right column is gone, replaced by a real
 * snippet of the OIDC workflow. For the audience this page is written for, a
 * config that provably removed static credentials from CI says more than a
 * photo does, and it removed a 9MB image and a half-empty column at the same
 * time.
 */
/**
 * `person.bio` is no longer rendered here. It still feeds the Person JSON-LD
 * description, but on the page it repeated what about.body already said, so
 * About ran to five paragraphs beside a code panel half its height.
 * about.body is now the single source for the visible copy.
 */
export function About({ index }: { index: string }) {
  const copy = site.sections.about
  const { about } = site

  return (
    <Section id="about" index={index} label={copy.label} title={copy.title}>
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
        <Reveal className="min-w-0 max-w-2xl space-y-5">
          {about.body.map((paragraph, i) => (
            <p key={`body-${i}`} className="text-base leading-relaxed text-fg-muted">
              {paragraph}
            </p>
          ))}
        </Reveal>

        {/* min-w-0 on both the grid item and the figure: grid children default
            to `min-width: auto`, so the wide <pre> below stretched the column
            and pushed the whole page past the viewport on mobile, clipping the
            bio text. Without this the overflow-x-auto never gets to do its job. */}
        <Reveal delay={80} className="min-w-0">
          <figure className="min-w-0 overflow-hidden rounded-xl border border-line bg-surface">
            <figcaption className="flex items-center gap-2 border-b border-line px-4 py-2.5">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#3a3a42]" aria-hidden="true" />
              <span className="truncate font-mono text-[11px] text-fg-faint">
                {about.snippet.filename}
              </span>
            </figcaption>

            {/* Scrolls inside itself rather than widening the page on mobile. */}
            <div className="overflow-x-auto">
              <pre className="p-4 font-mono text-[12px] leading-relaxed text-fg-muted sm:text-[13px]">
                <code>{about.snippet.code}</code>
              </pre>
            </div>

            <p className="border-t border-line px-4 py-3 text-[13px] leading-snug text-fg-faint">
              {about.snippet.caption}
            </p>
          </figure>
        </Reveal>
      </div>
    </Section>
  )
}

export default About
