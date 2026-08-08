import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/content/site'
import Reveal from '@/components/ui/Reveal'
import SkillBands from '@/components/skills/SkillBands'
import JsonLd from '@/components/ui/JsonLd'
import { personSchema } from '@/lib/schema'

const title = 'Skills'
const description =
  'The full list of tools Asad Bashir works with across cloud, infrastructure as code, containers, CI/CD, security, databases and observability — each with a note on where it was actually used.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/skills' },
  openGraph: { type: 'website', title, description, url: '/skills' },
  twitter: { card: 'summary_large_image', title, description },
}

export default function SkillsPage() {
  const total = site.skills.reduce((n, c) => n + c.skills.length, 0)

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebPage',
              '@id': `${site.meta.url}/skills#page`,
              url: `${site.meta.url}/skills`,
              name: `${title} — ${site.person.name}`,
              description,
              inLanguage: 'en',
              about: { '@id': `${site.meta.url}/#person` },
            },
            personSchema(),
          ],
        }}
      />

      <div className="section-y-hero mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] text-fg-faint uppercase">
            <span className="text-accent">~/</span>
            <span className="ml-2">skills</span>
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-fg md:text-5xl">
            {site.sections.skills.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted">
            {site.sections.skills.intro}
          </p>
          <p className="mt-3 font-mono text-[13px] text-fg-faint">{total} tools, 8 categories</p>
        </Reveal>

        <div className="mt-14">
          <SkillBands categories={site.skills} headingLevel={2} />
        </div>

        <Reveal>
          <div className="mt-12 border-t border-line pt-8">
            <Link
              href="/#experience"
              className="font-mono text-sm text-fg-muted transition-colors hover:text-accent"
            >
              ← Back to experience
            </Link>
          </div>
        </Reveal>
      </div>
    </>
  )
}
