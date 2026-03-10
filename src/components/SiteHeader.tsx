'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { smoothScrollTo } from '@/lib/smoothScroll'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'How We Work', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
]

const SECTION_IDS = ['hero', 'services', 'process', 'why-us', 'about', 'faq', 'contact']

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Scroll-based backdrop
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Active section highlighting via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const isActive = (href: string) => {
    const id = href.replace('#', '')
    return activeSection === id
  }

  const handleMobileClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileOpen(false)
    smoothScrollTo(e)
  }

  return (
    <header
      className={`site-header fixed top-0 left-0 right-0 z-[100] px-[3vw] py-6 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/[0.06] py-4'
          : 'bg-transparent'
      }`}
    >
      <nav className="flex items-center justify-between">
        <a
          href="#hero"
          onClick={smoothScrollTo}
          className="font-display text-[1.4rem] text-white tracking-[-0.02em]"
        >
          Genos<span className="text-[#00D4FF]">AI</span>
        </a>
        <div className="flex items-center gap-10 text-[0.85rem] font-medium text-white tracking-[0.04em]">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={smoothScrollTo}
              className={`hidden md:inline transition-colors ${
                isActive(link.href) ? 'text-[#00D4FF]' : 'hover:text-[#00D4FF]'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={smoothScrollTo}
            className="hidden md:inline-block px-[1.4rem] py-[0.55rem] border border-[#00D4FF]/50 rounded-full transition-all hover:bg-[#00D4FF]/10 hover:border-[#00D4FF]/80"
          >
            Book a Free Strategy Call
          </a>
          <button
            className="md:hidden p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0A0A0F]/95 backdrop-blur-lg border-t border-white/10 px-[3vw] py-6 flex flex-col gap-4 text-[0.95rem] text-white">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleMobileClick}
              className={isActive(link.href) ? 'text-[#00D4FF]' : ''}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={handleMobileClick}
            className="inline-block text-center px-6 py-3 border border-[#00D4FF]/50 rounded-full hover:bg-[#00D4FF]/10"
          >
            Book a Free Strategy Call
          </a>
        </div>
      )}
    </header>
  )
}
