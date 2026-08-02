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
        text: 'Reword the system prompt to more strongly emphasize that refunds require a completed or failed delivery status.',
        rationale:
          'Wrong — the instruction already exists in the prompt; making it stronger in wording still leaves compliance probabilistic rather than guaranteed.',
      },
      {
        id: 'B',
        text: 'Add few-shot examples showing the agent checking delivery status before issuing refunds.',
        rationale:
          "Wrong — few-shot examples can improve typical-case behavior but don't eliminate the non-zero failure rate that matters when refund errors are financially costly.",
      },
      {
        id: 'C',
        text: "Move the delivery-status instruction to the very top of the system prompt for higher priority.",
        rationale:
          'Wrong — reordering the prompt may modestly improve adherence but, like B, remains a probabilistic fix to a problem that needs a deterministic one.',
      },
      {
        id: 'D',
        text: "Add a programmatic prerequisite that blocks process_refund unless the most recent lookup_order result for that order has a status of 'delivered' or 'failed'.",
        rationale:
          'Correct — this is a business rule where errors have direct financial consequences, so a programmatic gate that deterministically blocks the tool call gives a guarantee that prompt wording never can.',
      },
    ],
    correctOptionIds: ['D'],
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
        text: "Ask the customer to confirm their account age whenever it becomes relevant to the conversation.",
        rationale:
          'Wrong — this offloads a data-quality problem onto the customer and adds unnecessary friction to routine interactions.',
      },
      {
        id: 'B',
        text: "Add an instruction telling the agent to double-check its date calculations before stating them.",
        rationale:
          '"Double-checking" is not a mechanism — it is a hope that the model will catch its own formatting error, which is unreliable at scale.',
      },
      {
        id: 'C',
        text: 'Add a PostToolUse hook that normalizes date fields from both tools into a single consistent format before the results are added to the conversation.',
        rationale:
          "Correct — a PostToolUse hook can deterministically transform tool results into a consistent format before the model has to reason about them, removing the root cause rather than asking the model to compensate for it.",
      },
      {
        id: 'D',
        text: "Update the system prompt to remind the agent that get_customer dates are Unix timestamps and lookup_order dates are ISO 8601.",
        rationale:
          'Wrong — this asks the model to correctly remember and apply a format-conversion rule on every relevant turn, exactly the kind of probabilistic compliance a hook exists to avoid needing.',
      },
    ],
    correctOptionIds: ['C'],
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
        text: 'The adaptive approach, but only if the number of available tools is reduced to exactly two.',
        rationale:
          "Wrong — the number of tools available doesn't determine whether adaptive decomposition is appropriate; that's a tool-distribution concern, not a task-decomposition one.",
      },
      {
        id: 'B',
        text: "The adaptive, model-driven approach, because billing disputes have widely varying investigation needs and a fixed sequence would force irrelevant steps on some cases or skip steps that unusual cases require.",
        rationale:
          'Correct — fixed sequential pipelines suit predictable, uniform multi-aspect work, while dynamic, model-driven decomposition suits open-ended, variable investigation — and the scenario described is explicitly variable.',
      },
      {
        id: 'C',
        text: "The fixed pipeline, because it guarantees identical behavior across all billing dispute cases and is easier to audit.",
        rationale:
          "Wrong — uniform behavior is a benefit for predictable workflows, but here it actively works against the case since it can't skip irrelevant steps or add needed ones; auditability doesn't outweigh the workflow mismatch.",
      },
      {
        id: 'D',
        text: 'The fixed pipeline, because model-driven tool selection cannot be trusted to call get_customer when customer identity is relevant.',
        rationale:
          'Wrong — this conflates a different concern (identity verification before financial actions, properly solved with a programmatic prerequisite gate) with the general question of investigation ordering.',
      },
    ],
    correctOptionIds: ['B'],
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
        text: 'Inspecting stop_reason and continuing the loop while it is "tool_use", stopping when it is "end_turn".',
        rationale: 'Wrong — this is the recommended, correct implementation, not an anti-pattern.',
      },
      {
        id: 'B',
        text: 'Setting an arbitrary maximum iteration count as the primary mechanism for deciding when to stop, regardless of stop_reason.',
        rationale:
          'Correct (anti-pattern) — an arbitrary cap used as the primary stopping mechanism substitutes a guess for the model\'s own structured signal, and can cut off legitimate multi-step work or fail to bound genuinely unbounded loops.',
      },
      {
        id: 'C',
        text: 'Appending each tool result to the conversation history before sending the next request to Claude.',
        rationale:
          'Wrong — this step is required for the loop to function correctly; omitting it, not doing it, would be the actual problem.',
      },
      {
        id: 'D',
        text: "Checking whether the assistant's response contains any text content, and treating that as a sign the task is complete.",
        rationale:
          'Correct (anti-pattern) — treating the presence of any text content as a completion signal is unreliable because Claude may narrate an intermediate step in text while still intending to call a tool next.',
      },
    ],
    correctOptionIds: ['B', 'D'],
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
        text: "It would cause the web-search subagent to inherit the synthesis subagent's full conversation history automatically.",
        rationale:
          "Wrong — subagents don't automatically inherit context regardless of whether communication is direct or coordinator-routed; that's a separate, unrelated property.",
      },
      {
        id: 'B',
        text: 'It eliminates the need for structured data formats when passing information between agents.',
        rationale:
          'Wrong — bypassing the coordinator does not eliminate the need for structured data formats; direct communication would still need clear content/metadata separation.',
      },
      {
        id: 'C',
        text: 'It breaks the hub-and-spoke pattern where the coordinator manages all inter-subagent communication, error handling, and information routing, reducing observability and making consistent error handling harder to maintain.',
        rationale:
          'Correct — the hub-and-spoke pattern exists precisely so the coordinator has visibility into and control over all inter-subagent communication; bypassing it for a shortcut sacrifices observability and consistent error handling for a modest latency gain.',
      },
      {
        id: 'D',
        text: 'Direct subagent-to-subagent communication is technically impossible with the Agent SDK, so this design cannot be implemented at all.',
        rationale:
          "Wrong — the concern here is architectural/design quality, not a technical impossibility; the point being tested is why this design is discouraged, not whether it's possible.",
      },
    ],
    correctOptionIds: ['C'],
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
        text: 'The subagents have not been given individual AgentDefinition system prompts.',
        rationale: 'Wrong — missing AgentDefinition details would affect subagent behavior once invoked, not whether invocation itself is possible.',
      },
      {
        id: 'B',
        text: 'The coordinator is using fork_session instead of spawning subagents directly.',
        rationale: 'Wrong — fork_session is a session-branching mechanism, unrelated to whether subagents can be spawned via the Task tool.',
      },
      {
        id: 'C',
        text: 'The research topic is too broad for any subagent to be invoked.',
        rationale:
          'Wrong — topic breadth might affect what the coordinator decides to delegate, but would not cause a complete inability to invoke any subagent.',
      },
      {
        id: 'D',
        text: 'The coordinator\'s allowedTools configuration does not include "Task", which is required for a coordinator to invoke subagents.',
        rationale:
          'Correct — the Task tool is the mechanism for spawning subagents, and allowedTools must explicitly include "Task" for a coordinator to be able to invoke them; describing delegation in the prompt doesn\'t grant that capability.',
      },
    ],
    correctOptionIds: ['D'],
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
        text: 'The web-search and document-analysis subagents were invoked sequentially instead of in parallel.',
        rationale: "Wrong — sequential vs. parallel invocation affects latency, not whether the synthesis subagent receives the actual findings in its prompt.",
      },
      {
        id: 'B',
        text: 'The synthesis subagent needs a larger max_tokens value to produce more specific output.',
        rationale: 'Wrong — max_tokens affects output length, not whether the model has specific source material to draw from.',
      },
      {
        id: 'C',
        text: "The subagent's prompt does not include the actual findings from the prior subagents — subagents do not automatically inherit the coordinator's conversation history, so without explicit context, there's nothing specific for it to synthesize.",
        rationale:
          "Correct — subagent context must be explicitly provided in the prompt; without the prior agents' actual findings included, the synthesis subagent has no specific material to work from and falls back to generic output.",
      },
      {
        id: 'D',
        text: "The synthesis subagent's AgentDefinition is missing a description field.",
        rationale:
          'Wrong — a missing description affects how the coordinator decides when to invoke the subagent, not what specific content the subagent has to work with once invoked.',
      },
    ],
    correctOptionIds: ['C'],
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
        text: 'Have the document-analysis subagent begin before the coordinator has finished formulating its request.',
        rationale:
          'Wrong — this does not describe an actual, implementable mechanism; a subagent cannot begin before it has been invoked with a request.',
      },
      {
        id: 'B',
        text: 'Emit both Task tool calls in a single coordinator response so the two independent subagents run in parallel, rather than issuing them across separate turns.',
        rationale:
          'Correct — spawning parallel subagents by emitting multiple Task tool calls in a single response, rather than across separate turns, is exactly the mechanism for running independent subagents concurrently.',
      },
      {
        id: 'C',
        text: 'Merge the web-search and document-analysis subagents into a single subagent that does both jobs.',
        rationale:
          "Wrong — merging removes the specialization (and tool-scoping) benefits of separate subagents; it's a much bigger architectural change than necessary to fix a sequencing problem.",
      },
      {
        id: 'D',
        text: 'Increase the timeout configured for each subagent so they have more time to respond.',
        rationale: 'Wrong — increasing timeouts does not change whether the calls run sequentially or in parallel; it only affects how long each is allowed to take.',
      },
    ],
    correctOptionIds: ['B'],
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
  {
    id: 'q1-s4-0001',
    domain: 1,
    scenarioId: 4,
    taskStatements: ['1.6'],
    selectCount: 1,
    stem: "You ask Claude Code to \"modernize error handling across this legacy Express application.\" The codebase has inconsistent error handling patterns spread across dozens of route handlers, with no single obvious starting point. What is the most effective way for Claude Code to approach this?",
    options: [
      {
        id: 'A',
        text: 'Immediately begin rewriting the first route handler file alphabetically, then proceed to the next file in sequence.',
        rationale:
          "Wrong — alphabetical, sequential processing ignores which handlers actually matter most and doesn't adapt to what's discovered along the way.",
      },
      {
        id: 'B',
        text: 'Generate a single find-and-replace pattern intended to fix all inconsistent error handling in one pass.',
        rationale:
          'Wrong — a single uniform find-and-replace is unlikely to correctly handle "inconsistent" patterns that, by definition, vary across the codebase.',
      },
      {
        id: 'C',
        text: 'Ask the developer to first write a complete specification of every error handling pattern currently in use before starting.',
        rationale:
          'Wrong — this defeats the purpose of using Claude Code to help map and understand the inconsistency in the first place.',
      },
      {
        id: 'D',
        text: 'First map the codebase structure and identify the highest-impact route handlers, then create a prioritized plan that adapts as dependencies and patterns are discovered along the way.',
        rationale:
          'Correct — decomposing open-ended tasks by first mapping structure, identifying high-impact areas, then creating a prioritized plan that adapts as dependencies are discovered is the recommended approach.',
      },
    ],
    correctOptionIds: ['D'],
    explanationSummary:
      'Open-ended tasks are best decomposed by first mapping structure and identifying high-impact areas, then building an adaptive, prioritized plan — not fixed sequential or uniform automated approaches.',
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
    id: 'q1-s4-0002',
    domain: 1,
    scenarioId: 4,
    taskStatements: ['1.1'],
    selectCount: 1,
    stem: "You're building a developer productivity agent that autonomously runs a multi-step refactor: it reads a file, makes an edit, runs the test suite, and repeats until tests pass. Your orchestration code currently stops the loop as soon as the agent's response contains the words \"tests pass.\" What risk does this introduce?",
    options: [
      {
        id: 'A',
        text: 'The loop will never terminate under any circumstances.',
        rationale: 'Wrong — the described behavior would actually cause premature (not absent) termination, the opposite problem.',
      },
      {
        id: 'B',
        text: 'The test suite will run twice as often as necessary.',
        rationale: 'Wrong — this describes a frequency issue, not the actual risk of stopping based on unreliable text matching.',
      },
      {
        id: 'C',
        text: "The agent could mention \"tests pass\" as an expected future outcome or in passing, causing the loop to stop before verification has actually happened via a real tool result — the loop should instead check stop_reason and the actual tool results, not the text content.",
        rationale:
          'Correct — this is the anti-pattern of checking text content as a completion indicator instead of the structured stop_reason and actual tool results; the model could reference the phrase without it reflecting a verified outcome.',
      },
      {
        id: 'D',
        text: 'The agent will be unable to read any files after the first iteration.',
        rationale: 'Wrong — nothing about text-based termination checking prevents subsequent file reads; the two are unrelated.',
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'Checking assistant text content for completion phrases is an anti-pattern; loop control should be based on stop_reason and the actual results of tool execution, not on narrated text.',
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
    id: 'q1-s4-0003',
    domain: 1,
    scenarioId: 4,
    taskStatements: ['1.4'],
    selectCount: 1,
    stem: "Your developer productivity agent has Write and Bash access and is generally reliable, but your team wants an absolute guarantee that it can never modify files under /db/migrations/ without a human explicitly approving each change first, given how costly a mistaken migration edit could be. Prompt instructions already tell the agent to ask for approval before touching migration files. Is this sufficient?",
    options: [
      {
        id: 'A',
        text: 'Yes, because a clear prompt instruction is always followed reliably by the model.',
        rationale:
          "Wrong — this is exactly the assumption that doesn't hold; prompt-based compliance is probabilistic, not guaranteed.",
      },
      {
        id: 'B',
        text: 'No — prompt instructions have a non-zero failure rate, so a programmatic gate that blocks Write/Bash operations targeting that path unless explicit approval has been recorded is needed for an absolute guarantee.',
        rationale:
          'Correct — when deterministic compliance is required for a costly, hard-to-reverse action, only a programmatic gate can provide the guarantee being asked for, not prompt wording alone.',
      },
      {
        id: 'C',
        text: "Yes, because Write and Bash tools automatically request human approval for any path containing the word 'migrations'.",
        rationale: 'Wrong — there is no such automatic built-in approval behavior tied to path names; this is not a real mechanism.',
      },
      {
        id: 'D',
        text: 'No — the only way to prevent this is to remove Write and Bash access from the agent entirely for the rest of the session.',
        rationale:
          'Wrong — removing all Write/Bash access entirely is a much bigger restriction than necessary; a targeted gate on the specific risky path preserves the agent\'s usefulness elsewhere.',
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'When deterministic compliance is required for a costly, hard-to-reverse action, a programmatic prerequisite gate is needed — prompt instructions alone retain a non-zero failure rate.',
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
    id: 'q1-s4-0004',
    domain: 1,
    scenarioId: 4,
    taskStatements: ['1.6'],
    selectCount: 1,
    stem: 'You want Claude Code to add a standard-format docstring to every public function in a well-organized, consistently-structured library, one file at a time, following the same steps for each file. Is this task better suited to a fixed, prompt-chained pipeline or dynamic, adaptive decomposition?',
    options: [
      {
        id: 'A',
        text: 'Dynamic, adaptive decomposition, because every codebase task benefits most from letting the model decide its own steps.',
        rationale:
          'Wrong — this overgeneralizes; predictable, uniform, multi-aspect work is exactly where fixed pipelines are the better fit, not dynamic decomposition.',
      },
      {
        id: 'B',
        text: 'Neither — this task should not be automated at all.',
        rationale: "Wrong — nothing about this task makes it unsuitable for Claude Code; it's a well-scoped, repetitive documentation task.",
      },
      {
        id: 'C',
        text: 'A fixed, prompt-chained pipeline, because the work is predictable and uniform across files, unlike open-ended investigation where the next step depends heavily on unpredictable findings.',
        rationale:
          'Correct — prompt chaining suits predictable, uniform work like applying the same docstring process file-by-file, in contrast to dynamic decomposition\'s better fit for open-ended, unpredictable investigation.',
      },
      {
        id: 'D',
        text: 'Dynamic, adaptive decomposition, because docstring content varies function to function.',
        rationale:
          'Wrong — variation in docstring content per function doesn\'t change the fact that the overall process taken for each file is uniform and predictable, which is what determines the right decomposition pattern.',
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'Fixed, prompt-chained pipelines suit predictable, uniform multi-aspect work; dynamic decomposition suits open-ended investigation where the next step depends on unpredictable findings.',
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
    id: 'q1-s4-0005',
    domain: 1,
    scenarioId: 4,
    taskStatements: ['1.7'],
    selectCount: 1,
    stem: "You're using Claude Code across two separate work sessions to gradually understand a codebase's data layer. Between sessions, another engineer merges changes that significantly alter two of the files you previously analyzed together. When you resume your named investigation session, what should you do to keep it accurate?",
    options: [
      {
        id: 'A',
        text: "Inform the resumed session specifically about which files changed, so Claude can re-analyze just those files rather than assuming its prior analysis of them is still valid.",
        rationale:
          'Correct — informing a resumed session about specific file changes enables targeted re-analysis of just those files, rather than requiring full re-exploration or risking reliance on now-stale conclusions.',
      },
      {
        id: 'B',
        text: 'Resume the session and trust that Claude will automatically detect any file changes made since the last session without being told.',
        rationale: 'Wrong — Claude does not automatically detect out-of-band file changes made between sessions; this must be communicated explicitly.',
      },
      {
        id: 'C',
        text: 'Start a completely new session and re-explore the entire codebase from scratch, discarding all prior analysis.',
        rationale:
          'Wrong — discarding all prior analysis when only two files actually changed wastes the substantial valid understanding already built up elsewhere in the codebase.',
      },
      {
        id: 'D',
        text: 'Resume the session but avoid mentioning the changes, since bringing them up might confuse the model.',
        rationale:
          'Wrong — withholding relevant information risks the model confidently relying on stale conclusions about files that have since changed.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Informing a resumed session about specific file changes enables targeted re-analysis, rather than requiring full re-exploration or risking reliance on stale conclusions.',
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
    id: 'q1-x-0001',
    domain: 1,
    scenarioId: null,
    taskStatements: ['1.1'],
    selectCount: 1,
    stem: 'During an agentic loop, one of the tools Claude calls returns an error result (not a crash — a structured error response). What should the orchestration code do next?',
    options: [
      {
        id: 'A',
        text: 'Immediately stop the loop and set stop_reason manually to "end_turn", since an error means the task cannot continue.',
        rationale:
          "Wrong — stop_reason is returned by the API based on Claude's own response; orchestration code doesn't set it manually, and an error result doesn't inherently mean the task must end.",
      },
      {
        id: 'B',
        text: 'Add the error result to the conversation history like any other tool result and send the next request, letting Claude reason about how to respond to the error (e.g., retry, try a different tool, or inform the user).',
        rationale:
          'Correct — tool results, including error results, should be appended to conversation history like any other result so the model can reason about the next appropriate action.',
      },
      {
        id: 'C',
        text: 'Discard the error result without including it in the conversation, and send an empty tool result instead.',
        rationale: 'Wrong — discarding the real error and substituting an empty result hides information Claude needs to reason correctly about what happened.',
      },
      {
        id: 'D',
        text: 'Restart the entire conversation from the first user message.',
        rationale: 'Wrong — restarting the entire conversation from scratch over a single tool error discards all prior legitimate progress unnecessarily.',
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'Tool results, including error results, should be added to conversation history like any other result so Claude can reason about the appropriate next action.',
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
    id: 'q1-x-0002',
    domain: 1,
    scenarioId: null,
    taskStatements: ['1.2'],
    selectCount: 1,
    stem: 'A coordinator delegates the same broad topic to two subagents without dividing it into distinct parts, resulting in significant duplicated effort and overlapping findings. What should the coordinator do differently?',
    options: [
      {
        id: 'A',
        text: 'Have the two subagents communicate directly with each other to sort out the overlap on their own.',
        rationale:
          "Wrong — direct subagent-to-subagent coordination bypasses the coordinator's role in routing and observability, undermining the hub-and-spoke pattern.",
      },
      {
        id: 'B',
        text: 'Continue delegating the same undivided topic to both subagents, since redundancy improves reliability.',
        rationale:
          'Wrong — redundancy without a specific reason wastes effort and produces overlapping findings, as already observed, rather than adding reliability.',
      },
      {
        id: 'C',
        text: 'Delegate the topic to only one subagent going forward and eliminate the second entirely.',
        rationale:
          "Wrong — this may lose useful parallel capacity where genuine partitioning would preserve it, and doesn't fix the underlying delegation design.",
      },
      {
        id: 'D',
        text: 'Partition the topic into distinct, non-overlapping subtopics or source types before delegating, assigning each subagent a clearly different piece of the work.',
        rationale:
          "Correct — partitioning research scope across subagents to minimize duplication, assigning distinct subtopics or source types to each, is exactly the coordinator's role in task decomposition.",
      },
    ],
    correctOptionIds: ['D'],
    explanationSummary:
      'Partitioning research scope across subagents into distinct subtopics or source types is the coordinator\'s role in task decomposition, minimizing duplicated effort.',
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
    id: 'q1-x-0003',
    domain: 1,
    scenarioId: null,
    taskStatements: ['1.3'],
    selectCount: 1,
    stem: "You've completed a shared baseline analysis of a codebase and now want to explore two different refactoring strategies independently, without either exploration affecting the other or needing to redo the baseline analysis. What Agent SDK mechanism directly supports this?",
    options: [
      {
        id: 'A',
        text: 'Giving both explorations access to the same live conversation simultaneously.',
        rationale:
          'Wrong — sharing the same live conversation would let the two explorations interfere with and influence each other, rather than remaining independent.',
      },
      {
        id: 'B',
        text: 'fork_session, to create independent branches from the shared baseline for each refactoring strategy.',
        rationale:
          'Correct — fork-based session management is exactly for exploring divergent approaches from a shared analysis baseline, independently.',
      },
      {
        id: 'C',
        text: 'allowedTools, to restrict which files each exploration can read.',
        rationale: 'Wrong — allowedTools controls tool access, not session branching or independence between explorations.',
      },
      {
        id: 'D',
        text: 'tool_choice: "any", to force each exploration to use a tool on its first turn.',
        rationale: "Wrong — tool_choice controls whether/which tool must be called on a given turn; it doesn't create independent session branches.",
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'fork_session creates independent branches from a shared analysis baseline, exactly suited to exploring divergent approaches without redoing the baseline or interfering with each other.',
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
    id: 'q1-x-0004',
    domain: 1,
    scenarioId: null,
    taskStatements: ['1.4'],
    selectCount: 1,
    stem: "Your agent can both draft and publish blog posts autonomously. You want a hard guarantee that publish_content can never be called unless review_content has already run and returned an approval for that specific draft. Currently this ordering is only described in the system prompt. What's the most reliable way to guarantee it?",
    options: [
      {
        id: 'A',
        text: 'Trust that the model will follow the described order, since Claude generally follows well-written instructions.',
        rationale:
          'Wrong — "generally follows" is exactly the probabilistic compliance that is not a guarantee, which is what is being asked for here.',
      },
      {
        id: 'B',
        text: 'Remove the publish_content tool entirely so publishing can never happen.',
        rationale:
          "Wrong — removing the tool entirely prevents publishing altogether, which isn't the goal; the goal is enforcing the correct order, not eliminating the capability.",
      },
      {
        id: 'C',
        text: 'Add a few-shot example showing review before publish, in addition to the existing prompt instruction.',
        rationale:
          'Wrong — a few-shot example strengthens typical-case compliance but still does not provide a hard guarantee against every possible case.',
      },
      {
        id: 'D',
        text: 'Add a programmatic prerequisite that blocks publish_content calls unless a corresponding successful review_content approval for that draft has been recorded.',
        rationale:
          'Correct — a programmatic prerequisite gate that blocks the dependent tool call until the required prior step has genuinely completed is the deterministic mechanism for guaranteeing an ordering requirement.',
      },
    ],
    correctOptionIds: ['D'],
    explanationSummary:
      'A programmatic prerequisite gate is the deterministic mechanism for guaranteeing a tool-call ordering requirement — prompt instructions and few-shot examples remain probabilistic.',
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
    id: 'q1-x-0005',
    domain: 1,
    scenarioId: null,
    taskStatements: ['1.5'],
    selectCount: 1,
    stem: "You want a guarantee that your agent's delete_record tool can never be called with a wildcard/all-records argument, regardless of what the conversation says. What's the most reliable way to enforce this?",
    options: [
      {
        id: 'A',
        text: 'Implement a hook that intercepts outgoing tool calls to delete_record and blocks any call whose argument matches a wildcard/all-records pattern, redirecting to an error or escalation.',
        rationale:
          'Correct — a hook that intercepts outgoing tool calls and blocks policy-violating arguments provides a deterministic guarantee, appropriate when compliance must be guaranteed.',
      },
      {
        id: 'B',
        text: "Rename the delete_record tool to make its danger more obvious in its name.",
        rationale: "Wrong — a more alarming tool name doesn't prevent the call from being made; it's not an enforcement mechanism.",
      },
      {
        id: 'C',
        text: 'Add a few-shot example showing the agent declining to use a wildcard argument.',
        rationale: 'Wrong — a few-shot example, like the system prompt instruction, remains probabilistic guidance rather than a guaranteed block.',
      },
      {
        id: 'D',
        text: 'Add a system prompt instruction telling the agent never to call delete_record with a wildcard argument.',
        rationale:
          'Wrong — a prompt instruction is probabilistic compliance, not a guarantee, for a destructive action that needs deterministic prevention.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Hooks that intercept outgoing tool calls and block policy-violating arguments provide a deterministic guarantee, appropriate for destructive actions requiring guaranteed compliance.',
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
    id: 'q1-x-0006',
    domain: 1,
    scenarioId: null,
    taskStatements: ['1.6'],
    selectCount: 1,
    stem: 'Which of these two tasks is better suited to a fixed, prompt-chained pipeline, and which to dynamic, adaptive decomposition: (1) running a standard, always-identical pre-release checklist across a well-known set of files, and (2) investigating the root cause of an unfamiliar, intermittent production incident with unknown scope?',
    options: [
      {
        id: 'A',
        text: 'Both tasks are better suited to dynamic, adaptive decomposition, since letting the model decide is always more powerful.',
        rationale:
          'Wrong — dynamic decomposition adds unnecessary variability to the checklist task, which benefits from uniform, repeatable steps every time.',
      },
      {
        id: 'B',
        text: 'The pre-release checklist should use dynamic decomposition, and the incident investigation should use a fixed pipeline.',
        rationale: 'Wrong — this is exactly backwards from the task characteristics described.',
      },
      {
        id: 'C',
        text: 'The pre-release checklist should use a fixed, prompt-chained pipeline (predictable, uniform steps), and the incident investigation should use dynamic, adaptive decomposition (unpredictable, evolving findings).',
        rationale:
          'Correct — fixed pipelines suit predictable, uniform work like a standard checklist, while dynamic decomposition suits open-ended investigation where next steps depend on unpredictable findings.',
      },
      {
        id: 'D',
        text: 'Both tasks are better suited to a fixed, prompt-chained pipeline, since fixed pipelines are always safer.',
        rationale:
          "Wrong — a fixed pipeline poorly fits the incident investigation, where the right next step depends entirely on what's discovered, which can't be predicted in advance.",
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'Task decomposition strategy should match the workflow: fixed pipelines for predictable, uniform work; dynamic decomposition for open-ended investigation with unpredictable findings.',
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
    id: 'q1-x-0007',
    domain: 1,
    scenarioId: null,
    taskStatements: ['1.7'],
    selectCount: 1,
    stem: "You're using a named Claude Code session (--resume my-investigation) to track a multi-day investigation into a performance issue. On day two, you want to continue exactly where you left off, with all prior findings intact. What should you do?",
    options: [
      {
        id: 'A',
        text: 'Run --resume my-investigation to continue the same named session, preserving its prior context and findings.',
        rationale:
          'Correct — named session resumption using --resume <session-name> is exactly the mechanism for continuing a specific prior conversation with its context intact.',
      },
      {
        id: 'B',
        text: 'Start a brand new, unnamed session each day and manually re-explain everything found so far from memory.',
        rationale: 'Wrong — manually re-explaining everything from memory each day is exactly the inefficiency named session resumption is meant to eliminate.',
      },
      {
        id: 'C',
        text: 'Use fork_session instead, since --resume is only for single-day sessions.',
        rationale:
          'Wrong — fork_session is for branching into divergent parallel approaches from a baseline, not for straightforward continuation of the same ongoing investigation across days.',
      },
      {
        id: 'D',
        text: "Copy the previous day's terminal output into a text file and manually paste it as the first message of a new session.",
        rationale:
          'Wrong — manually copying and pasting raw terminal output is an unreliable, effortful workaround when built-in session resumption already preserves context directly.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Named session resumption via --resume <session-name> is the mechanism for continuing a specific prior conversation with its context and findings intact.',
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
    id: 'q1-x-0008',
    domain: 1,
    scenarioId: null,
    taskStatements: ['1.3'],
    selectCount: 1,
    stem: "You're defining a subagent whose only job is to format citations into a consistent style. Its AgentDefinition currently grants it the same broad tool access as the coordinator, including tools for web search and code execution it will never use. What's the recommended fix?",
    options: [
      {
        id: 'A',
        text: "Leave the tool access as-is, since having broader access can't cause any problems as long as the subagent doesn't intend to use those tools.",
        rationale:
          'Wrong — broader-than-needed access is exactly what increases the risk of tool misuse and degrades selection reliability, even if unintended.',
      },
      {
        id: 'B',
        text: "Remove the subagent's AgentDefinition entirely so it has no tools at all.",
        rationale: "Wrong — removing all tools would prevent the subagent from doing its actual citation-formatting job at all.",
      },
      {
        id: 'C',
        text: "Restrict the subagent's AgentDefinition tool access to only what its citation-formatting role actually needs, consistent with scoped tool access reducing misuse and selection complexity.",
        rationale:
          'Correct — AgentDefinition tool restrictions should scope each subagent to what its specific role needs, reducing misuse and decision complexity.',
      },
      {
        id: 'D',
        text: "Give the subagent access to every tool in the system so it's maximally flexible for future use cases.",
        rationale: 'Wrong — maximal access for hypothetical future flexibility directly contradicts the scoped-access principle and its documented benefits.',
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'AgentDefinition tool restrictions should scope each subagent to what its specific role needs, which is the recommended design for reducing misuse and decision complexity.',
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
    id: 'q1-x-0009',
    domain: 1,
    scenarioId: null,
    taskStatements: ['1.4'],
    selectCount: 1,
    stem: 'An agent needs to escalate a complex case to a human who has no access to the conversation transcript. What should the escalation handoff include?',
    options: [
      {
        id: 'A',
        text: "Just the words 'escalated' with no further detail, since the human can ask the customer for details directly.",
        rationale: 'Wrong — providing no substantive detail forces the human to reconstruct context from scratch, defeating the purpose of a handoff.',
      },
      {
        id: 'B',
        text: 'The full raw conversation transcript with no summarization, on the assumption that more detail is always better.',
        rationale:
          'Wrong — dumping the full raw transcript without any structuring or summarization pushes the burden of extracting what matters onto the human.',
      },
      {
        id: 'C',
        text: 'Only the timestamp of when the escalation occurred.',
        rationale: 'Wrong — a bare timestamp provides no substantive information for the human to act on.',
      },
      {
        id: 'D',
        text: "A structured summary containing the essential details a human would need — such as relevant identifiers, root cause analysis, and recommended next steps — rather than just a note saying 'this case is too complex.'",
        rationale:
          'Correct — a structured handoff summary with the essential details a human needs, since they lack access to the conversation transcript, is exactly the documented pattern for mid-process escalation.',
      },
    ],
    correctOptionIds: ['D'],
    explanationSummary:
      'Structured handoff summaries with essential details (identifiers, root cause, recommended action) are the documented pattern for escalating to humans who lack conversation transcript access.',
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
    id: 'q1-x-0010',
    domain: 1,
    scenarioId: null,
    taskStatements: ['1.2'],
    selectCount: 1,
    stem: 'A coordinator agent receives a simple query that only requires a single, targeted lookup. Should it still route the query through every specialized subagent in its full pipeline (e.g., a 4-stage research pipeline), or handle it differently?',
    options: [
      {
        id: 'A',
        text: 'It should randomly select a subset of subagents to invoke for variety.',
        rationale: 'Wrong — random selection ignores the actual requirements of the query, which is precisely what should drive the routing decision.',
      },
      {
        id: 'B',
        text: "It should analyze the query's actual requirements and dynamically select which subagents to invoke, rather than always routing through the full pipeline, when a simpler query doesn't need every stage.",
        rationale:
          'Correct — coordinators should analyze query requirements and dynamically select which subagents to invoke based on complexity, rather than uniformly routing everything through the full pipeline.',
      },
      {
        id: 'C',
        text: 'It should always route through the full pipeline for every query, regardless of complexity, to maintain consistency.',
        rationale:
          "Wrong — always routing every query through the full pipeline adds unnecessary latency and cost for simple queries that don't need every stage.",
      },
      {
        id: 'D',
        text: 'It should never use subagents at all, and should always answer directly without delegation.',
        rationale: 'Wrong — this goes too far in the other direction, discarding legitimate delegation entirely, including for queries that genuinely need it.',
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'Coordinators should dynamically select which subagents to invoke based on query complexity, rather than always routing through the full pipeline regardless of need.',
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
    id: 'q1-s1-0007',
    domain: 1,
    scenarioId: 1,
    taskStatements: ['1.4'],
    selectCount: 1,
    stem: "A customer's message covers two unrelated concerns in the same conversation: a billing dispute about a charge from last month, and a separate question about whether a specific item is eligible for return. How should the agent handle this?",
    options: [
      {
        id: 'A',
        text: 'Address only the first concern mentioned and ignore the second unless the customer brings it up again separately.',
        rationale:
          'Wrong — ignoring the second concern unless raised again leaves a legitimate request unaddressed and creates unnecessary follow-up friction.',
      },
      {
        id: 'B',
        text: 'Respond with a single generic acknowledgment covering both topics without actually investigating either one.',
        rationale: "Wrong — a generic acknowledgment without actual investigation doesn't resolve either concern, just defers the real work.",
      },
      {
        id: 'C',
        text: 'Decompose the message into its two distinct concerns, investigate each using shared context, and synthesize a single unified response addressing both.',
        rationale:
          'Correct — decomposing multi-concern requests into distinct items, investigating each, then synthesizing a unified resolution is the documented pattern for this kind of message.',
      },
      {
        id: 'D',
        text: 'Ask the customer to submit two separate support tickets, one for each concern, before proceeding with either.',
        rationale: 'Wrong — requiring separate tickets adds friction the agent is capable of avoiding by handling both concerns directly.',
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'Multi-concern customer requests should be decomposed into distinct items, investigated using shared context, and synthesized into a single unified resolution.',
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
    id: 'q1-s3-0007',
    domain: 1,
    scenarioId: 3,
    taskStatements: ['1.2'],
    selectCount: 1,
    stem: "After two rounds of search and synthesis, your coordinator's evaluation determines that the current draft report thoroughly covers all aspects of the original research request. A team member suggests re-delegating for a third round \"just to be safe.\" What should the coordinator do?",
    options: [
      {
        id: 'A',
        text: 'Always re-delegate for at least one additional round regardless of assessed coverage, since more research is always better.',
        rationale:
          'Wrong — "always" continuing regardless of assessed sufficiency ignores the actual purpose of the refinement loop, which is to close identified gaps, not run for its own sake.',
      },
      {
        id: 'B',
        text: 'Conclude the iterative refinement loop, since re-invoking subagents once coverage is already assessed as sufficient adds cost and latency without addressing an actual identified gap.',
        rationale:
          'Correct — the iterative refinement loop continues until coverage is sufficient; once that assessment is met, further re-delegation without an identified gap adds unnecessary cost and latency.',
      },
      {
        id: 'C',
        text: 'Re-delegate to a completely different set of subagents than the ones already used, regardless of the topic.',
        rationale: "Wrong — switching to different subagents isn't motivated by anything in the scenario and doesn't address any identified gap.",
      },
      {
        id: 'D',
        text: 'Discard the current draft entirely and start the research process over from scratch.',
        rationale: 'Wrong — discarding a report already assessed as thorough wastes completed, valid work for no identified reason.',
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'Iterative refinement loops continue until coverage is assessed as sufficient; further re-delegation without an identified gap adds unnecessary cost and latency.',
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
    id: 'q1-s4-0006',
    domain: 1,
    scenarioId: 4,
    taskStatements: ['1.6'],
    selectCount: 1,
    stem: "You ask Claude Code to \"find and fix the cause of a slow memory leak in this legacy service\" with no further detail about where to start. What decomposition approach fits this task?",
    options: [
      {
        id: 'A',
        text: 'A fixed, prompt-chained pipeline that checks the same five files in the same order for every memory leak investigation, regardless of what is found.',
        rationale:
          "Wrong — a fixed sequence of the same five files regardless of findings ignores that leak investigations are inherently open-ended and dependent on what evidence actually shows.",
      },
      {
        id: 'B',
        text: 'No decomposition at all — attempt to fix the entire service in a single, undivided step.',
        rationale:
          'Wrong — treating a genuinely complex, poorly-scoped investigation as a single undivided step skips the incremental evidence-gathering debugging this kind of issue requires.',
      },
      {
        id: 'C',
        text: 'A fixed pipeline based on file size, always starting with the largest file in the repository.',
        rationale: 'Wrong — file size has no established connection to where a memory leak originates; this is an arbitrary, unmotivated fixed rule.',
      },
      {
        id: 'D',
        text: 'Dynamic, adaptive decomposition: first gather evidence about where memory usage grows, form hypotheses based on what is found, then investigate the most likely areas, adapting the plan as findings emerge.',
        rationale:
          'Correct — open-ended investigation tasks with unknown scope are decomposed adaptively: gathering evidence, forming hypotheses, and adjusting the plan as findings emerge.',
      },
    ],
    correctOptionIds: ['D'],
    explanationSummary:
      'Open-ended, poorly-scoped investigation tasks are decomposed adaptively based on evidence gathered along the way, not via a fixed predetermined sequence.',
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
    id: 'q1-s1-0008',
    domain: 1,
    scenarioId: 1,
    taskStatements: ['1.1'],
    selectCount: 1,
    stem: "In a single API response, Claude requests two tool calls simultaneously (two tool_use content blocks) with stop_reason \"tool_use\". What should your orchestration code do?",
    options: [
      {
        id: 'A',
        text: 'Execute only the first tool call and ignore the second, since only one tool result is needed per turn.',
        rationale:
          'Wrong — ignoring a requested tool call discards work Claude explicitly asked for, and leaves it with no result to reason from for that call.',
      },
      {
        id: 'B',
        text: "Execute both tool calls, and include both of their results in the next request back to Claude before continuing the loop.",
        rationale:
          'Correct — when a single response contains multiple tool_use blocks, all requested tools should be executed and all their results included together in the next request.',
      },
      {
        id: 'C',
        text: 'Reject the response as invalid, since Claude should only ever request one tool per turn.',
        rationale: 'Wrong — multiple tool_use blocks in one response is normal, valid behavior, not an error condition.',
      },
      {
        id: 'D',
        text: 'Execute the two tool calls in two separate follow-up API requests, one at a time.',
        rationale:
          'Wrong — splitting into separate follow-up requests one at a time is unnecessary; both results can be gathered and returned together in a single next request.',
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'When a response contains multiple tool_use blocks, all requested tools should be executed and all results returned together in the next request, preserving the single request/response cycle.',
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
    id: 'q1-s1-0009',
    domain: 1,
    scenarioId: 1,
    taskStatements: ['1.4'],
    selectCount: 2,
    stem: 'For a customer support agent handling refunds, which TWO of the following requirements are best enforced with a programmatic gate rather than a prompt instruction alone? (Select 2.)',
    options: [
      {
        id: 'A',
        text: 'Blocking process_refund until get_customer has returned a verified customer ID.',
        rationale:
          'Correct — identity verification before a financial operation needs a deterministic guarantee, since prompt instructions retain a non-zero failure rate.',
      },
      {
        id: 'B',
        text: 'Using a friendly, empathetic tone when apologizing to frustrated customers.',
        rationale:
          "Wrong — tone preference is a stylistic, low-stakes guideline well suited to prompt-based guidance; it doesn't need deterministic enforcement.",
      },
      {
        id: 'C',
        text: 'Blocking any single refund above $500 without secondary approval.',
        rationale:
          'Correct — a dollar-threshold approval requirement for financial actions needs guaranteed compliance via a hook/gate, not just a prompt instruction.',
      },
      {
        id: 'D',
        text: 'Preferring concise responses over long, verbose ones.',
        rationale:
          'Wrong — response length/verbosity preference is a stylistic guideline, not a compliance-critical rule requiring deterministic enforcement.',
      },
    ],
    correctOptionIds: ['A', 'C'],
    explanationSummary:
      'Deterministic, programmatic enforcement is for compliance-critical rules with financial or identity-verification consequences — not for stylistic preferences like tone or length, which are well suited to prompt-based guidance.',
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
    id: 'q1-s1-0010',
    domain: 1,
    scenarioId: 1,
    taskStatements: ['1.6'],
    selectCount: 1,
    stem: "You're designing how the agent handles two different support workflows: (1) processing routine password-reset requests, which always follow the same three steps, and (2) investigating why a specific customer's account shows conflicting subscription statuses across three different backend systems, where the cause is unknown. Which decomposition approach fits each?",
    options: [
      {
        id: 'A',
        text: 'Both should use a fixed, prompt-chained pipeline, since password resets and status investigations are both customer-facing tasks.',
        rationale:
          "Wrong — treating the investigation the same as the routine reset ignores that its cause and needed steps are unknown upfront, unlike the reset's fixed procedure.",
      },
      {
        id: 'B',
        text: 'Both should use dynamic, adaptive decomposition, since customer support inherently requires flexibility.',
        rationale:
          'Wrong — the password reset is uniform and predictable every time, which is exactly what a fixed pipeline handles efficiently without added complexity.',
      },
      {
        id: 'C',
        text: 'Password resets should use a fixed, prompt-chained pipeline (same three steps every time); the status investigation should use dynamic, adaptive decomposition, since the cause and required checks are not known in advance.',
        rationale:
          'Correct — fixed pipelines suit uniform, predictable work like password resets; dynamic decomposition suits investigations where the cause and needed steps are unknown in advance.',
      },
      {
        id: 'D',
        text: 'Password resets should use dynamic decomposition since customers vary; the status investigation should use a fixed pipeline since it only involves three systems.',
        rationale:
          'Wrong — this reverses the correct mapping; password resets are the predictable case, and the investigation is the unpredictable one, not the other way around.',
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'Fixed pipelines suit uniform, predictable work; dynamic decomposition suits investigations where the cause and required steps are unknown in advance.',
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
    id: 'q1-s1-0011',
    domain: 1,
    scenarioId: 1,
    taskStatements: ['1.5'],
    selectCount: 1,
    stem: "You want every refund amount the agent proposes to be automatically rounded to two decimal places before process_refund is called, regardless of any floating-point rounding artifacts in intermediate calculations, without relying on the agent to remember to do this. What's the best mechanism?",
    options: [
      {
        id: 'A',
        text: 'Add a system prompt instruction reminding the agent to round refund amounts to two decimals.',
        rationale: 'Wrong — a prompt reminder is probabilistic guidance; the agent could still occasionally pass an unrounded value.',
      },
      {
        id: 'B',
        text: 'Implement a hook that intercepts the outgoing process_refund call and normalizes the amount argument to two decimal places before it is executed.',
        rationale:
          'Correct — a hook intercepting the outgoing tool call can deterministically normalize the argument before execution, guaranteeing the rounding regardless of what the model produces.',
      },
      {
        id: 'C',
        text: 'Ask the customer to confirm the exact rounded amount before every refund.',
        rationale: 'Wrong — this pushes a data-normalization concern onto the customer instead of handling it systematically.',
      },
      {
        id: 'D',
        text: 'Add a few-shot example showing a refund amount rounded correctly.',
        rationale: "Wrong — a few-shot example influences typical-case behavior but doesn't guarantee normalization on every call.",
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'A hook intercepting the outgoing tool call can deterministically normalize arguments before execution, guaranteeing correctness regardless of what the model produces — unlike prompt-based reminders.',
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
    id: 'q1-s3-0008',
    domain: 1,
    scenarioId: 3,
    taskStatements: ['1.1'],
    selectCount: 1,
    stem: "Your web-search subagent's orchestration code stops its internal agentic loop as soon as the assistant's response contains a URL-like string, on the assumption that a URL means the search is complete. What risk does this introduce?",
    options: [
      {
        id: 'A',
        text: 'The subagent will be unable to call the search tool more than once per session.',
        rationale: "Wrong — nothing about this text-scanning approach limits the number of search tool calls; it's unrelated to this specific risk.",
      },
      {
        id: 'B',
        text: 'The loop will never terminate, running indefinitely.',
        rationale: 'Wrong — this describes premature termination, the opposite of a loop that never ends.',
      },
      {
        id: 'C',
        text: 'This has no risk, since a URL always indicates the search is genuinely finished.',
        rationale: "Wrong — a URL appearing in generated text doesn't guarantee the search is actually complete.",
      },
      {
        id: 'D',
        text: 'The assistant might reference a URL in an intermediate reasoning step (e.g., planning to search a specific site next) without having actually completed the search, causing the loop to stop prematurely; the loop should check stop_reason instead of scanning text content.',
        rationale:
          'Correct — this is the anti-pattern of parsing text content for completion signals instead of checking the structured stop_reason field, risking premature termination based on an unreliable heuristic.',
      },
    ],
    correctOptionIds: ['D'],
    explanationSummary:
      'Scanning assistant text for completion signals (like a URL) is an anti-pattern; the model may reference such content in an intermediate step without the task actually being complete. Loop control should check stop_reason instead.',
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
    id: 'q1-s3-0009',
    domain: 1,
    scenarioId: 3,
    taskStatements: ['1.2'],
    selectCount: 2,
    stem: 'Which TWO of the following are true about the hub-and-spoke coordination pattern? (Select 2.)',
    options: [
      {
        id: 'A',
        text: 'The coordinator has visibility into all subagent communication.',
        rationale:
          'Correct — the coordinator managing all inter-subagent communication is the defining property of hub-and-spoke, giving it observability into everything.',
      },
      {
        id: 'B',
        text: 'Subagents automatically share conversation history with each other without coordinator involvement.',
        rationale: 'Wrong — subagents do not automatically share context/history with each other; all communication routes through the coordinator.',
      },
      {
        id: 'C',
        text: 'The coordinator is responsible for aggregating results from multiple subagents.',
        rationale: "Correct — result aggregation is one of the coordinator's core responsibilities in this pattern.",
      },
      {
        id: 'D',
        text: 'Hub-and-spoke requires every subagent to have identical tool access.',
        rationale:
          "Wrong — hub-and-spoke doesn't require identical tool access; scoped, role-specific tool access across subagents is the recommended design.",
      },
    ],
    correctOptionIds: ['A', 'C'],
    explanationSummary:
      "The coordinator's central role in hub-and-spoke is managing all inter-subagent communication (giving it observability) and aggregating results — not enforcing identical tool access across subagents.",
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
    id: 'q1-s3-0010',
    domain: 1,
    scenarioId: 3,
    taskStatements: ['1.3'],
    selectCount: 1,
    stem: "Your document-analysis subagent extracts a relevant excerpt from a source but doesn't record which page number it came from, only including it as an offhand mention within a paragraph of prose (\"this appears somewhere in the middle of the document\"). What is the most effective fix?",
    options: [
      {
        id: 'A',
        text: 'Have the subagent read the entire document again from the beginning every time a page number is needed later.',
        rationale: 'Wrong — re-reading the entire document is a wasteful, unreliable workaround for a data-formatting problem that should be solved at the source.',
      },
      {
        id: 'B',
        text: 'Require the subagent to output the excerpt and its page number as separate, clearly labeled structured fields, rather than embedding the page reference informally within prose.',
        rationale:
          'Correct — using structured data formats to separate content from metadata (like page numbers) when passing context between agents is the recommended pattern for preserving attribution.',
      },
      {
        id: 'C',
        text: "Remove page number tracking as a requirement entirely, since it's not essential information.",
        rationale: "Wrong — page number tracking is valuable for accurate citation and shouldn't be dropped just because the current implementation handles it poorly.",
      },
      {
        id: 'D',
        text: "Ask the synthesis subagent to guess the page number based on the excerpt's position in the final report.",
        rationale: 'Wrong — guessing a page number fabricates information rather than preserving accurate attribution.',
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'Structured data formats separating content from metadata (like page numbers) preserve attribution when passing context between agents, unlike embedding references informally within prose.',
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
    id: 'q1-s3-0011',
    domain: 1,
    scenarioId: 3,
    taskStatements: ['1.6'],
    selectCount: 1,
    stem: "Your research system generates reports on a wide variety of topics — some narrow and technical, some broad and multifaceted. You're deciding whether the report structure should always follow the same fixed template (Introduction, Background, Findings, Conclusion) or adapt its structure based on what the research actually surfaces. Which is more appropriate, and why?",
    options: [
      {
        id: 'A',
        text: 'Always use the fixed template, since consistency across all reports is more important than fitting the specific topic.',
        rationale:
          'Wrong — forcing every report, including multifaceted ones, into an identical rigid template can poorly fit topics whose natural organization doesn\'t match it.',
      },
      {
        id: 'B',
        text: 'Never use a fixed template, since flexibility is always superior to any structure.',
        rationale:
          'Wrong — complete flexibility with no consistent elements at all can make reports harder to compare and navigate; some structural consistency still has value.',
      },
      {
        id: 'C',
        text: 'It depends: predictable elements (like a findings section) can follow a consistent structure, but topic-specific organization (e.g., how findings are grouped or which sections are needed) should adapt to what the research actually surfaces, especially for broad or multifaceted topics.',
        rationale:
          'Correct — predictable, uniform elements can follow fixed patterns while genuinely variable aspects should adapt to what is actually discovered, rather than treating structure as all-fixed or all-flexible.',
      },
      {
        id: 'D',
        text: 'The structure should be decided entirely by the customer requesting the report, with no involvement from the research system.',
        rationale:
          "Wrong — while customer input could be a nice-to-have, it doesn't address the actual technical decomposition question being asked.",
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'Predictable elements can follow fixed structure while genuinely variable, topic-dependent organization should adapt to what research surfaces — decomposition strategy need not be all-fixed or all-flexible.',
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
    id: 'q1-s3-0012',
    domain: 1,
    scenarioId: 3,
    taskStatements: ['1.7'],
    selectCount: 1,
    stem: 'You resume a named research investigation session two weeks after your last work on it using --resume. Some of the web pages your earlier searches referenced may have since changed or been taken down. What should you do?',
    options: [
      {
        id: 'A',
        text: 'Recognize that the previously gathered tool results may now be stale, and consider starting a fresh session with a structured summary of prior findings rather than blindly trusting two-week-old search results to still be accurate.',
        rationale:
          'Correct — starting a new session with a structured summary is more reliable than resuming with results that may now be stale, particularly for time-sensitive information like web content.',
      },
      {
        id: 'B',
        text: 'Resume the session and treat all previously gathered search results as still perfectly accurate with no further consideration.',
        rationale: 'Wrong — treating potentially two-week-old web results as still perfectly accurate ignores the real risk that source content may have changed.',
      },
      {
        id: 'C',
        text: 'Refuse to continue the investigation at all, since any amount of time passing invalidates all prior research.',
        rationale: 'Wrong — this overreacts; not all research becomes invalid after two weeks, and rejecting all prior work is wasteful and unnecessary.',
      },
      {
        id: 'D',
        text: 'Automatically re-run every single search query from the original session before doing anything else, regardless of whether the findings are still relevant.',
        rationale:
          'Wrong — blindly re-running every query regardless of relevance is inefficient; targeted refreshing of genuinely time-sensitive findings is more appropriate.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Starting a new session with a structured summary is more reliable than resuming with stale tool results, especially for time-sensitive information that may have changed.',
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
    id: 'q1-s4-0007',
    domain: 1,
    scenarioId: 4,
    taskStatements: ['1.1'],
    selectCount: 1,
    stem: "During a long autonomous refactor, one of Claude's responses is cut short with stop_reason \"max_tokens\" rather than \"tool_use\" or \"end_turn\" — the response was truncated because it hit the token limit before finishing. What should the orchestration code do?",
    options: [
      {
        id: 'A',
        text: 'Treat "max_tokens" exactly like "end_turn" and consider the task complete.',
        rationale: 'Wrong — treating a truncated response as a complete answer risks acting on an incomplete, possibly malformed result.',
      },
      {
        id: 'B',
        text: 'Treat "max_tokens" exactly like "tool_use" and execute whatever tool calls happen to be present in the truncated response, if any.',
        rationale: "Wrong — a truncated response might contain an incomplete tool call that isn't safe to execute as-is.",
      },
      {
        id: 'C',
        text: 'Recognize that "max_tokens" indicates an incomplete response (not genuine task completion or a clean tool request) and handle it distinctly — for example, by continuing the generation or adjusting max_tokens — rather than treating it as either of the other two cases.',
        rationale:
          'Correct — max_tokens is a distinct stop_reason indicating the response was cut off, not a genuine completion signal or a clean tool request; it needs its own handling.',
      },
      {
        id: 'D',
        text: 'Ignore the stop_reason field entirely for this response and restart the entire task from the beginning.',
        rationale: 'Wrong — restarting the entire task from scratch is a disproportionate response to a single truncated turn.',
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'stop_reason values beyond "tool_use" and "end_turn", like "max_tokens", indicate a distinct condition (an incomplete response) that orchestration code should handle explicitly rather than conflating with either of the other two.',
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
    id: 'q1-s4-0008',
    domain: 1,
    scenarioId: 4,
    taskStatements: ['1.4'],
    selectCount: 1,
    stem: "Your developer productivity agent has Bash access and is generally careful, but your team wants a hard guarantee that it can never run a destructive command like 'rm -rf' against any path outside a designated scratch directory, no matter what the conversation says. What's the most reliable mechanism?",
    options: [
      {
        id: 'A',
        text: 'Add a system prompt instruction telling the agent to be careful with destructive Bash commands.',
        rationale:
          'Wrong — a prompt instruction is probabilistic guidance, not a guarantee, for an action with potentially catastrophic and irreversible consequences.',
      },
      {
        id: 'B',
        text: 'Implement a hook that intercepts outgoing Bash tool calls and blocks any command matching a destructive pattern targeting paths outside the designated scratch directory.',
        rationale:
          'Correct — a hook intercepting outgoing tool calls and blocking policy-violating commands provides the deterministic guarantee needed for an irreversible, high-risk action.',
      },
      {
        id: 'C',
        text: "Trust that the agent's general carefulness will prevent this from ever happening.",
        rationale:
          'Wrong — general carefulness is exactly the kind of unenforced assumption that does not hold reliably, which is why a hard guarantee was requested.',
      },
      {
        id: 'D',
        text: 'Add a few-shot example showing the agent declining to run a destructive command.',
        rationale: 'Wrong — a few-shot example remains probabilistic guidance, not a guarantee.',
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'A hook intercepting outgoing tool calls and blocking policy-violating commands provides the deterministic guarantee needed for an irreversible, high-risk action like a destructive Bash command.',
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
    id: 'q1-s4-0009',
    domain: 1,
    scenarioId: 4,
    taskStatements: ['1.7'],
    selectCount: 1,
    stem: "You've been building a feature across multiple work sessions using a named Claude Code session. On day 3, you want to continue exactly where day 2 left off, including all the codebase context Claude had already built up. What's the appropriate command?",
    options: [
      {
        id: 'A',
        text: 'claude --resume <session-name>, continuing the same named session from where it left off.',
        rationale:
          'Correct — --resume <session-name> is exactly the mechanism for continuing a specific prior conversation with its accumulated context intact.',
      },
      {
        id: 'B',
        text: 'claude, starting a completely new unnamed session and manually re-explaining the entire feature from scratch.',
        rationale:
          'Wrong — starting fresh and manually re-explaining everything discards the built-up context and is exactly the inefficiency session resumption is meant to eliminate.',
      },
      {
        id: 'C',
        text: 'fork_session, since resuming linear progress across days requires forking rather than resuming.',
        rationale:
          'Wrong — fork_session is for branching into divergent parallel approaches from a baseline, not straightforward linear continuation of the same ongoing work.',
      },
      {
        id: 'D',
        text: 'There is no way to continue a Claude Code session across multiple days; all context is always lost between sessions.',
        rationale: 'Wrong — this is false; named session resumption across days is explicitly supported.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      '--resume <session-name> continues a specific prior conversation with its accumulated context intact, appropriate for linear continuation of work across multiple days.',
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
]
