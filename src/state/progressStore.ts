import type { ExamAttemptSummary, ProgressState, QuestionAttemptStats } from '../types/exam'

const STORAGE_KEY = 'ccarf-prep:v1'

function emptyState(): ProgressState {
  return { version: 1, attemptsByQuestionId: {}, examHistory: [], flagged: [] }
}

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyState()
    const parsed = JSON.parse(raw) as ProgressState
    if (parsed.version !== 1) return emptyState()
    return parsed
  } catch {
    return emptyState()
  }
}

export function saveProgress(state: ProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage unavailable (private browsing, quota exceeded, etc.) — progress just won't persist.
  }
}

export function recordAnswer(
  state: ProgressState,
  questionId: string,
  isCorrect: boolean,
): ProgressState {
  const prev: QuestionAttemptStats = state.attemptsByQuestionId[questionId] ?? {
    seenCount: 0,
    correctCount: 0,
    lastResult: 'incorrect',
    lastSeenAt: new Date().toISOString(),
  }
  const next: QuestionAttemptStats = {
    seenCount: prev.seenCount + 1,
    correctCount: prev.correctCount + (isCorrect ? 1 : 0),
    lastResult: isCorrect ? 'correct' : 'incorrect',
    lastSeenAt: new Date().toISOString(),
  }
  return {
    ...state,
    attemptsByQuestionId: { ...state.attemptsByQuestionId, [questionId]: next },
  }
}

export function recordExamAttempt(
  state: ProgressState,
  summary: ExamAttemptSummary,
): ProgressState {
  return { ...state, examHistory: [summary, ...state.examHistory].slice(0, 50) }
}

export function toggleFlag(state: ProgressState, questionId: string): ProgressState {
  const flagged = state.flagged.includes(questionId)
    ? state.flagged.filter((id) => id !== questionId)
    : [...state.flagged, questionId]
  return { ...state, flagged }
}

export function resetProgress(): ProgressState {
  const fresh = emptyState()
  saveProgress(fresh)
  return fresh
}
