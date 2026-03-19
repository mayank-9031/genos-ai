'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const FAQS = [
  {
    question: 'What kind of businesses do you work with?',
    answer:
      'We work with startups, SMBs, and enterprise teams across any industry. If your business has manual processes that slow you down, we can automate them. Our clients span SaaS, real estate, logistics, e-commerce, healthcare, and professional services.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Most projects ship in 2-6 weeks depending on complexity. Simple automations and chatbots can go live in under a week. Larger systems with custom integrations typically take 4-6 weeks. We\'ll give you an exact timeline before we start.',
  },
  {
    question: 'Do you work with clients outside of your timezone?',
    answer:
      'Absolutely. We\'ve delivered projects across 5 countries and multiple timezones. We use async communication, structured updates, and overlap windows to keep every project moving without delays.',
  },
  {
    question: 'What does a typical engagement cost?',
    answer:
      'Every project is scoped individually based on complexity, integrations, and timeline. We offer a free strategy call where we assess your needs and provide a transparent quote — no hidden fees, no surprises.',
  },
  {
    question: 'Will I need to maintain the system after launch?',
    answer:
      'We build systems that run independently. After launch, we offer optional maintenance and optimization packages. But our goal is always to hand you something that doesn\'t need constant attention.',
  },
  {
    question: 'What if I\'m not sure what I need?',
    answer:
      'That\'s exactly what the free strategy call is for. We\'ll audit your current setup, identify automation opportunities, and recommend a plan. No commitment required.',
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
    <section ref={sectionRef} id="faq" className="relative py-16 md:py-24 px-[5vw] bg-white/[0.01]">
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
