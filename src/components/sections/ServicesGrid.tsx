'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Service Data ────────────────────────────────────────────── */

const AI_SERVICES = [
  {
    title: 'AI Chatbot – Intelligent Assistant',
    description:
      'An advanced conversational assistant for businesses, which not only answers user questions using internal data but also consults carefully selected external sources to deliver comprehensive and accurate results. Furthermore, the assistant can be adjusted in tone, style, and response behaviour to align with brand identity, thereby improving decision-making and efficiency.',
    visualType: 'chatbot' as const,
  },
  {
    title: 'Voice AI – Smart Communication Engine',
    description:
      'A voice-powered AI system for businesses, which not only automates outbound calls but also qualifies leads and books meetings at scale. Moreover, the system integrates directly with your CRM, ensuring every conversation is logged, tracked, and actionable — thereby freeing your team to focus on closing deals.',
    visualType: 'voice' as const,
  },
  {
    title: 'Business Ops – Workflow Automation',
    description:
      'An end-to-end workflow automation platform for businesses, in which users connect CRMs, ERPs, spreadsheets, and internal tools to eliminate manual data entry. Moreover, custom dashboards provide real-time visibility into operations, thereby reducing overhead, streamlining approvals, and improving team efficiency across the board.',
    visualType: 'ops' as const,
  },
  {
    title: 'Outreach & Marketing Engine',
    description:
      'An AI-powered marketing automation system for businesses, which not only runs automated email sequences but also handles intelligent lead scoring and campaign triggers. Moreover, smart analytics track and optimise every customer touchpoint automatically, ensuring your marketing budget delivers maximum ROI consistently.',
    visualType: 'marketing' as const,
  },
  {
    title: 'AI Lead Qualification Engine',
    description:
      'An automated lead processing system for businesses, in which inbound prospects are scored, qualified, and routed in real-time. Moreover, the engine follows a structured scoring framework, thereby ensuring consistency and reliability. In addition, response times drop from hours to seconds, dramatically boosting conversion rates.',
    visualType: 'lead' as const,
  },
  {
    title: 'Custom AI Solutions',
    description:
      'A bespoke AI development service for businesses, in which users submit unique requirements and then receive production-grade AI systems built from the ground up. Moreover, each solution is designed to scale with your growth, ensuring long-term value. In addition, it covers everything from computer vision to NLP pipelines.',
    visualType: 'custom' as const,
  },
]

/* ─── Animated Visual Components ─────────────────────────────── */

