import { Link } from 'react-router-dom'
import { QUESTION_BANK } from '../data/questions'
import { useAppState } from '../state/AppState'

export function Home() {
  const { progress } = useAppState()
  const totalQuestions = QUESTION_BANK.length
  const attempted = Object.keys(progress.attemptsByQuestionId).length
  const missedCount = new Set(
    Object.entries(progress.attemptsByQuestionId)
      .filter(([, stats]) => stats.lastResult === 'incorrect')
      .map(([id]) => id),
  ).size

  return (
    <div className="home">
      <h1>Claude Certified Architect – Foundations Practice</h1>
      <p className="home__subtitle">
        An unofficial, community-built practice resource for the CCAR-F exam. {totalQuestions}{' '}
        questions covering all 5 domains and 6 scenarios from the official exam guide.
      </p>

      <div className="home__stats">
        <span>{totalQuestions} questions in bank</span>
        <span>{attempted} attempted</span>
        <span>{missedCount} to review</span>
      </div>

      <div className="home__modes">
        <Link className="mode-card" to="/exam">
          <h2>Full Simulated Exam</h2>
          <p>4 of 6 scenarios drawn at random, 60 items, 120-minute timer, scored like the real exam.</p>
        </Link>
        <Link className="mode-card" to="/domain">
          <h2>Domain Practice</h2>
          <p>Focus on one or more of the 5 content domains, untimed.</p>
        </Link>
        <Link className="mode-card" to="/scenario">
          <h2>Scenario Practice</h2>
          <p>Drill one of the 6 official exam scenarios end-to-end.</p>
        </Link>
        <Link className="mode-card" to="/custom">
          <h2>Custom Practice</h2>
          <p>Pick a question count (5/10/25/60) and split it equally across domains or by exam-blueprint ratio.</p>
        </Link>
        <Link className="mode-card" to="/review">
          <h2>Review Missed Questions</h2>
          <p>Revisit questions you've flagged or answered incorrectly ({missedCount} available).</p>
        </Link>
      </div>

      <p className="home__about-link">
        <Link to="/about">About this project &amp; disclaimer</Link>
      </p>
    </div>
  )
}
