import { useEffect, useState } from 'react'

// Free, no-signup hit counter (https://jasoncameron.dev/abacus/). Increments
// and returns the new total on every GET. Namespace/key are specific to this
// app to avoid colliding with anyone else's counter on the shared service.
const COUNTER_URL = 'https://abacus.jasoncameron.dev/hit/future-cca-ccarf/site-views'

export function PageViewCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(COUNTER_URL)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('counter service unavailable'))))
      .then((data: { value: number }) => {
        if (!cancelled) setCount(data.value)
      })
      .catch(() => {
        // Third-party counter is best-effort; hide silently if it's unreachable.
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (count === null) return null

  return (
    <span className="page-view-counter" title="Total page views since launch">
      {count.toLocaleString()} views
    </span>
  )
}
