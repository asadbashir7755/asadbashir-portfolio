import { Fragment } from 'react'
import { site } from '@/content/site'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'

/**
 * Categorized skills, laid out as full-width bands with a label gutter —
 * deliberately the same shape as the Experience section, so the two read as
 * one system.
 *
 * Layout history, because this is the fourth attempt and the reason matters:
 *   1. Equal-height 3-col grid — rows sized to the tallest cell, leaving a
 *      screen of dead space beside the short categories.
 *   2. CSS multi-column — `break-inside-avoid` on the tall Cloud block pushed
 *      content around and left a column visibly empty.
 *   3. Bordered cards on `items-start`, Cloud spanning two rows — better, but
 *      still a field of ragged boxes with holes between them.
 *   4. Current — each category is a full-width band. A band is only ever as
 *      tall as its own content, so uneven category sizes cannot produce voids.
 *      Within a band the skills flow in a 2/3-column grid, which stays dense
 *      because individual entries are all about the same height.
 *
 * `skill.group` renders a light sub-heading inside a band. Used in Cloud to
 * separate AWS / Hetzner / RunPod, showing multi-cloud experience without
 * promoting each provider to its own category.
 */
export function Skills({ index }: { index: string }) {
  const copy = site.sections.skills

  return (
    <Section id="skills" index={index} label={copy.label} title={copy.title} intro={copy.intro}>
      <ul>
        {site.skills.map((category, i) => (
          <Reveal
            as="li"
            key={category.id}
            delay={i * 40}
            className="border-t border-line py-8 first:border-t-0 first:pt-0 last:pb-0"
          >
            <div className="grid gap-x-10 gap-y-5 md:grid-cols-[11rem_1fr]">
              <h3 className="font-mono text-xs tracking-[0.16em] text-accent uppercase md:pt-0.5">
                {category.label}
              </h3>

              <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                {category.skills.map((skill, si) => {
                  const previous = category.skills[si - 1]
                  const startsGroup = skill.group && skill.group !== previous?.group

                  return (
                    <Fragment key={si}>
                      {/* col-span-full closes the current row, so the group
                          label gets its own line and the next skill starts
                          back at column 1. Nesting it inside the first skill
                          instead pushed that one cell down and left the rest
                          of the row misaligned. */}
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
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}

export default Skills
