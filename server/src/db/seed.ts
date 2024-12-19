import { client, db } from '.'
import { goalCompletions, goals } from './schema'
import dayjs from 'dayjs'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      { title: 'Acordar cedo', desiredWeeklyFrequency: 5 },
      { title: 'Dormir cedo', desiredWeeklyFrequency: 5 },
      { title: 'Meditar', desiredWeeklyFrequency: 5 }
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')
  const endOfWeek = dayjs().endOf('week')

  await db.insert(goalCompletions).values([
    { goalId: result[0].id, createdAt: new Date() },
    { goalId: result[1].id, createdAt: startOfWeek.toDate() },
    { goalId: result[2].id, createdAt: startOfWeek.add(1, 'day').toDate() }
  ])
}

seed().finally(() => {
  client.end()
})