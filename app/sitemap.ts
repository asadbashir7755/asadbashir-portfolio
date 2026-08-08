import type { MetadataRoute } from 'next'
import { site } from '@/content/site'

/**
 * Generated at build time from the same content the pages render.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: site.meta.url,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${site.meta.url}/skills`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]


  return staticRoutes
}
