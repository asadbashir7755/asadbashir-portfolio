import { site } from '@/content/site'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'

/**
 * Native <details>/<summary> — no client JS, keyboard-accessible for free,
 * and the answer text is in the DOM whether or not the item is open, so
 * crawlers and AI search index all of it.
 *
 * The same array feeds FAQPage structured data via lib/schema.ts.
 */
export function Faq({ index }: { index: string }) {
  const copy = site.sections.faq
  return (
    <Section
      id="faq"
      index={index}
      label={copy.label}
      title={copy.title}
      intro={copy.intro}
    >
      <div className="max-w-3xl divide-y divide-line border-y border-line">
        {site.faq.map((item, i) => (
          <Reveal key={i} delay={i * 25}>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-start gap-4 py-4 text-left transition-colors hover:bg-surface/60 [&::-webkit-details-marker]:hidden">
                <span
                  className="mt-0.5 shrink-0 font-mono text-xs text-accent transition-transform duration-200 group-open:rotate-90"
                  aria-hidden="true"
                >
                  ▸
                </span>
                <h3 className="text-sm font-medium text-fg transition-colors group-hover:text-accent sm:text-[15px]">
                  {item.question}
                </h3>
              </summary>
              <p className="pb-5 pl-8 text-sm leading-relaxed text-fg-muted">{item.answer}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export default Faq
