import { DOMAIN_MAP } from '../data/domains'
import type { DomainBreakdown } from '../types/exam'

export function DomainBreakdownTable({ breakdown }: { breakdown: DomainBreakdown[] }) {
  return (
    <table className="domain-breakdown">
      <thead>
        <tr>
          <th>Domain</th>
          <th>Blueprint weight</th>
          <th>Your score</th>
        </tr>
      </thead>
      <tbody>
        {breakdown.map((row) => (
          <tr key={row.domain}>
            <td>{DOMAIN_MAP[row.domain]?.name ?? `Domain ${row.domain}`}</td>
            <td>{Math.round(row.blueprintWeight * 100)}%</td>
            <td>
              {row.correct}/{row.total} ({Math.round(row.percentCorrect * 100)}%)
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
