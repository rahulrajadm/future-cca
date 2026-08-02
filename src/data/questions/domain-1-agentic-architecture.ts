import type { Question } from '../../types/question'

/**
 * Domain 1: Agentic Architecture & Orchestration (27% of exam blueprint).
 * Covers task statements 1.1-1.7. Scenario-grounded questions here draw
 * primarily from Scenario 1 (Customer Support), Scenario 3 (Multi-Agent
 * Research), and Scenario 4 (Developer Productivity).
 */
export const domain1Questions: Question[] = [
  {
    id: 'q1-s1-0001',
    domain: 1,
    scenarioId: 1,
    taskStatements: ['1.1'],
    selectCount: 1,
    stem: "Your customer support agent's orchestration code treats the presence of any assistant text output as the signal to stop the agentic loop, rather than checking stop_reason. In production, you observe the agent sometimes writes an explanatory sentence mid-task (e.g., \"Let me check the order status\") and the loop terminates prematurely before the tool call it describes is ever executed, leaving the customer's issue unresolved. What is the most effective fix?",
    options: [
      {
        id: 'A',
        text: 'Check stop_reason and continue the loop while it is "tool_use", terminating only when it is "end_turn".',
        rationale:
          'Correct — stop_reason is the authoritative, structured signal the API returns; "tool_use" always means more tool execution is expected, and only "end_turn" means the model is truly finished, so switching the control flow to inspect it removes the parsing problem entirely.',
      },
      {
        id: 'B',
        text: "Add a system prompt instruction telling Claude not to describe its next action in words before taking it.",
        rationale:
          'Wrong — this is a prompt-based fix for what is actually an orchestration bug; even if Claude mostly complies, occasional narration is normal model behavior, and relying on it never happening is fragile.',
      },
      {
        id: 'C',
        text: 'Strip any sentence beginning with phrases like "Let me" from the assistant output before checking for completion.',
        rationale:
          'Wrong — this is a natural-language pattern-matching workaround, exactly the kind of anti-pattern the guide calls out; it will misfire on countless phrasings that were not anticipated.',
      },
      {
        id: 'D',
        text: 'Set a minimum iteration count so the loop cannot terminate before at least 3 tool calls have been made.',
        rationale:
          "Wrong — an arbitrary iteration floor doesn't address the root cause (checking text instead of stop_reason) and could still cut off legitimate short interactions or fail to prevent the bug in longer ones.",
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'stop_reason is the structured, reliable signal for loop control. Parsing assistant text for completion cues is explicitly called out as an anti-pattern because narration and task completion are independent — the model can narrate an action it has not yet taken.',
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
    id: 'q1-s1-0002',
    domain: 1,
    scenarioId: 1,
    taskStatements: ['1.4'],
    selectCount: 1,
    stem: "Your agent occasionally calls process_refund for orders that lookup_order shows as still \"in transit,\" issuing refunds before delivery-failure claims can be confirmed. The system prompt already states that refunds should only be issued after confirming a completed or failed delivery status. What is the most effective way to prevent this from recurring?",
    options: [
      {
        id: 'A',
        text: "Add a programmatic prerequisite that blocks process_refund unless the most recent lookup_order result for that order has a status of 'delivered' or 'failed'.",
        rationale:
          'Correct — this is a business rule where errors have direct financial consequences, so a programmatic gate that deterministically blocks the tool call gives a guarantee that prompt wording never can.',
      },
      {
        id: 'B',
        text: 'Reword the system prompt to more strongly emphasize that refunds require a completed or failed delivery status.',
        rationale:
          'Wrong — the instruction already exists in the prompt; making it stronger in wording still leaves compliance probabilistic rather than guaranteed.',
      },
      {
        id: 'C',
        text: 'Add few-shot examples showing the agent checking delivery status before issuing refunds.',
        rationale:
          "Wrong — few-shot examples can improve typical-case behavior but don't eliminate the non-zero failure rate that matters when refund errors are financially costly.",
      },
      {
        id: 'D',
        text: "Move the delivery-status instruction to the very top of the system prompt for higher priority.",
        rationale:
          'Wrong — reordering the prompt may modestly improve adherence but, like B, remains a probabilistic fix to a problem that needs a deterministic one.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'When deterministic compliance is required for a financially consequential action, only programmatic enforcement (a prerequisite gate blocking the tool call) provides a real guarantee — prompt-based instructions, however well worded, retain a non-zero failure rate.',
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
    id: 'q1-s1-0003',
    domain: 1,
    scenarioId: 1,
    taskStatements: ['1.5'],
    selectCount: 1,
    stem: "get_customer returns a customer's account-creation date as a Unix timestamp, while lookup_order returns order dates in ISO 8601 format. Your agent has started making incorrect statements about how long a customer has held their account, apparently confusing the two formats. What is the best way to fix this?",
    options: [
      {
        id: 'A',
        text: 'Add a PostToolUse hook that normalizes date fields from both tools into a single consistent format before the results are added to the conversation.',
        rationale:
          "Correct — a PostToolUse hook can deterministically transform tool results into a consistent format before the model has to reason about them, removing the root cause rather than asking the model to compensate for it.",
      },
      {
        id: 'B',
        text: "Update the system prompt to remind the agent that get_customer dates are Unix timestamps and lookup_order dates are ISO 8601.",
        rationale:
          'Wrong — this asks the model to correctly remember and apply a format-conversion rule on every relevant turn, exactly the kind of probabilistic compliance a hook exists to avoid needing.',
      },
      {
        id: 'C',
        text: "Ask the customer to confirm their account age whenever it becomes relevant to the conversation.",
        rationale:
          'Wrong — this offloads a data-quality problem onto the customer and adds unnecessary friction to routine interactions.',
      },
      {
        id: 'D',
        text: "Add an instruction telling the agent to double-check its date calculations before stating them.",
        rationale:
          '"Double-checking" is not a mechanism — it is a hope that the model will catch its own formatting error, which is unreliable at scale.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'PostToolUse hooks are the correct place to normalize heterogeneous data formats returned by different tools, so the model always reasons over consistent data rather than being asked to remember and apply conversion rules itself.',
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
    id: 'q1-s1-0004',
    domain: 1,
    scenarioId: 1,
    taskStatements: ['1.6'],
    selectCount: 1,
    stem: "For handling billing dispute cases, you're deciding between two designs: (1) a fixed pipeline that always calls get_customer, then lookup_order, then a dispute-classification step, in that exact order for every case, or (2) letting the agent decide at each step which tool to call next based on what it has learned so far. Billing disputes vary widely — some need order history, some need prior refund records, some need neither. Which approach better fits this workflow, and why?",
    options: [
      {
        id: 'A',
        text: "The adaptive, model-driven approach, because billing disputes have widely varying investigation needs and a fixed sequence would force irrelevant steps on some cases or skip steps that unusual cases require.",
        rationale:
          'Correct — fixed sequential pipelines suit predictable, uniform multi-aspect work, while dynamic, model-driven decomposition suits open-ended, variable investigation — and the scenario described is explicitly variable.',
      },
      {
        id: 'B',
        text: "The fixed pipeline, because it guarantees identical behavior across all billing dispute cases and is easier to audit.",
        rationale:
          "Wrong — uniform behavior is a benefit for predictable workflows, but here it actively works against the case since it can't skip irrelevant steps or add needed ones; auditability doesn't outweigh the workflow mismatch.",
      },
      {
        id: 'C',
        text: 'The fixed pipeline, because model-driven tool selection cannot be trusted to call get_customer when customer identity is relevant.',
        rationale:
          'Wrong — this conflates a different concern (identity verification before financial actions, properly solved with a programmatic prerequisite gate) with the general question of investigation ordering.',
      },
      {
        id: 'D',
        text: 'The adaptive approach, but only if the number of available tools is reduced to exactly two.',
        rationale:
          "Wrong — the number of tools available doesn't determine whether adaptive decomposition is appropriate; that's a tool-distribution concern, not a task-decomposition one.",
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Task decomposition strategy should match the predictability of the workflow: fixed prompt-chained pipelines fit uniform, predictable work, while dynamic model-driven decomposition fits variable, open-ended investigation like billing disputes.',
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
    id: 'q1-s1-0005',
    domain: 1,
    scenarioId: 1,
    taskStatements: ['1.1'],
    selectCount: 1,
    stem: "In your agentic loop implementation, after Claude requests a tool call and your code executes it, the tool's output is logged to your monitoring system but is not included in the next request sent back to Claude — the next request only repeats the original user message. What is the most likely consequence?",
    options: [
      {
        id: 'A',
        text: "Claude will be unable to incorporate the tool's result into its reasoning and may repeat the same tool call or produce a response inconsistent with the actual data retrieved.",
        rationale:
          "Correct — tool results must be explicitly appended to the conversation history sent in the next request; if they aren't, the model has no way to know what happened and can't ground its next action in that information.",
      },
      {
        id: 'B',
        text: 'Claude will automatically retrieve the missing tool result from your monitoring system on its next turn.',
        rationale:
          'Wrong — Claude has no access to systems outside the messages it is sent; it cannot reach into your monitoring system.',
      },
      {
        id: 'C',
        text: 'The agentic loop will terminate immediately with a stop_reason of "end_turn" because no new information was provided.',
        rationale:
          "Wrong — stop_reason reflects Claude's own decision about whether it's done, not a consequence of what your code did or didn't include in context.",
      },
      {
        id: 'D',
        text: "Claude will infer the tool's likely output based on the tool's description and proceed as if it had received real data.",
        rationale:
          'Wrong — without the actual result in context, Claude is more likely to repeat the call or respond incoherently than to confidently fabricate and act on a plausible result as if it were real.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      "Tool results must be appended to conversation history so the model can reason about the next action. Omitting them breaks the feedback loop the agentic pattern depends on.",
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
    id: 'q1-s1-0006',
    domain: 1,
    scenarioId: 1,
    taskStatements: ['1.1'],
    selectCount: 2,
    stem: 'Which TWO of the following are anti-patterns for determining when an agentic loop should stop? (Select 2.)',
    options: [
      {
        id: 'A',
        text: "Checking whether the assistant's response contains any text content, and treating that as a sign the task is complete.",
        rationale:
          'Correct (anti-pattern) — treating the presence of any text content as a completion signal is unreliable because Claude may narrate an intermediate step in text while still intending to call a tool next.',
      },
      {
        id: 'B',
        text: 'Inspecting stop_reason and continuing the loop while it is "tool_use", stopping when it is "end_turn".',
        rationale: 'Wrong — this is the recommended, correct implementation, not an anti-pattern.',
      },
      {
        id: 'C',
        text: 'Setting an arbitrary maximum iteration count as the primary mechanism for deciding when to stop, regardless of stop_reason.',
        rationale:
          'Correct (anti-pattern) — an arbitrary cap used as the primary stopping mechanism substitutes a guess for the model\'s own structured signal, and can cut off legitimate multi-step work or fail to bound genuinely unbounded loops.',
      },
      {
        id: 'D',
        text: 'Appending each tool result to the conversation history before sending the next request to Claude.',
        rationale:
          'Wrong — this step is required for the loop to function correctly; omitting it, not doing it, would be the actual problem.',
      },
    ],
    correctOptionIds: ['A', 'C'],
    explanationSummary:
      'The documented anti-patterns for loop termination are: parsing natural-language signals, using an arbitrary iteration cap as the primary stopping mechanism, and checking for assistant text content as a completion indicator. Options B and D describe the correct implementation, not anti-patterns.',
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
