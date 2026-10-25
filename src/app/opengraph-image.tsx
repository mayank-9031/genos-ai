import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'GenosAI | AI Automation Agency'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0F',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.18) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Brand name */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-3px',
            display: 'flex',
            marginBottom: 20,
          }}
        >
          GenosAI
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 26,
            color: 'rgba(255,255,255,0.55)',
            textAlign: 'center',
            maxWidth: 760,
            display: 'flex',
            lineHeight: 1.5,
          }}
        >
          Custom AI Chatbots · Voice Agents · Workflow Automation
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            gap: 72,
            marginTop: 52,
            paddingTop: 40,
            borderTop: '1px solid rgba(255,255,255,0.12)',
            width: 680,
            justifyContent: 'center',
          }}
        >
          {[
            { value: '23', label: 'Projects Delivered' },
            { value: '2026', label: 'Founded' },
            { value: '5', label: 'Countries' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span style={{ fontSize: 40, fontWeight: 700, color: 'white', display: 'flex' }}>
                {stat.value}
              </span>
              <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', display: 'flex' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Domain */}
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            fontSize: 18,
            color: 'rgba(255,255,255,0.25)',
            display: 'flex',
          }}
        >
          genosai.tech
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
