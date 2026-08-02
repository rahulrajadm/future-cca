import type { DomainId, Question, ScenarioId } from '../types/question'
import type { ProgressState } from '../types/exam'

export function questionsByDomains(bank: Question[], domains: DomainId[]): Question[] {
  const set = new Set(domains)
  return bank.filter((q) => set.has(q.domain))
}

export function questionsByScenario(bank: Question[], scenarioId: ScenarioId): Question[] {
  return bank.filter((q) => q.scenarioId === scenarioId)
}

export function missedQuestions(bank: Question[], progress: ProgressState): Question[] {
  const byId = new Map(bank.map((q) => [q.id, q]))
  return progress.flagged
    .map((id) => byId.get(id))
    .filter((q): q is Question => q !== undefined)
}

export function questionsNeedingReview(bank: Question[], progress: ProgressState): Question[] {
  return bank.filter((q) => {
    const stats = progress.attemptsByQuestionId[q.id]
    return stats !== undefined && stats.lastResult === 'incorrect'
  })
}

function shuffleCopy<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function sampleQuestions(bank: Question[], count: number): Question[] {
  return shuffleCopy(bank).slice(0, count)
}
