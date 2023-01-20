import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import path from 'path'
import { appRoutes } from './routes'

const __dirname = path.resolve(path.dirname(''))

export const app = Fastify()
app.register(fastifyStatic, {
  root: path.join(__dirname, 'uploads'),
  prefix: '/uploads/'
})
app.register(cors)
app.register(multipart)
app.register(appRoutes)

app.listen({ port: 3333 })
  .then(() => console.log('Server is running'))