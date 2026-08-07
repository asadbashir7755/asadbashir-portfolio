import type { Metadata } from 'next'
import { site } from '@/content/site'
import { getAllPosts } from '@/lib/blog'
import { blogIndexGraph } from '@/lib/schema'
import JsonLd from '@/components/ui/JsonLd'
import Reveal from '@/components/ui/Reveal'
import PostCard from '@/components/blog/PostCard'

const { title, description } = site.blog

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    title,
    description,
    url: '/blog',
  },
  twitter: { card: 'summary_large_image', title, description },
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <>
      <JsonLd data={blogIndexGraph(posts)} />

      <div className="mx-auto max-w-6xl px-5 pt-32 pb-24 sm:px-8 md:pt-40">
        <Reveal>
          {/* Matches the "01 / SKILLS" eyebrow on the home page, but as a path
              rather than an index — this page is not part of that sequence. */}
          <p className="font-mono text-xs tracking-[0.2em] text-fg-faint uppercase">
            <span className="text-accent">~/</span>
            <span className="ml-2">{site.blog.eyebrow}</span>
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-fg md:text-5xl">
            {site.sections.writing.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted">{description}</p>
        </Reveal>

        {posts.length > 0 ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 50} className="h-full">
                {/* h2 because there is no section heading between it and the page h1. */}
                <PostCard post={post} headingLevel={2} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-14 font-mono text-sm text-fg-faint">{site.blog.emptyState}</p>
        )}
      </div>
    </>
  )
}
