'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChatbotVisual } from './visuals/services/ChatbotVisual'
import { VoiceVisual } from './visuals/services/VoiceVisual'
import { WorkflowVisual } from './visuals/services/WorkflowVisual'
import { MarketingVisual } from './visuals/services/MarketingVisual'
import { LeadVisual } from './visuals/services/LeadVisual'
import { CustomAIVisual } from './visuals/services/CustomAIVisual'

gsap.registerPlugin(ScrollTrigger)

/* ─── Service Data ────────────────────────────────────────────── */

const AI_SERVICES = [
  {
    slug: 'ai-chatbot-development',
    title: 'AI Chatbot Development: Intelligent Virtual Assistants',
    description:
      'GenosAI builds advanced conversational AI chatbots that answer user questions using internal data and carefully selected external sources to deliver comprehensive, accurate results. Each chatbot is customisable in tone, style, and response behaviour to align with your brand identity, improving decision-making and operational efficiency across your organisation.',
    Visual: ChatbotVisual,
    visualLabel: 'A support chatbot answering a customer question and citing the company documents it used',
  },
  {
    slug: 'voice-ai-agents',
    title: 'Voice AI Agents: Smart Calling & Communication',
    description:
      'GenosAI develops voice-powered AI systems that automate outbound calls, qualify leads, and book meetings at scale. Every voice agent integrates directly with your CRM, ensuring conversations are logged, tracked, and actionable, freeing your team to focus on closing deals instead of dialling numbers.',
    Visual: VoiceVisual,
    visualLabel: 'A voice agent on a live call booking a meeting, then logging the result to the CRM',
  },
  {
    slug: 'workflow-automation',
    title: 'Workflow Automation: End-to-End Business Ops',
    description:
      'GenosAI builds end-to-end workflow automation platforms that connect CRMs, ERPs, spreadsheets, and internal tools to eliminate manual data entry. Custom dashboards provide real-time visibility into operations, reducing overhead, streamlining approvals, and improving team efficiency across the board.',
    Visual: WorkflowVisual,
    visualLabel: 'An automated workflow updating the CRM, ERP, a spreadsheet and email after a new order',
  },
  {
    slug: 'ai-marketing-automation',
    title: 'AI Marketing Automation: Outreach & Campaign Engine',
    description:
      'GenosAI creates AI-powered marketing automation systems that run automated email sequences, handle intelligent lead scoring, and trigger campaigns based on user behaviour. Smart analytics track and optimise every customer touchpoint automatically, ensuring your marketing budget delivers maximum ROI consistently.',
    Visual: MarketingVisual,
    visualLabel: 'An email sequence where a pricing page visit triggers a demo invite as the lead score rises',
  },
  {
    slug: 'ai-lead-qualification',
    title: 'AI Lead Qualification: Automated Scoring & Routing',
    description:
      'GenosAI develops automated lead processing systems where inbound prospects are scored, qualified, and routed in real-time. The engine follows a structured scoring framework for consistency and reliability, cutting response times from hours to seconds and dramatically boosting conversion rates.',
    Visual: LeadVisual,
    visualLabel: 'Inbound leads scored on budget, authority, need and timing, then routed to sales, nurture or newsletter',
  },
  {
    slug: 'custom-ai-solutions',
    title: 'Custom AI Development: Bespoke Enterprise Solutions',
    description:
      'GenosAI provides bespoke AI development services, building production-grade systems from the ground up to meet your unique requirements. Each solution is designed to scale with your growth, covering everything from computer vision and NLP pipelines to recommendation engines and automated decision systems.',
    Visual: CustomAIVisual,
    visualLabel: 'A build log for a custom AI system connecting data, vision and language models, passing tests and going live',
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
    <section ref={sectionRef} id="services" className="relative" aria-label="GenosAI AI Automation Services">
      {/* Centered section header */}
      <div className="px-[5vw] pt-20 md:pt-28 lg:pt-36 pb-12 md:pb-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-reveal font-display text-[clamp(2rem,4.5vw,3.8rem)] font-normal leading-[1.08] tracking-[-0.02em] text-text-on-dark mb-6">
            AI Automation Services by GenosAI
          </h2>
          <p className="section-reveal text-[1.05rem] leading-[1.7] text-white/50 max-w-[60ch] mx-auto">
            GenosAI builds intelligent AI products for businesses worldwide, from custom chatbots
            and voice AI agents to end-to-end workflow automation and lead qualification systems.
            Every solution is designed to solve real business challenges, automate repetitive tasks,
            and deliver actionable insights that scale with your organisation.
          </p>
          <div className="section-reveal mt-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors border border-violet-400/30 hover:border-violet-300/50 rounded-full px-5 py-2"
            >
              View all services →
            </Link>
          </div>
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
                  <div role="img" aria-label={service.visualLabel} className="w-full aspect-square sm:aspect-[4/3] rounded-xl overflow-hidden">
                    <service.Visual />
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
                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
