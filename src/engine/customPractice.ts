import { DOMAINS } from '../data/domains'
import type { DomainId, Question } from '../types/question'
import type { RandomFn } from './examBuilder'

export const CUSTOM_COUNT_OPTIONS = [5, 10, 25, 60] as const
export type CustomCount = (typeof CUSTOM_COUNT_OPTIONS)[number]

export type AllocationStrategy = 'equal' | 'blueprint'

function shuffle<T>(items: T[], random: RandomFn): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/**
 * Largest-remainder apportionment of `total` items across domain weights,
 * so per-domain counts always sum to exactly `total`. `weights` need not
 * sum to exactly 1; only relative proportions matter.
 */
function apportionByWeights(total: number, weights: Record<DomainId, number>): Record<DomainId, number> {
  const weightSum = Object.values(weights).reduce((a: number, b) => a + (b as number), 0)
  const raw = DOMAINS.map((d) => ({ id: d.id, exact: (weights[d.id] / weightSum) * total }))
  const floors = raw.map((r) => ({ id: r.id, base: Math.floor(r.exact), remainder: r.exact - Math.floor(r.exact) }))
  let allocated = floors.reduce((sum, f) => sum + f.base, 0)
  const result: Record<number, number> = Object.fromEntries(floors.map((f) => [f.id, f.base]))

  const byRemainder = [...floors].sort((a, b) => b.remainder - a.remainder)
  let i = 0
  while (allocated < total) {
    result[byRemainder[i % byRemainder.length].id] += 1
    allocated += 1
    i += 1
  }
  return result as Record<DomainId, number>
}

export function apportionForStrategy(total: number, strategy: AllocationStrategy): Record<DomainId, number> {
  if (strategy === 'equal') {
    const equalWeights = Object.fromEntries(DOMAINS.map((d) => [d.id, 1])) as Record<DomainId, number>
    return apportionByWeights(total, equalWeights)
  }
  const blueprintWeights = Object.fromEntries(DOMAINS.map((d) => [d.id, d.weight])) as Record<DomainId, number>
  return apportionByWeights(total, blueprintWeights)
}

export interface CustomPracticeResult {
  questionIds: string[]
  /** Domains where the available pool was smaller than the requested target. */
  shortfalls: { domain: DomainId; target: number; actual: number }[]
}

/**
 * Build a custom-sized practice set allocated across all 5 domains per the
 * given strategy, optionally preferring never-attempted questions first.
 */
export function buildCustomPractice(
  questionBank: Question[],
  total: number,
  strategy: AllocationStrategy,
  attemptedIds?: Set<string>,
  random: RandomFn = Math.random,
): CustomPracticeResult {
  const targets = apportionForStrategy(total, strategy)
  const shortfalls: CustomPracticeResult['shortfalls'] = []
  const selected: Question[] = []

  for (const domain of DOMAINS) {
    const pool = questionBank.filter((q) => q.domain === domain.id)
    const target = targets[domain.id]

    let chosen: Question[]
    if (attemptedIds) {
      const unseen = shuffle(pool.filter((q) => !attemptedIds.has(q.id)), random)
      const seen = shuffle(pool.filter((q) => attemptedIds.has(q.id)), random)
      chosen = [...unseen, ...seen].slice(0, target)
    } else {
      chosen = shuffle(pool, random).slice(0, target)
    }

    if (chosen.length < target) {
      shortfalls.push({ domain: domain.id, target, actual: chosen.length })
    }
    selected.push(...chosen)
  }

  return {
    questionIds: shuffle(selected, random).map((q) => q.id),
    shortfalls,
  }
}
