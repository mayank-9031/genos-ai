import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllCaseStudies, resolveCaseStudyCover } from '@/lib/case-studies/case-studies'
import CardStack, { type StackCard } from '@/components/ui/card-stack'

export const metadata: Metadata = {
  title: 'Client Case Studies',
  description:
    'How GenosAI builds AI systems for real businesses: WhatsApp operations agents, AI sales engines, deal sourcing, due diligence and edge computer vision.',
  alternates: { canonical: 'https://genosai.tech/case-studies' },
  openGraph: {
    title: 'Client Case Studies | GenosAI',
    description:
      'How GenosAI builds AI systems for real businesses, from WhatsApp operations agents to edge computer vision.',
    url: 'https://genosai.tech/case-studies',
    type: 'website',
  },
}

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'GenosAI Client Case Studies',
  description:
    'How GenosAI builds AI systems for real businesses: operations agents, sales engines, deal sourcing, due diligence and edge computer vision.',
  url: 'https://genosai.tech/case-studies',
  publisher: {
    '@type': 'Organization',
    name: 'GenosAI',
    url: 'https://genosai.tech',
  },
}

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies()

  const stackCards: StackCard[] = caseStudies.map((study) => ({
    id: study.slug,
    src: resolveCaseStudyCover(study.slug) ?? '',
    alt: study.seoTitle,
    title: study.title,
    description: study.description,
    href: `/case-studies/${study.slug}`,
    meta: `${study.industry} · ${study.readTime} read`,
    tags: study.tags,
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <main className="min-h-screen bg-bg-dark text-text-on-dark px-6 py-24 max-w-4xl mx-auto">
        <nav className="text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white/70 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white/70">Client Case Studies</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-display mb-6">Client case studies</h1>

        <p className="text-white/60 text-lg mb-8 sm:mb-16 max-w-2xl">
          What we built, how it works and what changed, for clients in construction, real estate,
          investment and warehouse operations. Client names are withheld.
        </p>

        {caseStudies.length === 0 ? (
          <p className="text-white/40">No case studies published yet.</p>
        ) : (
          <section className="py-4 sm:py-12 mb-6 sm:mb-16">
            <CardStack cards={stackCards} />
          </section>
        )}

        <div className="border border-white/10 rounded-xl p-8 text-center mt-20">
          <h2 className="text-2xl font-display mb-3">Want results like these?</h2>
          <p className="text-white/50 mb-6">
            Book a free strategy call. We audit your workflows, identify
            automation opportunities, and give you a transparent quote — no
            commitment required.
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
