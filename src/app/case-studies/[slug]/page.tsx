import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCaseStudyBySlug, getCaseStudySlugs } from '@/lib/case-studies/case-studies'
import { CaseStudyBody } from '@/components/case-studies/CaseStudyBody'
import { CaseStudyCover } from '@/components/case-studies/CaseStudyCover'
import { StatGrid } from '@/components/case-studies/StatGrid'
import { TagPill } from '@/components/blog/TagPill'

const BASE_URL = 'https://genosai.tech'

export async function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)
  if (!study) return { title: 'Case study not found' }

  const ogImage = `${BASE_URL}/case-studies/${slug}-og.png`

  return {
    // The root layout's title template appends "| GenosAI"
    title: `${study.seoTitle}: Case Study`,
    description: study.description,
    alternates: { canonical: `${BASE_URL}/case-studies/${slug}` },
    openGraph: {
      title: study.seoTitle,
      description: study.description,
      url: `${BASE_URL}/case-studies/${slug}`,
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630, alt: study.seoTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: study.seoTitle,
      description: study.description,
      images: [ogImage],
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)
  if (!study) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.seoTitle,
    description: study.description,
    image: `${BASE_URL}/case-studies/${slug}.webp`,
    about: study.category,
    author: {
      '@type': 'Organization',
      name: 'GenosAI',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'GenosAI',
      url: BASE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/case-studies/${slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="min-h-screen bg-bg-dark text-text-on-dark px-6 py-24 max-w-4xl mx-auto">
        <nav className="text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white/70 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/case-studies" className="hover:text-white/70 transition-colors">
            Client Case Studies
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white/70">{study.industry}</span>
        </nav>

        <div className="flex flex-wrap items-center gap-3 text-xs text-white/40 mb-5">
          <span>{study.category}</span>
          <span>·</span>
          <span>{study.year}</span>
          <span>·</span>
          <span>{study.readTime} read</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-display mb-6 leading-tight">{study.title}</h1>

        <p className="text-white/60 text-lg mb-8 max-w-2xl leading-relaxed">{study.description}</p>

        <div className="flex flex-wrap gap-2 mb-10">
          {study.tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>

        <CaseStudyCover slug={study.slug} alt={study.seoTitle} priority />

        <StatGrid stats={study.stats} />
        <p className="mt-3 text-xs text-white/35">{study.note}</p>

        <CaseStudyBody content={study.content} />

        <div className="border border-white/10 rounded-xl p-8 text-center mt-16">
          <h2 className="text-2xl font-display mb-3">Have a problem like this?</h2>
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
              href="/case-studies"
              className="inline-block border border-white/20 text-white px-8 py-3 rounded-full font-semibold hover:border-white/40 transition-colors"
            >
              More Case Studies
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
