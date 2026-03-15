'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'
import { InfiniteSlider } from '@/components/ui/infinite-slider'

function useInView(ref: RefObject<HTMLElement | null>, threshold = 0.1) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, threshold])
  return inView
}

const AI_MODELS = [
  { name: 'OpenAI', logo: 'https://svgl.app/library/openai_wordmark_light.svg' },
  { name: 'Claude AI', logo: 'https://svgl.app/library/claude-ai-wordmark-icon_light.svg' },
  { name: 'Google Gemini', logo: 'https://svgl.app/library/google-gemini-wordmark-light.svg' },
  { name: 'Meta', logo: 'https://svgl.app/library/meta_light.svg' },
  { name: 'Vercel', logo: 'https://svgl.app/library/vercel_wordmark.svg' },
  { name: 'Supabase', logo: 'https://svgl.app/library/supabase_wordmark_light.svg' },
  { name: 'GitHub', logo: 'https://svgl.app/library/github_wordmark_light.svg' },
  { name: 'Nvidia', logo: 'https://svgl.app/library/nvidia-wordmark-light.svg' },
  { name: 'AWS', logo: 'https://svgl.app/library/aws_wordmark_light.svg' },
  { name: 'Docker', logo: 'https://svgl.app/library/docker-wordmark.svg' },
]

const TOOL_CATEGORIES = [
  {
    label: 'AI Models & Platforms',
    icon: (
      <svg className="w-4 h-4 text-violet-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a8 8 0 0 0-8 8c0 3.4 2.1 6.3 5 7.5V20a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2.5c2.9-1.2 5-4.1 5-7.5a8 8 0 0 0-8-8z"/>
        <path d="M10 22h4"/>
      </svg>
    ),
    items: [
      'OpenAI (GPT-4o)', 'Anthropic Claude', 'Google Gemini', 'Meta LLaMA',
      'Mistral', 'DeepSeek', 'ElevenLabs', 'Whisper',
    ],
  },
  {
    label: 'Automation & Integration',
    icon: (
      <svg className="w-4 h-4 text-violet-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    items: [
      'Make (Integromat)', 'n8n', 'Zapier', 'LangChain',
      'LangGraph', 'CrewAI', 'Twilio', 'Retell AI',
    ],
  },
  {
    label: 'Development & Infra',
    icon: (
      <svg className="w-4 h-4 text-violet-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    items: [
      'Next.js', 'React', 'Node.js', 'Python',
      'FastAPI', 'PostgreSQL', 'Supabase', 'Vercel', 'AWS', 'Docker',
    ],
  },
]

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const headerVisible = useInView(sectionRef, 0.05)
  const gridVisible = useInView(gridRef, 0.05)

  return (
    <section ref={sectionRef} id="tech-stack" className="relative py-20 md:py-32 px-[5vw] overflow-hidden">
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[50vh] w-[90vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.05),transparent_60%)] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ease-out ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-violet-400/70 mb-4">
            Powered by the Best
          </span>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-text-on-dark mb-4">
            The tools behind the systems.
          </h2>
          <p className="text-[1.05rem] leading-[1.65] text-white/50 max-w-[55ch] mx-auto">
            Our solutions leverage the most advanced AI models and frameworks to deliver accurate,
            reliable, and high-performing results for your business.
          </p>
        </div>

        {/* Logo Marquee */}
        <div className={`relative mb-20 transition-all duration-700 ease-out delay-200 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="mx-auto h-px max-w-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="py-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <InfiniteSlider gap={60} reverse duration={60} durationOnHover={20}>
              {AI_MODELS.map((model) => (
                <div key={model.name} className="flex items-center gap-3 px-2">
                  <img
                    src={model.logo}
                    alt={model.name}
                    className="h-6 md:h-8 pointer-events-none select-none brightness-0 invert opacity-40 transition-all duration-300 hover:opacity-90"
                    loading="lazy"
                  />
                </div>
              ))}
            </InfiniteSlider>
          </div>

          <div className="mx-auto h-px max-w-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Tool Categories Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TOOL_CATEGORIES.map((cat, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 backdrop-blur-sm transition-all duration-700 ease-out hover:border-violet-500/15 hover:bg-white/[0.04] ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: gridVisible ? `${i * 120}ms` : '0ms' }}
            >
              {/* Hover accent line */}
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="flex items-center gap-2.5 mb-6">
                {cat.icon}
                <h3 className="text-[0.8rem] font-semibold tracking-[0.15em] uppercase text-white/40">
                  {cat.label}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.items.map((item, j) => (
                  <span
                    key={j}
                    className="px-3 py-1.5 text-[0.8rem] text-white/50 bg-white/[0.04] border border-white/[0.06] rounded-md transition-all hover:border-violet-500/20 hover:text-white/80 hover:bg-white/[0.07]"
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
