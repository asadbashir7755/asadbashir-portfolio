import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { site } from '@/content/site'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import RevealObserver from '@/components/ui/RevealObserver'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono-jb',
})

/**
 * Root metadata. `metadataBase` lets every child route use relative URLs for
 * canonical and OG images and have Next resolve them absolutely.
 *
 * `title.template` gives inner pages "Page — Asad Bashir" without repeating
 * the suffix in each route.
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.meta.url),
  title: {
    default: site.meta.title,
    template: `%s — ${site.meta.titleSuffix}`,
  },
  description: site.meta.description,
  keywords: site.meta.keywords,
  authors: [{ name: site.person.name, url: site.meta.url }],
  creator: site.person.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    siteName: site.meta.title,
    title: site.meta.title,
    description: site.meta.description,
    url: site.meta.url,
    locale: site.meta.locale,
    // og:image is injected by app/opengraph-image.tsx (file convention).
  },
  twitter: {
    card: 'summary_large_image',
    title: site.meta.title,
    description: site.meta.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#09090a',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        {/* Without JS the reveal elements would stay at opacity 0. */}
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  )
}
