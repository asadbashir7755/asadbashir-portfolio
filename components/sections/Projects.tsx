import Link from 'next/link'
import { site } from '@/content/site'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'

export function Projects({ index }: { index: string }) {
  const copy = site.sections.projects
  return (
    <Section
      id="projects"
      index={index}
      label={copy.label}
      title={copy.title}
      intro={copy.intro}
    >
      <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
        {site.projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 40} className="h-full bg-bg">
            <article className="flex h-full flex-col p-6 transition-colors hover:bg-surface sm:p-7">
              <h3 className="text-base font-semibold tracking-tight text-fg">{project.title}</h3>

              <p className="mt-3 flex-grow text-sm leading-relaxed text-fg-muted">
                {project.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {project.stack.map((tech, ti) => (
                  <li
                    key={ti}
                    className="rounded border border-line bg-surface px-2 py-0.5 font-mono text-[11px] text-fg-faint"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4">
                {project.repo ? (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[13px] text-fg-muted transition-colors hover:text-accent"
                  >
                    Source <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="font-mono text-[13px] text-fg-faint">Private client repo</span>
                )}

                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[13px] text-fg-muted transition-colors hover:text-accent"
                  >
                    Live <span aria-hidden="true">↗</span>
                  </a>
                ) : null}

                {project.writeup ? (
                  <Link
                    href={project.writeup}
                    className="font-mono text-[13px] text-accent transition-opacity hover:opacity-80"
                  >
                    Write-up →
                  </Link>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export default Projects
