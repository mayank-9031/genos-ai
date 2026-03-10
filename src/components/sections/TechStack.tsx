'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LogoCloud } from '@/components/ui/logo-cloud-3'

gsap.registerPlugin(ScrollTrigger)

const CATEGORIES = [
  {
    label: 'AI Models & Platforms',
    items: [
      'OpenAI (GPT-4o)', 'Anthropic Claude', 'Google Gemini', 'Meta LLaMA',
      'Mistral', 'DeepSeek', 'ElevenLabs', 'Whisper',
    ],
  },
  {
    label: 'Automation & Integration',
    items: [
      'Make (Integromat)', 'n8n', 'Zapier', 'LangChain',
      'LangGraph', 'CrewAI', 'Twilio', 'Retell AI',
    ],
  },
  {
    label: 'Development',
    items: [
      'Next.js', 'React', 'Node.js', 'Python',
      'FastAPI', 'PostgreSQL', 'Supabase', 'Vercel', 'AWS', 'Docker',
    ],
  },
]

const logos = [
  {
    src: 'https://svgl.app/library/openai_wordmark_light.svg',
    alt: 'OpenAI',
  },
  {
    src: 'https://svgl.app/library/claude-ai-wordmark-icon_light.svg',
    alt: 'Claude AI',
  },
  {
    src: 'https://svgl.app/library/google-gemini-wordmark-light.svg',
    alt: 'Google Gemini',
  },
  {
    src: 'https://svgl.app/library/meta_light.svg',
    alt: 'Meta',
  },
  {
    src: 'https://svgl.app/library/vercel_wordmark.svg',
    alt: 'Vercel',
  },
  {
    src: 'https://svgl.app/library/supabase_wordmark_light.svg',
    alt: 'Supabase',
  },
  {
    src: 'https://svgl.app/library/github_wordmark_light.svg',
    alt: 'GitHub',
  },
  {
    src: 'https://svgl.app/library/nvidia-wordmark-light.svg',
    alt: 'Nvidia',
  },
  {
    src: 'https://svgl.app/library/aws_wordmark_light.svg',
    alt: 'AWS',
  },
  {
    src: 'https://svgl.app/library/docker-wordmark.svg',
    alt: 'Docker',
  },
]

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const heading = sectionRef.current!.querySelectorAll('.section-reveal')
      gsap.from(heading, {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      const groups = sectionRef.current!.querySelectorAll('.tech-group')
      gsap.from(groups, {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="tech-stack" className="relative py-16 md:py-24 px-[5vw]">
      {/* Ambient glow behind the section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[60vh] w-[80vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.06),transparent_60%)] blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-reveal inline-block text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-[#00D4FF]/60 mb-4">
            Powered by the Best
          </span>
          <h2 className="section-reveal font-display text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-text-on-dark mb-4">
            The tools behind the systems.
          </h2>
          <p className="section-reveal text-[1.05rem] leading-[1.65] text-white/50 max-w-[50ch] mx-auto">
            We work with the most advanced AI models and frameworks on the planet.
          </p>
        </div>

        {/* Logo Cloud */}
        <div className="section-reveal mb-16">
          <div className="mx-auto h-px max-w-lg bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <LogoCloud logos={logos} className="py-8" />
          <div className="mx-auto h-px max-w-lg bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, i) => (
            <div
              key={i}
              className="tech-group group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-colors hover:border-[#00D4FF]/20 hover:bg-white/[0.04]"
            >
              {/* Category accent line */}
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <h3 className="text-[0.75rem] font-semibold tracking-[0.15em] uppercase text-[#00D4FF]/40 mb-5">
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item, j) => (
                  <span
                    key={j}
                    className="px-3 py-1.5 text-[0.8rem] text-white/50 bg-white/[0.04] border border-white/[0.06] rounded-md transition-all hover:border-[#00D4FF]/30 hover:text-white/80 hover:bg-white/[0.06]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
