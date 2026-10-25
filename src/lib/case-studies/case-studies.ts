import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type CaseStudyStat = {
  value: string
  label: string
}

export type CaseStudyFrontmatter = {
  title: string
  seoTitle: string
  slug: string
  description: string
  industry: string
  category: string
  year: string
  readTime: string
  order: number
  tags: string[]
  stats: CaseStudyStat[]
  note: string
}

export type CaseStudy = CaseStudyFrontmatter & { content: string }

const CASE_STUDIES_DIR = path.join(process.cwd(), 'content', 'case-studies')

function readAllCaseStudies(): CaseStudy[] {
  if (!fs.existsSync(CASE_STUDIES_DIR)) return []

  const files = fs.readdirSync(CASE_STUDIES_DIR).filter(
    (f) => f.endsWith('.mdx') && !f.startsWith('_')
  )

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(CASE_STUDIES_DIR, file), 'utf-8')
    const { data, content } = matter(raw)
    return { ...(data as CaseStudyFrontmatter), content }
  })
}

export function getAllCaseStudies(): CaseStudy[] {
  return readAllCaseStudies().sort((a, b) => a.order - b.order)
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  return readAllCaseStudies().find((c) => c.slug === slug) ?? null
}

export function getCaseStudySlugs(): string[] {
  return readAllCaseStudies().map((c) => c.slug)
}

// Cover images live in public/case-studies/<slug>.webp (or png/jpg)
export function resolveCaseStudyCover(slug: string): string | null {
  const exts = ['webp', 'png', 'jpg', 'jpeg']
  for (const ext of exts) {
    const p = path.join(process.cwd(), 'public', 'case-studies', `${slug}.${ext}`)
    if (fs.existsSync(p)) return `/case-studies/${slug}.${ext}`
  }
  return null
}
