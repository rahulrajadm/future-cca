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
  {
    id: 'q2-s3-0001',
    domain: 2,
    scenarioId: 3,
    taskStatements: ['2.1'],
    selectCount: 1,
    stem: 'Your document-analysis subagent has two tools: extract_summary, described as "Summarizes a document," and extract_key_findings, described as "Extracts findings from a document." In practice, the subagent calls extract_summary for nearly everything, including requests that specifically need itemized findings with citations. What is the most likely cause, and the best fix?',
    options: [
      {
        id: 'A',
        text: 'The two descriptions are too similar and don\'t clarify what distinguishes a "summary" from "key findings," or when each should be used — rewriting both with specific input/output expectations and example use cases would fix this.',
        rationale:
          "Correct — minimal, near-identical descriptions are the direct cause of this kind of misrouting; the fix is making each tool's distinct purpose and output format explicit.",
      },
      {
        id: 'B',
        text: 'The subagent needs a third tool that combines both functions to avoid the ambiguity entirely.',
        rationale:
          'Wrong — merging removes a meaningful distinction (a summary vs. itemized cited findings serve different downstream needs) rather than fixing the description problem.',
      },
      {
        id: 'C',
        text: 'The subagent\'s system prompt should instruct it to always prefer extract_key_findings over extract_summary.',
        rationale:
          'Wrong — a blanket preference instruction would just cause the opposite bias, rather than fixing the underlying selection logic.',
      },
      {
        id: 'D',
        text: 'The two tools should be given identical descriptions so the model treats them as interchangeable.',
        rationale: 'Wrong — identical descriptions would make the ambiguity worse; the model would have even less basis to differentiate them.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Ambiguous, near-identical tool descriptions are the direct cause of misrouting between similar tools; the fix is expanding descriptions with specific purpose, inputs, outputs, and examples.',
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
    id: 'q2-s3-0002',
    domain: 2,
    scenarioId: 3,
    taskStatements: ['2.3'],
    selectCount: 1,
    stem: "Your synthesis subagent was originally scoped to just two tools: a text-formatting tool and a citation-formatting tool. Over time, engineers have added 16 more tools to it \"just in case they're useful\" — including web search, document parsing, and image analysis tools it rarely if ever needs. What is the most likely effect of this change, and the recommended fix?",
    options: [
      {
        id: 'A',
        text: 'The larger tool set degrades tool-selection reliability by increasing decision complexity, and can lead the synthesis agent to misuse tools outside its specialization (e.g., attempting web searches itself); the fix is scoping it back down to the tools its role actually needs.',
        rationale:
          'Correct — giving an agent access to many more tools than its role needs degrades selection reliability, and agents with tools outside their specialization tend to misuse them.',
      },
      {
        id: 'B',
        text: "There is no meaningful effect, since Claude can always ignore tools it doesn't need regardless of how many are available.",
        rationale:
          'Wrong — this contradicts the documented principle that excess tool access measurably degrades selection reliability.',
      },
      {
        id: 'C',
        text: 'The additional tools will make responses slower to generate but will not affect which tools get selected.',
        rationale: "Wrong — the issue isn't only response latency; it's specifically about selection reliability and misuse of out-of-scope tools.",
      },
      {
        id: 'D',
        text: "The additional tools should be left in place, since having more capabilities available is always an improvement to a subagent's design.",
        rationale: 'Wrong — this is the opposite of recommended practice; scoped access to what a role actually needs is preferred over unconditionally more tools.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Giving an agent access to too many tools degrades tool-selection reliability and leads to cross-specialization misuse. Scoped tool access — only what a role needs — is the recommended design.',
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
    id: 'q2-s3-0003',
    domain: 2,
    scenarioId: 3,
    taskStatements: ['2.3'],
    selectCount: 1,
    stem: "Your synthesis subagent occasionally needs to verify a simple, specific fact (e.g., confirming a date or statistic) while combining findings, but currently must route every such request through the coordinator to the web-search subagent and back — adding latency for what are usually simple lookups. Deeper investigations still need to go through the full coordinator-routed process. What's the most effective way to reduce this overhead while preserving the existing coordination pattern for complex cases?",
    options: [
      {
        id: 'A',
        text: 'Give the synthesis subagent a narrowly scoped fact-lookup tool for simple verifications, while still routing more complex verification needs through the coordinator to the web-search subagent.',
        rationale:
          'Correct — this is the principle of least privilege applied to cross-role needs: a narrowly scoped tool for the common, simple case reduces overhead while preserving the coordinator-routed pattern for genuinely complex verification.',
      },
      {
        id: 'B',
        text: "Give the synthesis subagent full access to all of the web-search subagent's tools so it never needs to route through the coordinator again.",
        rationale:
          'Wrong — granting full web-search access over-provisions the synthesis agent, reintroducing the cross-specialization misuse risk scoped tool access is meant to prevent.',
      },
      {
        id: 'C',
        text: 'Have the synthesis subagent skip verification entirely and trust the findings it already received without confirming them.',
        rationale: 'Wrong — skipping verification entirely sacrifices the accuracy checks the process exists for, rather than making them more efficient.',
      },
      {
        id: 'D',
        text: "Increase the priority of the coordinator's message queue so verification round-trips complete faster.",
        rationale:
          'Wrong — this addresses queue latency, not the structural cost of routing every simple lookup through the full coordinator round trip.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Providing scoped cross-role tools for high-frequency, simple needs — while routing complex cases through the coordinator — balances efficiency with the principle of least privilege.',
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
    id: 'q2-s3-0004',
    domain: 2,
    scenarioId: 3,
    taskStatements: ['2.4'],
    selectCount: 1,
    stem: 'Your research system needs to pull issue and documentation data from your team\'s existing Jira and Confluence instances. An engineer proposes building custom MCP servers for both from scratch. What guidance from best practice should inform this decision?',
    options: [
      {
        id: 'A',
        text: 'Prefer existing, well-supported community MCP servers for standard integrations like Jira and Confluence, reserving custom server development for genuinely team-specific workflows those integrations don\'t cover.',
        rationale:
          'Correct — choosing existing community MCP servers over custom implementations for standard integrations is the recommended practice.',
      },
      {
        id: 'B',
        text: 'Always build custom MCP servers in-house, since community servers cannot be trusted for production use.',
        rationale: 'Wrong — this is an unsupported blanket claim; the guidance is to prefer existing servers for standard cases, not distrust them categorically.',
      },
      {
        id: 'C',
        text: 'MCP servers should never be used for anything beyond web search, so this integration should use a different mechanism entirely.',
        rationale:
          'Wrong — MCP servers are a general integration mechanism; Jira and Confluence integrations are exactly the kind of standard use case they are suited for.',
      },
      {
        id: 'D',
        text: 'Custom MCP servers are required whenever more than one external system needs to be integrated.',
        rationale:
          'Wrong — the number of external systems being integrated has no bearing on whether custom development is required; the deciding factor is whether the integration is standard or team-specific.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Best practice is to choose existing community MCP servers over custom implementations for standard integrations, reserving custom servers for team-specific workflows.',
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
    id: 'q2-s3-0005',
    domain: 2,
    scenarioId: 3,
    taskStatements: ['2.4'],
    selectCount: 1,
    stem: "Your document-analysis subagent currently has to make several exploratory tool calls just to discover what documents exist in your knowledge base and what topics they cover, before it can decide which ones are relevant to a research query. What MCP mechanism could reduce this exploratory overhead?",
    options: [
      {
        id: 'A',
        text: "Expose a catalog of available documents and their topics as an MCP resource, giving the subagent visibility into what's available without requiring exploratory tool calls.",
        rationale:
          'Correct — MCP resources exist specifically to expose content catalogs so agents have visibility into what is available without needing exploratory tool calls to discover it.',
      },
      {
        id: 'B',
        text: 'Add a new MCP tool called list_everything that returns the full text of every document in the knowledge base in one call.',
        rationale:
          "Wrong — returning full text of every document in one call would consume enormous amounts of context for what's meant to be a lightweight discovery step.",
      },
      {
        id: 'C',
        text: 'Increase the subagent\'s max_tokens so it can make more exploratory tool calls within a single turn.',
        rationale: 'Wrong — more tokens for more exploratory calls treats the symptom without addressing why those calls are needed in the first place.',
      },
      {
        id: 'D',
        text: "Remove the document-analysis subagent's access to the knowledge base entirely to eliminate exploratory calls.",
        rationale: "Wrong — removing access entirely eliminates the subagent's ability to do its job, rather than making discovery more efficient.",
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'MCP resources are the designed mechanism for exposing content catalogs (documents, schemas, issue summaries) to reduce exploratory tool calls needed just to discover what data is available.',
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
    id: 'q2-s4-0001',
    domain: 2,
    scenarioId: 4,
    taskStatements: ['2.5'],
    selectCount: 1,
    stem: "You need to find every file in the repository named following the pattern *.controller.ts, regardless of which directory it's in, without caring about the file's contents. Which built-in tool is the right choice?",
    options: [
      {
        id: 'A',
        text: 'Grep, since it searches file contents for patterns.',
        rationale:
          "Wrong — Grep searches file contents for patterns like function names or error messages; the task here doesn't involve searching content, only file names.",
      },
      {
        id: 'B',
        text: 'Glob, since it matches file paths by name/extension pattern rather than searching file contents.',
        rationale:
          'Correct — Glob is specifically for file path pattern matching such as finding files by name or extension pattern, which is exactly this need.',
      },
      {
        id: 'C',
        text: 'Bash, by running a shell command to list directory contents recursively.',
        rationale:
          "Wrong — while technically possible via a shell command, this duplicates functionality Glob already provides directly and idiomatically.",
      },
      {
        id: 'D',
        text: "Read, applied to every file in the repository to check its name.",
        rationale: 'Wrong — Read loads file contents; using it just to check file names is a wasteful, indirect way to do file discovery.',
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'Glob is for file path pattern matching (finding files by name or extension patterns), distinct from Grep, which searches file contents.',
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
    id: 'q2-s4-0002',
    domain: 2,
    scenarioId: 4,
    taskStatements: ['2.5'],
    selectCount: 1,
    stem: "Claude Code attempts to use the Edit tool to change a specific line in a configuration file, but the anchor text it's trying to match appears in six different places in the file, and Edit reports it cannot find a unique match. What's the recommended way to proceed?",
    options: [
      {
        id: 'A',
        text: 'Retry the exact same Edit call repeatedly until it succeeds by chance.',
        rationale: "Wrong — retrying the identical call won't change the outcome; the anchor text is still non-unique regardless of how many times it's attempted.",
      },
      {
        id: 'B',
        text: 'Delete the entire file and recreate it from scratch with Write.',
        rationale:
          'Wrong — recreating the whole file from scratch is unnecessary and risks losing unrelated content when only one occurrence needs to change.',
      },
      {
        id: 'C',
        text: 'Use Read to load the full file contents, then use Write to save the modified version with the specific occurrence changed.',
        rationale:
          'Correct — when Edit fails due to non-unique text matches, using Read to load full contents followed by Write is the documented fallback for reliable file modification.',
      },
      {
        id: 'D',
        text: 'Switch to using Bash with a sed command instead of any built-in file tool.',
        rationale:
          'Wrong — while technically possible, this bypasses the built-in file-editing tools in favor of a shell workaround when a direct, reliable built-in fallback already exists.',
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'When Edit fails due to non-unique text matches, using Read followed by Write is the reliable fallback for making the intended file modification.',
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
    id: 'q2-s4-0003',
    domain: 2,
    scenarioId: 4,
    taskStatements: ['2.5'],
    selectCount: 1,
    stem: 'You ask Claude Code to understand how a large, unfamiliar codebase handles user authentication before making a change. What is the most effective way for it to build this understanding?',
    options: [
      {
        id: 'A',
        text: 'Read every file in the repository from the first file to the last, in alphabetical order.',
        rationale: 'Wrong — reading every file upfront, regardless of relevance, is inefficient and wastes context budget on unrelated code.',
      },
      {
        id: 'B',
        text: 'Ask the developer to explain the authentication flow verbally instead of exploring the code.',
        rationale: "Wrong — this bypasses the actual investigative capability being tested and isn't a scalable approach for arbitrary codebases.",
      },
      {
        id: 'C',
        text: "Use Bash to print the entire repository's file tree and stop there without reading any file contents.",
        rationale:
          'Wrong — a file tree alone shows structure but not how authentication logic actually works; some content reading is still necessary.',
      },
      {
        id: 'D',
        text: 'Start with Grep to find authentication-related entry points, then use Read to follow imports and trace the flow from there, rather than reading all files upfront.',
        rationale:
          'Correct — building codebase understanding incrementally, starting with Grep to find entry points and then Read to follow imports and trace flows, is the recommended approach.',
      },
    ],
    correctOptionIds: ['D'],
    explanationSummary:
      'Building codebase understanding incrementally — Grep to find entry points, then Read to follow imports — is more effective than reading all files upfront.',
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
    id: 'q2-s4-0004',
    domain: 2,
    scenarioId: 4,
    taskStatements: ['2.5'],
    selectCount: 1,
    stem: "A utility function is re-exported through two different wrapper/barrel modules under different local names before it's finally used in application code, making a single search for the original function name insufficient to find all usages. What is the most effective way to trace all its usages across the codebase?",
    options: [
      {
        id: 'A',
        text: 'First identify all the exported names the function is re-exported as, then search for each of those names separately across the codebase.',
        rationale:
          'Correct — tracing function usage across wrapper modules by first identifying all exported names, then searching for each name across the codebase, is exactly the approach needed here.',
      },
      {
        id: 'B',
        text: 'Search only for the original function\'s definition and assume nothing else needs to be checked.',
        rationale:
          'Wrong — searching only for the original name misses every usage that goes through a re-exported alias, which is precisely the situation described.',
      },
      {
        id: 'C',
        text: 'Rename the function first, then see which files fail to compile.',
        rationale:
          "Wrong — renaming before understanding full usage is risky and would only reveal compile-time-checked errors, not necessarily all dynamic or type-loose usages.",
      },
      {
        id: 'D',
        text: 'Manually open every file in the project one at a time to visually scan for usage.',
        rationale: 'Wrong — manually scanning every file is far slower and more error-prone than a systematic search-based approach.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Tracing function usage across wrapper modules requires first identifying all exported names, then searching for each name separately across the codebase.',
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
    id: 'q2-s4-0005',
    domain: 2,
    scenarioId: 4,
    taskStatements: ['2.5'],
    selectCount: 1,
    stem: "A user reports seeing the exact error message \"Session expired, please log in again\" but doesn't know which part of the application produced it. What is the most effective way to locate where this message originates in the codebase?",
    options: [
      {
        id: 'A',
        text: "Use Glob to find all files with 'session' in their file name.",
        rationale: "Wrong — Glob matches file names/paths, not file contents; the exact error string could appear in a file with an unrelated name.",
      },
      {
        id: 'B',
        text: 'Use Grep to search file contents for the literal error message text.',
        rationale:
          'Correct — Grep is for searching file contents for patterns like specific error messages, which is exactly this need — a direct content search for the literal string.',
      },
      {
        id: 'C',
        text: 'Use Read to open the main entry point file and scan it manually for the message.',
        rationale:
          "Wrong — the main entry point is unlikely to directly contain a specific, deep application error message, and manual scanning doesn't scale.",
      },
      {
        id: 'D',
        text: 'Use Bash to restart the application and reproduce the error while watching logs.',
        rationale:
          'Wrong — reproducing the error might confirm behavior but does not directly locate the source line producing the message the way a targeted content search would.',
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'Grep is the tool for searching file contents for specific patterns like literal error message strings, directly locating their source.',
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
    id: 'q2-s4-0006',
    domain: 2,
    scenarioId: 4,
    taskStatements: ['2.5'],
    selectCount: 1,
    stem: "You want Claude Code to run the project's existing test suite to check whether a change broke anything. Which built-in tool is appropriate for this, and why?",
    options: [
      {
        id: 'A',
        text: "Grep, because it can search for test file names containing the word 'test'.",
        rationale: 'Wrong — Grep searches file contents for patterns; it cannot execute a test suite.',
      },
      {
        id: 'B',
        text: 'Glob, because it can match all files ending in .test.ts.',
        rationale: 'Wrong — Glob can find test files by name pattern, but finding files is not the same as running them.',
      },
      {
        id: 'C',
        text: 'Bash, because running a test suite means executing a command (e.g., npm test), which is what Bash is for.',
        rationale:
          'Correct — actually executing a command like a test suite is a Bash operation; Grep and Glob are for finding content and files, not for running processes.',
      },
      {
        id: 'D',
        text: 'Edit, because running tests requires modifying a configuration file first.',
        rationale: "Wrong — running a test suite doesn't require modifying a configuration file first; this introduces an unnecessary and unrelated step.",
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'Bash is for executing commands, such as running a test suite, distinct from Grep/Glob which are for finding content and files rather than running processes.',
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
