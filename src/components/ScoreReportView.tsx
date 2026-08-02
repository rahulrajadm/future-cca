import type { ScoreReport } from '../types/exam'
import { DomainBreakdownTable } from './DomainBreakdownTable'

export function ScoreReportView({ report }: { report: ScoreReport }) {
  return (
    <div className="score-report">
      <h2 className={report.passedApprox ? 'score-report__status--pass' : 'score-report__status--fail'}>
        {report.passedApprox ? 'Passing range (practice estimate)' : 'Below passing range (practice estimate)'}
      </h2>
      <p className="score-report__percent">
        {report.correctCount}/{report.totalQuestions} correct ({Math.round(report.percentCorrect * 100)}%)
      </p>
      <p className="score-report__scaled">
        Approximate scaled score: <strong>{report.scaledScoreApprox}</strong> / 1000
      </p>
      <p className="score-report__disclaimer">
        This scaled score is a simple linear estimate for practice purposes only. It is not affiliated
        with, validated against, or produced by Anthropic's official scoring model, which is unpublished.
      </p>
      <h3>By domain</h3>
      <DomainBreakdownTable breakdown={report.domainBreakdown} />
    </div>
  )
}
