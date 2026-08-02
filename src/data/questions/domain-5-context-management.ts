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
]
