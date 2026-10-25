import type { ReactNode } from 'react'

/* Shared building blocks for the coded section illustrations.
   Figures inside illustrations are sample UI content, not performance claims. */

export const PANEL =
  'rounded-xl border border-white/[0.08] bg-[#131318]/95 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)]'

export const CAPTION = 'text-[0.6875rem] text-white/35'

// Centres a single panel inside a Frame; sizes key off the Frame's width, not the viewport
export const STAGE = 'flex h-full items-center justify-center p-3 @sm:p-5 @md:p-6'
export const PANEL_HEADER =
  'flex items-center justify-between gap-3 border-b border-white/[0.06] px-3 py-2 @md:px-4 @md:py-2.5'
export const PANEL_TITLE = 'text-[0.75rem] font-medium text-white/80 @md:text-[0.8125rem]'
export const BODY_TEXT = 'text-[0.6875rem] @md:text-[0.78rem]'

export function Frame({ glow, children }: { glow: string; children: ReactNode }) {
  return (
    <div className="@container relative h-full w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0b0b0f]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div aria-hidden="true" className={`absolute h-72 w-72 rounded-full bg-violet-600/20 blur-[90px] ${glow}`} />
      <div className="relative h-full">{children}</div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#0b0b0f] to-transparent"
      />
    </div>
  )
}

/* Fades content in when its step is reached; keeps its space so the layout never jumps */
export function Reveal({ show, className = '', children }: { show: boolean; className?: string; children: ReactNode }) {
  return (
    <div
      className={`transition-[opacity,transform] duration-500 ease-out ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-1.5 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}
