import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { getAllPosts } from '@/lib/blog'

/**
 * Generated at build time from the same content the pages render, so a new
 * post is in the sitemap the moment it exists — no manual list to forget.
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
      url: `${site.meta.url}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${site.meta.url}/skills`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => {
    const parsed = new Date(post.date)
    return {
      url: `${site.meta.url}/blog/${post.slug}`,
      lastModified: Number.isNaN(parsed.getTime()) ? now : parsed,
      changeFrequency: 'yearly',
      priority: 0.6,
    }
  })

  return [...staticRoutes, ...postRoutes]
}
