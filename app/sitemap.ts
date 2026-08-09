import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { getAllPosts } from '@/lib/posts'

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


  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => {
    const parsed = new Date(post.date)
    return {
      url: `${site.meta.url}/field-notes/${post.slug}`,
      lastModified: Number.isNaN(parsed.getTime()) ? now : parsed,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    }
  })

  const projectRoutes: MetadataRoute.Sitemap = site.projects.map((project) => ({
    url: `${site.meta.url}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...postRoutes, ...projectRoutes]
}
