'use client'

import { ReactNode } from 'react'
import { useScrollEngine } from '@/hooks/useScrollEngine'

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useScrollEngine()
  return <>{children}</>
}
