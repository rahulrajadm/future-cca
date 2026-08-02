import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SCENARIOS } from '../data/scenarios'
import { QUESTION_BANK } from '../data/questions'
import { questionsByScenario } from '../engine/selectors'
import type { ScenarioId } from '../types/question'
import type { SessionConfig } from './Session'

export function ScenarioPractice() {
  const navigate = useNavigate()
  const [scenarioId, setScenarioId] = useState<ScenarioId>(1)

  const pool = questionsByScenario(QUESTION_BANK, scenarioId)

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

      <p className="scenario-practice__pool-size">{pool.length} questions available for this scenario</p>

      <button type="button" disabled={pool.length === 0} onClick={start}>
        Start Practice
      </button>
    </div>
  )
}
