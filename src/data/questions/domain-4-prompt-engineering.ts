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
        text: '"Check that all code has comments."',
        rationale: 'Wrong — this instruction is about comment presence, not accuracy, and does not address the inconsistency described.',
      },
      {
        id: 'B',
        text: '"Only check comments in files larger than 100 lines."',
        rationale: 'Wrong — a file-size threshold is an arbitrary, unrelated filter that has nothing to do with what makes a comment inaccurate.',
      },
      {
        id: 'C',
        text: '"Flag comments only when the claimed behavior directly contradicts the actual code behavior; do not flag comments that are merely incomplete or slightly outdated."',
        rationale:
          'Correct — explicit criteria over vague instructions is the key principle; defining precisely what counts as a reportable inaccuracy produces consistent classification.',
      },
      {
        id: 'D',
        text: '"Check that comments are accurate and well-written."',
        rationale: 'Wrong — adding "well-written" is still vague and subjective, and does not clarify the actual accuracy criterion needed.',
      },
    ],
    correctOptionIds: ['C'],
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
  {
    id: 'q4-s6-0001',
    domain: 4,
    scenarioId: 6,
    taskStatements: ['4.3'],
    selectCount: 1,
    stem: "You're extracting structured invoice data (vendor, line items, total) from PDFs using Claude. Occasionally the model's raw JSON output has a syntax error — a missing comma or unescaped quote — which breaks your downstream parser. What is the most reliable way to eliminate this class of error?",
    options: [
      {
        id: 'A',
        text: 'Define an extraction tool with a JSON schema as its input parameters, and require Claude to call that tool (tool_use) rather than asking it to write raw JSON as free text.',
        rationale:
          'Correct — tool use with JSON schemas is the most reliable approach for guaranteed schema-compliant structured output, eliminating JSON syntax errors that free-text generation is prone to.',
      },
      {
        id: 'B',
        text: "Instruct the model more emphatically to \"always produce valid JSON, no exceptions.\"",
        rationale: 'Wrong — stronger wording is still a prompt-based, probabilistic approach to a problem that has a structural solution.',
      },
      {
        id: 'C',
        text: 'Lower the temperature setting to reduce randomness in the generated text.',
        rationale:
          'Wrong — temperature affects output diversity/randomness in phrasing, not whether generated free-text JSON is syntactically well-formed.',
      },
      {
        id: 'D',
        text: 'Add a post-processing regex step that attempts to fix common JSON syntax mistakes after generation.',
        rationale:
          'Wrong — a regex patch treats symptoms of the underlying approach rather than eliminating the class of error at its source, and can itself introduce new mistakes.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Tool use with JSON schemas is the most reliable approach for guaranteed schema-compliant structured output, eliminating the JSON syntax errors free-text generation is prone to.',
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
    id: 'q4-s6-0002',
    domain: 4,
    scenarioId: 6,
    taskStatements: ['4.3'],
    selectCount: 1,
    stem: "You have three different extraction tools for three different document types (invoices, receipts, purchase orders), but at the time of the API call you don't yet know which document type you're processing. You want to guarantee the model calls exactly one of these tools — never returning plain conversational text instead — while still letting it choose which one fits. What tool_choice setting achieves this?",
    options: [
      {
        id: 'A',
        text: 'tool_choice: "any" — the model must call some tool, but can choose which of the three fits the document.',
        rationale:
          'Correct — tool_choice: "any" guarantees the model calls a tool but leaves the choice of which tool up to the model, matching "must extract with some schema, but the right one is unknown up front."',
      },
      {
        id: 'B',
        text: 'tool_choice: "auto" — the model may return text instead of calling a tool if it prefers.',
        rationale: 'Wrong — "auto" explicitly allows the model to return conversational text instead of calling a tool, which does not guarantee structured output.',
      },
      {
        id: 'C',
        text: 'A forced tool_choice naming one specific tool, e.g. {"type": "tool", "name": "extract_invoice"}.',
        rationale:
          'Wrong — forcing one specific named tool would incorrectly extract every document as if it were that one type, regardless of its actual type.',
      },
      {
        id: 'D',
        text: 'Omitting tool_choice entirely, since the default behavior always requires a tool call.',
        rationale:
          'Wrong — the default tool_choice behavior is "auto" (model may choose not to call a tool), not a guaranteed tool call.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'tool_choice: "any" guarantees a tool call is made while letting the model choose which tool fits, appropriate when the correct schema is unknown ahead of time.',
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
    id: 'q4-s6-0003',
    domain: 4,
    scenarioId: 6,
    taskStatements: ['4.3'],
    selectCount: 1,
    stem: "Your invoice-extraction schema marks \"purchase_order_number\" as a required string field. Many of your invoices legitimately have no purchase order number at all. What problem does this cause, and what's the fix?",
    options: [
      {
        id: 'A',
        text: 'No problem — Claude will correctly recognize the field is missing and the tool call will simply omit it despite being marked required.',
        rationale:
          'Wrong — required fields generally must be present in the tool call, and models tend to feel pressure to fill them somehow, not to reliably recognize and skip a documented-required field.',
      },
      {
        id: 'B',
        text: 'The extraction will fail outright and no data will be returned for any invoice missing a purchase order number.',
        rationale: 'Wrong — the actual documented risk is fabrication of a value, not an outright hard failure with no data returned at all.',
      },
      {
        id: 'C',
        text: "The problem is unrelated to the field being required; it's caused by the field's name being too long.",
        rationale: 'Wrong — field name length is unrelated to this problem; the issue is the required/optional design choice given genuinely absent information.',
      },
      {
        id: 'D',
        text: 'Marking a field required when the source document may not contain that information can lead the model to fabricate a plausible-looking value to satisfy the schema; making the field optional/nullable prevents this.',
        rationale:
          'Correct — designing schema fields as optional (nullable) when source documents may not contain the information prevents the model from fabricating values to satisfy required fields.',
      },
    ],
    correctOptionIds: ['D'],
    explanationSummary:
      'Marking a field required when source documents may not contain that information risks the model fabricating a value; nullable/optional fields prevent this.',
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
    id: 'q4-s6-0004',
    domain: 4,
    scenarioId: 6,
    taskStatements: ['4.3'],
    selectCount: 1,
    stem: "Your document-type classification field uses a fixed enum: invoice, receipt, purchase_order. You start receiving a new, unanticipated document type (a credit memo) that doesn't fit any existing category, and the model is forced to misclassify it as one of the three. What schema design would have handled this gracefully?",
    options: [
      {
        id: 'A',
        text: 'Remove the enum constraint entirely and allow completely free-text values for the field.',
        rationale:
          'Wrong — fully free-text values reintroduce the inconsistency problem enums exist to prevent, losing the benefit of a constrained category set for the common cases.',
      },
      {
        id: 'B',
        text: "Require the pipeline to reject and discard any document that doesn't match one of the three existing categories.",
        rationale: 'Wrong — discarding legitimate documents just because they don\'t fit a fixed set is a worse outcome than accurately capturing them under an "other" category.',
      },
      {
        id: 'C',
        text: 'Add an "other" enum value alongside a separate free-text "other_detail" field, so novel document types can be captured accurately without forcing a misclassification.',
        rationale:
          'Correct — an "other" + detail-string pattern is the documented approach for extensible categorization, letting genuinely novel cases be captured accurately.',
      },
      {
        id: 'D',
        text: 'Expand the enum to include every conceivable document type in advance, no matter how rare.',
        rationale: 'Wrong — trying to anticipate every conceivable category in advance is unbounded and impractical, unlike a designed extension point for unanticipated cases.',
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'The "other" + detail-string pattern is the designed way to handle extensible categorization, capturing novel cases accurately without forcing a misclassification.',
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
    id: 'q4-s6-0005',
    domain: 4,
    scenarioId: 6,
    taskStatements: ['4.3'],
    selectCount: 1,
    stem: "A contract document contains two dates: a \"signing date\" and a separately stated \"effective date\" that begins 30 days later. Your extraction schema has a single generic \"date\" field, and different documents in your dataset inconsistently populate it with either the signing date or the effective date depending on which one appeared more prominently. What schema change would resolve this ambiguity?",
    options: [
      {
        id: 'A',
        text: 'Keep the single "date" field and have a human manually resolve the ambiguity for every single document after the fact.',
        rationale:
          'Wrong — manually resolving every single document defeats much of the purpose of automated extraction, when a structural schema fix could resolve it for all documents at once.',
      },
      {
        id: 'B',
        text: 'Replace the single generic "date" field with explicitly named fields — e.g., "signing_date" and "effective_date" — so each captured value has unambiguous meaning regardless of document layout.',
        rationale:
          'Correct — the ambiguity comes from a single generic field trying to represent two semantically distinct concepts; explicitly naming the fields removes the ambiguity structurally.',
      },
      {
        id: 'C',
        text: "Keep the single \"date\" field, but instruct the model to always prefer whichever date appears in a larger font.",
        rationale:
          'Wrong — font size is an unreliable, document-layout-dependent heuristic with no guaranteed connection to which date matters for downstream use.',
      },
      {
        id: 'D',
        text: 'Remove date extraction from the schema entirely, since dates are inherently too ambiguous to extract reliably.',
        rationale:
          'Wrong — removing date extraction entirely discards clearly extractable, valuable information instead of fixing the schema design actually causing the inconsistency.',
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'A single generic field representing two semantically distinct concepts causes ambiguity; explicitly named schema fields resolve it structurally regardless of document layout.',
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
    id: 'q4-s6-0006',
    domain: 4,
    scenarioId: 6,
    taskStatements: ['4.4'],
    selectCount: 1,
    stem: "Your extraction pipeline validates that all line item amounts sum to the stated invoice total. For one document, validation fails because the extracted values don't sum correctly. For a different document, validation fails because the required 'tax_id' field is empty — but on inspection, that document genuinely never included a tax ID anywhere in its text. How should these two failures be handled differently?",
    options: [
      {
        id: 'A',
        text: 'Retry both documents identically, since retrying with the same prompt and document eventually resolves any validation failure.',
        rationale:
          'Wrong — retries are ineffective when the required information is simply absent from the source document, unlike structural or format mismatches self-correction can fix.',
      },
      {
        id: 'B',
        text: "Retry the first document with the specific validation error appended to the prompt, since a math/structural mismatch is often fixable through self-correction; do not expect a retry to fix the second, since the information simply doesn't exist in the source.",
        rationale:
          'Correct — retry-with-error-feedback is effective for structural/semantic errors like a sum mismatch, but retries cannot manufacture information that was never present in the source document.',
      },
      {
        id: 'C',
        text: 'Give up on both documents immediately without attempting any retry, since validation failed.',
        rationale: 'Wrong — giving up immediately discards a case (the sum mismatch) that a targeted retry could plausibly fix.',
      },
      {
        id: 'D',
        text: "Treat the second document's missing tax ID as a critical pipeline failure requiring the entire batch to stop.",
        rationale:
          "Wrong — one document's genuinely absent field doesn't warrant halting the entire batch; it should be handled per-document rather than stopping everything.",
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'Retry-with-error-feedback is effective for structural/semantic validation errors, but ineffective when required information is genuinely absent from the source document.',
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
    id: 'q4-s6-0007',
    domain: 4,
    scenarioId: 6,
    taskStatements: ['4.4'],
    selectCount: 1,
    stem: 'You want your extraction pipeline to automatically catch invoices where the printed total doesn\'t match what the line items actually add up to, without requiring a human to manually re-check the math on every single invoice. What schema/validation design supports this?',
    options: [
      {
        id: 'A',
        text: 'Extract both a "calculated_total" (computed by summing the extracted line items) and a "stated_total" (the total as printed on the document) as separate fields, and flag a discrepancy whenever they don\'t match.',
        rationale:
          'Correct — extracting "calculated_total" alongside "stated_total" to flag discrepancies is exactly the self-correction validation design pattern for automatically catching this class of error.',
      },
      {
        id: 'B',
        text: 'Extract only the "stated_total" field and trust it is always correct as printed.',
        rationale: 'Wrong — trusting the printed total without any cross-check provides no way to automatically catch this class of error.',
      },
      {
        id: 'C',
        text: 'Extract only the "calculated_total" field and discard the printed total from the document entirely.',
        rationale: 'Wrong — discarding the printed total removes the very value needed to compare against to detect a real-world discrepancy.',
      },
      {
        id: 'D',
        text: 'Round both totals to the nearest ten before comparing them, to avoid flagging minor rounding differences as discrepancies.',
        rationale:
          'Wrong — rounding before comparing could mask genuine discrepancies rather than reliably surfacing them; the comparison should be exact.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Extracting both a calculated and a stated value for the same figure, then flagging discrepancies, is the self-correction validation pattern for automatically catching arithmetic mismatches.',
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
    id: 'q4-s6-0008',
    domain: 4,
    scenarioId: 6,
    taskStatements: ['4.4'],
    selectCount: 1,
    stem: "Your extraction pipeline occasionally flags 'low confidence' on fields that developers reviewing the output almost always confirm are actually correct, wasting review time. You want to systematically analyze which specific document patterns are causing these unnecessary low-confidence flags, so you can improve the prompt for those patterns specifically. What would help you do this?",
    options: [
      {
        id: 'A',
        text: 'Ignore the pattern and accept the wasted review time as an unavoidable cost of using confidence scoring at all.',
        rationale: 'Wrong — accepting the waste without investigating forgoes an available, documented way to actually reduce it.',
      },
      {
        id: 'B',
        text: "Remove confidence scoring from the pipeline entirely, since it's producing unhelpful flags.",
        rationale: 'Wrong — removing confidence scoring entirely discards its real value elsewhere just because some specific patterns are currently over-triggering.',
      },
      {
        id: 'C',
        text: 'Ask developers to stop reviewing flagged fields altogether.',
        rationale: 'Wrong — telling developers to stop reviewing removes the safety check the confidence flagging exists to support, rather than fixing the flagging itself.',
      },
      {
        id: 'D',
        text: 'Add a field (e.g., detected_pattern) to each structured finding that records what specifically triggered the low-confidence flag, enabling systematic analysis of which patterns are frequently dismissed as false alarms.',
        rationale:
          'Correct — adding a detected_pattern field to structured findings enables systematic analysis of which patterns trigger dismissed findings, directly supporting targeted prompt improvements.',
      },
    ],
    correctOptionIds: ['D'],
    explanationSummary:
      'Tracking a detected_pattern field on structured findings enables systematic analysis of dismissal patterns, supporting targeted prompt improvements for specific over-triggering cases.',
    difficulty: 'advanced',
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
    id: 'q4-x-0001',
    domain: 4,
    scenarioId: null,
    taskStatements: ['4.1'],
    selectCount: 1,
    stem: "Your code review tool labels findings as \"low,\" \"medium,\" or \"high\" severity, but different reviewers using the tool disagree about which label an identical type of issue should get, since the prompt only says \"use your judgment on severity.\" What would produce more consistent severity classification?",
    options: [
      {
        id: 'A',
        text: 'Remove severity labels entirely, since consistent classification is impossible to achieve.',
        rationale: 'Wrong — removing labels discards a genuinely useful signal instead of fixing the actual source of inconsistency, which is vague criteria.',
      },
      {
        id: 'B',
        text: "Let each individual developer's local prompt override the severity definitions however they personally prefer.",
        rationale: 'Wrong — letting each developer define severity differently would produce even less consistency across the team, not more.',
      },
      {
        id: 'C',
        text: "Define explicit severity criteria with concrete code examples illustrating what qualifies as low, medium, and high for each category, replacing the vague \"use your judgment\" instruction.",
        rationale:
          'Correct — defining explicit severity criteria with concrete code examples for each level is the documented technique for achieving consistent classification.',
      },
      {
        id: 'D',
        text: "Replace the three severity levels with a single, undifferentiated 'issue' label for everything.",
        rationale: 'Wrong — collapsing all severities into one label removes the useful distinction the team wants, rather than making it more consistent.',
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'Explicit severity criteria with concrete code examples for each level achieve consistent classification, unlike vague "use your judgment" instructions.',
    difficulty: 'foundational',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-02',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-01',
  },
  {
    id: 'q4-x-0002',
    domain: 4,
    scenarioId: null,
    taskStatements: ['4.2'],
    selectCount: 1,
    stem: "Your extraction prompt for product listings needs to capture a \"weight\" field, but source listings describe weight inconsistently — \"approx 2 lbs,\" \"~900g,\" \"weighs about two pounds\" — and the model sometimes fails to extract a value at all when the phrasing is informal. What technique would most help it handle this variety reliably?",
    options: [
      {
        id: 'A',
        text: 'Require listings to be manually rewritten into a single standard phrasing before extraction, defeating much of the purpose of automation.',
        rationale:
          'Wrong — manually standardizing every source listing before extraction defeats much of the purpose of using extraction to handle inconsistently formatted input.',
      },
      {
        id: 'B',
        text: 'Provide few-shot examples showing correct extraction from several differently-phrased, informal weight descriptions, demonstrating the expected normalized output for each.',
        rationale:
          'Correct — few-shot examples demonstrating correct extraction from varied, informal phrasing are effective for reducing hallucination and missed extractions on format diversity.',
      },
      {
        id: 'C',
        text: 'Remove the weight field from the schema entirely, since informal phrasing makes it too unreliable to extract.',
        rationale: 'Wrong — removing the field discards a genuinely extractable and valuable piece of data instead of improving handling of its varied phrasing.',
      },
      {
        id: 'D',
        text: "Only extract weight when it's expressed using a single specific unit, ignoring all other unit formats.",
        rationale: 'Wrong — restricting to a single unit format ignores the majority of realistic listings described in other units, discarding usable data.',
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'Few-shot examples demonstrating correct extraction from varied, informal phrasing reduce hallucination and missed extractions caused by format diversity.',
    difficulty: 'applied',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-02',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-01',
  },
  {
    id: 'q4-x-0003',
    domain: 4,
    scenarioId: null,
    taskStatements: ['4.1'],
    selectCount: 1,
    stem: "You want your automated code review to stop flagging minor, team-accepted local style variations (e.g., trailing commas, quote style) while continuing to reliably flag real bugs and security issues. Simply telling it to \"be less picky\" hasn't worked. What's a more effective instruction design?",
    options: [
      {
        id: 'A',
        text: "Explicitly list the categories the review should report (e.g., bugs, security vulnerabilities) and separately list the categories it should skip (e.g., minor style, accepted local conventions), rather than relying on a vague \"be less picky\" framing.",
        rationale:
          'Correct — explicit criteria defining which categories to report versus skip is more effective than vague, subjectivity-based instructions like "be less picky."',
      },
      {
        id: 'B',
        text: "Tell the review to be 'less picky' but repeat the instruction three times in the prompt for extra emphasis.",
        rationale: "Wrong — repeating the same vague instruction doesn't add the specific categorical information actually needed to change behavior.",
      },
      {
        id: 'C',
        text: 'Disable the review tool entirely, since it cannot be tuned to match team preferences.',
        rationale: 'Wrong — disabling the tool entirely discards its useful bug/security detection over an addressable precision problem in one category.',
      },
      {
        id: 'D',
        text: 'Have the review flag every possible issue, and rely on developers to mentally filter out the style-related ones themselves.',
        rationale: 'Wrong — pushing the filtering burden onto every developer manually defeats the purpose of having automated, pre-filtered review output.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Explicit criteria defining which issue categories to report versus skip is more effective than vague, confidence-based instructions like "be less picky."',
    difficulty: 'applied',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-02',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-01',
  },
  {
    id: 'q4-x-0004',
    domain: 4,
    scenarioId: null,
    taskStatements: ['4.6'],
    selectCount: 1,
    stem: "You want to verify that a Claude-generated solution to a coding problem is actually correct, and you're deciding between (a) asking the same conversation that generated the solution to \"check its own work,\" or (b) giving the problem statement and the generated solution to a separate, independent Claude conversation with no knowledge of how the solution was produced, and asking it to find flaws. Which is generally more effective at catching subtle mistakes, and why?",
    options: [
      {
        id: 'A',
        text: 'Option (a), because the original conversation has full context about its own reasoning and intentions.',
        rationale:
          'Wrong — "full context about its own reasoning" is precisely what makes the original conversation less likely to challenge its own prior decisions.',
      },
      {
        id: 'B',
        text: 'Both are exactly equally effective, since they use the same model with the same capabilities.',
        rationale: 'Wrong — despite using the same underlying model, retained reasoning context measurably changes review behavior.',
      },
      {
        id: 'C',
        text: 'Neither is effective; only human reviewers can catch subtle mistakes in generated code.',
        rationale: 'Wrong — this overstates the limitation; independent Claude review instances are documented as effective at catching subtle issues.',
      },
      {
        id: 'D',
        text: 'Option (b), because an independent instance without the original reasoning context is less biased toward confirming the original approach and is more likely to catch subtle issues.',
        rationale:
          'Correct — independent review instances without prior reasoning context are more effective at catching subtle issues than the same session reviewing its own output.',
      },
    ],
    correctOptionIds: ['D'],
    explanationSummary:
      'Independent review instances without prior reasoning context are more effective at catching subtle issues than the same session self-reviewing its own generated output.',
    difficulty: 'applied',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-02',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-01',
  },
  {
    id: 'q4-s5-0011',
    domain: 4,
    scenarioId: 5,
    taskStatements: ['4.1'],
    selectCount: 1,
    stem: "Your CI review prompt says: \"Report all security issues and all style issues.\" Developers want security issues always flagged, but style issues flagged only when they violate the team's documented style guide — not just any subjective style preference. What's the most effective prompt design?",
    options: [
      {
        id: 'A',
        text: 'Remove security reporting entirely to simplify the instruction, keeping only the style criterion.',
        rationale: 'Wrong — removing security reporting entirely contradicts the stated requirement that security issues should always be flagged.',
      },
      {
        id: 'B',
        text: "Replace both categories with a single instruction to \"report anything that looks slightly off.\"",
        rationale: 'Wrong — "looks slightly off" is far vaguer than even the original instruction, and would likely worsen precision, not improve it.',
      },
      {
        id: 'C',
        text: 'Explicitly state that security issues are always in scope, while style issues should only be reported when they violate the team\'s specific documented style guide, referencing the criteria in that guide.',
        rationale:
          'Correct — explicit criteria specifying exactly what counts (documented style guide violations, not general subjective preference) alongside an always-in-scope category gives precise, actionable scope.',
      },
      {
        id: 'D',
        text: "Keep the instruction exactly as it is, since 'all style issues' is already a clear and objective criterion.",
        rationale:
          'Wrong — "all style issues" without reference to a specific standard is exactly the kind of vague criterion likely to produce inconsistent, subjective flagging.',
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'Explicit criteria tied to a specific documented standard (not vague, subjective language) produce precise, actionable review scope and consistent classification.',
    difficulty: 'applied',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-02',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-02',
  },
  {
    id: 'q4-s6-0009',
    domain: 4,
    scenarioId: 6,
    taskStatements: ['4.3'],
    selectCount: 1,
    stem: 'Your invoice schema currently has flat fields like item_1_name, item_1_price, item_2_name, item_2_price, and so on, up to a fixed maximum of 10 items. Invoices with more than 10 line items lose data, and invoices with fewer leave many fields empty. What schema change would fix this?',
    options: [
      {
        id: 'A',
        text: 'Increase the fixed maximum to 50 items instead of 10, keeping the same flat-field pattern.',
        rationale:
          "Wrong — raising the cap to 50 still imposes an arbitrary limit and still wastes fields on invoices with fewer items; it doesn't fix the structural problem.",
      },
      {
        id: 'B',
        text: "Replace the flat, numbered fields with an array of line-item objects, where each object has its own name and price fields, accommodating any number of items without a fixed cap or wasted fields.",
        rationale:
          'Correct — an array of objects naturally accommodates any number of line items without a fixed cap or wasted empty fields, the appropriate structural fix for repeating, variable-count data.',
      },
      {
        id: 'C',
        text: 'Remove line item extraction entirely and only extract the invoice total.',
        rationale: 'Wrong — removing line item extraction discards valuable, extractable data instead of fixing the schema structure causing the problem.',
      },
      {
        id: 'D',
        text: 'Keep the flat fields but instruct the model to combine multiple items into a single field, separated by commas, when there are more than 10.',
        rationale:
          'Wrong — combining multiple items into one comma-separated field reintroduces unstructured, harder-to-parse data, undermining the purpose of structured extraction.',
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'An array of objects is the appropriate schema structure for repeating, variable-count data like invoice line items, avoiding fixed caps and wasted fields.',
    difficulty: 'applied',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-02',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-02',
  },
  {
    id: 'q4-s5-0012',
    domain: 4,
    scenarioId: 5,
    taskStatements: ['4.2'],
    selectCount: 1,
    stem: "Your automated code review flags every use of a specific async/await pattern as a potential race condition, even though your team has a well-established, safe convention for using it correctly. Simply telling the review to \"recognize safe patterns\" hasn't reduced the false positives. What would help?",
    options: [
      {
        id: 'A',
        text: "Provide few-shot examples showing your team's safe async/await convention alongside a genuinely unsafe race-condition example, so the model can learn to distinguish the two patterns.",
        rationale:
          'Correct — few-shot examples distinguishing acceptable code patterns from genuine issues are effective at reducing false positives while preserving genuine detection ability.',
      },
      {
        id: 'B',
        text: 'Disable race-condition detection for async/await code entirely.',
        rationale: 'Wrong — disabling detection entirely discards legitimate race-condition detection for other, genuinely unsafe patterns.',
      },
      {
        id: 'C',
        text: 'Tell the review to only check for race conditions in files longer than 200 lines.',
        rationale:
          'Wrong — file length has no established connection to whether an async/await pattern is safe or not; this is an arbitrary, unrelated filter.',
      },
      {
        id: 'D',
        text: 'Increase the review\'s temperature setting so it considers more possibilities.',
        rationale:
          "Wrong — temperature affects output randomness, not the model's ability to distinguish safe from unsafe patterns.",
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Few-shot examples distinguishing acceptable patterns from genuine issues reduce false positives while preserving genuine detection, more effectively than a vague instruction to "recognize safe patterns."',
    difficulty: 'applied',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-02',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-02',
  },
  {
    id: 'q4-s5-0013',
    domain: 4,
    scenarioId: 5,
    taskStatements: ['4.2'],
    selectCount: 1,
    stem: "Your CI review outputs findings in a consistent JSON structure most of the time, but for a specific class of subtle style findings, the \"suggested_fix\" field is sometimes a code snippet and sometimes a prose description, inconsistently. Detailed prose instructions describing the desired format haven't fixed this. What would help?",
    options: [
      {
        id: 'A',
        text: 'Remove the suggested_fix field from the schema entirely for style findings.',
        rationale: 'Wrong — removing the field discards genuinely useful information instead of fixing its format consistency.',
      },
      {
        id: 'B',
        text: 'Increase the length of the prose instructions describing the desired format even further.',
        rationale:
          "Wrong — longer prose instructions have already been tried in a similar vein without success; this doesn't add new, concrete guidance to pattern-match against.",
      },
      {
        id: 'C',
        text: 'Add 2-4 few-shot examples showing exactly how suggested_fix should be formatted for this class of finding, with a code snippet in every case.',
        rationale:
          'Correct — few-shot examples demonstrating the exact desired output format are more effective than additional prose when detailed instructions alone produce inconsistent results.',
      },
      {
        id: 'D',
        text: "Ask a human to manually reformat every style finding's suggested_fix field after the fact.",
        rationale: 'Wrong — manual reformatting after the fact does not fix the underlying inconsistency and does not scale.',
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'Few-shot examples demonstrating the exact desired output format are more effective than additional prose instructions at achieving consistent formatting.',
    difficulty: 'foundational',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-02',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-02',
  },
  {
    id: 'q4-s5-0014',
    domain: 4,
    scenarioId: 5,
    taskStatements: ['4.4'],
    selectCount: 1,
    stem: 'Your CI review sometimes generates findings that reference a line number outside the actual file\'s range (e.g., citing line 500 in a 200-line file) — a structural validation error, not a judgment call. What\'s the most effective way to handle this?',
    options: [
      {
        id: 'A',
        text: 'Silently drop the line number field from findings that fail validation, keeping the rest of the finding unchanged.',
        rationale:
          'Wrong — silently dropping the line number removes useful information a developer needs to locate the issue, without fixing the root inconsistency.',
      },
      {
        id: 'B',
        text: 'Retry the specific failed finding with the validation error (the actual line count) included in the follow-up request, giving the model a chance to self-correct.',
        rationale:
          'Correct — retry-with-error-feedback, providing the specific validation error, gives the model the concrete information needed to self-correct a structural mismatch.',
      },
      {
        id: 'C',
        text: 'Discard the entire review\'s results whenever any single finding has an invalid line number.',
        rationale: 'Wrong — discarding the entire review over one finding\'s error wastes many other, valid findings.',
      },
      {
        id: 'D',
        text: 'Manually assign line number 1 to any finding that fails line-number validation.',
        rationale:
          'Wrong — assigning an arbitrary placeholder line number misleads the developer to a wrong location, which is worse than a clearly-flagged failure.',
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'Retry-with-error-feedback, appending the specific validation error to the prompt, gives the model the information needed to self-correct a structural mismatch like an out-of-range line number.',
    difficulty: 'applied',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-02',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-02',
  },
  {
    id: 'q4-s5-0015',
    domain: 4,
    scenarioId: 5,
    taskStatements: ['4.4'],
    selectCount: 1,
    stem: "Your CI review occasionally references a helper function from a file that wasn't included in the diff or context provided to the review. Retrying the same review request with the same context doesn't fix this. Why, and what should you do instead?",
    options: [
      {
        id: 'A',
        text: 'Retry with an even more detailed prompt describing what the helper function should do.',
        rationale: "Wrong — no amount of additional prompt detail substitutes for the actual missing file content the review needs to reference correctly.",
      },
      {
        id: 'B',
        text: 'Retry indefinitely until the review eventually stops mentioning the missing file.',
        rationale: "Wrong — indefinite retries won't succeed if the underlying information genuinely isn't available in what's provided.",
      },
      {
        id: 'C',
        text: 'Reduce max_tokens so the review has to be more concise and avoid mentioning files it doesn\'t have.',
        rationale: 'Wrong — reducing output length doesn\'t address the actual cause, which is missing input content, not overly verbose output.',
      },
      {
        id: 'D',
        text: "Recognize that retries are ineffective when the required information (the missing file's actual content) simply isn't available in the provided context; include the relevant file in context instead of retrying.",
        rationale:
          'Correct — retries are ineffective when required information is genuinely absent from what was provided; the fix is including the actual missing content, not repeating the same incomplete request.',
      },
    ],
    correctOptionIds: ['D'],
    explanationSummary:
      'Retries are ineffective when required information is simply absent from what was provided — the fix is supplying the missing content, not repeating the same incomplete request.',
    difficulty: 'applied',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-02',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-02',
  },
  {
    id: 'q4-s5-0016',
    domain: 4,
    scenarioId: 5,
    taskStatements: ['4.5'],
    selectCount: 1,
    stem: 'Your team wants Claude to review every dependency in package.json for known vulnerabilities. You\'re deciding between running this as (1) a real-time check that blocks every PR touching package.json until it completes, or (2) a nightly batch scan across the whole dependency tree with a summary email each morning. Which API approach fits each, and why?',
    options: [
      {
        id: 'A',
        text: 'Use the synchronous API for the blocking PR check (developers are actively waiting), and the Message Batches API for the nightly scan (latency-tolerant, and eligible for the 50% cost savings).',
        rationale:
          'Correct — synchronous for blocking, actively-waited-on checks; the Message Batches API for non-blocking, latency-tolerant overnight work, taking advantage of its cost savings.',
      },
      {
        id: 'B',
        text: 'Use the Message Batches API for both, since batch processing is always cheaper and the cost savings apply regardless of use case.',
        rationale: "Wrong — the Batches API's lack of a guaranteed latency SLA makes it unsuitable for the blocking check, regardless of cost savings.",
      },
      {
        id: 'C',
        text: 'Use the synchronous API for both, since dependency vulnerability data is too sensitive for batch processing.',
        rationale:
          "Wrong — there's no batch-processing restriction based on data sensitivity; the deciding factor is latency tolerance, not data sensitivity.",
      },
      {
        id: 'D',
        text: 'Use the Message Batches API for the blocking PR check and the synchronous API for the nightly scan.',
        rationale: 'Wrong — this reverses the correct mapping; the blocking check is exactly the one that needs synchronous, low-latency responses.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Synchronous API fits blocking, actively-waited-on workflows; the Message Batches API fits non-blocking, latency-tolerant workflows where its cost savings can be captured.',
    difficulty: 'foundational',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-02',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-02',
  },
  {
    id: 'q4-s5-0017',
    domain: 4,
    scenarioId: 5,
    taskStatements: ['4.5'],
    selectCount: 1,
    stem: "Your nightly technical-debt scan must always be ready by 8 AM for the team's morning standup, and you're using the Message Batches API, which can take up to 24 hours to complete with no guaranteed faster turnaround. What does this imply about when you must submit the batch?",
    options: [
      {
        id: 'A',
        text: 'It can be submitted at any time before 8 AM, even a few minutes prior, since batches typically process quickly in practice.',
        rationale:
          'Wrong — relying on batches typically processing quickly isn\'t a guarantee, and a "just before deadline" submission risks missing the deadline.',
      },
      {
        id: 'B',
        text: "It should be submitted exactly at 8 AM, since that's when the report is needed.",
        rationale: 'Wrong — submitting exactly at the deadline provides zero buffer for the batch\'s processing time, guaranteeing a miss.',
      },
      {
        id: 'C',
        text: 'It must be submitted with enough lead time — accounting for the full 24-hour worst case — to reliably guarantee completion by 8 AM, since there is no guaranteed faster turnaround.',
        rationale:
          'Correct — since the Batches API has no guaranteed latency SLA, up to 24 hours, submission timing must account for the full worst-case window to reliably meet a hard deadline.',
      },
      {
        id: 'D',
        text: 'Submission timing does not matter, since the Batches API always completes within a few minutes.',
        rationale:
          'Wrong — this ignores the Batches API\'s documented lack of a guaranteed fast turnaround; "up to 24 hours" is not "always within a few minutes."',
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'Since the Message Batches API has no guaranteed latency SLA (up to 24 hours), meeting a hard deadline requires submitting with enough lead time to cover the full worst case.',
    difficulty: 'applied',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-02',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-02',
  },
  {
    id: 'q4-s6-0010',
    domain: 4,
    scenarioId: 6,
    taskStatements: ['4.3'],
    selectCount: 1,
    stem: "Your extraction schema strictly validates that a \"discount_percentage\" field is a number, and the tool_use call succeeds without any syntax errors. However, for one document, the extracted value is 150 (a semantically impossible discount percentage). What does this illustrate?",
    options: [
      {
        id: 'A',
        text: 'The JSON schema validation failed, which is why an invalid value was extracted.',
        rationale:
          'Wrong — the number "150" is a syntactically valid number; the schema is satisfied even though the value is logically nonsensical for a percentage.',
      },
      {
        id: 'B',
        text: 'Strict JSON schemas via tool use eliminate syntax errors but do not prevent semantic errors, like a numerically valid but logically impossible value; a range constraint or a separate semantic validation step is still needed.',
        rationale:
          'Correct — this is exactly the documented limitation of schema-only validation, illustrated here; a numeric range constraint or separate semantic check is needed to catch this class of issue.',
      },
      {
        id: 'C',
        text: 'This is impossible — tool_use with a JSON schema guarantees semantically correct values.',
        rationale: 'Wrong — this directly contradicts the documented limitation of schema-only validation.',
      },
      {
        id: 'D',
        text: 'The document itself must be corrupted for this to happen.',
        rationale:
          "Wrong — the document being corrupted isn't implied; the model simply extracted (or hallucinated) a value that happens to be numerically valid but semantically wrong.",
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'Strict JSON schemas via tool use eliminate syntax errors but do not prevent semantic errors — a numerically valid but logically impossible value needs a separate range constraint or semantic validation step.',
    difficulty: 'foundational',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-02',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-02',
  },
  {
    id: 'q4-s6-0011',
    domain: 4,
    scenarioId: 6,
    taskStatements: ['4.3'],
    selectCount: 1,
    stem: "Your extraction schema for a document's \"contract_type\" field uses an enum with three fixed values: \"employment\", \"vendor\", \"nda\". You start encountering ambiguous documents that don't clearly fit any of the three (e.g., a hybrid agreement). What addition would let the model handle this gracefully rather than forcing an incorrect guess?",
    options: [
      {
        id: 'A',
        text: 'Add an "unclear" enum value to the schema, so the model can honestly indicate ambiguity rather than being forced to pick one of the three specific types when none clearly fits.',
        rationale:
          'Correct — adding an enum value like "unclear" for ambiguous cases lets the model honestly represent uncertainty rather than being forced into an incorrect specific classification.',
      },
      {
        id: 'B',
        text: 'Remove the enum constraint and require the model to always pick exactly one of the original three values regardless of ambiguity.',
        rationale:
          'Wrong — this is the current problematic state; forcing a choice among only the original three values is exactly what causes incorrect guesses on ambiguous documents.',
      },
      {
        id: 'C',
        text: 'Add a fourth specific contract type covering every possible hybrid combination in advance.',
        rationale: 'Wrong — trying to anticipate every possible hybrid combination in advance is unbounded and impractical.',
      },
      {
        id: 'D',
        text: "Reject any document that doesn't clearly match one of the three original types without extracting any data from it.",
        rationale: 'Wrong — rejecting the entire document discards other extractable data from it, when only the classification field itself is ambiguous.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Adding an "unclear" enum value is the documented pattern for letting the model honestly represent ambiguity rather than being forced into an incorrect specific classification.',
    difficulty: 'applied',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-02',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-02',
  },
  {
    id: 'q4-s6-0012',
    domain: 4,
    scenarioId: 6,
    taskStatements: ['4.4'],
    selectCount: 1,
    stem: 'A single invoice states the total is $500 in one place and $550 in another (likely a typo in the source document itself). Your extraction should surface this inconsistency for review rather than silently picking one value or averaging them. What schema design supports this?',
    options: [
      {
        id: 'A',
        text: 'Extract only the first value encountered ($500) and ignore the second entirely.',
        rationale: 'Wrong — silently picking the first value discards a genuine inconsistency the downstream system or a human might need to know about.',
      },
      {
        id: 'B',
        text: 'Automatically average the two values ($525) and report that as the extracted total.',
        rationale: "Wrong — averaging fabricates a number that doesn't correspond to anything actually stated in the document.",
      },
      {
        id: 'C',
        text: 'Extract both values along with a "conflict_detected" boolean field set to true, flagging the discrepancy for human review rather than silently resolving it.',
        rationale:
          'Correct — adding a "conflict_detected" boolean for inconsistent source data is the documented self-correction validation pattern, surfacing the discrepancy for review.',
      },
      {
        id: 'D',
        text: 'Fail the entire extraction for this document with no data returned.',
        rationale: 'Wrong — failing the entire extraction discards all the other, unambiguous fields the document likely contains.',
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'A "conflict_detected" boolean field, alongside both extracted conflicting values, surfaces genuine source-document inconsistencies for review rather than silently resolving them.',
    difficulty: 'applied',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-02',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-02',
  },
  {
    id: 'q4-s6-0013',
    domain: 4,
    scenarioId: 6,
    taskStatements: ['4.6'],
    selectCount: 1,
    stem: "You're extracting all named parties and their roles from a 300-page legal filing. A single-pass extraction over the entire document misses several parties mentioned only in the middle sections. What's an effective restructuring?",
    options: [
      {
        id: 'A',
        text: 'Reduce the extraction to only look at the first and last 20 pages, since those are most likely to contain complete information.',
        rationale:
          'Wrong — arbitrarily limiting to the first/last sections would deliberately skip the middle content, discarding exactly the parties known to be missed there.',
      },
      {
        id: 'B',
        text: 'Split the document into smaller, overlapping sections, run extraction on each section separately, and merge the results (de-duplicating parties that appear in multiple sections).',
        rationale:
          'Correct — splitting a long document into smaller, focused sections for separate extraction passes, then merging and de-duplicating results, is the standard mitigation for the lost-in-the-middle effect.',
      },
      {
        id: 'C',
        text: 'Increase the temperature setting so the model considers a wider range of possible parties.',
        rationale: "Wrong — temperature affects output randomness, not the model's positional attention across a long input.",
      },
      {
        id: 'D',
        text: 'Ask the model to guess which parties are likely to be mentioned based on the case type, without re-reading the document.',
        rationale: "Wrong — guessing without reading the actual document risks fabricating parties who aren't genuinely present.",
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'Splitting a long document into smaller sections for separate extraction passes, then merging and de-duplicating results, is the standard mitigation for the lost-in-the-middle effect.',
    difficulty: 'applied',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-02',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-02',
  },
  {
    id: 'q4-s6-0014',
    domain: 4,
    scenarioId: 6,
    taskStatements: ['4.1'],
    selectCount: 1,
    stem: "Your extraction pipeline's confidence-scoring prompt just says \"rate your confidence from 1-10.\" Reviewers find the scores don't meaningfully predict which extractions actually have errors — many \"high confidence\" extractions are wrong, and many \"low confidence\" ones are correct. What would improve this?",
    options: [
      {
        id: 'A',
        text: "Remove confidence scoring entirely, since it's not currently useful.",
        rationale: "Wrong — removing scoring entirely discards a potentially useful signal instead of fixing why the current one isn't well calibrated.",
      },
      {
        id: 'B',
        text: 'Always default to a confidence score of 5 for every extraction to avoid extreme, unreliable scores.',
        rationale: 'Wrong — a constant default score provides no actual signal at all, which is worse than an uncalibrated but at least varying score.',
      },
      {
        id: 'C',
        text: 'Ask reviewers to ignore the confidence scores and review every single extraction manually regardless of score.',
        rationale: 'Wrong — reviewing everything manually defeats the purpose of having confidence-based routing at all.',
      },
      {
        id: 'D',
        text: "Replace the vague \"1-10\" instruction with specific, calibrated criteria for what should count as low vs. high confidence (e.g., low confidence when required information is inferred rather than explicitly stated in the source), and validate the resulting thresholds against a labeled dataset.",
        rationale:
          'Correct — replacing vague confidence instructions with specific criteria, and validating resulting thresholds against a labeled dataset, is the documented approach to achieving a meaningful, calibrated confidence signal.',
      },
    ],
    correctOptionIds: ['D'],
    explanationSummary:
      'Specific, calibrated confidence criteria — validated against a labeled dataset — produce a meaningful confidence signal, unlike a vague numeric-scale instruction.',
    difficulty: 'advanced',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-02',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-02',
  },
  {
    id: 'q4-s6-0015',
    domain: 4,
    scenarioId: 6,
    taskStatements: ['4.2'],
    selectCount: 1,
    stem: "Your extraction pipeline handles scientific papers that report results either as narrative prose (\"the treatment group showed a 23% improvement\") or as data tables. It reliably extracts narrative-form results but frequently misses results that only appear in tables. What would help it handle both formats reliably?",
    options: [
      {
        id: 'A',
        text: 'Add few-shot examples demonstrating correct extraction from both narrative-prose results and table-formatted results, showing the same fields extracted correctly from each format.',
        rationale:
          'Correct — few-shot examples demonstrating correct handling of varied document structures (narrative vs. tabular) are the documented technique for handling structural variety reliably.',
      },
      {
        id: 'B',
        text: 'Convert every table in every source document to prose manually before extraction, as a preprocessing step done by a human.',
        rationale: "Wrong — manually converting every table to prose before extraction is labor-intensive and doesn't scale.",
      },
      {
        id: 'C',
        text: "Remove all documents containing tables from the pipeline's scope entirely.",
        rationale: 'Wrong — excluding documents with tables discards a large amount of legitimately extractable data.',
      },
      {
        id: 'D',
        text: 'Only extract results reported in prose, and document tables as permanently out of scope.',
        rationale: 'Wrong — permanently excluding table-formatted results discards real, valuable data instead of fixing the extraction approach.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Few-shot examples demonstrating correct handling of varied document structures (narrative vs. tabular) are the documented technique for reliably handling structural variety.',
    difficulty: 'applied',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-02',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-02',
  },
  {
    id: 'q4-s6-0016',
    domain: 4,
    scenarioId: 6,
    taskStatements: ['4.4'],
    selectCount: 1,
    stem: "Reviewers frequently dismiss a specific class of \"missing required field\" findings as false alarms — the field is present, just formatted in a way the extraction didn't recognize. You want to systematically identify which specific formatting patterns are causing these dismissed findings so you can fix the prompt for those patterns. What would help?",
    options: [
      {
        id: 'A',
        text: "Stop tracking dismissed findings altogether, since they're 'false alarms' anyway.",
        rationale: 'Wrong — this discards the exact data needed to systematically identify and fix the problematic patterns.',
      },
      {
        id: 'B',
        text: "Ask reviewers to stop dismissing findings, and instead accept the extraction's output as-is.",
        rationale: "Wrong — accepting extraction output as-is regardless of reviewer judgment doesn't fix the underlying recognition gap.",
      },
      {
        id: 'C',
        text: 'Add a detected_pattern field to each finding recording what specifically triggered it, enabling systematic analysis of which formatting patterns are frequently dismissed as false alarms.',
        rationale:
          'Correct — a detected_pattern field enables systematic analysis of which patterns are frequently dismissed, directly supporting targeted prompt improvements.',
      },
      {
        id: 'D',
        text: 'Increase the required-field threshold so fewer fields are marked as required overall.',
        rationale: 'Wrong — reducing which fields are marked required sidesteps the actual problem rather than fixing the recognition gap.',
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'A detected_pattern field on structured findings enables systematic analysis of dismissal patterns, supporting targeted prompt improvements for specific under-recognized formats.',
    difficulty: 'advanced',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-02',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-02',
  },
  {
    id: 'q4-s6-0017',
    domain: 4,
    scenarioId: 6,
    taskStatements: ['4.6'],
    selectCount: 2,
    stem: 'Which TWO of the following are true about multi-pass extraction and review for long documents? (Select 2.)',
    options: [
      {
        id: 'A',
        text: 'Splitting a long document into sections for separate extraction passes helps counteract the lost-in-the-middle effect.',
        rationale: 'Correct — splitting into sections for separate passes is the standard mitigation for the lost-in-the-middle effect on long inputs.',
      },
      {
        id: 'B',
        text: 'A single independent review pass, using a fresh instance with no extraction reasoning context, can catch errors the original extraction missed.',
        rationale:
          'Correct — independent review instances without prior reasoning context are documented as more effective at catching subtle issues than self-review.',
      },
      {
        id: 'C',
        text: 'Multi-pass review always doubles the cost with no benefit to accuracy.',
        rationale: 'Wrong — the value of multi-pass review is catching real errors a single pass misses, a genuine accuracy benefit.',
      },
      {
        id: 'D',
        text: 'Extended thinking by the same instance that performed the original extraction is equally effective as an independent second pass.',
        rationale:
          'Wrong — the same instance retains reasoning context that makes it less likely to question its own decisions, making it less effective than a true independent pass.',
      },
    ],
    correctOptionIds: ['A', 'B'],
    explanationSummary:
      'Splitting long documents into sections mitigates the lost-in-the-middle effect, and independent review instances without prior reasoning context are more effective at catching subtle issues than self-review.',
    difficulty: 'advanced',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-02',
      notes: 'Independent fresh-context LLM blind pass matched the authored key.',
    },
    createdAt: '2026-08-02',
  },
]
