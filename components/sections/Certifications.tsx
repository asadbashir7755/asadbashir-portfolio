import { site } from '@/content/site'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'

/**
 * Two-column card grid rather than full-width rows. As rows, each entry was a
 * short label on the left and a status pill pushed to the far right, with a
 * wide empty channel between them.
 */
export function Certifications({ index }: { index: string }) {
  const copy = site.sections.certifications
  return (
    <Section id="certifications" index={index} label={copy.label} title={copy.title}>
      <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
        {site.certifications.map((cert, i) => {
          // With an odd number of cards the trailing grid cell would be empty
          // and, because the container paints the hairlines, would read as a
          // blank bordered card. Let the final card span the full row instead.
          const isLoneLast = i === site.certifications.length - 1 && i % 2 === 0

          return (
          <Reveal
            key={i}
            delay={i * 30}
            className={`h-full bg-bg ${isLoneLast ? 'sm:col-span-2' : ''}`}
          >
            <div className="flex h-full flex-col gap-3 p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-sm leading-snug font-medium text-fg">
                  {cert.credentialUrl ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent"
                    >
                      {cert.name} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    cert.name
                  )}
                </h3>

                <span
                  className={`shrink-0 rounded border px-2 py-0.5 font-mono text-[10px] tracking-wide whitespace-nowrap uppercase ${
                    cert.status === 'earned'
                      ? 'border-line text-fg-faint'
                      : 'border-accent-line text-accent'
                  }`}
                >
                  {cert.status === 'earned' ? 'Earned' : 'In progress'}
                </span>
              </div>

              <p className="mt-auto text-[13px] leading-snug text-fg-faint">
                {cert.issuer}
                {cert.year ? <span className="text-fg-faint"> · {cert.year}</span> : null}
              </p>
            </div>
          </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

export default Certifications
