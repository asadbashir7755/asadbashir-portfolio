import type { ReactNode } from 'react'
import Reveal from '@/components/ui/Reveal'

/**
 * Standard section shell: a monospace index label ("01 / SKILLS") above the
 * heading, hairline top rule, consistent vertical rhythm.
 *
 * Deliberately not the centered-heading-with-underline-bar pattern.
 */
export function Section({
  id,
  index,
  label,
  title,
  intro,
  children,
  className = '',
}: {
  id: string
  /** Two-digit section index, e.g. "02". */
  index: string
  /** Short uppercase label shown next to the index. */
  label: string
  title: string
  intro?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`border-t border-line py-16 md:py-24 ${className}`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] text-fg-faint uppercase">
            <span className="text-accent">{index}</span>
            <span className="mx-2 text-line-strong">/</span>
            {label}
          </p>
          <h2
            id={`${id}-heading`}
            className="mt-4 text-3xl font-semibold tracking-tight text-fg md:text-4xl"
          >
            {title}
          </h2>
          {intro ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted">{intro}</p>
          ) : null}
        </Reveal>

        <div className="mt-10 md:mt-12">{children}</div>
      </div>
    </section>
  )
}

export default Section
