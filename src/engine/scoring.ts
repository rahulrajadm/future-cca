import { DOMAINS } from '../data/domains'
import type { DomainId, Question } from '../types/question'
import type { DomainBreakdown, ScoreReport } from '../types/exam'

/**
 * Approximate pass threshold, derived from the guide's stated cut score of
 * 720 on a 100-1000 scale, assuming our simple linear map
 * scaledScore = 100 + percentCorrect * 900. Solving 720 = 100 + 900x gives
 * x ~= 0.6889. This is NOT Anthropic's real (unpublished) scoring model.
 */
export const ASSUMED_PASS_PERCENT = (720 - 100) / 900

export function isOptionSetCorrect(selected: string[], correct: string[]): boolean {
  if (selected.length !== correct.length) return false
  const correctSet = new Set(correct)
  return selected.every((id) => correctSet.has(id))
}

export function scaledScoreApprox(percentCorrect: number): number {
  return Math.round(100 + percentCorrect * 900)
}

export interface GradedItem {
  question: Question
  selectedOptionIds: string[]
  isCorrect: boolean
}

export function gradeSession(
  questions: Question[],
  answers: Record<string, string[]>,
): GradedItem[] {
  return questions.map((question) => {
    const selectedOptionIds = answers[question.id] ?? []
    return {
      question,
      selectedOptionIds,
      isCorrect: isOptionSetCorrect(selectedOptionIds, question.correctOptionIds),
    }
  })
}

export function buildScoreReport(sessionId: string, graded: GradedItem[]): ScoreReport {
  const totalQuestions = graded.length
  const correctCount = graded.filter((g) => g.isCorrect).length
  const percentCorrect = totalQuestions === 0 ? 0 : correctCount / totalQuestions

  const domainBreakdown: DomainBreakdown[] = DOMAINS.map((domain) => {
    const inDomain = graded.filter((g) => g.question.domain === domain.id)
    const domainCorrect = inDomain.filter((g) => g.isCorrect).length
    return {
      domain: domain.id as DomainId,
      correct: domainCorrect,
      total: inDomain.length,
      percentCorrect: inDomain.length === 0 ? 0 : domainCorrect / inDomain.length,
      blueprintWeight: domain.weight,
    }
  }).filter((d) => d.total > 0)

  return {
    sessionId,
    totalQuestions,
    correctCount,
    percentCorrect,
    scaledScoreApprox: scaledScoreApprox(percentCorrect),
    passedApprox: percentCorrect >= ASSUMED_PASS_PERCENT,
    domainBreakdown,
    generatedAt: new Date().toISOString(),
  }
}
