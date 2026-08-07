import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

/**
 * Scroll-reveal wrapper — a SERVER component.
 *
 * It only emits markup (`class="reveal"`). All the observing is done by a
 * single shared IntersectionObserver in <RevealObserver />, mounted once in
 * the root layout.
 *
 * This matters: the home page wraps ~50 elements in Reveal. Making each one a
 * client component with its own observer cost ~50 hydration roots and showed
 * up as 230ms of total blocking time. Rendering them on the server instead
 * ships no JS per element.
 *
 * Content is visible by default under `prefers-reduced-motion` and whenever
 * JS does not run (see .reveal in globals.css + the <noscript> in the layout),
 * so this can never permanently hide content.
 */
export function Reveal({
  children,
  as,
  delay = 0,
  className = '',
  ...rest
}: {
  children: ReactNode
  as?: ElementType
  /** Stagger in ms. Keep small — past ~200ms it reads as sluggish. */
  delay?: number
  className?: string
} & Omit<ComponentPropsWithoutRef<'div'>, 'className' | 'children'>) {
  const Tag = (as ?? 'div') as ElementType

  return (
    <Tag
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Reveal
