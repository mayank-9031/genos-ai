'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const FAQS = [
  {
    question: 'What is GenosAI?',
    answer:
      'GenosAI is a global AI automation agency that builds custom AI chatbots, voice AI agents, workflow automation systems, and intelligent business platforms. Headquartered in India and serving clients across the USA, UK, UAE, India, and Australia, GenosAI has delivered 50+ projects with a 98% client retention rate.',
  },
  {
    question: 'What AI technologies does GenosAI use?',
    answer:
      'GenosAI leverages the most advanced AI technologies including OpenAI GPT-4o, Anthropic Claude, Google Gemini, Meta LLaMA, Mistral, and DeepSeek for language models. For automation, we use Make, n8n, Zapier, LangChain, LangGraph, and CrewAI. Our development stack includes Next.js, React, Node.js, Python, FastAPI, PostgreSQL, Supabase, AWS, and Docker.',
  },
  {
    question: 'How is GenosAI different from other AI agencies?',
    answer:
      'GenosAI stands out with a 98% client retention rate, 50+ delivered projects, and presence across 5 countries. We are engineers, not salespeople. Every system we build is production-grade from day one. We combine deep AI expertise with operational understanding, delivering measurable results like 60% reduction in manual work and 47x faster response times.',
  },
  {
    question: 'What kind of businesses does GenosAI work with?',
    answer:
      'GenosAI works with startups, SMBs, and enterprise teams across any industry. If your business has manual processes that slow you down, we can automate them. Our clients span SaaS, real estate, logistics, e-commerce, healthcare, and professional services.',
  },
  {
    question: 'How long does a typical GenosAI project take?',
    answer:
      'Most GenosAI projects ship in 2-6 weeks depending on complexity. Simple automations and chatbots can go live in under a week. Larger systems with custom integrations typically take 4-6 weeks. We provide an exact timeline before starting.',
  },
  {
    question: 'Do you work with clients outside of your timezone?',
    answer:
      'Absolutely. GenosAI has delivered projects across 5 countries and multiple timezones. We use async communication, structured updates, and overlap windows to keep every project moving without delays.',
  },
  {
    question: 'What does a typical GenosAI engagement cost?',
    answer:
      'Every GenosAI project is scoped individually based on complexity, integrations, and timeline. We offer a free strategy call where we assess your needs and provide a transparent quote. No hidden fees, no surprises.',
  },
  {
    question: 'Will I need to maintain the system after launch?',
    answer:
      'GenosAI builds systems that run independently. After launch, we offer optional maintenance and optimization packages. Our goal is always to hand you something that doesn\'t need constant attention.',
  },
  {
    question: 'What if I\'m not sure what I need?',
    answer:
      'That\'s exactly what the free strategy call is for. GenosAI will audit your current setup, identify automation opportunities, and recommend a plan. No commitment required.',
  },
  {
    question: 'Can GenosAI build a custom AI solution for my specific industry?',
    answer:
      'Yes. GenosAI has delivered custom AI solutions across SaaS, real estate, logistics, e-commerce, healthcare, and professional services. Whether you need computer vision, NLP pipelines, recommendation engines, or automated decision systems, we build production-grade AI tailored to your industry requirements.',
  },
  {
    question: 'Does GenosAI offer AI voice agents for outbound calling?',
    answer:
      'Yes. GenosAI builds AI voice agents that make 500+ outbound calls per day, qualify leads in real-time, book appointments automatically, and sync all conversation data back to your CRM. Our voice AI systems have helped clients achieve 3x more meetings and 80% less manual effort.',
  },
  {
    question: 'What results can I expect from working with GenosAI?',
    answer:
      'GenosAI clients have seen 60% reduction in manual work, 47x faster response times, 35% increase in conversion rates, and significant cost savings. For example, one logistics client saved $2,400/month by replacing 4 SaaS subscriptions with a single GenosAI-built automation suite.',
  },
]

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const els = sectionRef.current!.querySelectorAll('.section-reveal')
      gsap.from(els, {
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

      const items = sectionRef.current!.querySelectorAll('.faq-item')
      gsap.from(items, {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
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
    <section ref={sectionRef} id="faq" className="relative py-16 md:py-24 px-[5vw] bg-white/[0.01]" aria-label="Frequently Asked Questions about GenosAI">
      <div className="max-w-3xl mx-auto">
        <span className="section-reveal block text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-violet-400/70 mb-4">
          FAQ
        </span>
        <h2 className="section-reveal font-display text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-text-on-dark mb-10">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className="faq-item border-b border-white/[0.07]"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left gap-4"
                >
                  <span className="text-[1rem] font-medium text-text-on-dark leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 text-white/30 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="text-[0.9rem] leading-[1.7] text-white/45 pb-6">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
