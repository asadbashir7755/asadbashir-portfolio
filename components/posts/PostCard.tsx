import Link from 'next/link'
import { formatDate, type PostMeta } from '@/lib/posts'

/**
 * Post card: deliberately image-free.
 *
 * The posts previously used AI-generated cover art (mangled type, stock
 * "glowing server rack" clipart, a blue/orange palette that fought the site).
 * It undercut the credibility of the writing it sat above. Instead of leaving
 * an obvious hole, the card leads with a monospace source-file line that ties
 * into the terminal motif used in the hero, so the treatment reads as
 * deliberate typography rather than a missing asset.
 *
 * Shared by the home-page Field Notes list, so a card only
 * ever looks one way.
 */
export function PostCard({
  post,
  headingLevel = 3,
}: {
  post: PostMeta
  /**
   * Heading level for the card title. Must not skip a level relative to its
   * container: 2 on the blog index (the h1 is the page title, no section
   * heading above the grid), 3 when nested under a section h2.
   */
  headingLevel?: 2 | 3
}) {
  const Heading = `h${headingLevel}` as const
  const visibleTags = post.tags.slice(0, 4)
  const overflow = post.tags.length - visibleTags.length

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-line-strong">
      {/* Accent rule that fills on hover, the card's only motion. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-accent/40 transition-colors duration-300 group-hover:bg-accent"
      />

      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
        <p className="truncate font-mono text-[11px] text-fg-faint">
          <span className="text-accent">$ </span>
          cat {post.slug}.md
        </p>
        <span className="shrink-0 rounded border border-line bg-raised px-1.5 py-0.5 font-mono text-[10px] tracking-wide text-accent uppercase">
          {post.category}
        </span>
      </div>

      <div className="flex flex-grow flex-col p-5">
        <Heading className="text-base leading-snug font-semibold tracking-tight text-fg">
          {/* Stretched link: the whole card is clickable, but only one link is
              exposed to assistive tech and the keyboard. */}
          <Link
            href={`/field-notes/${post.slug}`}
            className="transition-colors after:absolute after:inset-0 group-hover:text-accent"
          >
            {post.title}
          </Link>
        </Heading>

        <p className="mt-2.5 flex-grow text-sm leading-relaxed text-fg-muted">{post.description}</p>

        {visibleTags.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {visibleTags.map((tag, i) => (
              <li
                key={i}
                className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-fg-faint"
              >
                {tag}
              </li>
            ))}
            {overflow > 0 ? (
              <li className="px-1 py-0.5 font-mono text-[10px] text-fg-faint">+{overflow}</li>
            ) : null}
          </ul>
        ) : null}

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-3.5">
          <p className="font-mono text-[11px] text-fg-faint">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.readTime ? (
              <>
                <span aria-hidden="true"> · </span>
                {post.readTime}
              </>
            ) : null}
          </p>
          <span className="font-mono text-[13px] text-accent">Read →</span>
        </div>
      </div>
    </article>
  )
}

export default PostCard
