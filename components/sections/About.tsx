import Image from 'next/image'
import { site } from '@/content/site'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'

export function About({ index }: { index: string }) {
  const copy = site.sections.about
  const { person, about } = site

  return (
    <Section id="about" index={index} label={copy.label} title={copy.title}>
      <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-start md:gap-16">
        <Reveal className="max-w-2xl space-y-5">
          {person.bio.map((paragraph, i) => (
            <p key={`bio-${i}`} className="text-base leading-relaxed text-fg-muted">
              {paragraph}
            </p>
          ))}
          {about.body.map((paragraph, i) => (
            <p key={`body-${i}`} className="text-base leading-relaxed text-fg-muted">
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Reveal delay={80} className="order-first md:order-none">
          <div className="relative w-40 shrink-0 md:w-56">
            <div className="overflow-hidden rounded-xl border border-line bg-surface">
              <Image
                src={person.avatar.src}
                alt={person.avatar.alt}
                width={person.avatar.width}
                height={person.avatar.height}
                sizes="(min-width: 768px) 224px, 160px"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

export default About
