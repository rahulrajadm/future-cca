import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { ExamSession, ProgressState } from '../types/exam'
import { loadProgress, saveProgress } from './progressStore'

interface AppStateValue {
  progress: ProgressState
  setProgress: (updater: (prev: ProgressState) => ProgressState) => void
  activeSession: ExamSession | null
  setActiveSession: (session: ExamSession | null) => void
}

const AppStateContext = createContext<AppStateValue | null>(null)

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [progress, setProgressState] = useState<ProgressState>(() => loadProgress())
  const [activeSession, setActiveSession] = useState<ExamSession | null>(null)

  const setProgress = useCallback((updater: (prev: ProgressState) => ProgressState) => {
    setProgressState((prev) => {
      const next = updater(prev)
      saveProgress(next)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ progress, setProgress, activeSession, setActiveSession }),
    [progress, setProgress, activeSession],
  )

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState(): AppStateValue {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider')
  return ctx
}
