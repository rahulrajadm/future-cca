import type { Question } from '../types/question'

interface QuestionCardProps {
  question: Question
  index: number
  total: number
  selectedOptionIds: string[]
  onToggleOption: (optionId: string) => void
  showFeedback: boolean
  isFlagged: boolean
  onToggleFlag: () => void
}

export function QuestionCard({
  question,
  index,
  total,
  selectedOptionIds,
  onToggleOption,
  showFeedback,
  isFlagged,
  onToggleFlag,
}: QuestionCardProps) {
  const inputType = question.selectCount > 1 ? 'checkbox' : 'radio'
  const correctSet = new Set(question.correctOptionIds)

  return (
    <div className="question-card">
      <div className="question-card__header">
        <span className="question-card__progress">
          Question {index + 1} of {total}
        </span>
        <button
          type="button"
          className={`flag-button${isFlagged ? ' flag-button--active' : ''}`}
          onClick={onToggleFlag}
        >
          {isFlagged ? '★ Flagged' : '☆ Flag for review'}
        </button>
      </div>

      <p className="question-card__stem">{question.stem}</p>
      {question.selectCount > 1 && (
        <p className="question-card__hint">Select exactly {question.selectCount} answers.</p>
      )}

      <ul className="question-card__options">
        {question.options.map((option) => {
          const selected = selectedOptionIds.includes(option.id)
          const isCorrectOption = correctSet.has(option.id)
          let stateClass = ''
          if (showFeedback) {
            if (isCorrectOption) stateClass = 'option--correct'
            else if (selected) stateClass = 'option--incorrect'
          } else if (selected) {
            stateClass = 'option--selected'
          }

          return (
            <li key={option.id} className={`question-card__option ${stateClass}`}>
              <label>
                <input
                  type={inputType}
                  name={`question-${question.id}`}
                  checked={selected}
                  disabled={showFeedback}
                  onChange={() => onToggleOption(option.id)}
                />
                <span className="option__id">{option.id}.</span>
                <span className="option__text">{option.text}</span>
              </label>
              {showFeedback && <p className="option__rationale">{option.rationale}</p>}
            </li>
          )
        })}
      </ul>

      {showFeedback && (
        <div className="question-card__explanation">
          <h4>Explanation</h4>
          <p>{question.explanationSummary}</p>
        </div>
      )}
    </div>
  )
}
