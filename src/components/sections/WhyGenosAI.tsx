'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'
import { Wrench, Shield, Globe2, Users, Zap, Brain } from 'lucide-react'

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

const REASONS = [
  {
    icon: Wrench,
    gradient: 'from-violet-600/20 via-purple-900/30 to-indigo-950/40',
    meshGradient: 'radial-gradient(ellipse at 30% 20%, rgba(139,92,246,0.3), transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(79,70,229,0.2), transparent 50%)',
    title: 'Custom-Built AI Systems',
    description:
      'We don\'t resell pre-packaged automations. Every system is reverse-engineered from your specific workflows, tools, and business logic.',
  },
  {
    icon: Shield,
    gradient: 'from-blue-600/20 via-cyan-900/30 to-slate-950/40',
    meshGradient: 'radial-gradient(ellipse at 60% 30%, rgba(59,130,246,0.3), transparent 50%), radial-gradient(ellipse at 30% 70%, rgba(6,182,212,0.2), transparent 50%)',
    title: 'Production-Grade Engineering',
    description:
      'Our automations aren\'t demos that break in a week. We build for scale, reliability, and edge cases — with monitoring baked in from day one.',
  },
  {
    icon: Globe2,
    gradient: 'from-emerald-600/20 via-teal-900/30 to-slate-950/40',
    meshGradient: 'radial-gradient(ellipse at 50% 40%, rgba(16,185,129,0.25), transparent 50%), radial-gradient(ellipse at 80% 60%, rgba(20,184,166,0.2), transparent 50%)',
    title: 'Global Delivery, Local Understanding',
    description:
      '23+ clients across the USA, UK, UAE, India, and Australia. We deliver on time regardless of timezone or compliance requirements.',
  },
  {
    icon: Users,
    gradient: 'from-amber-600/20 via-orange-900/30 to-slate-950/40',
    meshGradient: 'radial-gradient(ellipse at 40% 30%, rgba(245,158,11,0.25), transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(249,115,22,0.15), transparent 50%)',
    title: 'End-to-End Ownership',
    description:
      'From discovery call to post-launch optimization, one team owns your project. No handoffs. No scope confusion. Total accountability.',
  },
  {
    icon: Zap,
    gradient: 'from-rose-600/20 via-pink-900/30 to-slate-950/40',
    meshGradient: 'radial-gradient(ellipse at 60% 40%, rgba(244,63,94,0.25), transparent 50%), radial-gradient(ellipse at 30% 60%, rgba(236,72,153,0.15), transparent 50%)',
    title: 'Speed Without Shortcuts',
    description:
      'Most projects go live in 2-6 weeks. We move fast because our process is tight, not because we cut corners.',
  },
  {
    icon: Brain,
    gradient: 'from-fuchsia-600/20 via-purple-900/30 to-slate-950/40',
    meshGradient: 'radial-gradient(ellipse at 50% 30%, rgba(192,38,211,0.25), transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(139,92,246,0.2), transparent 50%)',
    title: 'AI That Understands Complexity',
    description:
      'Our systems adapt to changing environments, handle imperfect data, and scale as your organisation grows.',
  },
]

export function WhyGenosAI() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const headerVisible = useInView(sectionRef, 0.05)
  const gridVisible = useInView(gridRef, 0.05)

  return (
    <section ref={sectionRef} id="why-us" className="relative py-20 md:py-32 px-[5vw]">
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-[60vh] w-[70vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.06),transparent_60%)] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ease-out ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-violet-400/70 mb-4">
            Your Trusted AI Partner
          </span>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-text-on-dark mb-5">
            Why Teams Choose GenosAI
          </h2>
          <p className="text-[1.05rem] leading-[1.65] text-white/50 max-w-[60ch] mx-auto">
            We combine deep technical expertise with a clear understanding of operational needs.
            Our AI solutions are dependable, practical, and built for everyday use — not just for demos.
          </p>
        </div>

        {/* Bento Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] transition-all duration-700 ease-out hover:border-violet-500/20 hover:bg-white/[0.04] ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: gridVisible ? `${i * 100}ms` : '0ms' }}
              >
                {/* Visual header with gradient mesh */}
                <div className="relative h-44 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                    style={{ background: item.meshGradient }}
                  />
                  {/* Subtle grid pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                      backgroundSize: '32px 32px',
                    }}
                  />
                  {/* Floating icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.08] backdrop-blur-sm border border-white/[0.1] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <Icon size={28} className="text-white/60" strokeWidth={1.5} />
                    </div>
                  </div>
                  {/* Bottom fade */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0A0A0F] to-transparent" />
                </div>

                {/* Content */}
                <div className="relative px-6 pb-6 -mt-2">
                  <h3 className="font-display text-[1.15rem] text-text-on-dark mb-2.5 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[0.85rem] leading-[1.7] text-white/40">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
