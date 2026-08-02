# Authoring Guide

How to add questions to `src/data/questions/`.

## Style, grounded in the official exam guide's 12 sample questions

- **Scenario-grounded where possible.** Ground the question in one of the 6 scenarios
  (`src/data/scenarios.ts`) whenever the task statement naturally fits one. Use `scenarioId: null`
  only for domain concepts that don't map cleanly to a specific scenario.
- **Test judgment, not recall.** The best questions present a realistic situation (symptoms,
  metrics, logs) and ask what to do about it — not "what does X stand for."
  Example stem shape: *"Production data shows X. What change would most effectively address this?"*
- **Four plausible options.** Every distractor should be something a reasonable but
  under-informed practitioner might pick — not an obviously silly option. Common distractor
  archetypes from the official samples: the "sounds right but is over-engineered" option, the
  "relies on probabilistic LLM compliance when determinism is required" option, and the "solves a
  different problem than the one described" option.
- **Every option needs a rationale**, not just the correct one — explain briefly why each
  distractor is wrong, in the "plausible but wrong because X" style.
- **`explanationSummary`** gives the overall reasoning for the correct answer, one level up from
  the per-option rationale.
- **Multi-response items** (`selectCount > 1`) should state "select N" explicitly in the stem,
  matching the real exam's item format.
- **Stay in scope.** Do not write questions about fine-tuning, API auth/billing, cloud provider
  specifics, model internals/training, vision, computer use, streaming internals, rate
  limits/pricing, tokenization internals, or prompt caching implementation details — these are
  explicitly out of scope per the exam guide's appendix.

## Mechanics

1. Pick a domain file under `src/data/questions/` (one file per domain).
2. Assign an `id` following `q{domain}-s{scenario}-{seq}` (e.g. `q1-s1-0001`) or
   `q{domain}-x-{seq}` for domain-only questions, zero-padded to 4 digits, unique across the whole
   bank.
3. Tag `taskStatements` with the specific code(s) from `src/data/domains.ts` the question
   exercises (e.g. `["1.4", "1.5"]`).
4. Set `verification.status` to `'unverified'` while drafting; see `VERIFICATION.md` for how it
   becomes `'verified'`.
5. Run `npm run test` — this enforces structure (id format, option counts, rationale presence,
   etc.) via `tests/questionBank.validate.test.ts`. `npm run stats` shows current coverage by
   domain/scenario/task-statement so you can target gaps.
6. After adding a batch, run `npm run gen:verification-log` and commit the regenerated
   `docs/verification-log.md` — CI checks it's up to date.

## Targets

~200–250 questions total, distributed across the 5 domains proportional to their blueprint
weights (27/18/20/20/15%), scenario-grounded questions dominant. `npm run stats` reports live
progress against these targets and flags any task statement with zero coverage.
