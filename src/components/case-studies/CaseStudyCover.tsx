import Image from 'next/image'
import { resolveCaseStudyCover } from '@/lib/case-studies/case-studies'

type Props = {
  slug: string
  alt: string
  priority?: boolean
}

export function CaseStudyCover({ slug, alt, priority = false }: Props) {
  const src = resolveCaseStudyCover(slug)

  if (!src) {
    return (
      <div className="relative w-full aspect-video rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br from-violet-950/40 via-black to-blue-950/30" />
    )
  }

  return (
    <div className="relative w-full aspect-video rounded-2xl border border-white/10 overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority={priority}
        sizes="(max-width: 768px) 100vw, 896px"
      />
    </div>
  )
}
