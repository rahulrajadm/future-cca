import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ScoreReportView } from '../components/ScoreReportView'
import type { GradedItem } from '../engine/scoring'
import type { ScoreReport } from '../types/exam'

interface ResultsState {
  report: ScoreReport
  graded: GradedItem[]
}

export function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as ResultsState | null

  if (!state) {
    return (
      <div className="results-empty">
        <p>No results to show.</p>
        <button type="button" onClick={() => navigate('/')}>
          Back to home
        </button>
      </div>
    )
  }

  const { report, graded } = state
  const missed = graded.filter((g) => !g.isCorrect)

  return (
    <div className="results">
      <h1>Results</h1>
      <ScoreReportView report={report} />

      {missed.length > 0 && (
        <div className="results__missed">
          <h3>Questions to review ({missed.length})</h3>
          <ul>
            {missed.map((item) => (
              <li key={item.question.id}>
                <p className="results__missed-stem">{item.question.stem}</p>
                <p className="results__missed-explanation">{item.question.explanationSummary}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link to="/">Back to home</Link>
    </div>
  )
}
