import fs from 'node:fs'
import path from 'node:path'
import type { Root, Element } from 'hast'

/**
 * Markdown images become plain <img> tags, so they bypass next/image entirely:
 * no lazy loading, and no intrinsic dimensions (which Lighthouse flags as
 * `unsized-images` and which risks layout shift as they load).
 *
 * This plugin fixes both at build time:
 *   - `loading="lazy"` + `decoding="async"` so below-the-fold images do not
 *     compete with the cover image for bandwidth
 *   - real width/height read off the file on disk
 *
 * It reads PNG/JPEG headers directly rather than pulling in an image library -
 * every asset in public/images is one of those two, and this keeps the
 * dependency list honest.
 */

const PUBLIC_DIR = path.join(process.cwd(), 'public')

/** Reads intrinsic dimensions from a PNG or JPEG header. Returns null if unreadable. */
function readImageSize(file: string): { width: number; height: number } | null {
  let fd: number | undefined
  try {
    fd = fs.openSync(file, 'r')
    const head = Buffer.alloc(32)
    fs.readSync(fd, head, 0, 32, 0)

    // PNG: 8-byte signature, then IHDR whose width/height are at bytes 16..24.
    if (head.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
      return { width: head.readUInt32BE(16), height: head.readUInt32BE(20) }
    }

    // JPEG: walk the segment markers looking for a SOFn frame header.
    if (head[0] === 0xff && head[1] === 0xd8) {
      const size = fs.fstatSync(fd).size
      const buf = Buffer.alloc(size)
      fs.readSync(fd, buf, 0, size, 0)

      let offset = 2
      while (offset < buf.length - 9) {
        if (buf[offset] !== 0xff) {
          offset++
          continue
        }
        const marker = buf[offset + 1]
        // SOF0-SOF3, SOF5-SOF7, SOF9-SOF11, SOF13-SOF15 carry the frame size.
        const isSof =
          marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)
        if (isSof) {
          return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) }
        }
        offset += 2 + buf.readUInt16BE(offset + 2)
      }
    }

    return null
  } catch {
    return null
  } finally {
    if (fd !== undefined) fs.closeSync(fd)
  }
}

/** Depth-first walk collecting every <img> element. */
function collectImages(node: Root | Element, out: Element[] = []): Element[] {
  const children = 'children' in node ? node.children : []
  for (const child of children) {
    if (child.type !== 'element') continue
    if (child.tagName === 'img') out.push(child)
    collectImages(child, out)
  }
  return out
}

export function rehypeImageAttrs() {
  return (tree: Root) => {
    for (const img of collectImages(tree)) {
      const props = (img.properties ??= {})

      // Markdown images are always below the cover image, which is the LCP
      // candidate and is rendered by next/image with priority.
      props.loading ??= 'lazy'
      props.decoding ??= 'async'

      const src = typeof props.src === 'string' ? props.src : null
      if (!src || !src.startsWith('/') || props.width) continue

      // Resolve inside public/ only, never follow the path outside it.
      const resolved = path.resolve(PUBLIC_DIR, '.' + src)
      if (!resolved.startsWith(PUBLIC_DIR)) continue

      const size = readImageSize(resolved)
      if (!size) continue

      props.width = size.width
      props.height = size.height
    }
  }
}

export default rehypeImageAttrs
