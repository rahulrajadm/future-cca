import { describe, expect, it } from 'vitest'
import { QUESTION_BANK } from '../src/data/questions/index'
import { DOMAINS, DOMAIN_MAP } from '../src/data/domains'
import { SCENARIO_MAP } from '../src/data/scenarios'

const ID_PATTERN = /^q[1-5]-(s[1-6]|x)-\d{4}$/
const MIN_STEM_LENGTH = 40
const MIN_EXPLANATION_LENGTH = 40
const MIN_RATIONALE_LENGTH = 10

/**
 * Hard requirement by default: every shipped question must be verified.
 * Set ALLOW_UNVERIFIED=true (feature-branch CI only, never on `main`) to
 * relax this while a batch is mid-authoring.
 */
const REQUIRE_VERIFIED = process.env.ALLOW_UNVERIFIED !== 'true'

function idParts(id: string): { domain: string; scenario: string; seq: string } | null {
  const match = ID_PATTERN.exec(id)
  if (!match) return null
  const [, rest] = id.split('q')
  const [domainPart, scenarioPart, seq] = rest.split('-')
  return { domain: domainPart, scenario: scenarioPart, seq }
}

describe('question bank structural validation', () => {
  it('all question ids are globally unique', () => {
    const ids = QUESTION_BANK.map((q) => q.id)
    const seen = new Set<string>()
    const dupes: string[] = []
    for (const id of ids) {
      if (seen.has(id)) dupes.push(id)
      seen.add(id)
    }
    expect(dupes).toEqual([])
  })

  describe.each(QUESTION_BANK)('question $id', (question) => {
    it('has a well-formed id consistent with domain/scenario', () => {
      expect(question.id).toMatch(ID_PATTERN)
      const parts = idParts(question.id)
      expect(parts).not.toBeNull()
      expect(Number(parts!.domain)).toBe(question.domain)
      if (question.scenarioId === null) {
        expect(parts!.scenario).toBe('x')
      } else {
        expect(parts!.scenario).toBe(`s${question.scenarioId}`)
      }
    })

    it('has a domain in range 1-5', () => {
      expect(question.domain).toBeGreaterThanOrEqual(1)
      expect(question.domain).toBeLessThanOrEqual(5)
      expect(DOMAIN_MAP[question.domain]).toBeDefined()
    })

    it('has a scenarioId that is null or in range 1-6', () => {
      if (question.scenarioId !== null) {
        expect(question.scenarioId).toBeGreaterThanOrEqual(1)
        expect(question.scenarioId).toBeLessThanOrEqual(6)
        expect(SCENARIO_MAP[question.scenarioId]).toBeDefined()
      }
    })

    it('has non-empty task statements that exist under its domain', () => {
      expect(question.taskStatements.length).toBeGreaterThan(0)
      const validCodes = new Set(DOMAIN_MAP[question.domain]?.taskStatements.map((t) => t.code) ?? [])
      for (const code of question.taskStatements) {
        expect(validCodes.has(code), `task statement ${code} not found in domain ${question.domain}`).toBe(true)
      }
    })

    it('has between 4 and 6 options with unique ids', () => {
      expect(question.options.length).toBeGreaterThanOrEqual(4)
      expect(question.options.length).toBeLessThanOrEqual(6)
      const ids = question.options.map((o) => o.id)
      expect(new Set(ids).size).toBe(ids.length)
    })

    it('has a valid selectCount and correctOptionIds set', () => {
      expect(question.selectCount).toBeGreaterThanOrEqual(1)
      expect(question.selectCount).toBeLessThanOrEqual(question.options.length)
      expect(question.correctOptionIds.length).toBe(question.selectCount)

      const optionIds = new Set(question.options.map((o) => o.id))
      for (const correctId of question.correctOptionIds) {
        expect(optionIds.has(correctId)).toBe(true)
      }
      expect(new Set(question.correctOptionIds).size).toBe(question.correctOptionIds.length)
    })

    it('has a substantive stem and explanation', () => {
      expect(question.stem.trim().length).toBeGreaterThanOrEqual(MIN_STEM_LENGTH)
      expect(question.explanationSummary.trim().length).toBeGreaterThanOrEqual(MIN_EXPLANATION_LENGTH)
    })

    it('has a non-empty rationale for every option', () => {
      for (const option of question.options) {
        expect(
          option.rationale.trim().length,
          `option ${option.id} on ${question.id} is missing a substantive rationale`,
        ).toBeGreaterThanOrEqual(MIN_RATIONALE_LENGTH)
      }
    })

    if (REQUIRE_VERIFIED) {
      it('is verified (hard-required on main)', () => {
        expect(question.verification.status).toBe('verified')
        expect(question.verification.reviewer.length).toBeGreaterThan(0)
        expect(question.verification.date.length).toBeGreaterThan(0)
      })
    }
  })
})

describe('question bank soft warnings (do not fail the build)', () => {
  it('warns if the bank is empty', () => {
    if (QUESTION_BANK.length === 0) {
      console.warn('[warn] question bank is empty — expected only during initial Phase 0 scaffolding')
    }
    expect(true).toBe(true)
  })

  it('flags scenario/domain mismatches for human review', () => {
    const mismatches = QUESTION_BANK.filter((q) => {
      if (q.scenarioId === null) return false
      const scenario = SCENARIO_MAP[q.scenarioId]
      return scenario !== undefined && !scenario.primaryDomains.includes(q.domain)
    })
    if (mismatches.length > 0) {
      console.warn(
        `[warn] ${mismatches.length} question(s) tagged to a scenario outside that scenario's primary domains:`,
        mismatches.map((q) => q.id).join(', '),
      )
    }
    expect(true).toBe(true)
  })

  it('reports domain distribution vs blueprint weights', () => {
    const counts: Record<number, number> = {}
    for (const q of QUESTION_BANK) {
      counts[q.domain] = (counts[q.domain] ?? 0) + 1
    }
    const total = QUESTION_BANK.length || 1
    for (const domain of DOMAINS) {
      const actual = (counts[domain.id] ?? 0) / total
      const delta = Math.abs(actual - domain.weight)
      if (delta > 0.05) {
        console.warn(
          `[warn] domain ${domain.id} (${domain.name}) is at ${(actual * 100).toFixed(1)}% of the bank vs blueprint target ${(domain.weight * 100).toFixed(0)}% (expected while the bank is mid-authoring)`,
        )
      }
    }
    expect(true).toBe(true)
  })
})
