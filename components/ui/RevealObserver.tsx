'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * One IntersectionObserver for every `.reveal` element on the page.
 *
 * Progressive enhancement only. `.reveal` renders at full opacity by default
 * (see globals.css); this component opts elements INTO the animation by
 * stamping `data-reveal="armed"`, and only for elements that are below the
 * fold at mount. Anything already on screen is left alone, so it can never
 * flash or sit faded waiting for the observer.
 *
 * If this component never runs, JS disabled, hydration error, print, every
 * element simply stays visible.
 */
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    // The CSS hidden state is already gated on this media query; bail out early
    // so we never touch the DOM when the user asked for reduced motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const candidates = document.querySelectorAll<HTMLElement>('.reveal:not([data-reveal])')
    const armed: HTMLElement[] = []

    for (const el of candidates) {
      // Only animate what the user cannot currently see. Arming an on-screen
      // element would hide it for a frame and read as a flicker.
      if (el.getBoundingClientRect().top <= window.innerHeight) continue
      el.dataset.reveal = 'armed'
      armed.push(el)
    }

    if (armed.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          el.dataset.visible = 'true'
          observer.unobserve(el)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )

    armed.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  return null
}

export default RevealObserver
