'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { InfiniteSlider } from '@/components/ui/infinite-slider'

gsap.registerPlugin(ScrollTrigger)

const AI_MODELS = [
  { name: 'OpenAI', logo: 'https://cdn.simpleicons.org/openai/10a37f' },
  { name: 'Claude AI', logo: 'https://cdn.simpleicons.org/anthropic/d97757' },
  { name: 'Google Gemini', logo: 'https://cdn.simpleicons.org/googlegemini/8E75B2' },
  { name: 'Meta', logo: 'https://cdn.simpleicons.org/meta/0668E1' },
  { name: 'Mistral', logo: 'https://cdn.simpleicons.org/mistral/f7d046' },
  { name: 'Vercel', logo: 'https://cdn.simpleicons.org/vercel/ffffff' },
  { name: 'Supabase', logo: 'https://cdn.simpleicons.org/supabase/3ecf8e' },
  { name: 'GitHub', logo: 'https://cdn.simpleicons.org/github/ffffff' },
  { name: 'Nvidia', logo: 'https://cdn.simpleicons.org/nvidia/76b900' },
  { name: 'AWS', logo: 'https://cdn.simpleicons.org/amazonwebservices/ff9900' },
  { name: 'Docker', logo: 'https://cdn.simpleicons.org/docker/2496ED' },
  { name: 'Next.js', logo: 'https://cdn.simpleicons.org/nextdotjs/ffffff' },
  { name: 'React', logo: 'https://cdn.simpleicons.org/react/61dafb' },
  { name: 'Python', logo: 'https://cdn.simpleicons.org/python/3776AB' },
  { name: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'n8n', logo: 'https://cdn.simpleicons.org/n8n/ea4b71' },
]

const STEPS = [
  {
    number: '01',
    title: 'AI Models & Intelligence',
    description:
      'We leverage the most advanced AI models available — from OpenAI GPT-4o and Anthropic Claude to Google Gemini, Meta LLaMA, Mistral, and DeepSeek. Each project uses the model best suited to your specific requirements, ensuring accuracy, speed, and reliability.',
    tools: 'OpenAI, Anthropic Claude, Google Gemini, Meta LLaMA, Mistral, DeepSeek, ElevenLabs, Whisper',
  },
  {
    number: '02',
    title: 'Automation & Integration',
    description:
      'Our automation layer connects AI intelligence to your existing workflows. We build robust pipelines using industry-leading tools that handle complex multi-step processes, data transformations, and real-time triggers without manual intervention.',
    tools: 'Make, n8n, Zapier, LangChain, LangGraph, CrewAI, Twilio, Retell AI',
  },
  {
    number: '03',
    title: 'Development & Infrastructure',
    description:
      'Every system we build is production-grade from the start. We use modern frameworks and cloud infrastructure designed for performance, security, and scale — ensuring your AI solutions run reliably under real-world conditions.',
    tools: 'Next.js, React, Node.js, Python, FastAPI, PostgreSQL, Supabase, Vercel, AWS, Docker',
  },
]

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const stepsHeadingRef = useRef<HTMLHeadingElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      // Marquee
      gsap.from(marqueeRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      // Steps heading
      if (stepsHeadingRef.current) {
        gsap.from(stepsHeadingRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepsHeadingRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // Steps
      if (stepsRef.current) {
        const stepItems = stepsRef.current.querySelectorAll('.step-item')
        stepItems.forEach((item, i) => {
          gsap.from(item, {
            x: -40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.1,
          })

          // Animate the divider line
          const line = item.querySelector('.step-line')
          if (line) {
            gsap.from(line, {
              scaleX: 0,
              transformOrigin: 'left center',
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
              delay: i * 0.1 + 0.2,
            })
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="tech-stack" className="relative py-20 md:py-32 px-[5vw] overflow-hidden">
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[50vh] w-[90vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.05),transparent_60%)] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
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
        <div ref={marqueeRef} className="relative mb-24">
          <div className="mx-auto h-px max-w-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="py-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <InfiniteSlider gap={48} reverse duration={60} durationOnHover={20}>
              {AI_MODELS.map((model) => (
                <div key={model.name} className="flex items-center gap-2.5 px-2 group">
                  <img
                    src={model.logo}
                    alt={model.name}
                    className="h-7 md:h-9 pointer-events-none select-none opacity-60 transition-all duration-300 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <span className="text-[0.75rem] font-medium text-white/40 tracking-wide group-hover:text-white/70 transition-colors duration-300">
                    {model.name}
                  </span>
                </div>
              ))}
            </InfiniteSlider>
          </div>

          <div className="mx-auto h-px max-w-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Steps Heading */}
        <h3
          ref={stepsHeadingRef}
          className="font-display text-[clamp(1.4rem,3vw,2.2rem)] font-normal leading-[1.15] tracking-[-0.02em] text-text-on-dark max-w-3xl mb-16"
        >
          Our approach is methodical and client-centric, delivering value at every stage of your AI journey.
        </h3>

        {/* Numbered Steps */}
        <div ref={stepsRef} className="space-y-0">
          {STEPS.map((step, i) => (
            <div key={i} className="step-item">
              {/* Divider line */}
              <div className="step-line h-px w-full bg-gradient-to-r from-white/[0.08] via-white/[0.12] to-transparent" />

              <div className="grid grid-cols-1 md:grid-cols-[80px_1fr_1.5fr] gap-4 md:gap-8 py-10 md:py-12">
                {/* Number */}
                <span className="font-display text-[2rem] md:text-[2.5rem] font-light tracking-[-0.02em] text-white/15 leading-none">
                  {step.number}
                </span>

                {/* Title */}
                <h4 className="font-display text-[1.2rem] md:text-[1.35rem] font-normal text-text-on-dark leading-tight md:pt-2">
                  {step.title}
                </h4>

                {/* Description + Tools */}
                <div className="md:pt-2">
                  <p className="text-[0.92rem] leading-[1.75] text-white/45 mb-4">
                    {step.description}
                  </p>
                  <p className="text-[0.8rem] leading-[1.6] text-white/25 tracking-wide">
                    {step.tools}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {/* Final divider */}
          <div className="h-px w-full bg-gradient-to-r from-white/[0.08] via-white/[0.12] to-transparent" />
        </div>
      </div>
    </section>
  )
}
