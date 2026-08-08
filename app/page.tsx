import type { Metadata } from 'next'
import { site } from '@/content/site'
import { homeGraph } from '@/lib/schema'
import JsonLd from '@/components/ui/JsonLd'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Certifications from '@/components/sections/Certifications'
import Faq from '@/components/sections/Faq'
import FieldNotes from '@/components/sections/FieldNotes'
import Contact from '@/components/sections/Contact'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  /**
   * Section numbers ("01 / ABOUT") are assigned here rather than hardcoded in
   * each component, because Field Notes hides itself when site.fieldNotes is
   * empty. Hardcoded numbers left a visible gap in the sequence as soon as a
   * section dropped out.
   *
   * Achievements is no longer rendered: it and the blog preview were both
   * "here is a piece of work worth reading about", so they are now one Field
   * Notes section. The component and site.achievements are kept in the repo,
   * unused, so the CVE write-up template in site.ts is not lost.
   */
  const next = (() => {
    let n = 0
    return () => String(++n).padStart(2, '0')
  })()

  const hasFieldNotes = site.fieldNotes.length > 0

  return (
    <>
      <JsonLd data={homeGraph()} />
      <Hero />
      <About index={next()} />
      <Skills index={next()} />
      <Experience index={next()} />
      <Projects index={next()} />
      <Certifications index={next()} />
      <Faq index={next()} />
      {hasFieldNotes ? <FieldNotes index={next()} /> : null}
      <Contact index={next()} />
    </>
  )
}
