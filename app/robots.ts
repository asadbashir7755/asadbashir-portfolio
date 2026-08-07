import type { MetadataRoute } from 'next'
import { site } from '@/content/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Next's build artefacts have no business being crawled.
        disallow: ['/_next/static/chunks/'],
      },
    ],
    sitemap: `${site.meta.url}/sitemap.xml`,
    host: site.meta.url,
  }
}
