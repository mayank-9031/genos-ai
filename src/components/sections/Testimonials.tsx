'use client'

import { motion } from 'motion/react'
import { TestimonialsColumn, type Testimonial } from '@/components/ui/testimonials-columns-1'

const testimonials: Testimonial[] = [
  {
    text: "GenosAI didn't just build us an automation — they rebuilt how our sales team operates. The AI calling agent they deployed handles what used to take three people. It's been a game-changer.",
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    name: 'Sarah M.',
    role: 'VP of Sales, TechScale Inc. — USA',
  },
  {
    text: "We went from spreadsheets and manual follow-ups to a fully automated pipeline in less than three weeks. The team at GenosAI understood our business from day one.",
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    name: 'Ahmed R.',
    role: 'Managing Director, Gulf Properties — UAE',
  },
  {
    text: "The chatbot they built handles 70% of our customer queries without human intervention. Our support team finally has time to focus on complex issues. Brilliant work.",
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    name: 'James L.',
    role: 'Head of Operations, Nexus Digital — UK',
  },
  {
    text: "We needed a custom AI agent for lead qualification. GenosAI delivered in two weeks — it books meetings, scores leads, and syncs everything to our CRM automatically.",
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
    name: 'Priya K.',
    role: 'Growth Lead, FinEdge Solutions — India',
  },
  {
    text: "Their workflow automation cut our onboarding time from 5 days to 6 hours. The ROI was obvious within the first month. Absolutely worth every penny.",
    image: 'https://randomuser.me/api/portraits/men/5.jpg',
    name: 'Daniel T.',
    role: 'COO, SwiftLogistics — Australia',
  },
  {
    text: "GenosAI integrated our CRM, email, and invoicing into one seamless pipeline. What used to take our team hours now runs on autopilot.",
    image: 'https://randomuser.me/api/portraits/women/6.jpg',
    name: 'Fatima H.',
    role: 'Operations Manager, Zenith Realty — UAE',
  },
  {
    text: "We were skeptical about AI chatbots, but the one GenosAI built actually sounds human. Our conversion rate jumped 35% in the first quarter.",
    image: 'https://randomuser.me/api/portraits/men/7.jpg',
    name: 'Marcus W.',
    role: 'CEO, BrightPath Marketing — UK',
  },
  {
    text: "They automated our entire reporting pipeline. What used to take two analysts a full day now generates itself every morning at 7am. Incredible.",
    image: 'https://randomuser.me/api/portraits/women/8.jpg',
    name: 'Ananya S.',
    role: 'Data Lead, InsightStack — India',
  },
  {
    text: "The AI voice agent GenosAI built handles 200+ outbound calls a day with better results than our previous cold-calling team. It's transformed our outreach.",
    image: 'https://randomuser.me/api/portraits/men/9.jpg',
    name: 'Tom B.',
    role: 'Sales Director, CloudReach — USA',
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-16 md:py-24 px-[5vw] bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <span className="text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-[#7B61FF]/60 border border-white/[0.07] py-1.5 px-4 rounded-lg">
              What Our Clients Say
            </span>
          </div>

          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-text-on-dark mt-5 text-center">
            Trusted across five countries.
          </h2>
          <p className="text-center mt-5 text-[1.05rem] leading-[1.65] text-white/50">
            We&apos;ve earned the trust of businesses across five countries. They keep coming back.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  )
}
