import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SCENARIOS } from '../data/scenarios'
import { QUESTION_BANK } from '../data/questions'
import { questionsByScenario, unattemptedQuestions } from '../engine/selectors'
import { useAppState } from '../state/AppState'
import type { ScenarioId } from '../types/question'
import type { SessionConfig } from './Session'

export function ScenarioPractice() {
  const navigate = useNavigate()
  const { progress } = useAppState()
  const [scenarioId, setScenarioId] = useState<ScenarioId>(1)
  const [onlyUnseen, setOnlyUnseen] = useState(true)

  const scenarioPool = questionsByScenario(QUESTION_BANK, scenarioId)
  const pool = onlyUnseen ? unattemptedQuestions(scenarioPool, progress) : scenarioPool
  const seenCount = scenarioPool.length - pool.length

  const start = () => {
    const config: SessionConfig = {
      questions: pool,
      mode: 'scenario',
      timeLimitSeconds: null,
      scenarioIds: [scenarioId],
    }
    navigate('/session', { state: config })
  }

  return (
    <div className="scenario-practice">
      <h1>Scenario Practice</h1>
      <p>Drill every question grounded in a single official exam scenario. Untimed.</p>

      <ul className="scenario-practice__list">
        {SCENARIOS.map((scenario) => (
          <li key={scenario.id}>
            <label>
              <input
                type="radio"
                name="scenario"
                checked={scenarioId === scenario.id}
                onChange={() => setScenarioId(scenario.id)}
              />
              <strong>{scenario.title}</strong>
              <p>{scenario.description}</p>
            </label>
          </li>
        ))}
      </ul>

      <label className="scenario-practice__unseen-toggle">
        <input type="checkbox" checked={onlyUnseen} onChange={(e) => setOnlyUnseen(e.target.checked)} />
        Only show questions I haven't attempted yet
      </label>

      <p className="scenario-practice__pool-size">
        {pool.length} questions available for this scenario
        {onlyUnseen && seenCount > 0 ? ` (${seenCount} already attempted, excluded)` : ''}
      </p>

      <button type="button" disabled={pool.length === 0} onClick={start}>
        Start Practice
      </button>
    </div>
  )
}