function ChatbotVisual() {
  return (
    <div className="relative w-full aspect-[4/3] bg-[#030318] rounded-xl overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-40 h-40 rounded-full bg-cyan-500/15 blur-[60px]"
          style={{ animation: 'orb-pulse 4s ease-in-out infinite' }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[180px] h-[180px] rounded-full border border-dashed border-cyan-500/15"
          style={{ animation: 'spin 20s linear infinite' }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[160px] h-[90px] rounded-full border border-cyan-400/20"
          style={{ animation: 'orb-ring-1 8s linear infinite' }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[190px] h-[110px] rounded-full border border-blue-400/15"
          style={{ animation: 'orb-ring-2 12s linear infinite' }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[140px] h-[140px] rounded-full border border-cyan-300/10"
          style={{ animation: 'spin 15s linear infinite reverse' }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-300 via-blue-500 to-indigo-600 blur-md opacity-80" />
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-cyan-200 via-blue-400 to-indigo-500" />
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-white via-cyan-100 to-blue-200 opacity-90" />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-16 h-16 rounded-full border border-cyan-400/30"
          style={{ animation: 'data-pulse-ring 3s ease-out infinite' }}
        />
      </div>
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * Math.PI * 2
        const radius = 28 + (i % 3) * 8
        return (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-cyan-400/60"
            style={{
              top: `${Math.round((50 + Math.sin(angle) * radius) * 100) / 100}%`,
              left: `${Math.round((50 + Math.cos(angle) * radius) * 100) / 100}%`,
              animation: `float-particle ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.25}s`,
            }}
          />
        )
      })}
    </div>
  )
}

function VoiceAIVisual() {
  return (
    <div className="relative w-full aspect-[4/3] bg-[#08051a] rounded-xl overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-32 h-32 rounded-full bg-fuchsia-500/10 blur-[50px]"
          style={{ animation: 'orb-pulse 5s ease-in-out infinite' }}
        />
      </div>
      <div className="absolute left-[8%] top-1/2 -translate-y-1/2 flex items-center gap-[2px]">
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={i}
            className="w-[1.5px] rounded-full bg-blue-400/25"
            style={{
              height: `${Math.round((4 + Math.abs(Math.sin(i * 0.4)) * 24) * 100) / 100}px`,
              animation: 'waveform-bar 1.8s ease-in-out infinite',
              animationDelay: `${i * 0.06}s`,
            }}
          />
        ))}
      </div>
      <div
        className="absolute left-[32%] top-[38%] w-2 h-2 rounded-full bg-white/40"
        style={{ animation: 'orb-pulse 2s ease-in-out infinite' }}
      />
      <div className="relative w-20 h-20 z-10">
        <div
          className="absolute -inset-2 rounded-full blur-lg opacity-50"
          style={{
            background: 'linear-gradient(135deg, #ec4899, #06b6d4, #a855f7)',
            animation: 'spin 10s linear infinite',
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: 'linear-gradient(135deg, #f472b6, #22d3ee, #c084fc)' }}
        />
        <div className="absolute inset-3 rounded-full bg-gradient-to-br from-white/30 via-pink-200/20 to-transparent" />
        <div className="absolute top-2 left-3 w-4 h-2 rounded-full bg-white/25 blur-sm" />
      </div>
      <div className="absolute right-[8%] top-1/2 -translate-y-1/2 flex items-center gap-[2px]">
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={i}
            className="w-[1.5px] rounded-full bg-blue-400/25"
            style={{
              height: `${Math.round((4 + Math.abs(Math.cos(i * 0.35)) * 22) * 100) / 100}px`,
              animation: 'waveform-bar 1.8s ease-in-out infinite',
              animationDelay: `${i * 0.07}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function OpsVisual() {
  const nodes = [
    { x: 18, y: 28, label: 'CRM' },
    { x: 42, y: 50, label: 'ERP' },
    { x: 65, y: 30, label: 'API' },
    { x: 82, y: 55, label: 'DB' },
    { x: 50, y: 75, label: 'OUT' },
  ]
  const connections = [
    [0, 1], [1, 2], [2, 3], [1, 4], [3, 4],
  ]

  return (
    <div className="relative w-full aspect-[4/3] bg-[#040f1a] rounded-xl overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(16,185,129,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.4) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-32 h-32 rounded-full bg-emerald-500/8 blur-[50px]" />
      </div>
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {connections.map(([from, to], i) => (
          <line
            key={i}
            x1={`${nodes[from].x}%`}
            y1={`${nodes[from].y}%`}
            x2={`${nodes[to].x}%`}
            y2={`${nodes[to].y}%`}
            stroke="rgba(16,185,129,0.15)"
            strokeWidth="1"
            strokeDasharray="4,4"
            style={{ animation: `flow-dash 3s linear infinite`, animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </svg>
      {nodes.map((node, i) => (
        <div key={i}>
          <div className="absolute" style={{ left: `${node.x}%`, top: `${node.y}%` }}>
            <div
              className="w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/15"
              style={{ animation: 'data-pulse-ring 3.5s ease-out infinite', animationDelay: `${i * 0.6}s` }}
            />
          </div>
          <div
            className="absolute w-6 h-6 rounded-full border border-emerald-400/30 bg-emerald-400/8 flex items-center justify-center"
            style={{
              left: `${node.x}%`, top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
              animation: `neural-fire ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400/60" />
          </div>
          <div
            className="absolute text-[8px] font-mono tracking-wider text-emerald-400/40"
            style={{ left: `${node.x}%`, top: `${node.y + 5}%`, transform: 'translateX(-50%)' }}
          >
            {node.label}
          </div>
        </div>
      ))}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="absolute h-3 rounded bg-emerald-400/8 border border-emerald-400/12"
          style={{
            width: `${30 + i * 12}px`,
            left: `${12 + i * 25}%`,
            top: `${12 + (i % 2) * 70}%`,
            animation: `float-particle ${5 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}
    </div>
  )
}

function MarketingVisual() {
  return (
    <div className="relative w-full aspect-[4/3] bg-[#0f0a04] rounded-xl overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-36 h-36 rounded-full bg-amber-500/8 blur-[50px]" />
      </div>
      {[70, 110, 150].map((size, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-amber-400/8"
          style={{ width: size, height: size, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
      ))}
      <div className="absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div className="w-[150px] h-[150px]" style={{ animation: 'radar-sweep 4s linear infinite' }}>
          <div
            className="absolute top-1/2 left-1/2 w-1/2 h-[1px]"
            style={{ background: 'linear-gradient(90deg, rgba(251,191,36,0.4), transparent)', transformOrigin: 'left center' }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-1/2 h-10 -translate-y-1/2"
            style={{ background: 'conic-gradient(from 0deg, rgba(251,191,36,0.06), transparent 50deg)', transformOrigin: 'left center' }}
          />
        </div>
      </div>
      <div className="absolute w-3 h-3 rounded-full bg-amber-400/50" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      {[
        { x: 35, y: 25 }, { x: 70, y: 32 }, { x: 25, y: 58 },
        { x: 68, y: 68 }, { x: 45, y: 38 }, { x: 58, y: 62 },
      ].map((pt, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-amber-400/40"
          style={{ left: `${pt.x}%`, top: `${pt.y}%`, animation: `neural-fire ${2 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }}
        />
      ))}
      <div className="absolute bottom-4 left-5 right-5 flex items-end gap-1 h-8">
        {[40, 65, 30, 80, 55, 90, 45, 70, 85, 50, 95, 60].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-amber-400/12"
            style={{ height: `${h}%`, animation: `waveform-bar ${2 + (i % 3) * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  )
}

function LeadVisual() {
  return (
    <div className="relative w-full aspect-[4/3] bg-[#050814] rounded-xl overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-36 h-36 rounded-full bg-indigo-500/8 blur-[50px]" />
      </div>
      <div className="absolute top-[12%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        {[
          { w: 150, opacity: 0.1, border: 0.2 },
          { w: 115, opacity: 0.14, border: 0.25 },
          { w: 80, opacity: 0.18, border: 0.3 },
          { w: 50, opacity: 0.24, border: 0.38 },
        ].map((level, i) => (
          <div
            key={i}
            className="h-7 rounded-lg"
            style={{
              width: level.w,
              backgroundColor: `rgba(99,102,241,${level.opacity})`,
              border: `1px solid rgba(99,102,241,${level.border})`,
              animation: `float-particle ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-indigo-400/50"
          style={{
            left: `${46 + (i % 3) * 4}%`,
            animation: `data-stream ${2.5 + i * 0.3}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
      {[
        { x: 8, y: 20, w: 50 }, { x: 8, y: 60, w: 40 },
        { x: 78, y: 25, w: 45 }, { x: 78, y: 65, w: 55 },
      ].map((bar, i) => (
        <div
          key={i}
          className="absolute h-2 rounded bg-indigo-400/8 border border-indigo-400/12"
          style={{
            left: `${bar.x}%`, top: `${bar.y}%`, width: bar.w,
            animation: `gauge-pulse ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
      <div className="absolute bottom-4 left-6 right-6 flex justify-between">
        {['85%', '92%', '78%'].map((score, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="text-[9px] font-mono text-indigo-300/50">{score}</div>
            <div className="w-12 h-1 rounded-full bg-indigo-400/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-400/35"
                style={{ width: score, animation: `gauge-pulse 3s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CustomAIVisual() {
  const nodes = [
    { x: 28, y: 22 }, { x: 72, y: 18 }, { x: 18, y: 55 },
    { x: 82, y: 52 }, { x: 32, y: 78 }, { x: 68, y: 80 }, { x: 50, y: 48 },
  ]

  return (
    <div className="relative w-full aspect-[4/3] bg-[#0a0510] rounded-xl overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-36 h-36 rounded-full bg-violet-500/8 blur-[50px]" />
      </div>
      {[90, 130, 170].map((size, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: size, height: size, top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            border: `1px solid rgba(139,92,246,${0.06 + i * 0.03})`,
            animation: `spin ${18 - i * 4}s linear infinite`,
            animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
          }}
        />
      ))}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {nodes.slice(0, 6).map((node, i) => (
          <line
            key={i}
            x1={`${node.x}%`} y1={`${node.y}%`} x2="50%" y2="48%"
            stroke={`rgba(139,92,246,${0.08 + (i % 3) * 0.04})`}
            strokeWidth="0.5"
            style={{ animation: `neural-fire ${2 + i * 0.4}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}
          />
        ))}
        <line x1="28%" y1="22%" x2="72%" y2="18%" stroke="rgba(139,92,246,0.06)" strokeWidth="0.5" />
        <line x1="18%" y1="55%" x2="82%" y2="52%" stroke="rgba(139,92,246,0.06)" strokeWidth="0.5" />
        <line x1="32%" y1="78%" x2="68%" y2="80%" stroke="rgba(139,92,246,0.06)" strokeWidth="0.5" />
      </svg>
      {nodes.map((node, i) => (
        <div
          key={i}
          className="absolute w-2.5 h-2.5 rounded-full bg-violet-400/25 border border-violet-400/15"
          style={{
            left: `${node.x}%`, top: `${node.y}%`,
            transform: 'translate(-50%, -50%)',
            animation: `neural-fire ${2.5 + i * 0.3}s ease-in-out infinite`,
            animationDelay: `${i * 0.25}s`,
          }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ top: '-4%' }}>
        <div
          className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400/25 to-purple-500/25 border border-violet-400/20 flex items-center justify-center"
          style={{ animation: 'orb-pulse 3s ease-in-out infinite' }}
        >
          <div className="w-3.5 h-3.5 rounded-full bg-violet-300/50" />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ top: '-4%' }}>
        <div
          className="w-10 h-10 rounded-full border border-violet-400/20"
          style={{ animation: 'data-pulse-ring 4s ease-out infinite' }}
        />
      </div>
    </div>
  )
}

function ServiceVisual({ type }: { type: string }) {
  switch (type) {
    case 'chatbot': return <ChatbotVisual />
    case 'voice': return <VoiceAIVisual />
    case 'ops': return <OpsVisual />
    case 'marketing': return <MarketingVisual />
    case 'lead': return <LeadVisual />
    case 'custom': return <CustomAIVisual />
    default: return null
  }
}

/* ─── Main Component ─────────────────────────────────────────── */

export function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    if (!section || !container) return

    const ctx = gsap.context(() => {
      // Header reveal
      const headings = Array.from(section.querySelectorAll('.section-reveal'))
      gsap.from(headings, {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      const mm = gsap.matchMedia()

      // Desktop: layered stacked scroll using a single timeline
      mm.add('(min-width: 1024px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('.service-card', container)
        const totalTransitions = cards.length - 1

        // Position all cards except first below viewport
        cards.forEach((card, i) => {
          if (i > 0) {
            gsap.set(card, { yPercent: 100 })
          }
        })

        // Build a single timeline for all card transitions
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            pin: true,
            start: 'top top',
            end: `+=${totalTransitions * 700}`,
            scrub: true,
            anticipatePin: 1,
          },
        })

        // Add each card transition to the timeline
        cards.forEach((card, i) => {
          if (i === 0) return

          // At this point in the timeline, slide the new card up
          // and scale/fade the previous card — both happen simultaneously
          tl.to(card, {
            yPercent: 0,
            ease: 'none',
            duration: 1,
          }, (i - 1))
          .to(cards[i - 1], {
            scale: 0.9,
            opacity: 0.5,
            ease: 'none',
            duration: 1,
          }, (i - 1))
        })
      })

      // Mobile: simple reveal
      mm.add('(max-width: 1023px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('.service-card', container)
        cards.forEach((card) => {
          gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          })
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="relative">
      {/* Centered section header */}
      <div className="px-[5vw] pt-20 md:pt-28 lg:pt-36 pb-12 md:pb-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-reveal font-display text-[clamp(2rem,4.5vw,3.8rem)] font-normal leading-[1.08] tracking-[-0.02em] text-text-on-dark mb-6">
            Smart AI Products Built for Every Business
          </h2>
          <p className="section-reveal text-[1.05rem] leading-[1.7] text-white/50 max-w-[60ch] mx-auto">
            We create intelligent AI products for businesses worldwide, all of which are
            specifically designed to solve real business challenges. Moreover, from
            automating repetitive tasks to generating actionable insights, our solutions
            enhance experiences, are adaptable, reliable, and built to meet the unique
            needs of every organisation.
          </p>
        </div>
      </div>

      {/* Layered cards container */}
      <div
        ref={containerRef}
        className="relative lg:h-screen lg:overflow-hidden"
      >
        {AI_SERVICES.map((service, i) => (
          <div
            key={i}
            className="service-card px-[5vw] mb-10 last:mb-16 lg:mb-0 lg:absolute lg:inset-0 lg:flex lg:items-center"
            style={{ zIndex: i, willChange: 'transform' }}
          >
            <div className="w-full max-w-[1200px] mx-auto bg-[#111118] rounded-2xl overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Image — left side */}
                <div className="lg:w-[45%] p-5 lg:p-8">
                  <div className="rounded-xl overflow-hidden">
                    <ServiceVisual type={service.visualType} />
                  </div>
                </div>

                {/* Text — right side */}
                <div className="lg:w-[55%] p-5 pt-0 lg:p-8 lg:pl-2 flex flex-col justify-center">
                  <h3 className="font-display text-[clamp(1.3rem,2.2vw,1.8rem)] text-text-on-dark mb-4 leading-[1.2]">
                    {service.title}
                  </h3>
                  <p className="text-[0.9rem] leading-[1.75] text-white/50">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
