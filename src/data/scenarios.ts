import type { DomainId, ScenarioId } from '../types/question'

export interface Scenario {
  id: ScenarioId
  title: string
  description: string
  primaryDomains: DomainId[]
}

export const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: 'Customer Support Resolution Agent',
    description:
      'You are building a customer support resolution agent using the Claude Agent SDK. The agent handles high-ambiguity requests like returns, billing disputes, and account issues. It has access to your backend systems through custom Model Context Protocol (MCP) tools (get_customer, lookup_order, process_refund, escalate_to_human). Your target is 80%+ first-contact resolution while knowing when to escalate.',
    primaryDomains: [1, 2, 5],
  },
  {
    id: 2,
    title: 'Code Generation with Claude Code',
    description:
      'You are using Claude Code to accelerate software development. Your team uses it for code generation, refactoring, debugging, and documentation. You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and understand when to use plan mode vs direct execution.',
    primaryDomains: [3, 5],
  },
  {
    id: 3,
    title: 'Multi-Agent Research System',
    description:
      'You are building a multi-agent research system using the Claude Agent SDK. A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports. The system researches topics and produces comprehensive, cited reports.',
    primaryDomains: [1, 2, 5],
  },
  {
    id: 4,
    title: 'Developer Productivity with Claude',
    description:
      'You are building developer productivity tools using the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks. It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers.',
    primaryDomains: [2, 3, 1],
  },
  {
    id: 5,
    title: 'Claude Code for Continuous Integration',
    description:
      'You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline. The system runs automated code reviews, generates test cases, and provides feedback on pull requests. You need to design prompts that provide actionable feedback and minimize false positives.',
    primaryDomains: [3, 4],
  },
  {
    id: 6,
    title: 'Structured Data Extraction',
    description:
      'You are building a structured data extraction system using Claude. The system extracts information from unstructured documents, validates the output using JavaScript Object Notation (JSON) schemas, and maintains high accuracy. It must handle edge cases gracefully and integrate with downstream systems.',
    primaryDomains: [4, 5],
  },
]

export const SCENARIO_MAP: Record<ScenarioId, Scenario> = Object.fromEntries(
  SCENARIOS.map((s) => [s.id, s]),
) as Record<ScenarioId, Scenario>
