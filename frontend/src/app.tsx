import { Dialog } from './components/ui/dialog'
import { CreateGoal } from './components/create-goal'
import { useEffect, useState } from 'react'
import { Summary } from './components/summary'
import { EmptyGoals } from './components/empty-goals'

type SummaryResponse = {
  completed: number
  total: number
  goalsPerDay: Record<
    string,
    {
      id: string
      title: string
      completedAt: string
    }[]
  >
}

export function App() {
  const [summary, setSummary] = useState<SummaryResponse | null>(null)

  useEffect(() => {
    fetch('http://localhost:3333/summary')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setSummary(data.summary)
      })
  }, [])

  return (
    <Dialog>
      {summary && summary.total > 0 ? <Summary /> : <EmptyGoals />}

      <pre>{JSON.stringify(summary, null, 2)}</pre>

      <CreateGoal />
    </Dialog>
  )
}
