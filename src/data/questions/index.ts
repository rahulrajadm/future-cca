import type { Question } from '../../types/question'
import { domain1Questions } from './domain-1-agentic-architecture'
import { domain2Questions } from './domain-2-tool-design-mcp'
import { domain3Questions } from './domain-3-claude-code-config'
import { domain4Questions } from './domain-4-prompt-engineering'
import { domain5Questions } from './domain-5-context-management'

export const QUESTION_BANK: Question[] = [
  ...domain1Questions,
  ...domain2Questions,
  ...domain3Questions,
  ...domain4Questions,
  ...domain5Questions,
]

export const QUESTION_BY_ID: Map<string, Question> = new Map(
  QUESTION_BANK.map((q) => [q.id, q]),
)
