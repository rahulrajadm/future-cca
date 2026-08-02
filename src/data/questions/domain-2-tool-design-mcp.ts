import type { Question } from '../../types/question'

/**
 * Domain 2: Tool Design & MCP Integration (18% of exam blueprint).
 * Covers task statements 2.1-2.5. Scenario-grounded questions here draw
 * primarily from Scenario 1 (Customer Support), Scenario 3 (Multi-Agent
 * Research), and Scenario 4 (Developer Productivity).
 */
export const domain2Questions: Question[] = [
  {
    id: 'q2-s1-0001',
    domain: 2,
    scenarioId: 1,
    taskStatements: ['2.1'],
    selectCount: 1,
    stem: "You've added a new lookup_return tool (for checking return-shipment status) alongside the existing lookup_order tool. Both have minimal descriptions: lookup_order is described as \"Retrieves order information\" and lookup_return as \"Retrieves return information.\" Logs show the agent frequently calls lookup_order when customers ask about the status of an item they've already sent back, then reports incorrect status because that data isn't in the order record. What should you do first?",
    options: [
      {
        id: 'A',
        text: "Expand both tools' descriptions to specify exactly what each returns, when a return has been initiated versus not, and example queries that should route to each.",
        rationale:
          'Correct — minimal, near-identical descriptions are the direct cause of misrouting; making each tool\'s purpose, inputs, and boundary cases explicit is the lowest-effort, highest-leverage fix, since descriptions are the primary mechanism the model uses to choose between similar tools.',
      },
      {
        id: 'B',
        text: 'Remove lookup_order entirely and merge its functionality into lookup_return.',
        rationale:
          'Wrong — merging removes a real distinction (orders vs. returns are different backend records) rather than fixing the description problem, and is a bigger change than the situation calls for.',
      },
      {
        id: 'C',
        text: 'Add a routing layer that inspects the customer\'s message for the word "return" and pre-selects lookup_return.',
        rationale:
          'Wrong — a hand-built keyword classifier duplicates the job tool descriptions already exist to do, and will misfire on phrasings that don\'t contain the literal word "return."',
      },
      {
        id: 'D',
        text: 'Rename lookup_return to lookup_order_v2 to signal that it supersedes the original tool.',
        rationale:
          'Wrong — a versioned name gives the model no more information about when to use which tool, and misleadingly suggests lookup_order is deprecated when both remain necessary.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Ambiguous or overlapping tool descriptions are a leading cause of misrouting between similar tools. Expanding descriptions with input formats, boundaries, and example queries is the direct, low-effort fix.',
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
    id: 'q2-s1-0002',
    domain: 2,
    scenarioId: 1,
    taskStatements: ['2.2'],
    selectCount: 1,
    stem: "Currently, when process_refund fails for any reason — a timeout talking to the payment processor, an invalid order ID, or a refund amount exceeding policy limits — the tool returns the same generic message: \"Operation failed.\" As a result, the agent either apologizes and gives up on all failures, or retries all of them, including ones that will never succeed no matter how many times they're retried. What change would most directly fix this?",
    options: [
      {
        id: 'A',
        text: 'Return structured error metadata with each failure, including an errorCategory (e.g., transient, validation, business), an isRetryable flag, and a human-readable description.',
        rationale:
          'Correct — structured metadata lets the agent decide to retry transient failures, explain policy violations, or escalate — decisions it currently cannot make because every failure looks identical.',
      },
      {
        id: 'B',
        text: 'Increase the number of automatic retries before the tool gives up and reports failure to the agent.',
        rationale:
          "Wrong — more retries help transient failures but waste time and calls retrying validation or policy failures that can never succeed, since the underlying error type still isn't visible.",
      },
      {
        id: 'C',
        text: 'Add a system prompt instruction telling the agent to apologize more empathetically when process_refund fails.',
        rationale:
          'Wrong — this addresses tone, not the actual problem, which is that the agent cannot distinguish failure types to decide on an appropriate action.',
      },
      {
        id: 'D',
        text: 'Replace "Operation failed" with a slightly more detailed message, "Refund could not be processed at this time."',
        rationale:
          "Wrong — a marginally more detailed but still uniform message doesn't give the agent anything structured to act on; it's still one message for three different failure categories.",
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Uniform error responses prevent the agent from making appropriate recovery decisions. Structured metadata distinguishing transient, validation, and business errors — with a retryable flag — is what enables correct handling of each.',
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
    id: 'q2-s1-0003',
    domain: 2,
    scenarioId: 1,
    taskStatements: ['2.3'],
    selectCount: 1,
    stem: "You want to guarantee that, at the very start of every new conversation, the agent's first action is always to call get_customer — never a different tool, and never a conversational reply — so that customer context is established before anything else happens. What is the most direct way to enforce this for the first turn?",
    options: [
      {
        id: 'A',
        text: 'Set tool_choice to force selection of get_customer specifically ({"type": "tool", "name": "get_customer"}) on the first request of the conversation, then switch to normal tool_choice for subsequent turns.',
        rationale:
          "Correct — forced tool selection guarantees the model calls that specific tool on that request, exactly the deterministic guarantee needed for a \"must always be this exact tool, first\" requirement.",
      },
      {
        id: 'B',
        text: 'Set tool_choice to "any" for the entire conversation so the agent is always required to call some tool.',
        rationale:
          "Wrong — \"any\" guarantees a tool call is made but not which one, so the agent could still call a different tool first.",
      },
      {
        id: 'C',
        text: 'Add a system prompt instruction stating that get_customer must always be called first.',
        rationale:
          'Wrong — a prompt instruction is probabilistic compliance, not a guarantee, for a requirement stated as needing to always hold.',
      },
      {
        id: 'D',
        text: 'Reorder the tools list so get_customer appears first, since Claude selects tools in the order they are listed.',
        rationale:
          'Wrong — tool selection is not determined by list order; Claude chooses based on descriptions and context, not position.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Forced tool selection ({"type": "tool", "name": "..."}) is the only tool_choice option that guarantees a specific named tool is called, which is what an always-first requirement needs.',
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
    id: 'q2-s1-0004',
    domain: 2,
    scenarioId: 1,
    taskStatements: ['2.4'],
    selectCount: 1,
    stem: 'Your team shares a project-level MCP server configuration in .mcp.json that connects to your production backend, using environment variable expansion (${SUPPORT_API_TOKEN}) for authentication. One engineer also wants to experiment with a second, unreleased MCP server that exposes draft internal tools not ready for the rest of the team. Where should the engineer configure this experimental server?',
    options: [
      {
        id: 'A',
        text: "In their personal ~/.claude.json, so it's available only to them and isn't shared with the team via version control.",
        rationale:
          'Correct — user-level configuration is exactly for personal or experimental servers that should not be pushed onto teammates via version control, while shared, production-relevant servers belong in the project-scoped .mcp.json.',
      },
      {
        id: 'B',
        text: 'In the project\'s .mcp.json, since all MCP servers should be centrally managed in one file.',
        rationale:
          'Wrong — putting an unreleased, personal tool in the shared project config would expose draft tools to the whole team the moment they pull the branch.',
      },
      {
        id: 'C',
        text: 'In a second .mcp.json file committed to a personal feature branch.',
        rationale:
          '.mcp.json is still version-controlled project configuration regardless of which branch it\'s committed on; a feature branch doesn\'t make it personal-only.',
      },
      {
        id: 'D',
        text: 'As a duplicate entry in .mcp.json guarded by a comment noting it is experimental.',
        rationale:
          "Wrong — comments don't change how the file is loaded or shared; anyone with the project config gets the \"experimental\" entry too.",
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'MCP server scoping separates project-level (.mcp.json, shared team tooling) from user-level (~/.claude.json, personal/experimental servers) configuration precisely for cases like this.',
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
    id: 'q2-s1-0005',
    domain: 2,
    scenarioId: 1,
    taskStatements: ['2.2'],
    selectCount: 1,
    stem: "A customer asks about an order using an order number that doesn't exist in your system — perhaps they mistyped it. Separately, on other occasions, lookup_order times out because the order-service backend is temporarily unavailable. Both situations are currently reported to the agent as the same generic \"no order found\" result. What problem does this cause?",
    options: [
      {
        id: 'A',
        text: 'The agent cannot distinguish a legitimate empty result (no such order exists) from an access failure (the lookup could not be completed), so it may tell a customer no such order exists when the real issue is a temporary backend outage a retry could resolve.',
        rationale:
          'Correct — collapsing "not found" and "temporarily inaccessible" into one generic result removes exactly the distinction the agent needs to decide whether to ask the customer to double check the number or retry.',
      },
      {
        id: 'B',
        text: 'The agent will always retry both cases the same number of times regardless of which is more appropriate.',
        rationale:
          "Wrong — the scenario describes a lack of information to inform retry behavior, not a claim about what retry behavior currently exists.",
      },
      {
        id: 'C',
        text: 'The customer will be unable to provide a corrected order number in either case.',
        rationale:
          "Wrong — nothing about this error-reporting problem prevents the customer from providing a different order number if asked.",
      },
      {
        id: 'D',
        text: 'The agent will escalate every "no order found" case to a human agent by default.',
        rationale:
          'Wrong — nothing in the scenario indicates an escalation policy is triggered by this result; the problem is about what the agent concludes and says next, not about routing to a human.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Distinguishing access failures (which may warrant a retry) from valid empty results (a genuinely nonexistent record) is essential structured-error information that a generic "not found" response destroys.',
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
