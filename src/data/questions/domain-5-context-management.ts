import type { Question } from '../../types/question'

/**
 * Domain 5: Context Management & Reliability (15% of exam blueprint).
 * Covers task statements 5.1-5.6. Scenario-grounded questions here draw
 * from all six scenarios, since context/reliability concerns cut across
 * every scenario in the guide.
 */
export const domain5Questions: Question[] = [
  {
    id: 'q5-s1-0001',
    domain: 5,
    scenarioId: 1,
    taskStatements: ['5.1'],
    selectCount: 1,
    stem: "A customer's support conversation spans 40 turns as they describe a complex billing dispute involving three separate charges, specific dates, and dollar amounts. Midway through, your system summarizes the conversation so far to save context space; the summary says the customer \"has some billing concerns from recent months.\" Several turns later, the agent asks the customer to restate the exact charges and dates, frustrating them. What is the most effective fix?",
    options: [
      {
        id: 'A',
        text: 'Extract transactional facts (amounts, dates, charge descriptions) into a persistent "case facts" block that is included in every prompt, separate from and outside the summarized conversation history.',
        rationale:
          'Correct — this directly addresses the known risk that progressive summarization tends to compress specific numbers, dates, and named facts into vague prose; persisting structured facts outside the lossy summarization step keeps them available regardless of how the narrative is condensed.',
      },
      {
        id: 'B',
        text: 'Increase the length of the generated summary so it captures more detail in prose form.',
        rationale:
          'Wrong — a longer prose summary is still prose; without a structural extraction step, specific values remain vulnerable to being smoothed over in future summarization passes.',
      },
      {
        id: 'C',
        text: 'Disable summarization entirely and always pass the full 40-turn conversation history.',
        rationale:
          "Wrong — always passing full history avoids the symptom but doesn't scale and reintroduces the token-budget problem summarization exists to solve.",
      },
      {
        id: 'D',
        text: 'Ask the customer to email a written summary of their dispute instead of describing it in chat.',
        rationale:
          'Wrong — this shifts the burden back onto the customer for a problem that is about how your system manages context, not about how the customer communicates.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Progressive summarization risks condensing numerical values, dates, and specific facts into vague prose. Persisting extracted transactional facts in a dedicated block outside the summarized history avoids this loss.',
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
    id: 'q5-s1-0002',
    domain: 5,
    scenarioId: 1,
    taskStatements: ['5.2'],
    selectCount: 1,
    stem: "A customer's very first message is: \"I don't want to deal with a bot, please connect me to a real person right now.\" The issue itself — a straightforward address change — is well within the agent's capability to resolve autonomously in under a minute. What should the agent do?",
    options: [
      {
        id: 'A',
        text: "Attempt to resolve the address change first, since it's simple, and escalate only if the customer is still unsatisfied afterward.",
        rationale:
          "Wrong — that pattern applies when a customer expresses frustration but hasn't explicitly demanded a human; here the customer already explicitly demanded one upfront.",
      },
      {
        id: 'B',
        text: 'Ask the customer to confirm they still want a human agent even after explaining that the change can be made in under a minute.',
        rationale:
          'Wrong — re-litigating an explicit request the customer already made adds friction and contradicts the instruction to honor such requests immediately.',
      },
      {
        id: 'C',
        text: 'Resolve the address change autonomously and inform the customer afterward that a human has reviewed the change.',
        rationale:
          'Wrong — this is deceptive (no human actually reviewed the change) and does not honor what the customer asked for, which was to speak with a person.',
      },
      {
        id: 'D',
        text: 'Escalate to a human agent immediately, honoring the explicit request, without first attempting to resolve the issue itself.',
        rationale:
          "Correct — an explicit, upfront customer request for a human is a clear escalation trigger regardless of how simple the underlying issue is; honoring it immediately respects the customer's stated preference rather than second-guessing it.",
      },
    ],
    correctOptionIds: ['D'],
    explanationSummary:
      'Explicit customer requests for a human are an escalation trigger that should be honored immediately, independent of whether the agent could technically resolve the issue itself.',
    difficulty: 'foundational',
    verification: {
      status: 'verified',
      reviewer: 'claude-blind-pass',
      method: 'human+llm',
      date: '2026-08-01',
      notes:
        'Blind LLM pass initially answered B (resolve first, escalate only if reiterated), reasoning generically about efficiency. Resolved in favor of A per the exam guide\'s explicit rule to honor explicit human requests immediately without first attempting resolution, distinct from the "offer to resolve" pattern which applies only when the customer has not explicitly demanded a human. Stem confirmed unambiguous on re-read.',
    },
    createdAt: '2026-08-01',
  },
  {
    id: 'q5-s1-0003',
    domain: 5,
    scenarioId: 1,
    taskStatements: ['5.2'],
    selectCount: 1,
    stem: 'get_customer returns two matching accounts for the name and email a customer provided — likely a duplicate account from a past signup. What should the agent do?',
    options: [
      {
        id: 'A',
        text: "Proceed using whichever account has more order history, since it's more likely the one the customer means.",
        rationale: 'Wrong — "more order history" is likewise a heuristic guess unconnected to which account is actually theirs.',
      },
      {
        id: 'B',
        text: 'Merge both accounts automatically so the ambiguity no longer matters.',
        rationale:
          'Wrong — merging accounts is a significant, hard-to-reverse action taken on unverified information; the ambiguity should be resolved with the customer first.',
      },
      {
        id: 'C',
        text: 'Ask the customer for an additional identifying detail (such as a recent order number or phone number) to determine which account is theirs.',
        rationale:
          'Correct — when a lookup returns multiple matches, the correct pattern is to ask the customer for a disambiguating identifier rather than guess, since acting on the wrong account risks exposing or modifying someone else\'s data.',
      },
      {
        id: 'D',
        text: "Proceed using whichever account was created most recently, since it's more likely to be the active one.",
        rationale:
          'Wrong — "most recent" is a heuristic guess, not a verified identifier, and could easily be wrong.',
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'Multiple matches from a lookup require clarification via an additional identifier, not heuristic selection based on recency or record size.',
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
    id: 'q5-s1-0004',
    domain: 5,
    scenarioId: 1,
    taskStatements: ['5.2'],
    selectCount: 1,
    stem: 'A customer requests a partial refund for one item in a bundled order. Store policy addresses refunds for individual items and full-order refunds, but says nothing about partial refunds within a bundle — this specific situation is not covered. What should the agent do?',
    options: [
      {
        id: 'A',
        text: 'Escalate to a human agent, since the policy is silent on this specific situation rather than merely being a complex case the agent could reason through.',
        rationale:
          'Correct — a genuine policy gap (not just a complex case, but one the written policy doesn\'t address at all) is a clear escalation trigger; a human can make or authorize the judgment call the policy doesn\'t cover.',
      },
      {
        id: 'B',
        text: 'Approve the partial refund, reasoning by analogy from the individual-item refund policy.',
        rationale:
          'Wrong — approving based on analogy is the agent making a policy exception on its own, exactly the kind of judgment call that should go to a human rather than being decided autonomously.',
      },
      {
        id: 'C',
        text: 'Deny the partial refund, reasoning by analogy from the full-order refund policy since that is the closest documented case.',
        rationale: 'Wrong — the same problem applies in the opposite direction: denying by analogy is still the agent inventing policy the documentation doesn\'t state.',
      },
      {
        id: 'D',
        text: 'Ask the customer to choose between a full-order refund or no refund, since those are the two documented options.',
        rationale:
          "Wrong — constraining the customer to options that don't address their actual request avoids resolving the ambiguity rather than resolving it.",
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Escalation is appropriate when policy is silent on a specific request, not just when a case is complex — the agent should not invent policy by analogy in either direction.',
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
    id: 'q5-s1-0005',
    domain: 5,
    scenarioId: 1,
    taskStatements: ['5.1'],
    selectCount: 1,
    stem: 'lookup_order returns a JSON object with over 40 fields — shipping carrier metadata, internal warehouse codes, tax calculation breakdowns, and more — for every call. Only about five fields (status, item, order date, refund eligibility, and total) are ever relevant to resolving customer issues. Over a long conversation involving several order lookups, the agent\'s context fills up quickly and its responses slow down. What is the most effective fix?',
    options: [
      {
        id: 'A',
        text: 'Summarize the entire conversation more frequently to compensate for the large tool outputs.',
        rationale:
          'Wrong — more frequent summarization still has to process the bloated tool outputs first, and risks the progressive-summarization information loss described elsewhere, rather than preventing the bloat.',
      },
      {
        id: 'B',
        text: "Ask the agent to ignore irrelevant fields in its reasoning without changing what's included in context.",
        rationale:
          "Wrong — telling the agent to \"ignore\" irrelevant fields doesn't remove them from context; the tokens are still consumed regardless of whether the model acts on them.",
      },
      {
        id: 'C',
        text: 'Reduce max_tokens on each response so replies are generated faster.',
        rationale:
          "Wrong — max_tokens controls the length of Claude's own generated output, not the size of tool results already in context; it doesn't address the actual source of the slowdown.",
      },
      {
        id: 'D',
        text: "Trim the tool's output to only the fields relevant to customer support before it's added to the conversation, rather than passing the full raw response.",
        rationale:
          'Correct — this is the direct fix for tool results consuming tokens disproportionately to their relevance; trimming to the fields that matter removes the bulk of the problem at its source.',
      },
    ],
    correctOptionIds: ['D'],
    explanationSummary:
      'Tool results accumulate in context and consume tokens disproportionately to their relevance. Trimming verbose tool outputs to only relevant fields before they enter context is the direct fix.',
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
    id: 'q5-s2-0001',
    domain: 5,
    scenarioId: 2,
    taskStatements: ['5.4'],
    selectCount: 1,
    stem: "You've been using Claude Code in a single long session to explore an unfamiliar 200,000-line codebase, asking dozens of questions over several hours. You notice Claude has started giving inconsistent answers, and referring to \"typical patterns you'd expect\" rather than the specific classes it examined earlier in the session. What is the most effective way to address this?",
    options: [
      {
        id: 'A',
        text: 'Repeat your original question at the start of every new message for the rest of the session.',
        rationale: "Wrong — repeating the original question doesn't restore earlier findings that have degraded in the model's effective context.",
      },
      {
        id: 'B',
        text: 'Switch to a different, unrelated task to give the model a mental break before returning to the codebase questions.',
        rationale:
          'Wrong — Claude has no persistent "mental state" between unrelated tasks in the way this implies; switching tasks does not repair context degradation.',
      },
      {
        id: 'C',
        text: 'Have Claude maintain a scratchpad file recording key findings as it explores, and reference that file for subsequent questions rather than relying purely on in-context memory of a long session.',
        rationale:
          'Correct — scratchpad files persist key findings across context boundaries, directly counteracting the context degradation that shows up in extended sessions as increasingly generic, unspecific answers.',
      },
      {
        id: 'D',
        text: 'Increase max_tokens so Claude can generate longer, more detailed answers.',
        rationale: "Wrong — max_tokens controls response length, not the model's ability to accurately recall earlier findings from a degraded context.",
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'Scratchpad files persist key findings across context boundaries, which is the recommended mitigation for the context degradation that appears in extended exploration sessions.',
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
    id: 'q5-s2-0002',
    domain: 5,
    scenarioId: 2,
    taskStatements: ['5.4'],
    selectCount: 1,
    stem: "You want Claude Code to investigate \"how does authentication currently work across this codebase\" as part of a larger task, but you're worried the verbose file-by-file exploration needed to answer that question will consume most of your context budget before you even get to the actual implementation work. What's the best approach?",
    options: [
      {
        id: 'A',
        text: 'Break the authentication question into 10 much smaller questions asked one at a time in the main conversation.',
        rationale:
          'Wrong — splitting into many smaller questions asked directly in the main conversation still runs all the exploration in the same context, adding overhead rather than reducing it.',
      },
      {
        id: 'B',
        text: 'Spawn a subagent to investigate the authentication question, and have it return a concise summary of findings rather than the full exploration transcript to the main conversation.',
        rationale:
          'Correct — subagent delegation isolates verbose exploration output from the main conversation; the main session receives only the distilled findings it needs, preserving context for the implementation work still to come.',
      },
      {
        id: 'C',
        text: "Ask the question directly in the main conversation and accept that some context budget will be consumed by the exploration.",
        rationale: 'Wrong — this is exactly the outcome the developer is trying to avoid; accepting the cost does not solve the stated problem.',
      },
      {
        id: 'D',
        text: 'Use /compact immediately before asking the question so there is more room for the exploration that follows.',
        rationale:
          '/compact reduces existing context usage but does not prevent the upcoming exploration from still consuming a large amount of context in the main conversation once it happens.',
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'Subagent delegation isolates verbose exploration output while the main agent coordinates high-level understanding, preserving the main context budget for subsequent work.',
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
    id: 'q5-s2-0003',
    domain: 5,
    scenarioId: 2,
    taskStatements: ['5.4'],
    selectCount: 1,
    stem: 'During a multi-hour Claude Code session doing a large-scale refactor across many subagents, your machine crashes partway through. You want to resume without redoing all the completed work. What design would best support this kind of recovery?',
    options: [
      {
        id: 'A',
        text: "Have each subagent export its completed state to a known location as it finishes, and have the coordinator load a manifest of completed work on resume, injecting it into the resumed session.",
        rationale:
          'Correct — structured state persistence, where each agent exports progress to a known location and a manifest is loaded on resume, allows a coordinator to pick up where a crashed session left off rather than starting over.',
      },
      {
        id: 'B',
        text: 'Rely on Claude Code automatically remembering all prior context the next time you launch it, with no explicit state export needed.',
        rationale:
          "Wrong — there's no such automatic cross-session memory; without an explicit export mechanism, completed work state isn't preserved through a crash.",
      },
      {
        id: 'C',
        text: 'Start the entire refactor over from the beginning to guarantee consistency.',
        rationale: 'Wrong — restarting from scratch discards all the completed work, which is exactly what a good recovery design should avoid needing.',
      },
      {
        id: 'D',
        text: 'Ask Claude to reconstruct what it had likely completed based on the current state of the files alone, without any structured record.',
        rationale:
          'Wrong — inferring progress purely from file state without a structured record is unreliable and could miss in-progress or partially-completed work.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Structured state persistence — each agent exporting state to a known location, with the coordinator loading a manifest on resume — is the designed pattern for crash recovery in extended multi-agent sessions.',
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
    id: 'q5-s2-0004',
    domain: 5,
    scenarioId: 2,
    taskStatements: ['5.1'],
    selectCount: 1,
    stem: 'You ask Claude Code to review a single, very long generated migration file (several thousand lines) for correctness. It correctly flags issues near the beginning and end of the file but misses an obvious bug in the middle section. What does this best illustrate, and what is a reasonable mitigation?',
    options: [
      {
        id: 'A',
        text: 'A fundamental inability of Claude to review generated code at all, meaning code review tasks should always be done by a human instead.',
        rationale:
          'Wrong — this overgeneralizes a specific, well-understood positional effect into a sweeping claim not supported by the scenario.',
      },
      {
        id: 'B',
        text: 'A one-off random error unrelated to file length or position, with no systematic mitigation available.',
        rationale:
          'Wrong — this is a known, systematic effect tied to position within long inputs, not an unrelated random occurrence with no mitigation.',
      },
      {
        id: 'C',
        text: 'An indication that migration files always require manual review regardless of tooling.',
        rationale:
          'Wrong — the scenario is asking about what caused the specific miss and how tooling could address it, not making a blanket claim about migration files.',
      },
      {
        id: 'D',
        text: 'The "lost in the middle" effect, where models reliably process information at the start and end of long inputs but may under-attend to middle sections; splitting the file into smaller sections for focused review can mitigate this.',
        rationale:
          'Correct — this is a textbook description of the lost-in-the-middle effect, and splitting a long input into smaller, focused passes is a standard mitigation for exactly this kind of position-dependent miss.',
      },
    ],
    correctOptionIds: ['D'],
    explanationSummary:
      'Models reliably process information at the beginning and end of long inputs but may omit findings from middle sections. Splitting large reviews into smaller, focused passes mitigates this position effect.',
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
    id: 'q5-s3-0001',
    domain: 5,
    scenarioId: 3,
    taskStatements: ['5.3'],
    selectCount: 1,
    stem: "Your document-analysis subagent fails to parse a specific PDF because it's corrupted. You need to design how this failure is reported back to the coordinator so it can make a good recovery decision. Which approach is most effective?",
    options: [
      {
        id: 'A',
        text: 'Have the subagent immediately terminate the entire research workflow when any single document fails to parse.',
        rationale:
          'Wrong — terminating the entire workflow over a single failed document is disproportionate when other documents processed successfully.',
      },
      {
        id: 'B',
        text: 'Retry parsing the same corrupted PDF up to 50 times before giving up.',
        rationale:
          'Wrong — 50 retries on a corrupted file that cannot be parsed wastes time on a failure that retrying cannot fix; parsing errors from corruption are not transient.',
      },
      {
        id: 'C',
        text: 'Return structured error context to the coordinator including the failure type (parsing error), the specific document that failed, and any documents that were successfully processed so far.',
        rationale:
          'Correct — structured error context (failure type, what was attempted, partial results) is what lets the coordinator make an informed recovery decision, such as proceeding with partial results and noting the gap.',
      },
      {
        id: 'D',
        text: 'Silently skip the corrupted document and report the analysis as fully successful with no mention of the skipped file.',
        rationale:
          'Wrong — silently suppressing the failure and reporting success anyway is a documented anti-pattern; it hides a real gap from the coordinator.',
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'Structured error context — failure type, what was attempted, and partial results — enables the coordinator to make intelligent recovery decisions rather than being left to guess.',
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
    id: 'q5-s3-0002',
    domain: 5,
    scenarioId: 3,
    taskStatements: ['5.3'],
    selectCount: 1,
    stem: "Your web-search subagent sometimes returns zero results because a query genuinely has no matching sources, and other times returns zero results because the search API itself timed out. If both cases are reported to the coordinator identically as \"no results found,\" what problem does this create?",
    options: [
      {
        id: 'A',
        text: 'The web-search subagent will stop functioning for the remainder of the session.',
        rationale: 'Wrong — nothing about a single zero-result report incapacitates the subagent for the rest of the session.',
      },
      {
        id: 'B',
        text: 'The coordinator cannot tell whether a genuinely-covered topic has no supporting sources or whether a retry (or alternative query) might succeed after a transient failure, potentially leading it to under-report coverage gaps or waste effort in the wrong way.',
        rationale:
          'Correct — this is the access-failure-vs-valid-empty-result distinction; collapsing them into one generic report removes the information the coordinator needs to decide between retrying, an alternative approach, or accurately noting a genuine gap.',
      },
      {
        id: 'C',
        text: 'The coordinator will automatically escalate every zero-result query to a human researcher.',
        rationale:
          'Wrong — nothing in the scenario describes an escalation-to-human mechanism being triggered by this.',
      },
      {
        id: 'D',
        text: 'The synthesis subagent will crash whenever it receives a report containing zero results.',
        rationale: "Wrong — a report of zero results wouldn't cause a crash; it's data the coordinator has to interpret, correctly or not.",
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'Distinguishing access failures (which may warrant a retry) from valid empty results (a genuine absence of sources) is essential information a generic "no results" report destroys.',
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
    id: 'q5-s3-0003',
    domain: 5,
    scenarioId: 3,
    taskStatements: ['5.3'],
    selectCount: 1,
    stem: 'Your web-search subagent experiences a transient network error on one of its three queries but succeeds on the other two. What is the best design for how it should handle this?',
    options: [
      {
        id: 'A',
        text: 'Attempt local recovery (e.g., a retry) for the transient failure within the subagent itself, and only propagate an error to the coordinator — along with the successful partial results — if local recovery does not succeed.',
        rationale:
          'Correct — subagents should implement local recovery for transient failures they can resolve themselves, and only propagate to the coordinator errors that cannot be resolved locally, along with whatever partial results are available.',
      },
      {
        id: 'B',
        text: 'Immediately propagate all three query results, including the failure, to the coordinator without attempting any recovery at the subagent level.',
        rationale:
          'Wrong — skipping local recovery entirely for a transient, likely-retryable failure pushes unnecessary work and latency up to the coordinator.',
      },
      {
        id: 'C',
        text: 'Discard the two successful results since the overall batch of three queries did not fully succeed.',
        rationale: 'Wrong — discarding valid, successfully retrieved results because of an unrelated failure on a different query wastes real, usable information.',
      },
      {
        id: 'D',
        text: 'Report only the failure to the coordinator and omit the two successful results entirely.',
        rationale: 'Wrong — omitting the successful results deprives the coordinator of information it could use even while the failed query is being handled.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Subagents should implement local recovery for transient failures, propagating to the coordinator only errors that cannot be resolved locally, together with partial results and what was attempted.',
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
    id: 'q5-s3-0004',
    domain: 5,
    scenarioId: 3,
    taskStatements: ['5.6'],
    selectCount: 1,
    stem: "Your document-analysis subagent finds a statistic in a source and passes it along as plain prose: \"Adoption rates have grown significantly according to recent research.\" The synthesis subagent later cannot say which source this came from when a reader asks for the citation. What is the most effective fix?",
    options: [
      {
        id: 'A',
        text: "Instruct the synthesis subagent to guess a plausible-sounding source if the original isn't clear.",
        rationale: 'Wrong — fabricating a plausible-sounding source is a serious accuracy problem, arguably worse than having no citation at all.',
      },
      {
        id: 'B',
        text: 'Remove all statistics from the final report to avoid any citation issues.',
        rationale: 'Wrong — removing statistics discards genuinely useful findings instead of fixing the actual problem, which is a lack of preserved attribution.',
      },
      {
        id: 'C',
        text: 'Have the synthesis subagent write in a more formal tone so citations seem more credible.',
        rationale: 'Wrong — tone has no bearing on whether a citation is actually correct or traceable to its source.',
      },
      {
        id: 'D',
        text: 'Require the document-analysis subagent to output structured claim-source mappings — the specific claim, an evidence excerpt, and the source URL or document name — that the synthesis subagent preserves and merges when combining findings.',
        rationale:
          'Correct — structured claim-source mappings preserve attribution through the pipeline; requiring them from the start prevents the loss of source information that happens when findings are compressed into unattributed prose.',
      },
    ],
    correctOptionIds: ['D'],
    explanationSummary:
      'Structured claim-source mappings — preserved and merged through synthesis — are what prevent source attribution from being lost during summarization.',
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
    id: 'q5-s3-0005',
    domain: 5,
    scenarioId: 3,
    taskStatements: ['5.6'],
    selectCount: 1,
    stem: 'Two credible sources report different figures for the same statistic: one says adoption grew 22% year-over-year, another says 31%. How should this be handled in the final research report?',
    options: [
      {
        id: 'A',
        text: 'Present only the higher figure, since it is more likely to be the one currently accurate.',
        rationale: "Wrong — there's no stated basis for assuming the higher figure is more accurate; picking one arbitrarily hides real uncertainty.",
      },
      {
        id: 'B',
        text: 'Omit the statistic entirely from the report since the sources disagree.',
        rationale: 'Wrong — omitting the statistic entirely discards genuinely relevant information rather than presenting it transparently with its conflict noted.',
      },
      {
        id: 'C',
        text: 'Include both values with clear source attribution for each, annotating the conflict, rather than arbitrarily selecting one figure to present as the answer.',
        rationale:
          'Correct — conflicting statistics from credible sources should be annotated with source attribution rather than arbitrarily resolved, preserving the reader\'s ability to see and judge the disagreement.',
      },
      {
        id: 'D',
        text: 'Average the two figures (26.5%) and present that as the definitive number.',
        rationale:
          'Wrong — averaging fabricates a number that no source actually reported and misrepresents both original claims as if they agreed on a midpoint.',
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'Conflicting statistics from credible sources should be annotated with source attribution rather than arbitrarily resolved to a single value.',
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
    id: 'q5-s3-0006',
    domain: 5,
    scenarioId: 3,
    taskStatements: ['5.6'],
    selectCount: 1,
    stem: "Your research report cites a 2019 industry survey stating \"only 12% of companies have adopted the technology,\" alongside a 2026 survey stating \"68% of companies have adopted the technology,\" and a reader flags this as \"contradictory data in the same report.\" What would have prevented this confusion?",
    options: [
      {
        id: 'A',
        text: 'Rounding both percentages to the nearest ten to make them appear more consistent with each other.',
        rationale: 'Wrong — rounding to force apparent consistency actively obscures the real, meaningful difference between the two data points.',
      },
      {
        id: 'B',
        text: "Requiring each source's publication or data-collection date to be included in the structured output, so the two figures are correctly understood as showing change over time rather than a contradiction.",
        rationale:
          'Correct — requiring publication or data-collection dates in structured outputs is exactly what prevents legitimate temporal differences from being misread as contradictions.',
      },
      {
        id: 'C',
        text: 'Removing the older 2019 figure entirely since more recent data is always more relevant.',
        rationale:
          "Wrong — the older figure isn't wrong or irrelevant — it shows a meaningful trend when paired with the date; removing it discards useful context.",
      },
      {
        id: 'D',
        text: 'Instructing the synthesis subagent to never cite statistics from more than one time period in the same report.',
        rationale: 'Wrong — citing multiple time periods is often exactly what a report should do to show trends; the fix is dating the data, not banning multi-period citations.',
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'Requiring publication or data-collection dates in structured outputs prevents temporal differences between sources from being misinterpreted as contradictions.',
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
    id: 'q5-s6-0001',
    domain: 5,
    scenarioId: 6,
    taskStatements: ['5.5'],
    selectCount: 1,
    stem: 'Your extraction pipeline reports 97% overall accuracy across all documents processed last quarter. Before deciding to reduce human review, what should you check first?',
    options: [
      {
        id: 'A',
        text: 'Nothing further — a 97% aggregate accuracy is high enough on its own to justify reducing human review across the board.',
        rationale:
          'Wrong — this is exactly the risk being tested: a strong aggregate number can hide a segment with much worse performance that shouldn\'t yet have reduced review.',
      },
      {
        id: 'B',
        text: "Whether 97% is higher than a competing extraction vendor's published accuracy figure.",
        rationale: "Wrong — a competitor's figure is irrelevant to whether your own pipeline's accuracy is uniformly reliable across your own document types and fields.",
      },
      {
        id: 'C',
        text: 'Whether accuracy is consistently high across all document types and fields, since an aggregate figure can mask poor performance on specific segments even when the overall number looks strong.',
        rationale:
          'Correct — aggregate accuracy metrics may mask poor performance on specific document types or fields; validating accuracy by segment is necessary before automating high-confidence extractions.',
      },
      {
        id: 'D',
        text: 'Whether the pipeline processed more documents this quarter than last quarter.',
        rationale: "Wrong — processing volume doesn't speak to whether accuracy is consistent across segments, which is the actual question that matters here.",
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'Aggregate accuracy metrics may mask poor performance on specific document types or fields; validating accuracy by segment is necessary before reducing human review.',
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
    id: 'q5-s6-0002',
    domain: 5,
    scenarioId: 6,
    taskStatements: ['5.5'],
    selectCount: 1,
    stem: "You want an ongoing way to measure the true error rate of extractions your pipeline marks as \"high confidence,\" including catching novel error patterns you haven't seen before, without manually reviewing every single high-confidence extraction (which would defeat the purpose of automation). What approach supports this?",
    options: [
      {
        id: 'A',
        text: 'Only review high-confidence extractions when a developer happens to notice something looks wrong.',
        rationale: "Wrong — relying on incidental noticing is unsystematic and won't reliably catch error patterns, especially rare or subtle ones.",
      },
      {
        id: 'B',
        text: 'Implement stratified random sampling of high-confidence extractions for ongoing error rate measurement and novel pattern detection.',
        rationale:
          'Correct — stratified random sampling of high-confidence extractions is the documented approach for ongoing error rate measurement and detecting novel error patterns.',
      },
      {
        id: 'C',
        text: 'Review every single high-confidence extraction manually, since sampling can never be as accurate as full review.',
        rationale: 'Wrong — full manual review of every high-confidence extraction defeats the purpose of automating that class of extraction in the first place.',
      },
      {
        id: 'D',
        text: 'Stop measuring error rates on high-confidence extractions entirely, since they are high confidence by definition.',
        rationale:
          'Wrong — "high confidence" is the model\'s own self-assessment, not a guarantee of correctness; skipping measurement removes the check needed to validate that assessment.',
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'Stratified random sampling of high-confidence extractions enables ongoing error rate measurement and novel pattern detection without full manual review.',
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
    id: 'q5-s6-0003',
    domain: 5,
    scenarioId: 6,
    taskStatements: ['5.5'],
    selectCount: 1,
    stem: "Your model outputs a confidence score for each extracted field, but you're not sure whether a score of \"0.8\" actually corresponds to a meaningfully different error rate than a score of \"0.6\" — the raw numbers might not be well calibrated. How should you determine appropriate confidence thresholds for routing to human review?",
    options: [
      {
        id: 'A',
        text: "Calibrate review thresholds using a labeled validation set, comparing the model's confidence scores against actual known-correct answers to see what threshold meaningfully separates accurate from inaccurate extractions.",
        rationale:
          'Correct — calibrating review thresholds using labeled validation sets is how you determine what a given confidence score actually means in terms of real accuracy.',
      },
      {
        id: 'B',
        text: 'Pick a threshold of exactly 0.9 for every field, since that is a conventionally round number.',
        rationale:
          'Wrong — an arbitrary round number without validating it against actual outcomes doesn\'t address whether that threshold meaningfully separates accurate from inaccurate extractions.',
      },
      {
        id: 'C',
        text: 'Ignore the confidence scores entirely, since raw model-reported numbers can never be trusted for any purpose.',
        rationale: 'Wrong — this overreacts to the calibration concern; the fix is validating and calibrating the scores, not discarding them as inherently useless.',
      },
      {
        id: 'D',
        text: 'Route every extraction to human review regardless of confidence score, making the score irrelevant to the decision.',
        rationale: 'Wrong — routing everything to review regardless of confidence defeats the purpose of having a confidence-based routing mechanism at all.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Field-level confidence scores should be calibrated against a labeled validation set to determine what threshold actually separates accurate from inaccurate extractions.',
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
    id: 'q5-s6-0004',
    domain: 5,
    scenarioId: 6,
    taskStatements: ['5.5'],
    selectCount: 1,
    stem: "During extraction, one document contains a shipping address that appears twice with two different values — likely a data entry error somewhere upstream. The model reports moderate confidence on the address field due to this internal contradiction within the source document itself. What's the appropriate handling?",
    options: [
      {
        id: 'A',
        text: 'Automatically select the first-listed address without flagging the discrepancy anywhere.',
        rationale:
          'Wrong — silently picking one value without flagging the contradiction risks propagating a wrong address downstream with no visibility into the uncertainty.',
      },
      {
        id: 'B',
        text: 'Automatically select the second-listed address, since later values in a document are generally assumed more authoritative.',
        rationale: 'Wrong — "later is more authoritative" is an unsupported heuristic assumption, not a validated rule, and should not be applied silently.',
      },
      {
        id: 'C',
        text: 'Discard the entire document from processing because one field is ambiguous.',
        rationale: 'Wrong — discarding the whole document over one ambiguous field wastes all the other, unambiguous information it likely contains.',
      },
      {
        id: 'D',
        text: 'Route this extraction to human review specifically because the source document itself is internally contradictory, prioritizing limited reviewer capacity for genuinely ambiguous cases like this one.',
        rationale:
          'Correct — routing extractions with ambiguous or contradictory source documents to human review, prioritizing limited reviewer capacity, is exactly the appropriate design.',
      },
    ],
    correctOptionIds: ['D'],
    explanationSummary:
      'Extractions with ambiguous or contradictory source documents should be routed to human review, prioritizing limited reviewer capacity for genuinely uncertain cases.',
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
    id: 'q5-s6-0005',
    domain: 5,
    scenarioId: 6,
    taskStatements: ['5.1'],
    selectCount: 1,
    stem: 'Your document ingestion pipeline passes raw OCR output directly into the extraction prompt for every page, including repeated page headers, footers, and watermark text that appears identically on all 200 pages of a long contract. This bloats the prompt and increases cost without adding extraction value. What is the most effective fix?',
    options: [
      {
        id: 'A',
        text: 'Increase max_tokens on the extraction call so the model has more room to process the repeated content.',
        rationale: 'Wrong — max_tokens affects generated output length, not the size or noise level of the input being provided.',
      },
      {
        id: 'B',
        text: "Strip repeated, non-substantive boilerplate (headers, footers, watermarks) from the OCR output before it's included in the extraction prompt, keeping only the substantive content.",
        rationale:
          'Correct — trimming irrelevant, repeated content before it enters the prompt directly reduces token usage and cost without losing extraction-relevant information.',
      },
      {
        id: 'C',
        text: 'Ask the model to ignore headers and footers in its reasoning without removing them from the input.',
        rationale: "Wrong — asking the model to \"ignore\" content already in the prompt doesn't remove the tokens being consumed or the cost of processing them.",
      },
      {
        id: 'D',
        text: 'Split every page into its own separate API call regardless of content, to reduce the size of any single request.',
        rationale:
          "Wrong — splitting into per-page calls regardless of content doesn't address the actual source of bloat and could fragment context needed to extract data spanning multiple pages.",
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'Trimming repeated, non-substantive boilerplate before it enters the prompt reduces token usage and cost, the same principle as trimming verbose tool outputs to relevant fields.',
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
    id: 'q5-s6-0006',
    domain: 5,
    scenarioId: 6,
    taskStatements: ['5.1'],
    selectCount: 1,
    stem: 'You ask Claude to extract every defined term and its definition from a 150-page legal contract in a single request. It correctly extracts terms defined in the first and last few pages but misses several terms defined in the middle of the document. What is the most effective fix?',
    options: [
      {
        id: 'A',
        text: 'Increase the model\'s temperature so it explores the document more thoroughly.',
        rationale:
          "Wrong — temperature affects output randomness, not the model's positional attention across a long input; it doesn't address the lost-in-the-middle effect.",
      },
      {
        id: 'B',
        text: 'Ask the model to try again with the exact same single request, expecting a different result.',
        rationale: 'Wrong — repeating the identical request over the same full-length input is likely to reproduce the same positional miss.',
      },
      {
        id: 'C',
        text: 'Split the document into smaller sections and run extraction on each section separately, then combine the results, rather than processing the entire 150 pages in one pass.',
        rationale:
          'Correct — this is the lost-in-the-middle effect; splitting a long document into smaller sections for separate extraction passes directly mitigates the reduced attention to middle content.',
      },
      {
        id: 'D',
        text: 'Reformat the contract to remove all section headers before extraction.',
        rationale:
          'Wrong — removing section headers does not address the underlying positional attention issue and could make the document harder to navigate.',
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'The lost-in-the-middle effect causes reduced attention to content in the middle of long inputs. Splitting into smaller sections for separate passes is the standard mitigation.',
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
