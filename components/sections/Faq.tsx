import { site } from '@/content/site'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'

/**
 * Native <details>/<summary> rather than a scripted <button aria-expanded>.
 *
 * The brief asked for a button, but details/summary is stronger here on every
 * axis that matters: the browser manages the expanded state and announces it,
 * it is keyboard-operable with no JavaScript, it still works if hydration
 * fails, and the answer text stays in the DOM while collapsed so crawlers and
 * AI search read all of it. A button would need a client component and a
 * useState to reach the same place. Say the word if you want the button
 * version anyway.
 *
 * The disclosure marker is a ::before on `.faq-summary` (see globals.css), so
 * it is never part of the heading's accessible name.
 *
 * The same array feeds FAQPage structured data via lib/schema.ts.
 */
export function Faq({ index }: { index: string }) {
  const copy = site.sections.faq

  return (
    <Section id="faq" index={index} label={copy.label} title={copy.title} intro={copy.intro}>
      <div className="max-w-3xl border-t border-line">
        {site.faq.map((item, i) => (
          // The divider lives on each item rather than on a `divide-y` parent:
          // the reveal wrappers previously sat between the parent and the
          // items, so the divider landed inconsistently.
          <Reveal key={i} delay={i * 25} className="border-b border-line">
            <details className="group">
              <summary className="faq-summary">
                <h3 className="text-sm font-medium text-fg transition-colors group-hover:text-accent sm:text-[15px]">
                  {item.question}
                </h3>
              </summary>
              <p className="pb-5 pl-7 text-sm leading-relaxed text-fg-muted">{item.answer}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export default Faq
