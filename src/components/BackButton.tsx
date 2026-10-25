'use client'

import { useEffect, useRef, type MouseEvent } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

// The homepage has its own navbar, so it doesn't get a back button
const HIDDEN_ON = new Set(['/'])

// Where "Back" goes when there is no in-site history: one level up, e.g. /blog/post -> /blog
function parentPath(pathname: string) {
  const segments = pathname.split('/').filter(Boolean)
  return segments.length > 1 ? `/${segments.slice(0, -1).join('/')}` : '/'
}

export function BackButton() {
  const pathname = usePathname()
  const router = useRouter()

  // Lives in the root layout, so it survives client-side navigation and can tell
  // whether the visitor has moved between pages on this site in this session
  const initialPath = useRef(pathname)
  const hasNavigated = useRef(false)

  useEffect(() => {
    if (pathname !== initialPath.current) hasNavigated.current = true
  }, [pathname])

  if (HIDDEN_ON.has(pathname)) return null

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Behave like the browser's back button when there's a page on this site to return to
    if (hasNavigated.current) {
      e.preventDefault()
      router.back()
    }
  }

  return (
    <nav className="fixed top-5 left-5 z-30" aria-label="Back navigation">
      <Link
        href={parentPath(pathname)}
        onClick={handleClick}
        className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200 text-sm backdrop-blur-md bg-white/[0.04] px-4 py-2 rounded-full border border-white/[0.08] hover:border-white/[0.15] cursor-pointer min-h-[44px]"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        <span>Back</span>
      </Link>
    </nav>
  )
}
