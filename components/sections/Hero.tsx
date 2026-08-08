import Link from 'next/link'
import { site } from '@/content/site'

/**
 * Above the fold, everything is readable on first paint. No per-character
 * typewriter, no delayed reveals — the only motion is the terminal cursor.
 * Text that arrives three seconds late is text most visitors never read.
 */
export function Hero() {
  const { person, hero, social } = site

  return (
    <section className="section-y-hero relative overflow-hidden">
      <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-xs text-fg-muted">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-live opacity-70" />
            </span>
            Available for DevOps &amp; platform roles
          </p>

          <h1 className="mt-7 text-[2.6rem] leading-[1.05] font-semibold tracking-[-0.03em] text-fg sm:text-6xl">
            {person.name}
          </h1>

          <p className="mt-4 font-mono text-base text-accent sm:text-lg">{person.title}</p>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted text-balance">
            {person.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href={hero.primaryCta.href}
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="rounded-md border border-line-strong px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>

          <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2">
            {social.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[13px] text-fg-faint transition-colors hover:text-accent"
                >
                  {s.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Terminal panel. Static content rendered from site.hero.output —
            it is a layout device, not a fake interactive shell. */}
        <div className="relative">
          <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black/40">
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a42]" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a42]" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a42]" aria-hidden="true" />
              <span className="ml-2 font-mono text-[11px] tracking-wide text-fg-faint">
                {new URL(site.meta.url).host}
              </span>
            </div>

            <div className="p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
              <p className="text-fg">
                <span className="text-accent" aria-hidden="true">
                  ${' '}
                </span>
                {hero.command}
              </p>

              <dl className="mt-4 space-y-2">
                {hero.output.map((line) => (
                  <div key={line.key} className="flex gap-3">
                    <dt className="w-[5.5rem] shrink-0 text-fg-faint">{line.key}</dt>
                    <dd className="text-fg-muted">{line.value}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-4 text-fg" aria-hidden="true">
                <span className="text-accent">$ </span>
                <span className="cursor-blink">_</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
