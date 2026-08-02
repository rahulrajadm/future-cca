import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DOMAINS } from '../data/domains'
import { QUESTION_BANK } from '../data/questions'
import { questionsByDomains, sampleQuestions, unattemptedQuestions } from '../engine/selectors'
import { useAppState } from '../state/AppState'
import type { DomainId } from '../types/question'
import type { SessionConfig } from './Session'

const COUNT_OPTIONS = [10, 25, 50, 'all'] as const

export function DomainPractice() {
  const navigate = useNavigate()
  const { progress } = useAppState()
  const [selectedDomains, setSelectedDomains] = useState<Set<DomainId>>(new Set())
  const [count, setCount] = useState<(typeof COUNT_OPTIONS)[number]>(25)
  const [onlyUnseen, setOnlyUnseen] = useState(true)

  const toggleDomain = (id: DomainId) => {
    setSelectedDomains((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const domainPool = questionsByDomains(QUESTION_BANK, [...selectedDomains])
  const pool = onlyUnseen ? unattemptedQuestions(domainPool, progress) : domainPool
  const seenCount = domainPool.length - pool.length

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

      <label className="domain-practice__unseen-toggle">
        <input type="checkbox" checked={onlyUnseen} onChange={(e) => setOnlyUnseen(e.target.checked)} />
        Only show questions I haven't attempted yet
      </label>

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

      <p className="domain-practice__pool-size">
        {pool.length} questions available with current selection
        {onlyUnseen && seenCount > 0 ? ` (${seenCount} already attempted, excluded)` : ''}
      </p>

      <button type="button" disabled={pool.length === 0} onClick={start}>
        Start Practice
      </button>
    </div>
  )
}
