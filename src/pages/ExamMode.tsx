import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SCENARIO_MAP } from '../data/scenarios'
import { QUESTION_BANK } from '../data/questions'
import { EXAM_TIME_LIMIT_SECONDS, buildExam } from '../engine/examBuilder'
import { loadSettings, saveSettings } from '../state/settingsStore'
import type { SessionConfig } from './Session'

export function ExamMode() {
  const navigate = useNavigate()
  const [timed, setTimed] = useState(() => loadSettings().timedExam)

  const start = () => {
    const built = buildExam(QUESTION_BANK)
    saveSettings({ ...loadSettings(), timedExam: timed })
    const questions = built.questionIds
      .map((id) => QUESTION_BANK.find((q) => q.id === id))
      .filter((q): q is NonNullable<typeof q> => q !== undefined)

    const config: SessionConfig = {
      questions,
      mode: 'exam',
      timeLimitSeconds: timed ? EXAM_TIME_LIMIT_SECONDS : null,
      scenarioIds: built.scenarioIds,
    }
    navigate('/session', { state: config })
  }

  return (
    <div className="exam-mode">
      <h1>Full Simulated Exam</h1>
      <p>
        Mirrors the real CCAR-F exam structure: 4 of the 6 official scenarios are drawn at random,
        and 60 items are selected across the 5 content domains proportional to their blueprint
        weights.
      </p>
      <label className="exam-mode__timer-toggle">
        <input type="checkbox" checked={timed} onChange={(e) => setTimed(e.target.checked)} />
        120-minute timer (auto-submits on expiry)
      </label>
      <button type="button" className="exam-mode__start" onClick={start}>
        Start Exam
      </button>
      <p className="exam-mode__scenario-list">
        Scenarios in rotation: {Object.values(SCENARIO_MAP).map((s) => s.title).join(', ')}
      </p>
    </div>
  )
}
