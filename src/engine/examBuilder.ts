import { DOMAINS } from '../data/domains'
import { SCENARIOS } from '../data/scenarios'
import type { DomainId, Question, ScenarioId } from '../types/question'

export const EXAM_ITEM_COUNT = 60
export const EXAM_SCENARIO_COUNT = 4
export const EXAM_TIME_LIMIT_SECONDS = 120 * 60

export type RandomFn = () => number

function shuffle<T>(items: T[], random: RandomFn): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function pickScenarios(random: RandomFn): ScenarioId[] {
  const ids = SCENARIOS.map((s) => s.id)
  return shuffle(ids, random).slice(0, EXAM_SCENARIO_COUNT).sort((a, b) => a - b)
}

/**
 * Largest-remainder apportionment of `total` items across domain weights,
 * so per-domain counts always sum to exactly `total`.
 */
function apportionByWeight(total: number): Record<DomainId, number> {
  const raw = DOMAINS.map((d) => ({ id: d.id, exact: d.weight * total }))
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

export interface BuiltExam {
  scenarioIds: ScenarioId[]
  questionIds: string[]
  /** Domains where the available pool was smaller than the blueprint target. */
  shortfalls: { domain: DomainId; target: number; actual: number }[]
}

/**
 * @param attemptedIds Question ids already attempted (e.g. from progress state).
 *   When provided, each domain's pool is filled from never-attempted questions
 *   first, falling back to already-attempted ones only if there aren't enough
 *   unseen questions to reach the domain's target count.
 */
export function buildExam(
  questionBank: Question[],
  random: RandomFn = Math.random,
  attemptedIds?: Set<string>,
): BuiltExam {
  const scenarioIds = pickScenarios(random)
  const scenarioSet = new Set<ScenarioId>(scenarioIds)
  const targets = apportionByWeight(EXAM_ITEM_COUNT)
  const shortfalls: BuiltExam['shortfalls'] = []

  const selected: Question[] = []
  for (const domain of DOMAINS) {
    const pool = questionBank.filter(
      (q) => q.domain === domain.id && (q.scenarioId === null || scenarioSet.has(q.scenarioId)),
    )
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
    scenarioIds,
    questionIds: shuffle(selected, random).map((q) => q.id),
    shortfalls,
  }
}
