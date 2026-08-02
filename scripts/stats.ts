import { QUESTION_BANK } from '../src/data/questions/index'
import { DOMAINS } from '../src/data/domains'
import { SCENARIOS } from '../src/data/scenarios'

const total = QUESTION_BANK.length

console.log(`\nTotal questions: ${total}\n`)

console.log('By domain (actual vs blueprint weight):')
for (const domain of DOMAINS) {
  const count = QUESTION_BANK.filter((q) => q.domain === domain.id).length
  const actualPct = total === 0 ? 0 : (count / total) * 100
  const targetPct = domain.weight * 100
  console.log(
    `  D${domain.id} ${domain.name.padEnd(38)} ${count.toString().padStart(3)} questions  ${actualPct.toFixed(1).padStart(5)}% actual vs ${targetPct.toFixed(0)}% target`,
  )
}

console.log('\nBy scenario:')
for (const scenario of SCENARIOS) {
  const count = QUESTION_BANK.filter((q) => q.scenarioId === scenario.id).length
  console.log(`  S${scenario.id} ${scenario.title.padEnd(38)} ${count} questions`)
}
const domainOnly = QUESTION_BANK.filter((q) => q.scenarioId === null).length
console.log(`  -- Domain-only (no scenario)              ${domainOnly} questions`)

console.log('\nBy task statement:')
for (const domain of DOMAINS) {
  for (const ts of domain.taskStatements) {
    const count = QUESTION_BANK.filter((q) => q.taskStatements.includes(ts.code)).length
    const marker = count === 0 ? '  <- uncovered' : ''
    console.log(`  ${ts.code}  ${count.toString().padStart(3)} questions${marker}`)
  }
}

console.log('\nVerification status:')
const verified = QUESTION_BANK.filter((q) => q.verification.status === 'verified').length
const flagged = QUESTION_BANK.filter((q) => q.verification.status === 'flagged').length
const unverified = total - verified - flagged
console.log(`  verified:   ${verified}`)
console.log(`  flagged:    ${flagged}`)
console.log(`  unverified: ${unverified}`)
