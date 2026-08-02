# Verification Process

Every question in this bank is verified for correctness before it's marked `'verified'` and
required to stay that way on `main`. This is a zero-required-cost process — no Anthropic API
billing is needed to build, test, or deploy this project.

## The blind-verification pass

For each question, before marking it verified:

1. The reviewer reads the **stem and options only** — without looking at the authored
   `correctOptionIds` or `explanationSummary` — and independently decides which answer(s) they'd
   pick.
2. That independent answer is compared to the authored answer key.
   - **Match:** proceed to step 3.
   - **Mismatch:** the question or the key is revised until the reviewer's independent read and
     the stored key agree, or the question is discarded if it turns out to be genuinely ambiguous.
3. The reviewer confirms every option (not just the correct one) has a substantive rationale in
   the "plausible but wrong because X" style used by the exam guide's own sample questions.
4. The reviewer confirms the `domain`, `scenarioId`, and `taskStatements` tags accurately describe
   what the question tests.
5. The question's `verification` field is set:
   ```ts
   verification: {
     status: 'verified',
     reviewer: 'claude-blind-pass', // or a human's name/handle
     method: 'human',               // or 'human+llm' if an LLM chat was also consulted manually
     date: '2026-08-01',
     notes: 'optional context, e.g. what was revised and why',
   }
   ```

This process deliberately avoids requiring an API integration: the "blind" part of the pass comes
from not looking at the answer key while re-solving the question, not from calling a separate
model. Where an LLM chat interface was used as a second blind opinion (copy-pasted manually, not
via API), record `method: 'human+llm'`.

## CI enforcement (free, no API calls)

`tests/questionBank.validate.test.ts` runs on every push/PR via `.github/workflows/ci.yml` and
hard-fails the build if any question merged to `main`:

- has a malformed or duplicate `id`
- references a `domain`, `scenarioId`, or `taskStatements` code that doesn't exist
- has the wrong number of options, duplicate option ids, or a `correctOptionIds` set that doesn't
  match `selectCount`
- is missing a substantive stem, explanation, or per-option rationale
- is not `verification.status === 'verified'`

It also prints (non-fatal) warnings for scenario/domain tagging mismatches and for domain
proportions drifting from the blueprint weights — expected while the bank is mid-authoring, worth
checking before a release.

`docs/verification-log.md` is generated from the live question bank (`npm run gen:verification-log`)
and CI checks it hasn't drifted out of sync with the data (`npm run check:verification-log`).

## Optional: LLM-assisted re-verification with your own API key

`scripts/llm-verify.ts` is an **optional** maintainer tool, **never run in CI**, **not required**
to build or deploy this app. It calls the Anthropic Messages API with your own
`ANTHROPIC_API_KEY` (this will incur API costs on your account) to blind-answer questions and flag
mismatches — useful as a second opinion when reviewing contributions from others.

```bash
ANTHROPIC_API_KEY=sk-ant-... npx tsx scripts/llm-verify.ts --domain 1
```
