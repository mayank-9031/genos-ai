'use client'

import { Check, LoaderCircle } from 'lucide-react'
import { BODY_TEXT, CAPTION, Frame, PANEL, PANEL_HEADER, PANEL_TITLE, STAGE } from '../primitives'
import { useSequence } from '../useSequence'

const STEPS = [
  { label: 'Order form submitted', system: 'Trigger' },
  { label: 'Customer record updated', system: 'CRM' },
  { label: 'Invoice created', system: 'ERP' },
  { label: 'Row added to tracker', system: 'Sheets' },
  { label: 'Approval sent to finance', system: 'Email' },
]

function StepIcon({ state }: { state: 'done' | 'running' | 'pending' }) {
  if (state === 'done') {
    return (
      <span className="grid size-4 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
        <Check className="size-2.5" strokeWidth={3} />
      </span>
    )
  }
  if (state === 'running') {
    return <LoaderCircle className="size-4 shrink-0 text-violet-300 motion-safe:animate-spin" />
  }
  return <span className="size-4 shrink-0 rounded-full border border-white/15" />
}

export function WorkflowVisual() {
  // Step n means the first n steps have finished and step n is running
  const [ref, step] = useSequence<HTMLDivElement>(STEPS.length, 900)
  const finished = step >= STEPS.length

  return (
    <Frame glow="-right-24 -bottom-24">
      <div ref={ref} className={STAGE}>
        <div className={`w-full max-w-[26rem] ${PANEL}`}>
          <div className={PANEL_HEADER}>
            <span className={PANEL_TITLE}>New order workflow</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[0.625rem] transition-colors duration-300 ${
                finished ? 'bg-emerald-400/15 text-emerald-200' : 'bg-violet-400/15 text-violet-200'
              }`}
            >
              {finished ? 'Completed' : 'Running'}
            </span>
          </div>

          <ol className="divide-y divide-white/[0.05]">
            {STEPS.map((item, i) => {
              const state = i < step ? 'done' : i === step ? 'running' : 'pending'
              return (
                <li key={item.label} className="flex items-center gap-2.5 px-3 py-2 @md:px-4 @md:py-2.5">
                  <StepIcon state={state} />
                  <span
                    className={`flex-1 truncate transition-colors duration-300 ${BODY_TEXT} ${
                      state === 'pending' ? 'text-white/35' : 'text-white/80'
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className={CAPTION}>{item.system}</span>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </Frame>
  )
}
