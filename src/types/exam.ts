import type { DomainId, Question, ScenarioId } from './question'

export type PracticeMode = 'exam' | 'domain' | 'scenario' | 'review' | 'custom'

export interface ExamSession {
  id: string
  mode: PracticeMode
  startedAt: string
  /** null while untimed or not yet started. */
  timeLimitSeconds: number | null
  scenarioIds: ScenarioId[]
  questionIds: string[]
  /** questionId -> selected option ids, in selection order. */
  answers: Record<string, string[]>
  flagged: string[]
  submittedAt: string | null
}

export interface DomainBreakdown {
  domain: DomainId
  correct: number
  total: number
  percentCorrect: number
  blueprintWeight: number
}

export interface ScoreReport {
  sessionId: string
  totalQuestions: number
  correctCount: number
  percentCorrect: number
  /** Approximate, linearly-mapped estimate — NOT Anthropic's real scoring model. */
  scaledScoreApprox: number
  passedApprox: boolean
  domainBreakdown: DomainBreakdown[]
  generatedAt: string
}

export interface QuestionAttemptStats {
  seenCount: number
  correctCount: number
  lastResult: 'correct' | 'incorrect'
  lastSeenAt: string
}

export interface ExamAttemptSummary {
  sessionId: string
  mode: PracticeMode
  completedAt: string
  scenarioIds: ScenarioId[]
  percentCorrect: number
  scaledScoreApprox: number
  passedApprox: boolean
  domainBreakdown: DomainBreakdown[]
}

export interface ProgressState {
  version: 1
  attemptsByQuestionId: Record<string, QuestionAttemptStats>
  examHistory: ExamAttemptSummary[]
  flagged: string[]
}

export interface ScoredQuestion {
  question: Question
  selectedOptionIds: string[]
  isCorrect: boolean
}
