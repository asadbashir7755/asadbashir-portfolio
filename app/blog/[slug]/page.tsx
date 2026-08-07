import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatDate, getAllPosts, getPost, getPostSlugs } from '@/lib/blog'
import { postGraph } from '@/lib/schema'
import { site } from '@/content/site'
import JsonLd from '@/components/ui/JsonLd'
import PostCard from '@/components/blog/PostCard'

/** Pre-renders every post at build time — each one ships as static HTML. */
export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) return { title: 'Not found' }

  const url = `/blog/${post.slug}`

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      authors: [site.person.name],
      tags: post.tags,
      // og:image comes from the generated opengraph-image.tsx in this segment.
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  // Simple "more reading" rail: same category first, then anything else.
  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3)

  return (
    <>
      <JsonLd data={postGraph(post)} />

      <article className="mx-auto max-w-3xl px-5 pt-32 pb-20 sm:px-8 md:pt-40">
        <nav aria-label="Breadcrumb" className="font-mono text-[13px] text-fg-faint">
          <Link href="/blog" className="transition-colors hover:text-accent">
            ← Writing
          </Link>
        </nav>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-fg-faint">
            <span className="text-accent">{post.category}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.readTime ? (
              <>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
              </>
            ) : null}
          </div>

          <h1 className="mt-5 text-3xl leading-[1.15] font-semibold tracking-[-0.02em] text-fg sm:text-[2.6rem]">
            {post.title}
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-fg-muted">{post.description}</p>

          {post.tags.length > 0 ? (
            <ul className="mt-7 flex flex-wrap gap-1.5">
              {post.tags.map((tag, ti) => (
                <li
                  key={ti}
                  className="rounded border border-line bg-surface px-2 py-0.5 font-mono text-[11px] text-fg-faint"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </header>

        {/* Replaces the old AI-generated cover image: a source-file line that
            matches the terminal motif and actually tells you something. */}
        <p className="mt-10 truncate rounded-lg border border-line bg-surface px-4 py-2.5 font-mono text-xs text-fg-faint">
          <span className="text-accent">$ </span>
          cat content/posts/{post.slug}.md
        </p>

        {/* Rendered server-side at build time — no markdown parser in the client bundle. */}
        <div
          className="prose prose-tech mt-12 max-w-none prose-headings:font-semibold prose-h2:mt-12 prose-h2:text-2xl prose-h3:mt-8 prose-h3:text-lg"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <footer className="mt-16 border-t border-line pt-8">
          <p className="text-sm text-fg-muted">
            Written by{' '}
            {/* Underlined, not colour-only: links inside a text block need a
                non-colour affordance to pass WCAG 1.4.1 (axe link-in-text-block). */}
            <Link href="/#about" className="text-accent underline underline-offset-4">
              {post.author || site.person.name}
            </Link>
            . Questions or corrections —{' '}
            <a
              href={`mailto:${site.contact.email}`}
              className="text-accent underline underline-offset-4"
            >
              email me
            </a>
            .
          </p>
        </footer>
      </article>

      {related.length > 0 ? (
        <section aria-labelledby="related-heading" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <h2
              id="related-heading"
              className="font-mono text-xs tracking-[0.2em] text-fg-faint uppercase"
            >
              {site.blog.relatedHeading}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
