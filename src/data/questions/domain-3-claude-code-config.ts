import type { Question } from '../../types/question'

/**
 * Domain 3: Claude Code Configuration & Workflows (20% of exam blueprint).
 * Covers task statements 3.1-3.6. Scenario-grounded questions here draw
 * primarily from Scenario 2 (Code Generation), Scenario 4 (Developer
 * Productivity), and Scenario 5 (CI/CD).
 */
export const domain3Questions: Question[] = [
  {
    id: 'q3-s2-0001',
    domain: 3,
    scenarioId: 2,
    taskStatements: ['3.1'],
    selectCount: 1,
    stem: "Your team's testing conventions have worked correctly in Claude Code for months, but a new engineer who just joined reports that Claude Code never applies those conventions in their sessions. Investigating, you find the conventions were originally written into the project lead's personal ~/.claude/CLAUDE.md file, not the project's own CLAUDE.md. What is the most likely explanation, and the correct fix?",
    options: [
      {
        id: 'A',
        text: "~/.claude/CLAUDE.md is user-level and applies only to that individual; since it isn't shared via version control, the new engineer never received it — the conventions should be moved to the project-level CLAUDE.md so they apply to everyone who clones the repo.",
        rationale:
          "Correct — user-level settings apply only to that user and are never distributed via version control; moving the conventions into the project-level file is what makes them apply to every team member automatically.",
      },
      {
        id: 'B',
        text: "The new engineer needs to manually copy the project lead's ~/.claude/CLAUDE.md file to their own machine.",
        rationale:
          'Wrong — this "fixes" the symptom for one person by manual copying, but does not scale; every future new hire would need the same manual step.',
      },
      {
        id: 'C',
        text: 'CLAUDE.md files only take effect after being explicitly loaded with the /memory command, which the new engineer has not run yet.',
        rationale:
          'Wrong — /memory is a diagnostic command for verifying which memory files are currently loaded, not a required activation step for CLAUDE.md to take effect.',
      },
      {
        id: 'D',
        text: 'User-level CLAUDE.md files require an explicit @import from the project-level file to take effect for other users.',
        rationale:
          "Wrong — @import is used to selectively include external files into a CLAUDE.md; it is not a mechanism for user-level files to reach other users, who never see another user's personal configuration regardless.",
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'User-level CLAUDE.md configuration applies only to the individual who wrote it and is not shared via version control. Conventions meant for the whole team belong in project-level configuration.',
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
    id: 'q3-s2-0002',
    domain: 3,
    scenarioId: 2,
    taskStatements: ['3.1'],
    selectCount: 1,
    stem: "Your project's root CLAUDE.md has grown to over 600 lines, covering testing conventions, API design standards, deployment procedures, and database migration guidelines all in one file. Team members report it's hard to find relevant guidance, and unrelated sections get loaded into context even for narrowly-scoped tasks. What's the recommended way to reorganize this?",
    options: [
      {
        id: 'A',
        text: 'Split the content into focused, topic-specific files under .claude/rules/ (e.g., testing.md, api-conventions.md, deployment.md), rather than keeping one monolithic CLAUDE.md.',
        rationale:
          '.claude/rules/ exists specifically as an alternative to a monolithic CLAUDE.md, letting topic-specific guidance live in its own focused file.',
      },
      {
        id: 'B',
        text: 'Delete the least frequently referenced sections to reduce the file\'s overall length.',
        rationale: 'Wrong — deleting content loses guidance the team still needs; the problem is organization, not volume that must be reduced.',
      },
      {
        id: 'C',
        text: 'Convert the entire file into a single custom slash command that developers can invoke on demand.',
        rationale:
          'Wrong — a slash command is for on-demand, task-specific invocation, not for always-relevant standards that should be present automatically.',
      },
      {
        id: 'D',
        text: 'Split the content across multiple root-level files named CLAUDE.md, CLAUDE2.md, and CLAUDE3.md.',
        rationale:
          "Wrong — there's no mechanism that recognizes numbered CLAUDE2.md/CLAUDE3.md files as part of the configuration hierarchy.",
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      '.claude/rules/ is the designed alternative to a monolithic CLAUDE.md for organizing topic-specific guidance into focused files, especially when combined with path-scoping to reduce irrelevant context.',
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
    id: 'q3-s2-0003',
    domain: 3,
    scenarioId: 2,
    taskStatements: ['3.2'],
    selectCount: 1,
    stem: "You're building a custom Claude Code skill that performs a deep, exploratory analysis of an unfamiliar codebase — tracing every import, cataloging every module, and producing pages of intermediate notes — before finally returning a concise summary of the architecture. Currently, all of that exploratory output ends up in the main conversation, consuming a large amount of context. How should you configure the skill to fix this?",
    options: [
      {
        id: 'A',
        text: 'Set context: fork in the skill\'s frontmatter so the exploratory work runs in an isolated sub-agent context, and only the final summary returns to the main conversation.',
        rationale:
          'Correct — context: fork runs a skill in an isolated sub-agent context specifically so verbose intermediate output does not pollute the main conversation.',
      },
      {
        id: 'B',
        text: 'Set allowed-tools to an empty list in the skill\'s frontmatter to prevent the skill from producing any output.',
        rationale:
          'Wrong — restricting to no tools would prevent the skill from doing any exploration at all, not just from polluting context.',
      },
      {
        id: 'C',
        text: 'Add an argument-hint to the skill\'s frontmatter so developers know what parameters to pass.',
        rationale: 'Wrong — argument-hint is about prompting for required parameters, unrelated to isolating verbose output.',
      },
      {
        id: 'D',
        text: 'Move the skill from .claude/skills/ to .claude/commands/ so it runs as a slash command instead.',
        rationale:
          'Wrong — commands and skills are different mechanisms, and relocating the file does not provide context isolation; only context: fork does that.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'The context: fork frontmatter option runs a skill in an isolated sub-agent context, preventing verbose skill output from polluting the main conversation.',
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
    id: 'q3-s2-0004',
    domain: 3,
    scenarioId: 2,
    taskStatements: ['3.2'],
    selectCount: 1,
    stem: "You're building a skill that formats and writes a changelog entry to CHANGELOG.md based on recent commits. You want to make sure this skill can never accidentally run arbitrary shell commands or modify other files, even if a future edit to the skill's prompt introduces that possibility. What should you do?",
    options: [
      {
        id: 'A',
        text: "Configure allowed-tools in the skill's frontmatter to restrict it to only the file-write operation it actually needs.",
        rationale:
          'Correct — allowed-tools frontmatter restricts which tools are available during the skill\'s execution, making over-broad tool use structurally impossible rather than merely discouraged.',
      },
      {
        id: 'B',
        text: "Add a comment at the top of the skill's prompt asking future editors not to add Bash usage.",
        rationale: "Wrong — a comment is a request, not an enforcement mechanism; it doesn't prevent a future prompt edit from enabling broader tool use.",
      },
      {
        id: 'C',
        text: "Store the skill in ~/.claude/skills/ instead of .claude/skills/ so it's personal and can't be shared accidentally.",
        rationale: 'Wrong — user-scoping controls sharing with teammates, not what tools the skill can access once invoked.',
      },
      {
        id: 'D',
        text: "Rename the skill file to make its limited purpose obvious to future editors.",
        rationale: 'Wrong — a clearer name might reduce confusion but provides no actual restriction on tool access.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'allowed-tools in skill frontmatter is the mechanism for restricting tool access during skill execution, providing a structural guarantee rather than relying on prompt wording.',
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
    id: 'q3-s2-0005',
    domain: 3,
    scenarioId: 2,
    taskStatements: ['3.3'],
    selectCount: 1,
    stem: "Your codebase has GraphQL resolver files (*.resolver.ts) scattered across many different feature directories, and you want a consistent convention applied whenever Claude edits any of them — but you don't want this guidance loaded into context when working on unrelated files. What's the best approach?",
    options: [
      {
        id: 'A',
        text: 'Create a file in .claude/rules/ with YAML frontmatter specifying a glob pattern like paths: ["**/*.resolver.ts"], so the rule loads only when a matching file is being edited.',
        rationale:
          'Correct — path-specific rules with glob patterns apply based on file type/name regardless of directory location, exactly suited to conventions for a file type spread across many directories.',
      },
      {
        id: 'B',
        text: 'Create a CLAUDE.md file in each feature directory that contains a resolver file, duplicating the same convention in each one.',
        rationale:
          'Wrong — duplicating the same content across many directory-level CLAUDE.md files is exactly the maintenance burden path-specific rules exist to avoid.',
      },
      {
        id: 'C',
        text: "Add the convention to the root CLAUDE.md so it's always loaded regardless of which files are being edited.",
        rationale:
          'Wrong — the root CLAUDE.md is always loaded, defeating the goal of only loading the convention when relevant.',
      },
      {
        id: 'D',
        text: 'Rename all resolver files to live in a single top-level /resolvers directory, then add a CLAUDE.md there.',
        rationale:
          'Wrong — this requires a significant, disruptive codebase restructuring just to work around a configuration limitation, when a much simpler configuration-only solution exists.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Glob-pattern rules in .claude/rules/ apply conventions to files by type regardless of directory location, which is the advantage over directory-level CLAUDE.md files for conventions spanning many directories.',
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
    id: 'q3-s2-0006',
    domain: 3,
    scenarioId: 2,
    taskStatements: ['3.3'],
    selectCount: 1,
    stem: 'You\'ve defined a rule file at .claude/rules/api-conventions.md with YAML frontmatter paths: ["src/api/**/*"]. When does Claude Code load this rule\'s content into context?',
    options: [
      {
        id: 'A',
        text: 'Only when Claude is working with a file whose path matches the glob pattern, such as src/api/handlers/users.ts.',
        rationale:
          "Correct — the paths frontmatter is what makes a rule file's activation conditional on the files currently being worked with, matching the glob pattern.",
      },
      {
        id: 'B',
        text: 'On every session, regardless of which files are being edited, because rule files are always loaded like CLAUDE.md.',
        rationale:
          "Wrong — this describes always-loaded CLAUDE.md behavior, not path-scoped rules; the entire benefit of path-scoped rules is that they don't always load.",
      },
      {
        id: 'C',
        text: 'Only once, the first time the project is opened, and then it remains cached for the rest of the session regardless of files touched.',
        rationale: 'Wrong — activation is tied to which files are currently relevant, not to a one-time, session-start check.',
      },
      {
        id: 'D',
        text: 'Only when a developer manually runs a slash command referencing api-conventions.md.',
        rationale: 'Wrong — rule files activate automatically based on file path matching; they are not invoked manually like slash commands.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Path-scoped rules load only when editing matching files, based on the glob patterns in their paths frontmatter, reducing irrelevant context and token usage.',
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
    id: 'q3-s2-0007',
    domain: 3,
    scenarioId: 2,
    taskStatements: ['3.4'],
    selectCount: 1,
    stem: 'A developer asks Claude Code to add a null check to a single function after a stack trace clearly identifies the exact line causing a crash. Should they use plan mode or direct execution?',
    options: [
      {
        id: 'A',
        text: 'Direct execution — this is a simple, well-scoped change with a clear location and fix, not a case requiring architectural exploration.',
        rationale:
          'Correct — plan mode is intended for complex, multi-file, or architecturally ambiguous work; a single-line fix with a clear stack trace is exactly the well-scoped case direct execution is meant for.',
      },
      {
        id: 'B',
        text: 'Plan mode — any production bug fix should go through a planning phase first.',
        rationale: 'Wrong — treating every bug fix as requiring a planning phase adds unnecessary overhead to changes that are already unambiguous.',
      },
      {
        id: 'C',
        text: 'Plan mode — the Explore subagent should be used to search the entire codebase for similar bugs before making any change.',
        rationale:
          "Wrong — searching for related bugs elsewhere may be a reasonable follow-up task, but it isn't necessary for making this specific, already-diagnosed fix.",
      },
      {
        id: 'D',
        text: 'Neither — Claude Code should not be used for bug fixes identified from stack traces.',
        rationale: 'Wrong — this is exactly the kind of well-scoped task Claude Code handles directly and reliably.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Direct execution is appropriate for simple, well-scoped changes with a clear fix location, such as a single-file bug fix with a clear stack trace.',
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
    id: 'q3-s2-0008',
    domain: 3,
    scenarioId: 2,
    taskStatements: ['3.4'],
    selectCount: 1,
    stem: "You've been asked to migrate your application's HTTP client library to a new one with a different API surface, affecting roughly 50 files across the codebase, with several call sites needing different adaptation strategies depending on how they currently use the old library. What's the best approach?",
    options: [
      {
        id: 'A',
        text: 'Use plan mode to explore how the current library is used across the codebase and design a migration approach, then execute the planned changes.',
        rationale:
          "Correct — this is a large-scale, multi-file change with several different adaptation strategies needed, exactly the profile plan mode's safe exploration-before-committing is designed for.",
      },
      {
        id: 'B',
        text: 'Use direct execution and fix files one at a time as errors are discovered after each change.',
        rationale:
          'Wrong — reactive, error-driven fixing across 50 files with varying usage patterns risks costly rework compared to understanding the scope upfront.',
      },
      {
        id: 'C',
        text: 'Use plan mode only to write documentation about the migration; perform all actual file changes through direct execution without further exploration.',
        rationale:
          'Wrong — this separates the exploration from the implementation it should inform, undermining the point of planning before executing.',
      },
      {
        id: 'D',
        text: 'Skip investigation entirely and write a single find-and-replace script to update all 50 files identically.',
        rationale:
          'Wrong — a single uniform find-and-replace ignores that different call sites need different adaptation strategies, as explicitly stated in the scenario.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Plan mode is designed for complex, multi-file changes with architectural implications, like library migrations affecting many files with varying adaptation needs — combining investigation with subsequent direct-execution implementation.',
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
    id: 'q3-s2-0009',
    domain: 3,
    scenarioId: 2,
    taskStatements: ['3.5'],
    selectCount: 1,
    stem: "You ask Claude Code to \"normalize phone numbers to a standard format\" across a dataset. The results are inconsistent — some outputs use (555) 123-4567, others use 555-123-4567, and some retain a leading +1 while others strip it. What is the most effective way to get consistent output?",
    options: [
      {
        id: 'A',
        text: 'Provide 2-3 concrete input/output examples showing exactly the transformation you want, including how edge cases like country codes should be handled.',
        rationale:
          'Correct — concrete input/output examples are the most effective way to communicate an exact expected transformation when a prose description alone is being interpreted inconsistently.',
      },
      {
        id: 'B',
        text: 'Repeat the instruction "normalize phone numbers to a standard format" multiple times in the prompt for emphasis.',
        rationale: 'Wrong — repeating the same ambiguous instruction does not add any new information about which specific format is wanted.',
      },
      {
        id: 'C',
        text: 'Break the task into smaller batches so Claude processes fewer phone numbers per request.',
        rationale: "Wrong — smaller batches don't address the actual issue, which is that the target format itself hasn't been specified precisely.",
      },
      {
        id: 'D',
        text: 'Increase max_tokens so Claude has more room to reason about the correct format.',
        rationale: "Wrong — the issue isn't insufficient output length; it's ambiguity about the target format, which more tokens don't resolve.",
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Concrete input/output examples are the most effective technique for communicating an exact expected transformation when prose descriptions alone produce inconsistent results.',
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
    id: 'q3-s2-0010',
    domain: 3,
    scenarioId: 2,
    taskStatements: ['3.5'],
    selectCount: 1,
    stem: "You ask Claude Code to implement a caching layer for an internal API, but you haven't yet decided on cache invalidation strategy, TTL values, or how to handle concurrent writes. What's an effective way to surface these considerations before implementation begins?",
    options: [
      {
        id: 'A',
        text: 'Ask Claude to first interview you with clarifying questions about invalidation strategy, TTL, and concurrency handling before writing any code.',
        rationale:
          'Correct — the interview pattern, where Claude asks clarifying questions before implementing, is effective for surfacing design considerations you may not have fully anticipated.',
      },
      {
        id: 'B',
        text: 'Ask Claude to implement a reasonable default immediately, and treat any issues as bugs to fix later.',
        rationale:
          'Wrong — implementing a default immediately risks committing to caching behavior that is costly to unwind later, when the considerations could have been surfaced upfront cheaply.',
      },
      {
        id: 'C',
        text: 'Write the entire specification yourself in exhaustive detail before involving Claude Code at all.',
        rationale:
          "Wrong — this defeats the purpose of using Claude to help surface considerations you haven't already thought through yourself.",
      },
      {
        id: 'D',
        text: 'Ask Claude Code to implement three completely different caching implementations in parallel and pick one afterward.',
        rationale:
          'Wrong — building three full implementations is far more effort than a short upfront clarifying conversation about the actual open questions.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'The interview pattern — having Claude ask clarifying questions before implementing — surfaces design considerations the developer may not have anticipated, in domains like cache invalidation and concurrency.',
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
    id: 'q3-s4-0001',
    domain: 3,
    scenarioId: 4,
    taskStatements: ['3.1'],
    selectCount: 1,
    stem: "Your monorepo has a root CLAUDE.md with universal conventions, plus separate standards files for frontend (frontend-standards.md) and backend (backend-standards.md) conventions that only make sense within their respective packages. You want each package's own CLAUDE.md to selectively include just the standards file relevant to it, without duplicating content. What mechanism supports this?",
    options: [
      {
        id: 'A',
        text: "Copy and paste the relevant standards file's full content into each package's CLAUDE.md manually.",
        rationale:
          'Wrong — manual duplication creates a maintenance burden where updates must be repeated in multiple places, which @import exists to avoid.',
      },
      {
        id: 'B',
        text: 'Store all standards in a single file and rely on Claude to infer which parts apply to which package.',
        rationale: 'Wrong — relying on inference rather than explicit inclusion is unreliable compared to directly importing the relevant file.',
      },
      {
        id: 'C',
        text: "Create a .claude/rules/ file with a glob pattern matching each package's directory.",
        rationale:
          "Wrong — while path-scoped rules are useful for file-type-based conventions, the scenario describes package-level standards documents meant to be selectively included in CLAUDE.md, which is what @import is for.",
      },
      {
        id: 'D',
        text: "Use the @import syntax within each package's CLAUDE.md to reference the specific standards file relevant to that package.",
        rationale:
          "Correct — @import lets each package's CLAUDE.md selectively include the specific external standards file relevant to it, keeping CLAUDE.md modular without duplicating content.",
      },
    ],
    correctOptionIds: ['D'],
    explanationSummary:
      '@import syntax lets a CLAUDE.md selectively reference external standards files relevant to its own package, avoiding duplication while keeping configuration modular.',
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
    id: 'q3-s4-0002',
    domain: 3,
    scenarioId: 4,
    taskStatements: ['3.1'],
    selectCount: 1,
    stem: "A developer reports that Claude Code seems to be following outdated conventions that were removed from CLAUDE.md weeks ago. You suspect a stale or unexpected configuration file is still being loaded. What's an effective first step to diagnose this?",
    options: [
      {
        id: 'A',
        text: 'Delete all CLAUDE.md files in the project and start over from an empty configuration.',
        rationale: 'Wrong — deleting all configuration is a drastic, disruptive step to take before even diagnosing what is actually being loaded.',
      },
      {
        id: 'B',
        text: 'Run the /memory command to see exactly which memory files are currently being loaded for that session.',
        rationale:
          'Correct — /memory is the diagnostic command for verifying which memory files are loaded, which directly answers whether an unexpected or stale file is in play.',
      },
      {
        id: 'C',
        text: 'Ask the developer to reinstall Claude Code entirely.',
        rationale: 'Wrong — reinstalling the tool does not address a configuration-loading question and is a disproportionate response.',
      },
      {
        id: 'D',
        text: 'Assume the report is inaccurate, since CLAUDE.md changes always take effect immediately with no possible staleness.',
        rationale:
          'Wrong — dismissing the report without investigating contradicts the premise that unexpected configuration sources can plausibly explain the behavior.',
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'The /memory command verifies which memory files are currently loaded, making it the direct diagnostic tool for suspected stale or unexpected configuration.',
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
    id: 'q3-s4-0003',
    domain: 3,
    scenarioId: 4,
    taskStatements: ['3.2'],
    selectCount: 1,
    stem: "You want to add guidance for Claude Code that should apply automatically to every single session on this project, regardless of what task is being worked on (e.g., \"always use the project's internal logging library instead of console.log\"). Should this go in a skill or in CLAUDE.md?",
    options: [
      {
        id: 'A',
        text: 'A skill, because skills are more powerful than CLAUDE.md for any kind of instruction.',
        rationale:
          'Wrong — "more powerful" is not the relevant distinction; the two mechanisms serve different purposes based on whether guidance should always apply or only apply on demand.',
      },
      {
        id: 'B',
        text: 'A skill, because skill invocation is required for any instruction to take effect at all.',
        rationale: 'Wrong — CLAUDE.md content takes effect without any explicit invocation; this is exactly backwards.',
      },
      {
        id: 'C',
        text: 'CLAUDE.md, because it is always-loaded universal guidance, whereas skills are for on-demand, task-specific workflows that must be explicitly invoked.',
        rationale:
          'Correct — CLAUDE.md is for always-loaded universal standards, while skills are for on-demand invocation of task-specific workflows.',
      },
      {
        id: 'D',
        text: 'Neither — this kind of guidance cannot be reliably communicated to Claude Code at all.',
        rationale: 'Wrong — this is exactly the kind of always-applicable convention CLAUDE.md is designed to communicate reliably.',
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'CLAUDE.md is always-loaded universal guidance, while skills are for on-demand, task-specific invocation — the choice depends on whether guidance should always apply.',
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
    id: 'q3-s4-0004',
    domain: 3,
    scenarioId: 4,
    taskStatements: ['3.4'],
    selectCount: 1,
    stem: 'As part of a larger task, Claude Code needs to survey a large codebase to find every place a particular deprecated API is used before planning its replacement. This discovery phase alone is expected to involve many file reads and searches. How can this be done without consuming most of the main conversation\'s context budget?',
    options: [
      {
        id: 'A',
        text: 'Use the Explore subagent to perform the verbose discovery phase, returning a concise summary of findings to the main conversation rather than the full search transcript.',
        rationale:
          "Correct — the Explore subagent exists specifically to isolate verbose discovery output and return summaries, preserving the main conversation's context for the work that follows.",
      },
      {
        id: 'B',
        text: "Perform the discovery directly in the main conversation, since context budget concerns don't apply during investigation phases.",
        rationale:
          'Wrong — context budget concerns apply throughout a session, including investigation phases; this is exactly the scenario the Explore subagent is meant to help with.',
      },
      {
        id: 'C',
        text: 'Skip the discovery phase entirely and guess which files likely use the deprecated API.',
        rationale: "Wrong — guessing risks missing real usages of the deprecated API, undermining the reliability of the subsequent replacement plan.",
      },
      {
        id: 'D',
        text: 'Increase max_tokens on every response during the discovery phase so more content fits.',
        rationale: "Wrong — max_tokens affects response length, not how much of the context window a verbose discovery phase consumes.",
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'The Explore subagent isolates verbose discovery output, returning summaries to preserve the main conversation\'s context window for subsequent work.',
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
    id: 'q3-s4-0005',
    domain: 3,
    scenarioId: 4,
    taskStatements: ['3.4'],
    selectCount: 1,
    stem: "You need to migrate a set of internal libraries to a new build tool. The migration approach itself is uncertain and needs investigation, but once the approach is decided, the actual file changes are expected to be mechanical and repetitive. What's an effective way to use plan mode and direct execution together here?",
    options: [
      {
        id: 'A',
        text: 'Use direct execution for the entire task, including the investigation, since plan mode is unnecessary once you already know a migration is needed.',
        rationale:
          'Wrong — "knowing a migration is needed" is not the same as knowing the right approach; the approach itself is described as uncertain and needing investigation.',
      },
      {
        id: 'B',
        text: 'Use plan mode for the entire task, including the mechanical file changes, since plan mode is always safer regardless of a task\'s nature.',
        rationale:
          'Wrong — once the mechanical, repetitive implementation phase begins, continuing to use plan mode adds unnecessary overhead for well-understood, repetitive work.',
      },
      {
        id: 'C',
        text: 'Alternate randomly between plan mode and direct execution throughout the task.',
        rationale: 'Wrong — this describes no coherent strategy tied to the actual nature of the work at each stage.',
      },
      {
        id: 'D',
        text: 'Use plan mode to investigate the codebase and decide on a migration approach, then switch to direct execution to carry out the resulting mechanical, repetitive changes.',
        rationale:
          'Correct — combining plan mode for investigation with direct execution for implementation matches the described task, which has an uncertain-approach phase followed by a mechanical-execution phase.',
      },
    ],
    correctOptionIds: ['D'],
    explanationSummary:
      'Combining plan mode for investigation with direct execution for implementation suits tasks with an uncertain-approach phase followed by mechanical, well-understood execution.',
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
    id: 'q3-s5-0001',
    domain: 3,
    scenarioId: 5,
    taskStatements: ['3.6'],
    selectCount: 1,
    stem: 'Your GitHub Actions workflow runs `claude "Summarize the changes in this pull request"` as a step, but the job hangs and eventually times out. What is the most likely cause and fix?',
    options: [
      {
        id: 'A',
        text: 'The prompt string needs to be wrapped in single quotes instead of double quotes.',
        rationale: 'Wrong — quoting style is not the cause of a hang; the issue is about interactive vs non-interactive mode.',
      },
      {
        id: 'B',
        text: "GitHub Actions doesn't support running CLI tools that accept natural language prompts.",
        rationale: 'Wrong — GitHub Actions runs arbitrary CLI commands including Claude Code; the tool itself works fine in CI once configured correctly.',
      },
      {
        id: 'C',
        text: "Claude Code is waiting for interactive input because it wasn't run in non-interactive mode; adding the -p (or --print) flag fixes this.",
        rationale:
          'Correct — without -p (or --print), Claude Code runs in interactive mode and waits for input a CI environment can never provide; -p processes the prompt, outputs to stdout, and exits.',
      },
      {
        id: 'D',
        text: "The workflow needs to install a separate 'claude-ci' package instead of the standard CLI.",
        rationale: "Wrong — there is no such separate package; the standard Claude Code CLI supports non-interactive mode via a flag.",
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'The -p (--print) flag runs Claude Code in non-interactive mode, which is required to prevent CI pipelines from hanging while waiting for input that will never arrive.',
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
    id: 'q3-s5-0002',
    domain: 3,
    scenarioId: 5,
    taskStatements: ['3.6'],
    selectCount: 1,
    stem: "You want your CI pipeline to parse Claude Code's code review findings programmatically and post them as inline PR comments, rather than as one big block of unstructured text. What CLI flags support this?",
    options: [
      {
        id: 'A',
        text: '--output-format json combined with --json-schema, to produce machine-parseable structured findings matching a defined schema.',
        rationale:
          'Correct — --output-format json with --json-schema is the documented mechanism for enforcing structured, machine-parseable output in CI contexts.',
      },
      {
        id: 'B',
        text: '--pretty-print, to format the text output with nicer indentation.',
        rationale: 'Wrong — pretty-printing addresses text formatting, not the need for structured, schema-conformant data to parse programmatically.',
      },
      {
        id: 'C',
        text: '--verbose, to include more detailed prose explanations in the output.',
        rationale: 'Wrong — more prose detail is the opposite of what is needed for reliable programmatic parsing.',
      },
      {
        id: 'D',
        text: '--interactive, to allow the CI system to answer follow-up questions from Claude.',
        rationale:
          'Wrong — --interactive would reintroduce the non-interactive-mode problem CI environments need to avoid, and is not a real mechanism for structured output.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      '--output-format json with --json-schema is the CLI mechanism for producing machine-parseable structured findings, suitable for automated posting as inline PR comments.',
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
    id: 'q3-s5-0003',
    domain: 3,
    scenarioId: 5,
    taskStatements: ['3.6'],
    selectCount: 1,
    stem: 'Your CI-invoked Claude Code review consistently suggests test cases that duplicate ones your team already considers low-value (e.g., trivial getter/setter tests), while missing the specific edge cases your team actually cares about. What is the most effective way to improve this?',
    options: [
      {
        id: 'A',
        text: 'Increase max_tokens so Claude Code can generate a larger number of test suggestions.',
        rationale: "Wrong — generating more suggestions doesn't fix a relevance problem; it might produce more low-value suggestions rather than fewer.",
      },
      {
        id: 'B',
        text: "Document your team's testing standards, valuable test criteria, and available fixtures in CLAUDE.md so CI-invoked Claude Code has the project context to generate more relevant suggestions.",
        rationale:
          'Correct — CLAUDE.md is the mechanism for providing project context — testing standards, fixture conventions, and review criteria — to CI-invoked Claude Code.',
      },
      {
        id: 'C',
        text: 'Disable test-generation review checks entirely, since they cannot be made more accurate.',
        rationale: 'Wrong — disabling the check entirely discards useful functionality instead of improving its accuracy with available context.',
      },
      {
        id: 'D',
        text: 'Re-run the exact same review request multiple times and keep only the last output.',
        rationale:
          "Wrong — repeating the same under-specified request doesn't add missing project context; it would likely produce similarly generic results.",
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'Documenting testing standards, valuable test criteria, and available fixtures in CLAUDE.md gives CI-invoked Claude Code the project context needed to reduce low-value, generic test suggestions.',
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
    id: 'q3-s5-0004',
    domain: 3,
    scenarioId: 5,
    taskStatements: ['3.6'],
    selectCount: 1,
    stem: 'Your CI pipeline uses the same Claude Code session both to generate a bug fix and, immediately afterward, to review that fix for correctness. Code review quality has been disappointing — the review rarely flags issues with the code it just wrote. What is the most likely explanation?',
    options: [
      {
        id: 'A',
        text: 'Claude Code cannot review any code it did not write itself.',
        rationale:
          'Wrong — Claude Code can review code regardless of who or what wrote it; the issue here is specifically about self-review using the same session.',
      },
      {
        id: 'B',
        text: 'The CI pipeline is running out of memory during the review step.',
        rationale:
          'Wrong — nothing in the scenario points to a resource problem; the described symptom is about review quality, not a crash or resource exhaustion.',
      },
      {
        id: 'C',
        text: "The review step needs a larger context window to catch its own mistakes.",
        rationale: "Wrong — window size isn't the limiting factor here; the issue is retained reasoning bias, not insufficient context capacity.",
      },
      {
        id: 'D',
        text: 'The same session retains reasoning context from generating the fix, making it less likely to question its own decisions; an independent review instance without that prior reasoning context would be more effective.',
        rationale:
          'Correct — a session that generated code retains its own reasoning context, making it less likely to challenge its own prior decisions; an independent instance without that context is more effective at catching subtle issues.',
      },
    ],
    correctOptionIds: ['D'],
    explanationSummary:
      'Session context isolation matters for review quality: the same session that generated code retains reasoning context that makes it less likely to question its own decisions, unlike an independent review instance.',
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
    id: 'q3-s5-0005',
    domain: 3,
    scenarioId: 5,
    taskStatements: ['3.6'],
    selectCount: 1,
    stem: 'Your CI pipeline runs an automated Claude Code review on every new commit to an open pull request. After the third commit, developers complain that the review keeps re-posting comments about issues they already fixed in earlier commits, alongside genuinely new findings. What is the most effective way to fix this?',
    options: [
      {
        id: 'A',
        text: 'Include the prior review findings in context when re-running the review, and instruct Claude to report only new or still-unaddressed issues.',
        rationale:
          'Correct — including prior review findings in context and instructing Claude to report only new or unaddressed issues is the documented pattern for avoiding duplicate comments across re-reviews.',
      },
      {
        id: 'B',
        text: 'Only run the review once, on the very first commit, and never re-run it for subsequent commits.',
        rationale:
          'Wrong — never re-reviewing after the first commit means genuinely new issues introduced by later commits would never be caught.',
      },
      {
        id: 'C',
        text: "Increase the review's severity threshold so fewer issues are reported overall.",
        rationale:
          "Wrong — raising the severity threshold reduces noise generally, but doesn't specifically address re-posting already-fixed issues, and risks missing real new problems too.",
      },
      {
        id: 'D',
        text: 'Have the review always post a completely fresh, full list of every issue found in the entire PR on every commit, regardless of history.',
        rationale:
          'Wrong — this is literally the behavior causing the complaint; reposting the full list every time is what generates duplicate comments about already-fixed issues.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Including prior review findings in context and instructing Claude to report only new or unaddressed issues prevents duplicate comments across re-reviews of the same PR.',
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
    id: 'q3-x-0001',
    domain: 3,
    scenarioId: null,
    taskStatements: ['3.3'],
    selectCount: 1,
    stem: "You want a consistent naming convention enforced for every *.module.css file in your project, regardless of which component directory it lives in, without bloating every session with this guidance when unrelated files are being edited. What's the best approach?",
    options: [
      {
        id: 'A',
        text: "Write the convention into the root CLAUDE.md so it's always loaded for every session.",
        rationale: 'Wrong — always-loaded content in root CLAUDE.md adds irrelevant context and token usage on every session, even for unrelated files.',
      },
      {
        id: 'B',
        text: 'Create a CLAUDE.md file inside every single component directory that contains a *.module.css file.',
        rationale: 'Wrong — duplicating the same convention across every component directory is a maintenance burden path-specific rules exist to avoid.',
      },
      {
        id: 'C',
        text: 'Create a .claude/rules/ file with YAML frontmatter paths: ["**/*.module.css"], so the convention loads only when a matching file is being edited.',
        rationale:
          'Correct — a glob-pattern rule in .claude/rules/ applies the convention only when a matching file type is being worked on, regardless of directory.',
      },
      {
        id: 'D',
        text: 'Rename all CSS module files to a single shared directory outside their components.',
        rationale:
          'Wrong — restructuring the codebase just to work around a configuration limitation is a disruptive, unnecessary change when a simple configuration fix exists.',
      },
    ],
    correctOptionIds: ['C'],
    explanationSummary:
      'Glob-pattern rules in .claude/rules/ apply conventions to a file type regardless of directory, loading only when relevant rather than bloating every session.',
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
    id: 'q3-x-0002',
    domain: 3,
    scenarioId: null,
    taskStatements: ['3.5'],
    selectCount: 1,
    stem: 'You want Claude Code to implement a moderately complex data-validation function correctly on the first real attempt, rather than iterating back and forth many times after subtle bugs are found in production. What\'s an effective approach?',
    options: [
      {
        id: 'A',
        text: 'Write a test suite covering expected behavior and edge cases first, then have Claude implement against it, sharing any test failures for it to address.',
        rationale:
          'Correct — test-driven iteration, writing test suites first, then iterating by sharing test failures, is the documented technique for guiding progressive improvement toward a correct implementation.',
      },
      {
        id: 'B',
        text: 'Ask Claude to implement the function with no tests at all, and only write tests afterward if problems come up later.',
        rationale: 'Wrong — deferring tests until after problems arise in production is the reactive approach this technique is meant to improve upon.',
      },
      {
        id: 'C',
        text: 'Ask Claude to implement five different versions of the function and pick the one that looks best by inspection.',
        rationale:
          "Wrong — generating multiple versions to pick by visual inspection doesn't provide the systematic verification a test suite gives, and is far less efficient.",
      },
      {
        id: 'D',
        text: 'Provide only a one-sentence description of the function\'s purpose with no further detail or examples.',
        rationale:
          'Wrong — a one-sentence description with no tests or examples is unlikely to yield a correct first attempt for a "moderately complex" function.',
      },
    ],
    correctOptionIds: ['A'],
    explanationSummary:
      'Test-driven iteration — writing test suites first, then iterating by sharing test failures — is the documented technique for guiding progressive improvement toward a correct implementation.',
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
    id: 'q3-x-0003',
    domain: 3,
    scenarioId: null,
    taskStatements: ['3.4'],
    selectCount: 1,
    stem: "You need to decide between two ways of integrating a new payment provider — one requiring new infrastructure and webhook endpoints, the other reusing your existing infrastructure with more limited features — and the tradeoffs aren't yet clear. Should you use plan mode or direct execution to begin this work?",
    options: [
      {
        id: 'A',
        text: 'Direct execution, since integrating a new payment provider is a common, well-understood task type.',
        rationale:
          'Wrong — being a "common task type" in general doesn\'t make this specific instance well-scoped; the tradeoffs between the two approaches are explicitly unclear.',
      },
      {
        id: 'B',
        text: 'Plan mode, since choosing between integration approaches with different infrastructure requirements is exactly the kind of architectural decision plan mode is designed to help explore before committing to changes.',
        rationale:
          'Correct — plan mode is designed for exactly this kind of task: multiple valid approaches with different infrastructure requirements and unclear tradeoffs.',
      },
      {
        id: 'C',
        text: 'Direct execution, but only after writing a one-page internal memo first, without any codebase exploration.',
        rationale:
          'Wrong — writing a memo without any actual codebase exploration skips the investigative value plan mode provides for understanding how each approach would integrate.',
      },
      {
        id: 'D',
        text: 'Neither — this decision should be made entirely outside of Claude Code, with implementation starting only after every detail is finalized elsewhere.',
        rationale: 'Wrong — this discards the value Claude Code can add to exploring the tradeoffs directly, pushing all the investigative work elsewhere unnecessarily.',
      },
    ],
    correctOptionIds: ['B'],
    explanationSummary:
      'Plan mode is designed for architectural decisions between multiple valid approaches with different infrastructure implications and unclear tradeoffs.',
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
    id: 'q3-x-0004',
    domain: 3,
    scenarioId: null,
    taskStatements: ['3.1'],
    selectCount: 1,
    stem: "Your root CLAUDE.md uses @import to include an enormous, all-encompassing 'company-wide-standards.md' file into every single package's CLAUDE.md, even though most packages only need a small fraction of that file's content. What problem does this cause?",
    options: [
      {
        id: 'A',
        text: '@import syntax only works for files smaller than 50 lines, so this configuration will fail outright.',
        rationale: 'Wrong — there is no such file-size limitation on @import; the problem here is one of granularity/relevance, not a technical failure.',
      },
      {
        id: 'B',
        text: 'This is a purely cosmetic issue with no real consequence, since @import is free regardless of file size.',
        rationale: 'Wrong — importing irrelevant content still consumes context and token budget in every session, which is a real, not merely cosmetic, cost.',
      },
      {
        id: 'C',
        text: 'This will cause a compilation error, since CLAUDE.md files are compiled like source code.',
        rationale: 'Wrong — CLAUDE.md files are not compiled like source code; there is no such compilation step or error to be triggered.',
      },
      {
        id: 'D',
        text: 'Every package ends up loading a large amount of irrelevant content into context, undermining the modularity benefit @import is meant to provide, when smaller, more targeted standards files per package would be more appropriate.',
        rationale:
          '@import syntax exists to selectively include relevant standards; importing an overly broad file into every package undermines that modularity.',
      },
    ],
    correctOptionIds: ['D'],
    explanationSummary:
      "Importing an overly broad, all-encompassing file into every package undermines the modularity @import is meant to enable — targeted, package-specific files are more appropriate.",
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
]
