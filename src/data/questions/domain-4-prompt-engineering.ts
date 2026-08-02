import type { Question } from '../../types/question'

/**
 * Domain 4: Prompt Engineering & Structured Output (20% of exam blueprint).
 * Covers task statements 4.1-4.6. Scenario-grounded questions here draw
 * primarily from Scenario 5 (CI/CD) and Scenario 6 (Structured Data
 * Extraction).
 */
export const domain4Questions: Question[] = [
  {
    id: 'q4-s5-0001',
    domain: 4,
    scenarioId: 5,
    taskStatements: ['4.1'],
    selectCount: 1,
    stem: "Your automated PR review prompt currently says: \"Only flag issues you are highly confident about.\" Developers report the review still has a high false-positive rate on style-related comments, undermining trust even in its legitimate bug findings. What change would most effectively improve precision?",
    options: [
      {
        id: 'A',
        text: "Change the instruction to \"Be extremely conservative and only report critical issues,\" which is a stronger version of the same confidence-based guidance.",
        rationale:
          'Wrong — "be extremely conservative" is still a vague, confidence-based instruction of the same kind that has already been shown not to improve precision.',
      },
      {
        id: 'B',
        text: 'Replace the vague confidence-based instruction with explicit, specific criteria defining exactly which categories of issues to report (e.g., bugs, security) versus skip (e.g., minor style, local conventions).',
        rationale:
          'Correct — general instructions like "be conservative" or "only report high-confidence findings" fail to improve precision compared to specific categorical criteria.',
      },
      {
        id: 'C',
        text: 'Remove all filtering instructions entirely so every possible issue is reported without exception.',
        rationale: 'Wrong — removing all filtering would very likely increase, not decrease, the false-positive rate on style comments.',
      },
      {
        id: 'D',
        text: 'Ask the review to report a numeric confidence score from 1-10 alongside each finding, without changing what gets reported.',
        rationale:
          "Wrong — adding a confidence score without changing the actual filtering criteria doesn't address the root cause of poor precision.",
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'Explicit, specific criteria defining which issue categories to report versus skip improves precision; vague confidence-based instructions like "be conservative" do not.',
    difficulty: 'foundational',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-01',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-01',
  },
  {
    id: 'q4-s5-0002',
    domain: 4,
    scenarioId: 5,
    taskStatements: ['4.1'],
    selectCount: 1,
    stem: 'Your code review prompt currently instructs Claude to "check that comments are accurate." This produces inconsistent results — sometimes flagging comments that are slightly outdated but still roughly correct, sometimes missing comments that actively describe the wrong behavior. What is a more effective instruction?',
    options: [
      {
        id: 'A',
        text: '"Check that comments are accurate and well-written."',
        rationale: 'Wrong — adding "well-written" is still vague and subjective, and does not clarify the actual accuracy criterion needed.',
      },
      {
        id: 'B',
        text: '"Check that all code has comments."',
        rationale: 'Wrong — this instruction is about comment presence, not accuracy, and does not address the inconsistency described.',
      },
      {
        id: 'C',
        text: '"Only check comments in files larger than 100 lines."',
        rationale: 'Wrong — a file-size threshold is an arbitrary, unrelated filter that has nothing to do with what makes a comment inaccurate.',
      },
      {
        id: 'D',
        text: '"Flag comments only when the claimed behavior directly contradicts the actual code behavior; do not flag comments that are merely incomplete or slightly outdated."',
        rationale:
          'Correct — explicit criteria over vague instructions is the key principle; defining precisely what counts as a reportable inaccuracy produces consistent classification.',
      },
    ],
    correctOptionIds: ['D'],
    explanationSummary:
      'Explicit criteria (e.g., "flag only when claimed behavior contradicts actual behavior") over vague instructions like "check accuracy" produces consistent, precise classification.',
    difficulty: 'applied',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-01',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-01',
  },
  {
    id: 'q4-s5-0003',
    domain: 4,
    scenarioId: 5,
    taskStatements: ['4.1'],
    selectCount: 1,
    stem: "Your team temporarily disabled your review bot's \"code style\" finding category after developers lost trust in it due to a high false-positive rate, while keeping its \"security\" and \"bug\" categories active, which have high accuracy. What is a reasonable interpretation of this decision?",
    options: [
      {
        id: 'A',
        text: "High false-positive rates in one category can undermine developer trust in the tool's other, more accurate categories, so temporarily disabling the weak category while improving its prompt is a reasonable way to preserve trust in the accurate ones.",
        rationale:
          'Correct — this reflects the documented insight that high false-positive-rate categories undermine confidence in accurate categories.',
      },
      {
        id: 'B',
        text: 'This decision means Claude Code is fundamentally unreliable for any kind of code review and should be abandoned entirely.',
        rationale:
          "Wrong — this overgeneralizes a problem with one specific category into a sweeping conclusion the scenario doesn't support, especially given the other categories remain accurate.",
      },
      {
        id: 'C',
        text: 'Style findings should never be re-enabled once disabled, regardless of any future prompt improvements.',
        rationale: 'Wrong — nothing about "temporarily" disabling a category rules out re-enabling it after the underlying prompt is improved.',
      },
      {
        id: 'D',
        text: 'Security and bug findings should also be disabled to keep all categories consistent with each other.',
        rationale:
          'Wrong — disabling accurate, trusted categories to be "consistent" with a currently weak one would remove value the team is actively getting, for no real benefit.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'High false-positive-rate categories undermine developer trust even in a tool\'s accurate categories; temporarily disabling the weak category while improving its prompt preserves overall trust.',
    difficulty: 'applied',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-01',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-01',
  },
  {
    id: 'q4-s5-0004',
    domain: 4,
    scenarioId: 5,
    taskStatements: ['4.2'],
    selectCount: 1,
    stem: 'Your PR review prompt instructs Claude in detail, in prose, about how to format each finding (location, issue description, severity, suggested fix), but the actual output format still varies noticeably between reviews — sometimes severity is omitted, sometimes the fix suggestion is missing. What is the most effective way to achieve consistent output formatting?',
    options: [
      {
        id: 'A',
        text: 'Shorten the prose instructions so there is less to potentially misinterpret.',
        rationale:
          "Wrong — shortening prose instructions removes detail without addressing the actual issue, which is that prose alone isn't reliably producing consistent structure.",
      },
      {
        id: 'B',
        text: 'Increase max_tokens so there is more room to include every field.',
        rationale: "Wrong — output length isn't the limiting factor; the issue is inconsistent inclusion of fields, not insufficient space.",
      },
      {
        id: 'C',
        text: 'Include 2-4 few-shot examples that demonstrate the exact desired output format for a finding, showing all fields populated consistently.',
        rationale:
          'Correct — few-shot examples demonstrating the desired output format are the most effective technique for achieving consistently formatted output when prose instructions alone produce inconsistent results.',
      },
      {
        id: 'D',
        text: "Ask Claude to double-check its own output against the prose instructions before finalizing it.",
        rationale:
          "Wrong — asking the model to \"double-check\" against prose instructions it already had access to doesn't introduce new information likely to fix the inconsistency.",
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'Few-shot examples demonstrating the exact desired output format are the most effective technique for consistent formatting, more so than prose instructions alone.',
    difficulty: 'foundational',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-01',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-01',
  },
  {
    id: 'q4-s5-0005',
    domain: 4,
    scenarioId: 5,
    taskStatements: ['4.2'],
    selectCount: 1,
    stem: "Your test-coverage review tool needs to judge whether a change to a shared utility function has adequate test coverage. This is inherently ambiguous — reasonable reviewers might disagree depending on how widely the function is used and how risky the change is. Simply describing \"sufficient test coverage\" in the prompt hasn't produced consistent judgments. What technique is most likely to help the model generalize good judgment to new, unseen cases like this?",
    options: [
      {
        id: 'A',
        text: 'Providing an exhaustive rulebook covering every possible utility function and exactly what coverage each one specifically requires.',
        rationale:
          "Wrong — an exhaustive rulebook attempting to cover every specific function isn't scalable and can't anticipate every future case, unlike examples that teach transferable reasoning.",
      },
      {
        id: 'B',
        text: 'Providing 2-4 few-shot examples of ambiguous coverage decisions, each showing the reasoning for why coverage was judged adequate or inadequate in that case.',
        rationale:
          'Correct — few-shot examples demonstrating reasoning for ambiguous-case handling enable the model to generalize judgment to novel patterns, rather than only matching pre-specified cases.',
      },
      {
        id: 'C',
        text: 'Removing test-coverage judgment from the review entirely, since it is inherently too subjective to automate.',
        rationale: 'Wrong — removing the judgment entirely discards a genuinely useful review capability instead of improving its consistency.',
      },
      {
        id: 'D',
        text: 'Requiring 100% line coverage on every function without exception, removing the need for judgment entirely.',
        rationale:
          'Wrong — a blanket 100% coverage rule removes nuance the scenario explicitly says depends on usage and risk, likely producing excessive, low-value test requirements.',
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'Few-shot examples demonstrating reasoning for ambiguous-case handling let the model generalize judgment to novel patterns, unlike exhaustive rules or removing judgment entirely.',
    difficulty: 'applied',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-01',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-01',
  },
  {
    id: 'q4-s5-0006',
    domain: 4,
    scenarioId: 5,
    taskStatements: ['4.5'],
    selectCount: 1,
    stem: "Your team runs two Claude-powered workflows: (1) a pre-merge check that blocks a PR from merging until it completes, and (2) a nightly job that scans the entire codebase for technical debt and emails a report each morning. Someone proposes switching both to the Message Batches API to save 50% on cost. What is the correct evaluation?",
    options: [
      {
        id: 'A',
        text: "Switch both to batch processing, since the cost savings apply equally regardless of the workflow's latency requirements.",
        rationale:
          "Wrong — the Batches API's lack of a latency SLA makes it unsuitable for a blocking pre-merge check, regardless of cost savings elsewhere.",
      },
      {
        id: 'B',
        text: 'Switch only the pre-merge check to batch processing, since blocking checks benefit most from cost savings.',
        rationale:
          'Wrong — this is backwards; the pre-merge check is exactly the blocking, latency-sensitive workflow the Batches API is poorly suited for.',
      },
      {
        id: 'C',
        text: 'Keep both on the synchronous API, since the Message Batches API cannot be used for any code-related workflow.',
        rationale: 'Wrong — the Batches API works fine for code-related workloads; the deciding factor is latency tolerance, not the workflow\'s subject matter.',
      },
      {
        id: 'D',
        text: 'Switch only the nightly technical-debt scan to batch processing; keep the pre-merge check on the synchronous API, since the Batches API has no guaranteed latency SLA and is unsuitable for a workflow developers are actively blocked on.',
        rationale:
          'Correct — batch processing suits non-blocking, latency-tolerant workloads like overnight reports, and is inappropriate for blocking workflows like pre-merge checks.',
      },
    ],
    correctOptionIds: ['D'],
    explanationSummary:
      'The Message Batches API suits non-blocking, latency-tolerant workloads; blocking workflows like pre-merge checks should stay on the synchronous API due to the lack of a guaranteed latency SLA.',
    difficulty: 'applied',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-01',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-01',
  },
  {
    id: 'q4-s5-0007',
    domain: 4,
    scenarioId: 5,
    taskStatements: ['4.5'],
    selectCount: 1,
    stem: 'You submit a batch of 200 documents for overnight processing via the Message Batches API. The next morning, you find that 12 of the 200 requests failed, while 188 succeeded. What is the most efficient way to handle the failures?',
    options: [
      {
        id: 'A',
        text: 'Identify the 12 failed requests by their custom_id, diagnose why each failed (e.g., a document exceeded context limits and needs chunking), and resubmit only those with appropriate modifications.',
        rationale:
          'Correct — custom_id fields exist to correlate individual request/response pairs, letting you resubmit only the failed documents with appropriate modifications.',
      },
      {
        id: 'B',
        text: 'Resubmit the entire batch of 200 documents again from scratch, including the 188 that already succeeded.',
        rationale: 'Wrong — resubmitting all 200 wastes cost and time reprocessing the 188 that already succeeded.',
      },
      {
        id: 'C',
        text: 'Discard the entire batch and switch permanently to the synchronous API for all future document processing.',
        rationale: 'Wrong — abandoning batch processing entirely over a normal, addressable partial-failure rate discards its cost benefits without cause.',
      },
      {
        id: 'D',
        text: 'Ignore the 12 failures, since a 94% success rate is high enough not to warrant further action.',
        rationale:
          'Wrong — silently ignoring failures means 12 documents are simply missing from your results with no resolution.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'custom_id fields correlate batch request/response pairs, enabling targeted resubmission of only the failed documents rather than reprocessing the entire batch.',
    difficulty: 'applied',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-01',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-01',
  },
  {
    id: 'q4-s5-0008',
    domain: 4,
    scenarioId: 5,
    taskStatements: ['4.6'],
    selectCount: 1,
    stem: 'A pull request modifies 20 files across a payments module. A single Claude Code review pass over the entire diff at once produces noticeably inconsistent depth — thorough comments on some files, only a cursory glance at others — and misses an interaction bug between two of the files. How should the review be restructured?',
    options: [
      {
        id: 'A',
        text: 'Switch to a Claude model with a larger context window so all 20 files fit more comfortably in a single pass.',
        rationale:
          "Wrong — a larger context window doesn't solve attention-quality issues across many files in a single pass; the problem is depth and consistency, not raw capacity.",
      },
      {
        id: 'B',
        text: 'Reduce the review to only the 5 most-changed files by line count, skipping the rest entirely.',
        rationale: 'Wrong — skipping 15 of the 20 files entirely could miss real issues in the unreviewed files, including ones like the interaction bug described.',
      },
      {
        id: 'C',
        text: 'Split the review into focused per-file passes for local issues, plus a separate cross-file integration pass specifically examining interactions between files.',
        rationale:
          'Correct — splitting large reviews into per-file local analysis passes plus a separate cross-file integration pass avoids attention dilution and is specifically effective at catching cross-file interaction issues.',
      },
      {
        id: 'D',
        text: 'Run the exact same single-pass review five times and average the number of issues found.',
        rationale:
          'Wrong — repeating the same single-pass approach multiple times does not fix the underlying attention/depth problem, and "averaging" issue counts is not a meaningful way to combine review findings.',
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'Splitting large multi-file reviews into per-file local passes plus a separate cross-file integration pass avoids attention dilution and catches cross-file interaction issues single-pass review misses.',
    difficulty: 'applied',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-01',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-01',
  },
  {
    id: 'q4-s5-0009',
    domain: 4,
    scenarioId: 5,
    taskStatements: ['4.6'],
    selectCount: 1,
    stem: "Your team wants a second layer of quality assurance on Claude-generated code beyond the original generation. An engineer proposes simply appending the instruction \"please double-check your work for bugs\" to the end of the same conversation that just generated the code. Based on known self-review limitations, how effective is this likely to be compared to the alternative of using a separate, independent Claude instance with no prior reasoning context to review the same code?",
    options: [
      {
        id: 'A',
        text: 'Equally effective, since both approaches use the same underlying model and asking it to double-check is functionally identical to a fresh review.',
        rationale:
          'Wrong — retained reasoning context specifically biases the same session against questioning its own prior decisions, so the two approaches are not functionally equivalent.',
      },
      {
        id: 'B',
        text: 'Less effective — the same session retains reasoning context from generation, making it less likely to question its own decisions, whereas an independent instance without that context is more effective at catching subtle issues.',
        rationale:
          'Correct — this is the documented self-review limitation: retained reasoning context makes a session less likely to question its own decisions, while independent review instances are more effective at catching subtle issues.',
      },
      {
        id: 'C',
        text: 'More effective, because the original session has more relevant context about the code than a fresh instance would.',
        rationale:
          "Wrong — having \"more context\" isn't the relevant advantage here; the shared context includes the generator's own reasoning bias, which works against critical review.",
      },
      {
        id: 'D',
        text: 'Equally ineffective — no configuration of Claude can meaningfully review previously generated code.',
        rationale: 'Wrong — this overstates the limitation; independent review instances are described as effective, just self-review within the same session is limited.',
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'A model retains reasoning context from generation, making it less likely to question its own decisions in the same session. Independent review instances without that context are more effective at catching subtle issues.',
    difficulty: 'applied',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-01',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-01',
  },
  {
    id: 'q4-s5-0010',
    domain: 4,
    scenarioId: 5,
    taskStatements: ['4.6'],
    selectCount: 1,
    stem: "You're designing a review process where each finding should also indicate how confident the model is, so that low-confidence findings can be routed to a human for a closer look while high-confidence findings are trusted more directly. What review design supports this?",
    options: [
      {
        id: 'A',
        text: 'Have the model report only a single overall confidence score for the entire review, covering all findings combined.',
        rationale:
          "Wrong — a single overall score for the whole review doesn't let you distinguish which specific findings are less certain and should get closer human attention.",
      },
      {
        id: 'B',
        text: 'Skip confidence reporting entirely and treat every finding with equal weight regardless of certainty.',
        rationale: 'Wrong — this discards exactly the calibration signal the scenario is asking to design for.',
      },
      {
        id: 'C',
        text: 'Have a separate, unrelated model estimate confidence after the fact without seeing the original findings.',
        rationale:
          'Wrong — estimating confidence without seeing the original findings and reasoning would produce a much less grounded confidence signal than reporting it during the actual verification pass.',
      },
      {
        id: 'D',
        text: 'Have the model self-report a confidence level alongside each individual finding during the verification pass, enabling calibrated routing of specific findings to human review based on their own confidence.',
        rationale:
          'Correct — running verification passes where the model self-reports confidence alongside each finding enables calibrated review routing.',
      },
    ],
    correctOptionIds: ['D'],
    explanationSummary:
      'Self-reported confidence alongside each individual finding, produced during a verification pass, enables calibrated routing of specific findings to human review.',
    difficulty: 'applied',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-01',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-01',
  },
]
