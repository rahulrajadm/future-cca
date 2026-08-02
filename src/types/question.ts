export type DomainId = 1 | 2 | 3 | 4 | 5

export type ScenarioId = 1 | 2 | 3 | 4 | 5 | 6

export interface AnswerOption {
  /** Unique within the question, e.g. 'A' | 'B' | 'C' | 'D' | 'E'. */
  id: string
  text: string
  /**
   * Required for every option, not just the correct one(s) — explains why it's
   * right, or why it's a plausible-but-wrong distractor. Mirrors the style of
   * the official exam guide's sample questions.
   */
  rationale: string
}

export type VerificationStatus = 'unverified' | 'verified' | 'flagged'

export interface VerificationRecord {
  status: VerificationStatus
  /** Who/what performed the verification pass, e.g. "claude-blind-pass". */
  reviewer: string
  method: 'human' | 'human+llm'
  /** ISO date string. */
  date: string
  notes?: string
}

export type Difficulty = 'foundational' | 'applied' | 'advanced'

export interface Question {
  /** Format: "q{domain}-s{scenario}-{seq}" or "q{domain}-x-{seq}" for domain-only. */
  id: string
  domain: DomainId
  /** null for domain-only questions not grounded in one of the 6 scenarios. */
  scenarioId: ScenarioId | null
  /** Task statement codes this question exercises, e.g. ["1.1", "1.5"]. */
  taskStatements: string[]
  /** 1 = single-select, N = "select N" multi-response. */
  selectCount: number
  stem: string
  options: AnswerOption[]
  /** Length must equal selectCount. */
  correctOptionIds: string[]
  /** Overall rationale, in addition to each option's own rationale. */
  explanationSummary: string
  difficulty?: Difficulty
  verification: VerificationRecord
  createdAt: string
}
