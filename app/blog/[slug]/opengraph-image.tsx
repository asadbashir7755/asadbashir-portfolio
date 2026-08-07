import { ImageResponse } from 'next/og'
import { getPost, getPostSlugs } from '@/lib/blog'
import { site } from '@/content/site'

/**
 * Per-post social card, generated at build time in the site's own design
 * language. This replaces the AI-generated cover art the posts used to carry.
 *
 * System font stacks only — no remote font fetch, so the build stays fast.
 */
export const alt = 'Article preview'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export default async function PostOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  const title = post?.title ?? 'Writing'
  const category = post?.category ?? ''
  const readTime = post?.readTime ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#09090a',
          padding: '68px',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 24 }}>
          <span style={{ color: '#f0b429' }}>$</span>
          <span style={{ color: '#83838c' }}>cat {slug}.md</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {category ? (
            <div
              style={{
                display: 'flex',
                fontSize: 22,
                color: '#f0b429',
                letterSpacing: 2,
                textTransform: 'uppercase',
                marginBottom: 20,
              }}
            >
              {category}
            </div>
          ) : null}

          <div
            style={{
              fontSize: title.length > 70 ? 54 : 66,
              fontWeight: 700,
              color: '#ececee',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 22,
            color: '#83838c',
            borderTop: '1px solid rgba(255,255,255,0.12)',
            paddingTop: 26,
          }}
        >
          <span style={{ color: '#ececee' }}>{site.person.name}</span>
          <span>
            {readTime ? `${readTime}  ·  ` : ''}
            {new URL(site.meta.url).host}
          </span>
        </div>
      </div>
    ),
    size,
  )
}
