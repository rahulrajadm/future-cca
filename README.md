# CCAR-F Practice

An unofficial, community-built practice question resource for the **Claude Certified Architect –
Foundations (CCAR-F)** exam. Not produced, endorsed, or affiliated with Anthropic.

A static, no-backend web app: a question bank grounded in the official exam guide's 5 domains, 34
task statements, and 6 scenarios, exercised through a full simulated exam mode plus domain,
scenario, and missed-question review practice modes. All progress is stored locally in your
browser (no accounts, no server).

## Live app

Deployed via GitHub Pages from `main`: `https://<owner>.github.io/future-cca/`

## Development

```bash
npm install
npm run dev            # local dev server
npm run typecheck      # tsc project-reference build
npm run lint           # oxlint
npm run test           # vitest — question bank structural validation
npm run stats          # bank counts by domain/scenario/task-statement
npm run build           # production build (local base path)
```

To build with the GitHub Pages base path locally:

```bash
VITE_BASE_PATH=/future-cca/ npm run build
```

## Question bank & verification

Questions live in `src/data/questions/`, one file per domain, typed against `src/types/question.ts`.
Every question carries a `verification` record. See `docs/VERIFICATION.md` for the blind-verification
process used to check every question before it ships, and `docs/verification-log.md` for the
generated per-question audit trail (`npm run gen:verification-log` to regenerate after editing the
bank).

CI (`.github/workflows/ci.yml`) runs free structural/schema validation only — no LLM API calls are
required to build, test, or deploy this project. An optional local script
(`scripts/llm-verify.ts`) lets maintainers LLM-verify new questions with their own Anthropic API
key; it is never run in CI and is not required.

See `docs/AUTHORING_GUIDE.md` before adding new questions.

## Scoring disclaimer

The "approximate scaled score" shown after practice exams is a simple linear estimate
(`100 + percentCorrect * 900`) for practice purposes only. It is not affiliated with, validated
against, or produced by Anthropic's official (unpublished) scoring model.

## Deployment

GitHub Pages, served from GitHub Actions (`.github/workflows/deploy.yml`), triggered on push to
`main`. One-time repo setup: Settings → Pages → Source = "GitHub Actions".

## License

MIT — see [LICENSE](./LICENSE).
