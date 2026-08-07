import Link from 'next/link'
import { site } from '@/content/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-sm text-fg">
              <span className="text-accent">~/</span>
              {site.person.name.toLowerCase().replace(/\s+/g, '')}
            </p>
            <p className="mt-1.5 text-sm text-fg-faint">
              © {year} {site.person.name}. Built with Next.js, deployed on Vercel.
            </p>
          </div>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {site.social.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[13px] text-fg-muted transition-colors hover:text-accent"
                >
                  {s.label} ↗
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/blog"
                className="font-mono text-[13px] text-fg-muted transition-colors hover:text-accent"
              >
                Writing
              </Link>
            </li>
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="font-mono text-[13px] text-fg-muted transition-colors hover:text-accent"
              >
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
