import Link from 'next/link'
import { site } from '@/content/site'
import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import PostCard from '@/components/blog/PostCard'
import type { PostMeta } from '@/lib/blog'

export function Writing({ posts, index }: { posts: PostMeta[]; index: string }) {
  const copy = site.sections.writing
  if (posts.length === 0) return null

  return (
    <Section
      id="writing"
      index={index}
      label={copy.label}
      title={copy.title}
      intro={copy.intro}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 50} className="h-full">
            <PostCard post={post} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-10">
          <Link
            href="/blog"
            className="font-mono text-sm text-fg-muted transition-colors hover:text-accent"
          >
            All writing →
          </Link>
        </div>
      </Reveal>
    </Section>
  )
}

export default Writing
