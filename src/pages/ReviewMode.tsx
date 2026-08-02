import { useNavigate } from 'react-router-dom'
import { QUESTION_BANK } from '../data/questions'
import { missedQuestions, questionsNeedingReview } from '../engine/selectors'
import { useAppState } from '../state/AppState'
import type { SessionConfig } from './Session'

export function ReviewMode() {
  const navigate = useNavigate()
  const { progress } = useAppState()

  const flagged = missedQuestions(QUESTION_BANK, progress)
  const incorrect = questionsNeedingReview(QUESTION_BANK, progress)
  const combinedIds = new Set([...flagged, ...incorrect].map((q) => q.id))
  const pool = QUESTION_BANK.filter((q) => combinedIds.has(q.id))

  const start = () => {
    const config: SessionConfig = {
      questions: pool,
      mode: 'review',
      timeLimitSeconds: null,
      scenarioIds: [],
    }
    navigate('/session', { state: config })
  }

  return (
    <div className="review-mode">
      <h1>Review Missed Questions</h1>
      <p>
        Pulls together every question you've flagged for review plus every question your last
        attempt got wrong.
      </p>
      <p className="review-mode__counts">
        {flagged.length} flagged &middot; {incorrect.length} answered incorrectly last time &middot;{' '}
        {pool.length} total to review
      </p>
      <button type="button" disabled={pool.length === 0} onClick={start}>
        Start Review
      </button>
      {pool.length === 0 && <p>Nothing to review yet — take some practice questions first.</p>}
    </div>
  )
}
