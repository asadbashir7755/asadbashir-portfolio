import { ImageResponse } from 'next/og'
import { site } from '@/content/site'

/**
 * Social card, generated at build time from content/site.ts rather than
 * maintained as a separate design file that drifts out of date.
 *
 * Uses system font stacks only — no remote font fetch, so the build stays
 * fast and works offline.
 */
export const alt = `${site.person.name} — ${site.person.title}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
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
          padding: '72px',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 26, color: '#f0b429' }}>
          <span>~/</span>
          <span style={{ color: '#6b6b73' }}>{new URL(site.meta.url).host}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 82, fontWeight: 700, color: '#ececee', letterSpacing: '-0.03em' }}>
            {site.person.name}
          </div>
          <div style={{ marginTop: 14, fontSize: 38, color: '#f0b429' }}>{site.person.title}</div>
          <div
            style={{
              marginTop: 26,
              fontSize: 27,
              color: '#9a9aa2',
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            {site.person.tagline}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 18, fontSize: 22, color: '#6b6b73' }}>
          {site.skills
            .slice(0, 5)
            .map((c) => c.label)
            .join('  ·  ')}
        </div>
      </div>
    ),
    size,
  )
}
