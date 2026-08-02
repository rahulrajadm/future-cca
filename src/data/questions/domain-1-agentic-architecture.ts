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
  {
    id: 'q1-s3-0001',
    domain: 1,
    scenarioId: 3,
    taskStatements: ['1.2'],
    selectCount: 1,
    stem: "In your multi-agent research system, you're considering letting the web-search subagent communicate directly with the synthesis subagent to hand off results, bypassing the coordinator, in order to save a round trip. What is the main risk of this design?",
    options: [
      {
        id: 'A',
        text: 'It breaks the hub-and-spoke pattern where the coordinator manages all inter-subagent communication, error handling, and information routing, reducing observability and making consistent error handling harder to maintain.',
        rationale:
          'Correct — the hub-and-spoke pattern exists precisely so the coordinator has visibility into and control over all inter-subagent communication; bypassing it for a shortcut sacrifices observability and consistent error handling for a modest latency gain.',
      },
      {
        id: 'B',
        text: 'Direct subagent-to-subagent communication is technically impossible with the Agent SDK, so this design cannot be implemented at all.',
        rationale:
          "Wrong — the concern here is architectural/design quality, not a technical impossibility; the point being tested is why this design is discouraged, not whether it's possible.",
      },
      {
        id: 'C',
        text: "It would cause the web-search subagent to inherit the synthesis subagent's full conversation history automatically.",
        rationale:
          "Wrong — subagents don't automatically inherit context regardless of whether communication is direct or coordinator-routed; that's a separate, unrelated property.",
      },
      {
        id: 'D',
        text: 'It eliminates the need for structured data formats when passing information between agents.',
        rationale:
          'Wrong — bypassing the coordinator does not eliminate the need for structured data formats; direct communication would still need clear content/metadata separation.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Hub-and-spoke architecture routes all subagent communication through the coordinator for observability, consistent error handling, and controlled information flow — bypassing it undermines those properties.',
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
    id: 'q1-s3-0002',
    domain: 1,
    scenarioId: 3,
    taskStatements: ['1.2'],
    selectCount: 1,
    stem: "Your research coordinator produces a synthesis report on \"renewable energy adoption trends,\" but the coordinator's own review of the draft notices it only discusses solar and wind, missing geothermal and hydroelectric, which were part of the original request scope. What should the coordinator do?",
    options: [
      {
        id: 'A',
        text: 'Re-delegate to the search and analysis subagents with targeted queries covering geothermal and hydroelectric, then re-invoke synthesis once the additional findings are available.',
        rationale:
          'Correct — this is the iterative refinement loop pattern: the coordinator evaluates synthesis output for gaps, re-delegates targeted queries to close them, and re-invokes synthesis until coverage is sufficient.',
      },
      {
        id: 'B',
        text: 'Publish the report as-is, since solar and wind are the two most commonly discussed renewable sources.',
        rationale: 'Wrong — publishing an incomplete report ignores a coverage gap the coordinator itself identified against the original request scope.',
      },
      {
        id: 'C',
        text: 'Ask the synthesis subagent to simply add a sentence mentioning geothermal and hydroelectric exist, without further research.',
        rationale:
          'Wrong — adding an unsupported sentence without actual research produces an unsubstantiated claim rather than genuinely closing the coverage gap.',
      },
      {
        id: 'D',
        text: 'Restart the entire research process from scratch with a completely new coordinator instance.',
        rationale: 'Wrong — restarting from scratch discards the good work already completed on solar and wind; targeted re-delegation is far more efficient.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Iterative refinement loops let the coordinator evaluate synthesis output for gaps, re-delegate to search and analysis subagents with targeted queries, and re-invoke synthesis until coverage is sufficient.',
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
    id: 'q1-s3-0003',
    domain: 1,
    scenarioId: 3,
    taskStatements: ['1.3'],
    selectCount: 1,
    stem: "You've configured your coordinator agent's system prompt to describe delegating work to subagents, but when it attempts to do so, no subagents are ever actually invoked. What is the most likely cause?",
    options: [
      {
        id: 'A',
        text: 'The coordinator\'s allowedTools configuration does not include "Task", which is required for a coordinator to invoke subagents.',
        rationale:
          'Correct — the Task tool is the mechanism for spawning subagents, and allowedTools must explicitly include "Task" for a coordinator to be able to invoke them; describing delegation in the prompt doesn\'t grant that capability.',
      },
      {
        id: 'B',
        text: 'The subagents have not been given individual AgentDefinition system prompts.',
        rationale: 'Wrong — missing AgentDefinition details would affect subagent behavior once invoked, not whether invocation itself is possible.',
      },
      {
        id: 'C',
        text: 'The coordinator is using fork_session instead of spawning subagents directly.',
        rationale: 'Wrong — fork_session is a session-branching mechanism, unrelated to whether subagents can be spawned via the Task tool.',
      },
      {
        id: 'D',
        text: 'The research topic is too broad for any subagent to be invoked.',
        rationale:
          'Wrong — topic breadth might affect what the coordinator decides to delegate, but would not cause a complete inability to invoke any subagent.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'The Task tool is the mechanism for spawning subagents, and a coordinator\'s allowedTools must include "Task" for delegation to function at all.',
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
    id: 'q1-s3-0004',
    domain: 1,
    scenarioId: 3,
    taskStatements: ['1.3'],
    selectCount: 1,
    stem: "Your synthesis subagent produces a vague, generic report about \"various AI trends\" instead of using the specific findings your web-search and document-analysis subagents already gathered. Investigating, you find the coordinator's prompt to the synthesis subagent says only: \"Synthesize the research findings into a report.\" What is the most likely cause?",
    options: [
      {
        id: 'A',
        text: "The subagent's prompt does not include the actual findings from the prior subagents — subagents do not automatically inherit the coordinator's conversation history, so without explicit context, there's nothing specific for it to synthesize.",
        rationale:
          "Correct — subagent context must be explicitly provided in the prompt; without the prior agents' actual findings included, the synthesis subagent has no specific material to work from and falls back to generic output.",
      },
      {
        id: 'B',
        text: "The synthesis subagent's AgentDefinition is missing a description field.",
        rationale:
          'Wrong — a missing description affects how the coordinator decides when to invoke the subagent, not what specific content the subagent has to work with once invoked.',
      },
      {
        id: 'C',
        text: 'The web-search and document-analysis subagents were invoked sequentially instead of in parallel.',
        rationale: "Wrong — sequential vs. parallel invocation affects latency, not whether the synthesis subagent receives the actual findings in its prompt.",
      },
      {
        id: 'D',
        text: 'The synthesis subagent needs a larger max_tokens value to produce more specific output.',
        rationale: 'Wrong — max_tokens affects output length, not whether the model has specific source material to draw from.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Subagents do not automatically inherit the coordinator\'s conversation history — complete findings from prior agents must be explicitly included in the subagent\'s prompt.',
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
    id: 'q1-s3-0005',
    domain: 1,
    scenarioId: 3,
    taskStatements: ['1.3'],
    selectCount: 1,
    stem: "Your coordinator needs to invoke both a web-search subagent and a document-analysis subagent, which have no dependency on each other's output. Currently, the coordinator calls the web-search subagent, waits for its full response, and only then calls the document-analysis subagent in a separate turn. What change would most directly reduce latency here?",
    options: [
      {
        id: 'A',
        text: 'Emit both Task tool calls in a single coordinator response so the two independent subagents run in parallel, rather than issuing them across separate turns.',
        rationale:
          'Correct — spawning parallel subagents by emitting multiple Task tool calls in a single response, rather than across separate turns, is exactly the mechanism for running independent subagents concurrently.',
      },
      {
        id: 'B',
        text: 'Merge the web-search and document-analysis subagents into a single subagent that does both jobs.',
        rationale:
          "Wrong — merging removes the specialization (and tool-scoping) benefits of separate subagents; it's a much bigger architectural change than necessary to fix a sequencing problem.",
      },
      {
        id: 'C',
        text: 'Increase the timeout configured for each subagent so they have more time to respond.',
        rationale: 'Wrong — increasing timeouts does not change whether the calls run sequentially or in parallel; it only affects how long each is allowed to take.',
      },
      {
        id: 'D',
        text: 'Have the document-analysis subagent begin before the coordinator has finished formulating its request.',
        rationale:
          'Wrong — this does not describe an actual, implementable mechanism; a subagent cannot begin before it has been invoked with a request.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Emitting multiple Task tool calls in a single coordinator response is the mechanism for running independent subagents in parallel, rather than sequentially across separate turns.',
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
    id: 'q1-s3-0006',
    domain: 1,
    scenarioId: 3,
    taskStatements: ['1.7'],
    selectCount: 1,
    stem: "Partway through a research investigation, you've built a solid shared analysis baseline (search results and document summaries already gathered). You now want to explore two different ways of structuring the final report — one organized by theme, one organized by source credibility — without redoing the underlying research for each. What's the best approach?",
    options: [
      {
        id: 'A',
        text: 'Use fork_session to create two independent branches from the current shared analysis baseline, one for each report-structuring approach.',
        rationale:
          'Correct — fork_session is designed exactly for this: creating independent branches from a shared analysis baseline to explore divergent approaches without re-doing the shared underlying work.',
      },
      {
        id: 'B',
        text: 'Use --resume with the same session name twice, once for each approach, sequentially.',
        rationale:
          "Wrong — resuming the same session sequentially with --resume continues one linear conversation; it doesn't create two independent, divergent branches from the same baseline.",
      },
      {
        id: 'C',
        text: 'Start two entirely new sessions from scratch, one for each approach.',
        rationale: 'Wrong — starting from scratch discards the valuable shared research baseline that fork_session exists to preserve and reuse.',
      },
      {
        id: 'D',
        text: 'Ask the synthesis subagent to produce both versions in a single response without forking anything.',
        rationale:
          'Wrong — a single subagent producing two report structures in one response does not provide independent, explorable branches, unlike the intended forking pattern.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'fork_session creates independent branches from a shared analysis baseline, letting divergent approaches be explored without repeating the shared underlying research.',
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
