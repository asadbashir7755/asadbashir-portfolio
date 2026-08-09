import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { site } from '@/content/site'

/**
 * One page per project. Everything rendered here comes from the `projects`
 * array in content/site.ts, so adding detail to a project is a content edit
 * and never a component edit.
 *
 * These exist because the homepage cards were carrying full descriptions and
 * twelve-item stack lists, which made the Projects grid several phone screens
 * tall on its own. The card now shows a one-line summary and links here.
 */
export function generateStaticParams() {
  return site.projects.map((p) => ({ slug: p.slug }))
}

type Params = { params: Promise<{ slug: string }> }

function findProject(slug: string) {
  return site.projects.find((p) => p.slug === slug) ?? null
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const project = findProject(slug)
  if (!project) return { title: 'Not found' }

  return {
    title: project.title,
    description: project.summary,
    keywords: project.stack,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: 'article',
      title: project.title,
      description: project.summary,
      url: `/projects/${project.slug}`,
    },
  }
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params
  const project = findProject(slug)
  if (!project) notFound()

  return (
    <article className="mx-auto max-w-3xl px-5 pt-32 pb-20 sm:px-8 md:pt-40">
      <nav aria-label="Breadcrumb" className="font-mono text-[13px] text-fg-faint">
        <Link href="/#projects" className="transition-colors hover:text-accent">
          ← Projects
        </Link>
      </nav>

      <header className="mt-8">
        <h1 className="text-3xl leading-tight font-semibold tracking-tight text-fg sm:text-4xl">
          {project.title}
        </h1>

        <p className="mt-5 text-base leading-relaxed text-fg-muted">{project.description}</p>

        <ul className="mt-7 flex flex-wrap gap-1.5">
          {project.stack.map((tech, i) => (
            <li
              key={i}
              className="rounded border border-line bg-surface px-2 py-0.5 font-mono text-[11px] text-fg-faint"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-5">
          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[13px] text-accent transition-opacity hover:opacity-80"
            >
              Source ↗
            </a>
          ) : (
            <span className="font-mono text-[13px] text-fg-faint">Private client repo</span>
          )}

          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[13px] text-accent transition-opacity hover:opacity-80"
            >
              Live ↗
            </a>
          ) : null}
        </div>
      </header>

      {project.details.length > 0 ? (
        <div className="mt-14 space-y-10">
          {project.details.map((section, i) => (
            <section key={i}>
              <h2 className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.body.map((para, pi) => (
                  <p key={pi} className="text-[15px] leading-relaxed text-fg-muted">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : null}

      <div className="mt-16 border-t border-line pt-8">
        <Link
          href="/#projects"
          className="font-mono text-sm text-fg-muted transition-colors hover:text-accent"
        >
          ← All projects
        </Link>
      </div>
    </article>
  )
}
