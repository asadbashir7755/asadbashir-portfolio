import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-5 py-32 sm:px-8">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
        No route to host
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-fg-muted">
        That page does not exist. It may have been renamed, or the link that sent you here is out of
        date.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
        >
          Back home
        </Link>
        <Link
          href="/blog"
          className="rounded-md border border-line-strong px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
        >
          Read the writing
        </Link>
      </div>
    </div>
  )
}
