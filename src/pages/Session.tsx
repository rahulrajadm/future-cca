import { useCallback, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { QuestionCard } from '../components/QuestionCard'
import { Timer } from '../components/Timer'
import { buildScoreReport, gradeSession } from '../engine/scoring'
import { recordAnswer, recordExamAttempt, toggleFlag } from '../state/progressStore'
import { useAppState } from '../state/AppState'
import { loadSettings } from '../state/settingsStore'
import type { PracticeMode } from '../types/exam'
import type { Question, ScenarioId } from '../types/question'

export interface SessionConfig {
  questions: Question[]
  mode: PracticeMode
  timeLimitSeconds: number | null
  scenarioIds: ScenarioId[]
}

export function Session() {
  const location = useLocation()
  const navigate = useNavigate()
  const { progress, setProgress } = useAppState()
  const config = location.state as SessionConfig | null

  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [flagged, setFlagged] = useState<Set<string>>(new Set())
  const settings = useMemo(() => loadSettings(), [])

  const finish = useCallback(
    (questions: Question[], finalAnswers: Record<string, string[]>, mode: PracticeMode, scenarioIds: ScenarioId[]) => {
      const graded = gradeSession(questions, finalAnswers)
      const sessionId = `sess-${Date.now()}`
      const report = buildScoreReport(sessionId, graded)

      setProgress((prev) => {
        let next = prev
        for (const item of graded) {
          next = recordAnswer(next, item.question.id, item.isCorrect)
        }
        if (mode === 'exam') {
          next = recordExamAttempt(next, {
            sessionId,
            mode,
            completedAt: report.generatedAt,
            scenarioIds,
            percentCorrect: report.percentCorrect,
            scaledScoreApprox: report.scaledScoreApprox,
            passedApprox: report.passedApprox,
            domainBreakdown: report.domainBreakdown,
          })
        }
        return next
      })

      navigate('/results', { state: { report, graded } })
    },
    [navigate, setProgress],
  )

  if (!config || config.questions.length === 0) {
    return (
      <div className="session-empty">
        <p>No active session. Start one from the home page.</p>
        <button type="button" onClick={() => navigate('/')}>
          Back to home
        </button>
      </div>
    )
  }

  const { questions, mode, timeLimitSeconds, scenarioIds } = config
  const question = questions[index]
  const selectedOptionIds = answers[question.id] ?? []
  const isLast = index === questions.length - 1
  const answeredCount = Object.keys(answers).length

  const toggleOption = (optionId: string) => {
    setAnswers((prev) => {
      const current = prev[question.id] ?? []
      if (question.selectCount === 1) {
        return { ...prev, [question.id]: [optionId] }
      }
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId]
      return { ...prev, [question.id]: next }
    })
  }

  const onToggleFlag = () => {
    setFlagged((prev) => {
      const next = new Set(prev)
      if (next.has(question.id)) next.delete(question.id)
      else next.add(question.id)
      return next
    })
    setProgress((prev) => toggleFlag(prev, question.id))
  }

  const showFeedback = settings.immediateFeedback && mode !== 'exam' && selectedOptionIds.length > 0

  return (
    <div className="session">
      <div className="session__topbar">
        <span className="session__mode">{mode.toUpperCase()}</span>
        <span>{answeredCount}/{questions.length} answered</span>
        {timeLimitSeconds !== null && (
          <Timer
            totalSeconds={timeLimitSeconds}
            onExpire={() => finish(questions, answers, mode, scenarioIds)}
          />
        )}
      </div>

      <QuestionCard
        question={question}
        index={index}
        total={questions.length}
        selectedOptionIds={selectedOptionIds}
        onToggleOption={toggleOption}
        showFeedback={showFeedback}
        isFlagged={flagged.has(question.id)}
        onToggleFlag={onToggleFlag}
      />

      <div className="session__nav">
        <button type="button" disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>
          Previous
        </button>
        {isLast ? (
          <button type="button" className="session__submit" onClick={() => finish(questions, answers, mode, scenarioIds)}>
            Submit
          </button>
        ) : (
          <button type="button" onClick={() => setIndex((i) => i + 1)}>
            Next
          </button>
        )}
      </div>

      {progress.flagged.length > 0 && mode === 'exam' && (
        <p className="session__flag-count">{flagged.size} flagged in this session</p>
      )}
    </div>
  )
}
