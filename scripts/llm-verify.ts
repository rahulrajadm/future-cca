/**
 * OPTIONAL maintainer tool. NOT run in CI, NOT required to build or deploy
 * this app. Uses your own Anthropic API key and will incur API costs.
 *
 * Sends each question to Claude "blind" (stem + options only, no answer key)
 * and compares Claude's answer to the stored correctOptionIds, printing any
 * mismatches for human review. This mirrors — with a real API call instead
 * of the zero-cost editor-assisted pass used to build this bank — the
 * verification process documented in docs/VERIFICATION.md.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-ant-... npx tsx scripts/llm-verify.ts [--domain 1] [--id q1-s1-0001]
 */
import { QUESTION_BANK } from '../src/data/questions/index'
import type { Question } from '../src/types/question'

const API_KEY = process.env.ANTHROPIC_API_KEY
const MODEL = process.env.ANTHROPIC_MODEL ?? 'claude-sonnet-4-5-20250929'

if (!API_KEY) {
  console.error('ANTHROPIC_API_KEY is not set. This script requires your own API key and is never run in CI.')
  process.exit(1)
}

function parseArg(flag: string): string | undefined {
  const idx = process.argv.indexOf(flag)
  return idx === -1 ? undefined : process.argv[idx + 1]
}

const domainFilter = parseArg('--domain')
const idFilter = parseArg('--id')

let targets: Question[] = QUESTION_BANK
if (domainFilter) targets = targets.filter((q) => q.domain === Number(domainFilter))
if (idFilter) targets = targets.filter((q) => q.id === idFilter)

function buildPrompt(q: Question): string {
  const optionLines = q.options.map((o) => `${o.id}. ${o.text}`).join('\n')
  return [
    q.stem,
    '',
    optionLines,
    '',
    `Select exactly ${q.selectCount} answer(s). Reply with ONLY the option letter(s), comma-separated, nothing else (e.g. "A" or "B, D").`,
  ].join('\n')
}

async function askClaude(prompt: string): Promise<string> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 64,
      messages: [{ role: 'user', content: prompt }],
    }),
  })
  if (!res.ok) {
    throw new Error(`Anthropic API error ${res.status}: ${await res.text()}`)
  }
  const data = (await res.json()) as { content: { type: string; text?: string }[] }
  return data.content.find((c) => c.type === 'text')?.text ?? ''
}

function parseAnswer(raw: string): string[] {
  return Array.from(raw.toUpperCase().matchAll(/[A-F]/g)).map((m) => m[0])
}

async function main() {
  console.log(`Blind-verifying ${targets.length} question(s) against ${MODEL}...\n`)
  let mismatches = 0

  for (const q of targets) {
    const raw = await askClaude(buildPrompt(q))
    const claudeAnswer = parseAnswer(raw).sort()
    const expected = [...q.correctOptionIds].sort()
    const match = JSON.stringify(claudeAnswer) === JSON.stringify(expected)

    if (!match) {
      mismatches += 1
      console.log(`MISMATCH ${q.id}`)
      console.log(`  expected: ${expected.join(', ')}`)
      console.log(`  claude:   ${claudeAnswer.join(', ') || '(unparseable: ' + raw.trim() + ')'}`)
      console.log('')
    }
  }

  console.log(`\nDone. ${targets.length - mismatches}/${targets.length} matched.`)
  if (mismatches > 0) {
    console.log(`${mismatches} question(s) need human review — see MISMATCH lines above.`)
    process.exitCode = 1
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
