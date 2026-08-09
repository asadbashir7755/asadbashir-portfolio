import { site } from '@/content/site'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import PostCard from '@/components/posts/PostCard'
import type { PostMeta } from '@/lib/posts'

/**
 * Self-hosted write-ups. Posts are markdown files in content/posts, read at
 * build time by lib/posts.ts, so adding one is a matter of dropping in a new
 * .md file with frontmatter. Nothing in this component needs touching.
 *
 * The grid tracks the post count rather than always using three columns: the
 * container paints the hairlines, so a single post in a 3-col grid rendered as
 * a third-width card beside two empty bordered cells.
 */
export function FieldNotes({ posts, index }: { posts: PostMeta[]; index: string }) {
  const copy = site.sections.fieldNotes
  if (posts.length === 0) return null

  const columns =
    posts.length === 1
      ? 'sm:max-w-xl'
      : posts.length === 2
        ? 'sm:grid-cols-2'
        : 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <Section
      id="field-notes"
      index={index}
      label={copy.label}
      title={copy.title}
      intro={copy.intro}
    >
      <div className={`grid gap-6 ${columns}`}>
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 50} className="h-full">
            <PostCard post={post} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export default FieldNotes
