import { ArrowDown, Check, RotateCcw, TriangleAlert } from 'lucide-react'
import { CAPTION, Frame, PANEL } from './visuals/primitives'

/* Coded illustrations for the "Why Teams Choose GenosAI" section.
   Each one shows the idea in its paragraph instead of using a stock photo.
   Figures inside are illustrative UI content, not performance claims. */

/* ─── 1. Capabilities wired into existing systems ─────────────── */

const CAPABILITIES = ['Chat', 'Voice', 'Vision', 'Recommenders', 'Decisions']
const SYSTEMS = ['CRM', 'Helpdesk', 'ERP', 'Email']

// Vertical centre (in %) of item i when n equal-height items are spaced with justify-around
function rowCentre(i: number, n: number) {
  return ((i + 0.5) / n) * 100
}

const CHIP =
  'block overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border border-white/[0.08] bg-[#131318] px-2 py-2 text-[0.6875rem] text-white/70 md:text-[0.75rem] lg:text-[0.6875rem] xl:text-[0.75rem]'

export function IntegrationsVisual() {
  return (
    <Frame glow="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex h-full flex-col px-5 py-6">
        <div className={`flex justify-between ${CAPTION}`}>
          <span>AI capabilities</span>
          <span>Your systems</span>
        </div>

        <div className="relative mt-4 mb-2 flex-1">
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full text-violet-400/35"
          >
            {CAPABILITIES.map((name, i) => {
              const y = rowCentre(i, CAPABILITIES.length)
              return (
                <path
                  key={name}
                  d={`M40 ${y} C46 ${y} 44 50 50 50`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              )
            })}
            {SYSTEMS.map((name, i) => {
              const y = rowCentre(i, SYSTEMS.length)
              return (
                <path
                  key={name}
                  d={`M50 50 C56 50 54 ${y} 60 ${y}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              )
            })}
          </svg>

          <div className="absolute inset-y-0 left-0 flex w-[40%] flex-col justify-around">
            {CAPABILITIES.map((name) => (
              <span key={name} className={CHIP}>
                {name}
              </span>
            ))}
          </div>

          <div className="absolute inset-y-0 right-0 flex w-[40%] flex-col justify-around">
            {SYSTEMS.map((name) => (
              <span key={name} className={`${CHIP} text-white/55`}>
                {name}
              </span>
            ))}
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="absolute inset-0 rounded-full bg-violet-400/20 motion-safe:animate-ping" />
            <span className="relative grid size-9 place-items-center rounded-full border border-violet-300/40 bg-[#1a1626]">
              <span className="size-2.5 rounded-full bg-violet-300" />
            </span>
          </div>
        </div>
      </div>
    </Frame>
  )
}

/* ─── 2. Cross-functional team working one problem ─────────────── */

const THREAD = [
  {
    role: 'Data scientist',
    initials: 'DS',
    tint: 'bg-violet-500/20 text-violet-200',
    text: 'Accuracy drops on scanned PDFs. I pulled 40 failing samples into a test set.',
  },
  {
    role: 'AI specialist',
    initials: 'AI',
    tint: 'bg-indigo-500/20 text-indigo-200',
    text: 'Handwriting is the common thread. A vision model reads those fields far better than OCR.',
    // Only shown on wide screens, where the card has room for four messages
    wideOnly: true,
  },
  {
    role: 'Engineer',
    initials: 'EN',
    tint: 'bg-sky-500/15 text-sky-200',
    text: 'Added a vision pass for handwritten fields before the parser runs.',
  },
  {
    role: 'Designer',
    initials: 'DE',
    tint: 'bg-fuchsia-500/15 text-fuchsia-200',
    text: 'Low-confidence values get highlighted so finance can check them in one click.',
  },
]

export function TeamVisual() {
  return (
    <Frame glow="-right-24 -top-24">
      <div className={`absolute inset-x-4 top-5 bottom-5 flex flex-col md:inset-x-5 ${PANEL}`}>
        <div className="border-b border-white/[0.06] px-4 py-3">
          <p className={CAPTION}>Invoice extraction</p>
          <p className="mt-0.5 text-[0.875rem] font-medium text-white/85">Handwritten totals are read wrong</p>
        </div>

        {/* min-h-0 lets the thread shrink and clip on narrow cards so the footer stays in view */}
        <div className="flex min-h-0 flex-col gap-4 overflow-hidden px-4 py-4 [mask-image:linear-gradient(to_bottom,black_calc(100%-16px),transparent)]">
          {THREAD.map((message, i) => (
            <div
              key={message.role}
              className={`relative gap-3 ${message.wideOnly ? 'hidden min-[1400px]:flex' : 'flex'} ${
                i < THREAD.length - 1
                  ? 'after:absolute after:left-[11.5px] after:top-7 after:-bottom-4 after:w-px after:bg-white/[0.08]'
                  : ''
              }`}
            >
              <span
                className={`grid size-6 shrink-0 place-items-center rounded-full text-[0.625rem] font-semibold ring-4 ring-[#131318] ${message.tint}`}
              >
                {message.initials}
              </span>
              <div>
                <p className="text-[0.75rem] font-medium text-white/70">{message.role}</p>
                <p className="mt-0.5 text-[0.78rem] leading-[1.55] text-white/45">{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2 border-t border-white/[0.06] px-4 py-3 text-[0.75rem]">
          <span className="grid size-4 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
            <Check className="size-2.5" strokeWidth={3} />
          </span>
          <span className="text-white/75">Fix shipped</span>
          <span className="text-white/35">All 40 samples pass</span>
        </div>
      </div>
    </Frame>
  )
}

/* ─── 3. Messy input turned into a structured record ───────────── */

const FIELDS = [
  { name: 'Vendor', value: 'Acme Corp', confidence: 96 },
  { name: 'Invoice', value: 'INV-0042', confidence: 98 },
  { name: 'Amount', value: '$1,240.00', confidence: 93 },
  { name: 'Due date', value: '14 Nov 2026', confidence: 84 },
]

export function DataVisual() {
  return (
    <Frame glow="-left-24 bottom-0">
      <div className="flex h-full flex-col justify-center px-5 py-6">
        <p className={CAPTION}>Forwarded email</p>
        <div className="mt-2 -rotate-[1.5deg] rounded-lg border border-dashed border-white/[0.14] bg-white/[0.02] px-3 py-2.5 font-mono text-[0.6875rem] leading-[1.7] text-white/45">
          fwd: inv 0042 - acme corp.
          <br />
          amt due 1,240.00 (vat incl??)
          <br />
          pls pay by nxt fri, 14/11
        </div>

        <div className="my-3 flex items-center justify-center gap-1.5 text-[0.6875rem] text-violet-300/80">
          <ArrowDown className="size-3.5" />
          <span>Structured</span>
        </div>

        <div className={`divide-y divide-white/[0.06] ${PANEL}`}>
          {FIELDS.map((field) => (
            <div key={field.name} className="flex items-center gap-3 px-3.5 py-2.5">
              <span className="w-16 shrink-0 text-[0.6875rem] text-white/35">{field.name}</span>
              <span className="flex-1 text-[0.78rem] tabular-nums text-white/80">{field.value}</span>
              <span className="h-1 w-10 overflow-hidden rounded-full bg-white/[0.08]">
                <span className="block h-full rounded-full bg-violet-400/70" style={{ width: `${field.confidence}%` }} />
              </span>
            </div>
          ))}
          <div className="flex items-center gap-3 px-3.5 py-2.5">
            <span className="w-16 shrink-0 text-[0.6875rem] text-white/35">VAT</span>
            <span className="flex-1 text-[0.78rem] text-white/50">Unclear</span>
            <span className="flex items-center gap-1 rounded-full bg-amber-400/10 px-2 py-0.5 text-[0.625rem] text-amber-200/90">
              <TriangleAlert className="size-3" />
              Needs review
            </span>
          </div>
        </div>
      </div>
    </Frame>
  )
}

/* ─── 4. Production runs, monitored from day one ───────────────── */

const HOURLY_LOAD = [18, 14, 11, 9, 8, 10, 16, 28, 44, 58, 63, 60, 57, 61, 66, 62, 55, 49, 41, 35, 30, 26, 22, 20]

const RUNS = [
  { task: 'Lead qualified', system: 'CRM', duration: '1.2s', retried: false },
  { task: 'Ticket routed', system: 'Helpdesk', duration: '0.8s', retried: false },
  { task: 'Call summarised', system: 'Phone', duration: '3.4s', retried: true },
  { task: 'Invoice parsed', system: 'Accounting', duration: '2.1s', retried: false },
]

export function ProductionVisual() {
  const peak = Math.max(...HOURLY_LOAD)

  return (
    <Frame glow="-left-20 -top-28">
      <div className={`absolute inset-x-4 top-5 bottom-5 flex flex-col lg:inset-x-6 lg:top-6 ${PANEL}`}>
        <div className="flex items-center justify-between px-4 pt-3.5">
          <p className="text-[0.8125rem] font-medium text-white/80">Production runs</p>
          <span className="flex items-center gap-1.5 text-[0.6875rem] text-white/45">
            <span className="size-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
            Live
          </span>
        </div>

        <div className="px-4 pt-4">
          <div aria-hidden="true" className="flex h-16 items-end gap-[3px] md:h-20">
            {HOURLY_LOAD.map((load, hour) => (
              <span
                key={hour}
                className={`flex-1 rounded-[2px] ${hour === HOURLY_LOAD.length - 1 ? 'bg-violet-300' : 'bg-violet-400/30'}`}
                style={{ height: `${(load / peak) * 100}%` }}
              />
            ))}
          </div>
          <div className={`mt-1.5 flex justify-between ${CAPTION}`}>
            <span>00:00</span>
            <span>12:00</span>
            <span>Now</span>
          </div>
        </div>

        <div className="mt-3 divide-y divide-white/[0.05] border-t border-white/[0.06]">
          {RUNS.map((run) => (
            <div key={run.task} className="flex items-center gap-3 px-4 py-2.5 text-[0.75rem]">
              {run.retried ? (
                <span className="grid size-4 shrink-0 place-items-center rounded-full bg-amber-400/15 text-amber-200">
                  <RotateCcw className="size-2.5" strokeWidth={3} />
                </span>
              ) : (
                <span className="grid size-4 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
                  <Check className="size-2.5" strokeWidth={3} />
                </span>
              )}
              <span className="text-white/75">{run.task}</span>
              <span className="hidden text-white/30 sm:inline">{run.system}</span>
              <span className="ml-auto text-white/35">{run.retried ? 'Retried, then passed' : ''}</span>
              <span className="w-8 text-right tabular-nums text-white/45">{run.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  )
}

/* ─── 5. Data turned into a decision someone can act on ────────── */

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const REFUND_REQUESTS = [30, 82, 36, 28, 26, 24, 22]
const SPIKE_DAY = 1

// Chart coordinates in a 0–100 box: x spreads days evenly, y is inverted so higher values sit higher
const POINTS = REFUND_REQUESTS.map((value, i): [number, number] => [(i / (DAYS.length - 1)) * 100, 100 - value])

function smoothPath(points: [number, number][]) {
  return points.reduce((d, [x, y], i) => {
    if (i === 0) return `M${x} ${y}`
    const [px, py] = points[i - 1]
    const mx = (px + x) / 2
    return `${d} C${mx} ${py} ${mx} ${y} ${x} ${y}`
  }, '')
}

export function InsightVisual() {
  const line = smoothPath(POINTS)
  const [spikeX, spikeY] = POINTS[SPIKE_DAY]

  return (
    <Frame glow="-right-20 -bottom-28">
      <div className={`absolute inset-x-4 top-5 bottom-5 flex flex-col lg:inset-x-6 lg:top-6 ${PANEL}`}>
        <p className="px-4 pt-3.5 text-[0.8125rem] font-medium text-white/80">Refund requests this week</p>

        <div className="relative mx-4 mt-4 min-h-[96px] flex-1">
          <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="why-insight-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(167 139 250)" stopOpacity="0.28" />
                <stop offset="100%" stopColor="rgb(167 139 250)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${line} L100 100 L0 100 Z`} fill="url(#why-insight-fill)" />
            <path d={line} fill="none" stroke="rgb(196 181 253)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            <line
              x1={spikeX}
              y1={spikeY}
              x2="100"
              y2={spikeY}
              stroke="rgb(196 181 253 / 0.45)"
              strokeWidth="1"
              strokeDasharray="3 3"
              vectorEffect="non-scaling-stroke"
              className="hidden md:block"
            />
          </svg>

          <span
            aria-hidden="true"
            className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-300 ring-4 ring-violet-400/20"
            style={{ left: `${spikeX}%`, top: `${spikeY}%` }}
          />
        </div>

        <div className={`mx-4 mt-2 mb-3.5 flex justify-between ${CAPTION}`}>
          {DAYS.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        {/* Sits under the chart on small screens; floats over the chart's empty corner from md up */}
        <div className="mx-4 mb-4 rounded-xl border border-violet-400/25 bg-[#17141f] p-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] md:absolute md:right-4 md:top-14 md:mx-0 md:mb-0 md:w-[min(64%,330px)]">
          <p className="text-[0.8125rem] font-medium leading-snug text-white/85">Refund requests spiked on Tuesday</p>
          <p className="mt-1 text-[0.75rem] leading-[1.5] text-white/45">
            Most mention late delivery from one warehouse.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-3 py-1.5 text-[0.6875rem] font-semibold text-[#0A0A0F]">
              Alert operations
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1.5 text-[0.6875rem] text-white/70">
              Draft customer reply
            </span>
          </div>
        </div>
      </div>
    </Frame>
  )
}
