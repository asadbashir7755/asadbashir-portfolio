import type { Metadata } from 'next'
import { site } from '@/content/site'
import { getAllPosts } from '@/lib/blog'
import { homeGraph } from '@/lib/schema'
import JsonLd from '@/components/ui/JsonLd'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Achievements from '@/components/sections/Achievements'
import Certifications from '@/components/sections/Certifications'
import Faq from '@/components/sections/Faq'
import Writing from '@/components/sections/Writing'
import Contact from '@/components/sections/Contact'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3)

  /**
   * Section numbers ("01 / ABOUT") are assigned here rather than hardcoded in
   * each component, because two sections hide themselves when they have no
   * content: Achievements when `site.achievements` is empty, and Writing when
   * there are no posts. Hardcoded numbers left visible gaps in the sequence
   * (04 → 06) as soon as one dropped out.
   */
  const next = (() => {
    let n = 0
    return () => String(++n).padStart(2, '0')
  })()

  const hasAchievements = site.achievements.length > 0
  const hasPosts = posts.length > 0

  return (
    <>
      <JsonLd data={homeGraph()} />
      <Hero />
      <About index={next()} />
      <Skills index={next()} />
      <Experience index={next()} />
      <Projects index={next()} />
      {hasAchievements ? <Achievements index={next()} /> : null}
      <Certifications index={next()} />
      <Faq index={next()} />
      {hasPosts ? <Writing posts={posts} index={next()} /> : null}
      <Contact index={next()} />
    </>
  )
}
