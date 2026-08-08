import { Fragment } from 'react'
import type { SkillCategory } from '@/content/site'
import Reveal from '@/components/ui/Reveal'

/**
 * The skills band layout, shared by the homepage summary and the full /skills
 * page so the two can never drift apart visually.
 *
 * Each category is a full-width band with a label gutter — the same shape as
 * the Experience section. A band is only ever as tall as its own content, so
 * categories of wildly different sizes (Cloud has 12 entries, CI/CD has 4)
 * cannot leave the voids that a fixed column grid produced.
 *
 * `limit` caps how many skills each band shows; the homepage passes a number,
 * /skills passes nothing.
 */
export function SkillBands({
  categories,
  limit,
  headingLevel = 3,
}: {
  categories: SkillCategory[]
  limit?: number
  /**
   * Category heading level. Must not skip relative to its container: 2 on
   * /skills (the page h1 is directly above, no section heading between), 3 on
   * the homepage where the Section already renders an h2.
   */
  headingLevel?: 2 | 3
}) {
  const Heading = `h${headingLevel}` as const

  return (
    <ul>
      {categories.map((category, i) => {
        const shown = limit ? category.skills.slice(0, limit) : category.skills
        const hidden = category.skills.length - shown.length

        return (
          <Reveal
            as="li"
            key={category.id}
            delay={i * 40}
            className="border-t border-line py-8 first:border-t-0 first:pt-0 last:pb-0"
          >
            <div className="grid gap-x-10 gap-y-5 md:grid-cols-[11rem_1fr]">
              <Heading className="font-mono text-xs tracking-[0.16em] text-accent uppercase md:pt-0.5">
                {category.label}
              </Heading>

              <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((skill, si) => {
                  const previous = shown[si - 1]
                  const startsGroup = skill.group && skill.group !== previous?.group

                  return (
                    <Fragment key={si}>
                      {/* col-span-full closes the current row, so the group
                          label gets its own line and the next skill starts back
                          at column 1. Nesting it inside the first skill pushed
                          that one cell down and misaligned the rest of the row. */}
                      {startsGroup ? (
                        <p
                          className={`col-span-full font-mono text-[10px] tracking-[0.18em] text-fg-faint uppercase ${
                            si > 0 ? 'mt-3' : ''
                          }`}
                        >
                          {skill.group}
                        </p>
                      ) : null}

                      <div>
                        <p className="text-sm font-medium text-fg">{skill.name}</p>
                        {skill.note ? (
                          <p className="mt-0.5 text-[13px] leading-snug text-fg-faint">
                            {skill.note}
                          </p>
                        ) : null}
                      </div>
                    </Fragment>
                  )
                })}

                {hidden > 0 ? (
                  <p className="col-span-full font-mono text-[13px] text-fg-faint">
                    +{hidden} more
                  </p>
                ) : null}
              </div>
            </div>
          </Reveal>
        )
      })}
    </ul>
  )
}

export default SkillBands
