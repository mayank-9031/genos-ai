'use client'

import { Linkedin, Twitter, Instagram, Youtube } from 'lucide-react'
import { smoothScrollTo } from '@/lib/smoothScroll'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'How We Work', href: '#process' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const SERVICE_LINKS = [
  'Business Ops Automation',
  'AI Cold Calling Agents',
  'Social Media Automation',
  'Outreach & Marketing',
  'AI Chatbots',
  'Internal Tools',
  'Web Development',
]

const SOCIALS = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/genosai' },
  { icon: Twitter, label: 'X (Twitter)', href: 'https://x.com/genosai' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/genosai' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@genosai' },
]

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] pt-16 pb-8 px-[5vw]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <a
              href="#hero"
              onClick={smoothScrollTo}
              className="font-display text-[1.5rem] text-white tracking-[-0.02em] inline-block mb-4"
            >
              Genos<span className="text-white">AI</span>
            </a>
            <p className="text-[0.85rem] leading-[1.6] text-white/40 max-w-[28ch]">
              AI automation for businesses that refuse to operate manually.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-white/30 mb-5">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={smoothScrollTo}
                    className="text-[0.88rem] text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-white/30 mb-5">
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              {SERVICE_LINKS.map((service) => (
                <li key={service}>
                  <span className="text-[0.88rem] text-white/50">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-white/30 mb-5">
              Contact
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:hello@genosai.com"
                  className="text-[0.88rem] text-white/50 hover:text-white transition-colors"
                >
                  hello@genosai.com
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              {SOCIALS.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-white/30 hover:text-white transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[0.75rem] text-white/25">
            &copy; {new Date().getFullYear()} GenosAI. All rights reserved.
          </p>
          <div className="flex gap-6 text-[0.75rem] text-white/25">
            <a href="/privacy" className="hover:text-white/40 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white/40 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
