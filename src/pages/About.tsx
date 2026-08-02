import { Link } from 'react-router-dom'
import { QUESTION_BANK } from '../data/questions'

export function About() {
  const verifiedCount = QUESTION_BANK.filter((q) => q.verification.status === 'verified').length

  return (
    <div className="about">
      <h1>About this project</h1>
      <p>
        This is an unofficial, community-built practice resource for the <strong>Claude Certified
        Architect – Foundations (CCAR-F)</strong> exam. It is not produced, endorsed, or affiliated
        with Anthropic. All question content is original, written to exercise the domains, task
        statements, and scenarios published in Anthropic's official exam guide — no exam content
        was copied or reproduced from the guide itself.
      </p>

      <h2>Verification</h2>
      <p>
        Every question in this bank ({verifiedCount}/{QUESTION_BANK.length} currently verified) goes
        through a blind-verification pass before it ships: a reviewer (human, LLM-assisted, or both)
        answers the question without seeing the intended answer key, and any mismatch is resolved
        before the question is marked verified. See <code>docs/VERIFICATION.md</code> in the repo for
        the full process, and <code>docs/verification-log.md</code> for the per-question audit trail.
      </p>

      <h2>Scoring disclaimer</h2>
      <p>
        The "approximate scaled score" shown after practice exams is a simple linear estimate for
        practice purposes only. Anthropic's real scoring model is an unpublished scaled-scoring
        algorithm; this app's number should be used as a rough directional signal, not a prediction
        of your actual exam outcome.
      </p>

      <h2>Source</h2>
      <p>This project is open source under the MIT license. Contributions and corrections are welcome.</p>

      <Link to="/">Back to home</Link>
    </div>
  )
}
