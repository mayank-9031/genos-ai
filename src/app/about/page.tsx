import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — AI Automation Agency',
  description:
    'GenosAI is a global AI automation agency founded in 2026, building on 23 client projects delivered by our founder across USA, UK, UAE, India, and Australia.',
  alternates: { canonical: 'https://genosai.tech/about' },
}

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About GenosAI',
  description:
    'GenosAI is a global AI automation agency that builds custom AI chatbots, voice AI agents, workflow automation systems, and intelligent business platforms. Founded in 2026, building on 23 client projects delivered by our founder across 5 countries.',
  url: 'https://genosai.tech/about',
  publisher: {
    '@type': 'Organization',
    name: 'GenosAI',
    url: 'https://genosai.tech',
    foundingDate: '2026',
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 10, maxValue: 50 },
    areaServed: ['United States', 'United Kingdom', 'United Arab Emirates', 'India', 'Australia'],
    sameAs: ['https://www.linkedin.com/company/genosai', 'https://x.com/AiGenos81577'],
  },
}

const stats = [
  { value: '23', label: 'Projects Delivered' },
  { value: '2 yrs', label: 'Building AI Systems' },
  { value: '5', label: 'Countries Served' },
  { value: '2026', label: 'Year Founded' },
]

const techStack = [
  { category: 'AI Models', items: 'OpenAI GPT-4o, Anthropic Claude, Google Gemini, Meta LLaMA, Mistral, DeepSeek' },
  { category: 'Automation', items: 'Make, n8n, Zapier, LangChain, LangGraph, CrewAI' },
  { category: 'Backend', items: 'Python, FastAPI, Node.js, PostgreSQL, Supabase' },
  { category: 'Frontend', items: 'Next.js, React, TypeScript, Tailwind CSS' },
  { category: 'Infrastructure', items: 'AWS, Vercel, Docker, GitHub Actions' },
  { category: 'Voice AI', items: 'Vapi, Retell AI, Bland AI, ElevenLabs' },
]

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <main className="min-h-screen bg-bg-dark text-text-on-dark px-6 py-24 max-w-4xl mx-auto">
        <nav className="text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-white/70">About</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-display mb-6">
          About GenosAI
        </h1>

        <p className="text-white/60 text-lg mb-12 max-w-2xl">
          GenosAI is a global AI automation agency founded in 2026. We build
          production-grade AI systems for businesses that want to eliminate
          manual work and operate faster than their competitors.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="border border-white/10 rounded-xl p-6 text-center">
              <p className="text-3xl font-display text-violet-400 mb-1">{stat.value}</p>
              <p className="text-white/50 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
          <p className="text-white/60 leading-relaxed mb-4">
            GenosAI builds custom AI systems — not templates, not white-labeled
            SaaS tools, not proofs of concept. Every system we deliver is
            production-grade from day one and built specifically for your
            business processes, data, and goals.
          </p>
          <p className="text-white/60 leading-relaxed">
            Our core services cover AI chatbot development, voice AI agents,
            workflow automation, AI marketing automation, AI lead qualification,
            and fully custom AI solutions. Most projects ship in 2–6 weeks with
            a firm quote before work begins.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">How We Work</h2>
          <ul className="space-y-4 text-white/60">
            <li className="flex gap-3">
              <span className="text-violet-400 font-semibold shrink-0">01.</span>
              <span><strong className="text-white">Free strategy call</strong> — We audit your workflows, identify automation opportunities, and scope your project. No sales pressure, no vague proposals.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-violet-400 font-semibold shrink-0">02.</span>
              <span><strong className="text-white">Firm quote and timeline</strong> — You receive a clear scope, price, and delivery date before any work begins. We don't start work without your explicit approval.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-violet-400 font-semibold shrink-0">03.</span>
              <span><strong className="text-white">Build and iterate</strong> — We build in sprints with regular progress updates. You see working software early, not just slide decks.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-violet-400 font-semibold shrink-0">04.</span>
              <span><strong className="text-white">Deploy and hand off</strong> — We deploy to production, document everything, and ensure your team can operate the system confidently. No dependency on GenosAI to keep things running.</span>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">What Makes Us Different</h2>
          <ul className="space-y-3 text-white/60">
            <li className="flex gap-3"><span className="text-violet-400 mt-1">→</span><span><strong className="text-white">Engineers, not salespeople.</strong> The people who talk to you are the people who build your system. No bait-and-switch with offshore delivery.</span></li>
            <li className="flex gap-3"><span className="text-violet-400 mt-1">→</span><span><strong className="text-white">Production-grade from day one.</strong> No duct-tape prototypes. No "phase 2" features that never ship. What we build is deployable immediately.</span></li>
            <li className="flex gap-3"><span className="text-violet-400 mt-1">→</span><span><strong className="text-white">Transparent pricing.</strong> Every project has a fixed price and timeline agreed upfront. No hourly billing surprises, no scope creep charges without discussion.</span></li>
            <li className="flex gap-3"><span className="text-violet-400 mt-1">→</span><span><strong className="text-white">Results over vanity metrics.</strong> We track what matters — time saved, revenue generated, leads qualified — not lines of code or hours billed.</span></li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Technology Stack</h2>
          <div className="space-y-3">
            {techStack.map((tech) => (
              <div key={tech.category} className="border border-white/10 rounded-lg p-4">
                <p className="text-sm text-violet-400 font-medium mb-1">{tech.category}</p>
                <p className="text-white/60 text-sm">{tech.items}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Industries We Serve</h2>
          <div className="flex flex-wrap gap-2">
            {['SaaS', 'Real Estate', 'Logistics', 'E-Commerce', 'Healthcare', 'Financial Services', 'Professional Services', 'Manufacturing', 'Education', 'B2B Sales'].map((industry) => (
              <span key={industry} className="border border-white/10 rounded-full px-4 py-1.5 text-sm text-white/60">
                {industry}
              </span>
            ))}
          </div>
        </section>

        <div className="border border-white/10 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-display mb-3">Let&apos;s work together</h2>
          <p className="text-white/50 mb-6">
            Book a free 30-minute strategy call. We audit your workflows,
            identify your top automation opportunities, and give you a
            transparent quote — no commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/strategy-call"
              className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
            >
              Book Free Strategy Call
            </Link>
            <Link
              href="/services"
              className="inline-block border border-white/20 text-white px-8 py-3 rounded-full font-semibold hover:border-white/40 transition-colors"
            >
              View Services
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
