import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DOMAINS } from '../data/domains'
import { QUESTION_BANK } from '../data/questions'
import { questionsByDomains, sampleQuestions } from '../engine/selectors'
import type { DomainId } from '../types/question'
import type { SessionConfig } from './Session'

const COUNT_OPTIONS = [10, 25, 50, 'all'] as const

export function DomainPractice() {
  const navigate = useNavigate()
  const [selectedDomains, setSelectedDomains] = useState<Set<DomainId>>(new Set())
  const [count, setCount] = useState<(typeof COUNT_OPTIONS)[number]>(25)

  const toggleDomain = (id: DomainId) => {
    setSelectedDomains((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const pool = questionsByDomains(QUESTION_BANK, [...selectedDomains])

  const start = () => {
    const questions = count === 'all' ? pool : sampleQuestions(pool, count)
    const config: SessionConfig = {
      questions,
      mode: 'domain',
      timeLimitSeconds: null,
      scenarioIds: [],
    }
    navigate('/session', { state: config })
  }

  return (
    <div className="domain-practice">
      <h1>Domain Practice</h1>
      <p>Pick one or more content domains to focus on. Untimed.</p>

      <ul className="domain-practice__list">
        {DOMAINS.map((domain) => (
          <li key={domain.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedDomains.has(domain.id)}
                onChange={() => toggleDomain(domain.id)}
              />
              {domain.name} ({Math.round(domain.weight * 100)}%)
            </label>
          </li>
        ))}
      </ul>

      <div className="domain-practice__count">
        <span>Question count:</span>
        {COUNT_OPTIONS.map((opt) => (
          <button
            key={opt}
            type="button"
            className={count === opt ? 'active' : ''}
            onClick={() => setCount(opt)}
          >
            {opt === 'all' ? 'All' : opt}
          </button>
        ))}
      </div>

      <p className="domain-practice__pool-size">{pool.length} questions available with current selection</p>

      <button type="button" disabled={pool.length === 0} onClick={start}>
        Start Practice
      </button>
    </div>
  )
}
