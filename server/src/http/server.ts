import fastify from 'fastify'
import { CreateGoal } from '../functions/create-goal'
import z from 'zod'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider
} from 'fastify-type-provider-zod'

const app = fastify().withTypeProvider<ZodTypeProvider>()

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.post(
  '/goals',
  {
    schema: {
      body: z.object({
        title: z.string(),
        desiredWeeklyFrequency: z.number().int().min(1).max(7)
      })
    }
  },
  async request => {
    const { title, desiredWeeklyFrequency } = request.body

    await CreateGoal({
      title,
      desiredWeeklyFrequency
    })
  }
)

app
  .listen({
    port: 3333
  })
  .then(() => {
    console.log('HTTP Server running!')
  })
