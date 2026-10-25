import type { CaseStudyStat } from '@/lib/case-studies/case-studies'

type Props = { stats: CaseStudyStat[] }

export function StatGrid({ stats }: Props) {
  return (
    <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col bg-bg-dark p-5">
          <dt className="order-2 mt-2 text-xs leading-relaxed text-white/50">{stat.label}</dt>
          <dd className="order-1 font-display text-3xl text-white md:text-4xl">{stat.value}</dd>
        </div>
      ))}
    </dl>
  )
}
