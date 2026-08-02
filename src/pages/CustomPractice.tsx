import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QUESTION_BANK } from '../data/questions'
import { CUSTOM_COUNT_OPTIONS, type AllocationStrategy, type CustomCount, buildCustomPractice } from '../engine/customPractice'
import { useAppState } from '../state/AppState'
import type { SessionConfig } from './Session'

export function CustomPractice() {
  const navigate = useNavigate()
  const { progress } = useAppState()
  const [count, setCount] = useState<CustomCount>(25)
  const [strategy, setStrategy] = useState<AllocationStrategy>('blueprint')
  const [onlyUnseen, setOnlyUnseen] = useState(true)

  const start = () => {
    const attemptedIds = onlyUnseen ? new Set(Object.keys(progress.attemptsByQuestionId)) : undefined
    const built = buildCustomPractice(QUESTION_BANK, count, strategy, attemptedIds)
    const questions = built.questionIds
      .map((id) => QUESTION_BANK.find((q) => q.id === id))
      .filter((q): q is NonNullable<typeof q> => q !== undefined)

    const config: SessionConfig = {
      questions,
      mode: 'custom',
      timeLimitSeconds: null,
      scenarioIds: [],
    }
    navigate('/session', { state: config })
  }

  return (
    <div className="custom-practice">
      <h1>Custom Practice</h1>
      <p>Choose how many questions to practice and how they're spread across the 5 domains. Untimed.</p>

      <div className="custom-practice__count">
        <span>Number of questions:</span>
        {CUSTOM_COUNT_OPTIONS.map((opt) => (
          <button key={opt} type="button" className={count === opt ? 'active' : ''} onClick={() => setCount(opt)}>
            {opt}
          </button>
        ))}
      </div>

      <fieldset className="custom-practice__strategy">
        <legend>Domain allocation</legend>
        <label>
          <input
            type="radio"
            name="strategy"
            checked={strategy === 'blueprint'}
            onChange={() => setStrategy('blueprint')}
          />
          Same ratios as the official exam (27/18/20/20/15% by domain)
        </label>
        <label>
          <input type="radio" name="strategy" checked={strategy === 'equal'} onChange={() => setStrategy('equal')} />
          Equal split across all 5 domains
        </label>
      </fieldset>

      <label className="custom-practice__unseen-toggle">
        <input type="checkbox" checked={onlyUnseen} onChange={(e) => setOnlyUnseen(e.target.checked)} />
        Only show questions I haven't attempted yet
      </label>

      <button type="button" onClick={start}>
        Start Practice
      </button>
    </div>
  )
}
