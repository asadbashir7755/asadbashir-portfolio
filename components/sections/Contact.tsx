import { site } from '@/content/site'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'

export function Contact({ index }: { index: string }) {
  const copy = site.sections.contact
  const { contact, social } = site

  const channels = [
    { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { label: 'Phone', value: contact.phoneDisplay, href: `tel:${contact.phone}` },
    ...social.map((s) => ({ label: s.label, value: s.handle, href: s.href })),
  ]

  return (
    <Section id="contact" index={index} label={copy.label} title={copy.title}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal>
          <p className="max-w-md text-base leading-relaxed text-fg-muted">{contact.body}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              Send an email
            </a>
            <a
              href={contact.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-line-strong px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
            >
              Download résumé
            </a>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <dl className="divide-y divide-line border-y border-line font-mono text-sm">
            {channels.map((channel, i) => (
              <div key={i} className="flex items-baseline gap-6 py-4">
                <dt className="w-20 shrink-0 text-[11px] tracking-[0.16em] text-fg-faint uppercase">
                  {channel.label}
                </dt>
                <dd className="min-w-0">
                  <a
                    href={channel.href}
                    {...(channel.href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="break-all text-fg-muted transition-colors hover:text-accent"
                  >
                    {channel.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}

export default Contact
