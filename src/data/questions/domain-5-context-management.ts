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
        text: 'Escalate to a human agent immediately, honoring the explicit request, without first attempting to resolve the issue itself.',
        rationale:
          "Correct — an explicit, upfront customer request for a human is a clear escalation trigger regardless of how simple the underlying issue is; honoring it immediately respects the customer's stated preference rather than second-guessing it.",
      },
      {
        id: 'B',
        text: "Attempt to resolve the address change first, since it's simple, and escalate only if the customer is still unsatisfied afterward.",
        rationale:
          "Wrong — that pattern applies when a customer expresses frustration but hasn't explicitly demanded a human; here the customer already explicitly demanded one upfront.",
      },
      {
        id: 'C',
        text: 'Ask the customer to confirm they still want a human agent even after explaining that the change can be made in under a minute.',
        rationale:
          'Wrong — re-litigating an explicit request the customer already made adds friction and contradicts the instruction to honor such requests immediately.',
      },
      {
        id: 'D',
        text: 'Resolve the address change autonomously and inform the customer afterward that a human has reviewed the change.',
        rationale:
          'Wrong — this is deceptive (no human actually reviewed the change) and does not honor what the customer asked for, which was to speak with a person.',
      },
    ],
    correctOptionIds: ['A'],
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
        text: 'Ask the customer for an additional identifying detail (such as a recent order number or phone number) to determine which account is theirs.',
        rationale:
          'Correct — when a lookup returns multiple matches, the correct pattern is to ask the customer for a disambiguating identifier rather than guess, since acting on the wrong account risks exposing or modifying someone else\'s data.',
      },
      {
        id: 'B',
        text: "Proceed using whichever account was created most recently, since it's more likely to be the active one.",
        rationale:
          'Wrong — "most recent" is a heuristic guess, not a verified identifier, and could easily be wrong.',
      },
      {
        id: 'C',
        text: "Proceed using whichever account has more order history, since it's more likely the one the customer means.",
        rationale: 'Wrong — "more order history" is likewise a heuristic guess unconnected to which account is actually theirs.',
      },
      {
        id: 'D',
        text: 'Merge both accounts automatically so the ambiguity no longer matters.',
        rationale:
          'Wrong — merging accounts is a significant, hard-to-reverse action taken on unverified information; the ambiguity should be resolved with the customer first.',
      },
    ],
    correctOptionIds: ['A'],
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
        text: "Trim the tool's output to only the fields relevant to customer support before it's added to the conversation, rather than passing the full raw response.",
        rationale:
          'Correct — this is the direct fix for tool results consuming tokens disproportionately to their relevance; trimming to the fields that matter removes the bulk of the problem at its source.',
      },
      {
        id: 'B',
        text: 'Summarize the entire conversation more frequently to compensate for the large tool outputs.',
        rationale:
          'Wrong — more frequent summarization still has to process the bloated tool outputs first, and risks the progressive-summarization information loss described elsewhere, rather than preventing the bloat.',
      },
      {
        id: 'C',
        text: "Ask the agent to ignore irrelevant fields in its reasoning without changing what's included in context.",
        rationale:
          "Wrong — telling the agent to \"ignore\" irrelevant fields doesn't remove them from context; the tokens are still consumed regardless of whether the model acts on them.",
      },
      {
        id: 'D',
        text: 'Reduce max_tokens on each response so replies are generated faster.',
        rationale:
          "Wrong — max_tokens controls the length of Claude's own generated output, not the size of tool results already in context; it doesn't address the actual source of the slowdown.",
      },
    ],
    correctOptionIds: ['A'],
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
        text: 'Have Claude maintain a scratchpad file recording key findings as it explores, and reference that file for subsequent questions rather than relying purely on in-context memory of a long session.',
        rationale:
          'Correct — scratchpad files persist key findings across context boundaries, directly counteracting the context degradation that shows up in extended sessions as increasingly generic, unspecific answers.',
      },
      {
        id: 'B',
        text: 'Increase max_tokens so Claude can generate longer, more detailed answers.',
        rationale: "Wrong — max_tokens controls response length, not the model's ability to accurately recall earlier findings from a degraded context.",
      },
      {
        id: 'C',
        text: 'Repeat your original question at the start of every new message for the rest of the session.',
        rationale: "Wrong — repeating the original question doesn't restore earlier findings that have degraded in the model's effective context.",
      },
      {
        id: 'D',
        text: 'Switch to a different, unrelated task to give the model a mental break before returning to the codebase questions.',
        rationale:
          'Wrong — Claude has no persistent "mental state" between unrelated tasks in the way this implies; switching tasks does not repair context degradation.',
      },
    ],
    correctOptionIds: ['A'],
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
        text: 'Spawn a subagent to investigate the authentication question, and have it return a concise summary of findings rather than the full exploration transcript to the main conversation.',
        rationale:
          'Correct — subagent delegation isolates verbose exploration output from the main conversation; the main session receives only the distilled findings it needs, preserving context for the implementation work still to come.',
      },
      {
        id: 'B',
        text: "Ask the question directly in the main conversation and accept that some context budget will be consumed by the exploration.",
        rationale: 'Wrong — this is exactly the outcome the developer is trying to avoid; accepting the cost does not solve the stated problem.',
      },
      {
        id: 'C',
        text: 'Use /compact immediately before asking the question so there is more room for the exploration that follows.',
        rationale:
          '/compact reduces existing context usage but does not prevent the upcoming exploration from still consuming a large amount of context in the main conversation once it happens.',
      },
      {
        id: 'D',
        text: 'Break the authentication question into 10 much smaller questions asked one at a time in the main conversation.',
        rationale:
          'Wrong — splitting into many smaller questions asked directly in the main conversation still runs all the exploration in the same context, adding overhead rather than reducing it.',
      },
    ],
    correctOptionIds: ['A'],
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
        text: 'The "lost in the middle" effect, where models reliably process information at the start and end of long inputs but may under-attend to middle sections; splitting the file into smaller sections for focused review can mitigate this.',
        rationale:
          'Correct — this is a textbook description of the lost-in-the-middle effect, and splitting a long input into smaller, focused passes is a standard mitigation for exactly this kind of position-dependent miss.',
      },
      {
        id: 'B',
        text: 'A fundamental inability of Claude to review generated code at all, meaning code review tasks should always be done by a human instead.',
        rationale:
          'Wrong — this overgeneralizes a specific, well-understood positional effect into a sweeping claim not supported by the scenario.',
      },
      {
        id: 'C',
        text: 'A one-off random error unrelated to file length or position, with no systematic mitigation available.',
        rationale:
          'Wrong — this is a known, systematic effect tied to position within long inputs, not an unrelated random occurrence with no mitigation.',
      },
      {
        id: 'D',
        text: 'An indication that migration files always require manual review regardless of tooling.',
        rationale:
          'Wrong — the scenario is asking about what caused the specific miss and how tooling could address it, not making a blanket claim about migration files.',
      },
    ],
    correctOptionIds: ['A'],
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
]
