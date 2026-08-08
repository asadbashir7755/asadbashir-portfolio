import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

/**
 * Response headers applied to every route.
 *
 * Note on CSP: this site is fully statically rendered, so we deliberately avoid
 * a per-request nonce (which would force dynamic rendering and cost us the
 * static-export performance profile). `'unsafe-inline'` is therefore required
 * for Next's hydration bootstrap script and its injected critical CSS. The
 * policy still blocks third-party script origins, framing, and object embeds,
 * which is where the practical risk sits for a static marketing site.
 *
 * Development needs two extra allowances, and ONLY in development:
 *   - 'unsafe-eval': React's development build uses eval() for debugging
 *     features such as reconstructing call stacks. React never uses eval()
 *     in production, so this is not shipped to the live site.
 *   - ws: / wss: in connect-src: Turbopack's hot-reload websocket.
 */
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
  : "script-src 'self' 'unsafe-inline'"

const connectSrc = isDev ? "connect-src 'self' ws: wss:" : "connect-src 'self'"

const csp = [
  "default-src 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  connectSrc,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  // Would break http://localhost in development.
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ')

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    formats: ['image/avif', 'image/webp'],
  },

  /**
   * Canonical host is the apex, committodeploy.dev (matches site.meta.url,
   * which drives canonical tags, og:url, sitemap and JSON-LD). Anything landing
   * on www is permanently redirected so the two hosts never split ranking
   * signals or serve duplicate content.
   */
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.committodeploy.dev' }],
        destination: 'https://committodeploy.dev/:path*',
        permanent: true,
      },
    ]
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },
}

export default nextConfig
