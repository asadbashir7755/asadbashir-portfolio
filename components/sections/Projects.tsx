import Link from 'next/link'
import { site } from '@/content/site'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'

/**
 * Projects shown on the homepage. Six cards stack to six full screens on a
 * phone; four covers all the infrastructure work and drops only the two
 * weakest for a DevOps reader (Ansible provisioning and the full-stack rental
 * platform), both of which are still linked from GitHub.
 */
const MAX_PROJECTS = 4

/** Stack chips per card. The rest are summarised as "+n". */
const MAX_STACK = 5

export function Projects({ index }: { index: string }) {
  const copy = site.sections.projects
  const shown = site.projects.slice(0, MAX_PROJECTS)
  const hidden = site.projects.length - shown.length

  return (
    <Section
      id="projects"
      index={index}
      label={copy.label}
      title={copy.title}
      intro={copy.intro}
    >
      <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
        {shown.map((project, i) => (
          <Reveal key={project.slug} delay={i * 40} className="h-full bg-bg">
            <article className="flex h-full flex-col p-6 transition-colors hover:bg-surface sm:p-7">
              <h3 className="text-base font-semibold tracking-tight text-fg">{project.title}</h3>

              <p className="mt-3 flex-grow text-sm leading-relaxed text-fg-muted">
                {project.summary}
              </p>

              {/* Capped: the ECS entry carries twelve technologies, which on a
                  phone wrapped to four rows and made one card taller than the
                  rest of the grid. The full list is on the detail page. */}
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {project.stack.slice(0, MAX_STACK).map((tech, ti) => (
                  <li
                    key={ti}
                    className="rounded border border-line bg-surface px-2 py-0.5 font-mono text-[11px] text-fg-faint"
                  >
                    {tech}
                  </li>
                ))}
                {project.stack.length > MAX_STACK ? (
                  <li className="px-1 py-0.5 font-mono text-[11px] text-fg-faint">
                    +{project.stack.length - MAX_STACK}
                  </li>
                ) : null}
              </ul>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4">
                <Link
                  href={`/projects/${project.slug}`}
                  className="font-mono text-[13px] text-accent transition-opacity hover:opacity-80"
                >
                  Read more →
                </Link>

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

      {hidden > 0 ? (
        <Reveal>
          <div className="mt-8">
            <a
              href={site.social[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-accent transition-opacity hover:opacity-80"
            >
              More on GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Reveal>
      ) : null}
    </Section>
  )
}

export default Projects
