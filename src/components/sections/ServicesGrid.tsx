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
    imageSrc: '/images/services/ai-chatbot.avif',
  },
  {
    title: 'Voice AI – Smart Communication Engine',
    description:
      'A voice-powered AI system for businesses, which not only automates outbound calls but also qualifies leads and books meetings at scale. Moreover, the system integrates directly with your CRM, ensuring every conversation is logged, tracked, and actionable — thereby freeing your team to focus on closing deals.',
    imageSrc: '/images/services/voice-ai.avif',
  },
  {
    title: 'Business Ops – Workflow Automation',
    description:
      'An end-to-end workflow automation platform for businesses, in which users connect CRMs, ERPs, spreadsheets, and internal tools to eliminate manual data entry. Moreover, custom dashboards provide real-time visibility into operations, thereby reducing overhead, streamlining approvals, and improving team efficiency across the board.',
    videoSrc: '/videos/services/business-ops.mp4',
  },
  {
    title: 'Outreach & Marketing Engine',
    description:
      'An AI-powered marketing automation system for businesses, which not only runs automated email sequences but also handles intelligent lead scoring and campaign triggers. Moreover, smart analytics track and optimise every customer touchpoint automatically, ensuring your marketing budget delivers maximum ROI consistently.',
    imageSrc: '/images/services/ai-image-gen.avif',
  },
  {
    title: 'AI Lead Qualification Engine',
    description:
      'An automated lead processing system for businesses, in which inbound prospects are scored, qualified, and routed in real-time. Moreover, the engine follows a structured scoring framework, thereby ensuring consistency and reliability. In addition, response times drop from hours to seconds, dramatically boosting conversion rates.',
    imageSrc: '/images/services/ai-decision.avif',
  },
  {
    title: 'Custom AI Solutions',
    description:
      'A bespoke AI development service for businesses, in which users submit unique requirements and then receive production-grade AI systems built from the ground up. Moreover, each solution is designed to scale with your growth, ensuring long-term value. In addition, it covers everything from computer vision to NLP pipelines.',
    imageSrc: '/images/services/ai-search.avif',
  },
]

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
                {/* Visual — left side */}
                <div className="lg:w-[45%] p-5 lg:p-8">
                  <div className="rounded-xl overflow-hidden">
                    {'videoSrc' in service && service.videoSrc ? (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full aspect-[4/3] object-cover rounded-xl bg-black"
                        src={service.videoSrc}
                      />
                    ) : (
                      <img
                        src={'imageSrc' in service ? service.imageSrc : ''}
                        alt={service.title}
                        className="w-full aspect-[4/3] object-cover rounded-xl bg-black"
                      />
                    )}
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
