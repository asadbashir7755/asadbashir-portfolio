import 'server-only'

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import { rehypeImageAttrs } from '@/lib/rehype-image-attrs'
import type { Root } from 'hast'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

/**
 * Every post opens with an `# H1` repeating its own frontmatter title. The page
 * already renders that title as the document <h1>, so leaving it in produced
 * two stacked H1s with near-identical text: visually redundant, and an
 * invalid heading structure for screen readers and search engines.
 *
 * Drops the leading H1 only. Any other H1 later in the document is left alone.
 */
function stripLeadingH1() {
  return (tree: Root) => {
    const index = tree.children.findIndex((node) => node.type === 'element')
    if (index === -1) return

    const first = tree.children[index]
    if (first.type === 'element' && first.tagName === 'h1') {
      tree.children.splice(index, 1)
    }
  }
}

export interface PostFrontmatter {
  title: string
  date: string
  author: string
  description: string
  category: string
  tags: string[]
  readTime?: string
  featured?: boolean
}

export interface PostMeta extends PostFrontmatter {
  slug: string
}

export interface Post extends PostMeta {
  /** Rendered HTML. Produced at build time, ships zero markdown JS to the client. */
  html: string
}

/**
 * Markdown is rendered on the server at build time rather than in the browser.
 * That is the whole point of the Next.js migration: crawlers (and AI agents)
 * see the full article text in the initial HTML response, and the client
 * downloads no markdown parser at all.
 */
async function renderMarkdown(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    // `allowDangerousHtml` + rehypeRaw keeps inline HTML in the existing posts
    // working. These files are authored by us and are not user input.
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    // Must run before rehypeSlug so the removed H1 never claims an id.
    .use(stripLeadingH1)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      // hast expects a class list, not a single string.
      properties: { className: ['heading-anchor'] },
    })
    .use(rehypeHighlight, { detect: true, ignoreMissing: true })
    // Lazy-loads markdown images and stamps their intrinsic dimensions.
    .use(rehypeImageAttrs)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown)

  return String(file)
}

function readPostFile(slug: string) {
  const fullPath = path.join(POSTS_DIR, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null

  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)

  const frontmatter: PostFrontmatter = {
    title: String(data.title ?? slug),
    date: String(data.date ?? ''),
    author: String(data.author ?? ''),
    description: String(data.description ?? ''),
    category: String(data.category ?? 'General'),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readTime: data.readTime ? String(data.readTime) : undefined,
    featured: data.featured === true,
  }

  return { frontmatter, content }
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

/** All post metadata, newest first. Does not render markdown, cheap to call. */
export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const file = readPostFile(slug)
      return file ? { slug, ...file.frontmatter } : null
    })
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPost(slug: string): Promise<Post | null> {
  const file = readPostFile(slug)
  if (!file) return null

  const html = await renderMarkdown(file.content)
  return { slug, ...file.frontmatter, html }
}

/** Formats an ISO date for display. Falls back to the raw string if unparseable. */
export function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
