import type { ReactNode } from 'react'
import { postComponents } from '@/components/blog/PostBody'

/* MDX components for case studies. next-mdx-remote v6 blocks JS expressions in MDX,
   so every component here takes plain string props and markdown children only. */

type C = { children?: ReactNode }

const tableComponents = {
  table: ({ children }: C) => (
    // Narrow tables wrap to fit; only genuinely wide ones scroll sideways on phones
    <div className="mb-8 overflow-x-auto rounded-xl border border-white/10 [scrollbar-color:rgba(255,255,255,0.2)_transparent] [scrollbar-width:thin]">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }: C) => <thead className="bg-white/[0.04]">{children}</thead>,
  th: ({ children }: C) => (
    <th className="border-b border-white/10 px-4 py-3 text-xs font-medium text-white/50">{children}</th>
  ),
  td: ({ children }: C) => (
    <td className="border-b border-white/[0.06] px-4 py-3 align-top leading-relaxed text-white/75 first:font-medium first:text-white/90">
      {children}
    </td>
  ),
}

/* ─── Summary cards ─────────────────────────────────────────────── */

function CardGrid({ children }: C) {
  return <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
}

function Card({ kicker, title, children }: C & { kicker?: string; title: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      {kicker && <p className="mb-1 text-sm text-violet-300/80">{kicker}</p>}
      <p className="mb-2 font-medium text-white">{title}</p>
      <div className="text-sm leading-relaxed text-white/60">{children}</div>
    </div>
  )
}

/* ─── WhatsApp-style conversation mockups ──────────────────────── */

function Chat({ name, subtitle = 'business account', initials, children }: C & {
  name: string
  subtitle?: string
  initials: string
}) {
  return (
    <figure className="mx-auto mb-8 w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#0f1412]">
      <div className="flex items-center gap-3 bg-[#0f3d34] px-4 py-3">
        <span className="grid size-8 place-items-center rounded-full bg-white/15 text-xs font-semibold text-white">
          {initials}
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-medium text-white">{name}</span>
          <span className="block text-xs text-white/55">{subtitle}</span>
        </span>
      </div>
      <div className="flex flex-col gap-2 p-3">{children}</div>
    </figure>
  )
}

function Msg({ side = 'in', time, children }: C & { side?: 'in' | 'out'; time?: string }) {
  const isOut = side === 'out'
  return (
    <div
      className={`max-w-[85%] rounded-xl px-3 py-2 text-[0.8125rem] leading-snug ${
        isOut ? 'ml-auto rounded-br-sm bg-[#1d4a3a] text-white/90' : 'rounded-bl-sm bg-white/[0.07] text-white/85'
      }`}
    >
      {children}
      {time && <span className="mt-1 block text-right text-[0.6875rem] text-white/40">{time}</span>}
    </div>
  )
}

function Choice({ children }: C) {
  return (
    <div className="max-w-[85%] rounded-lg bg-white/[0.04] px-3 py-1.5 text-center text-[0.8125rem] text-sky-300">
      {children}
    </div>
  )
}

function Photo({ side = 'out', children }: C & { side?: 'in' | 'out' }) {
  return (
    <div
      className={`flex h-16 w-40 items-end rounded-lg bg-gradient-to-br from-sky-700/60 to-emerald-800/60 p-2 text-[0.6875rem] font-medium text-white/85 ${
        side === 'out' ? 'ml-auto' : ''
      }`}
    >
      {children}
    </div>
  )
}

function SystemNote({ children }: C) {
  return (
    <div className="mx-auto rounded-md bg-sky-400/10 px-2.5 py-1 text-center text-[0.6875rem] text-sky-200/80">
      {children}
    </div>
  )
}

function Caption({ children }: C) {
  return <p className="-mt-5 mb-8 text-center text-xs text-white/35">{children}</p>
}

export const caseStudyComponents = {
  ...postComponents,
  ...tableComponents,
  CardGrid,
  Card,
  Chat,
  Msg,
  Choice,
  Photo,
  SystemNote,
  Caption,
}
