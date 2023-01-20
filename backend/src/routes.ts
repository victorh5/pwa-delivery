import { FastifyInstance } from 'fastify'
import { UserInsert, UserInsertProfileImage } from './controllers/user'

const userInsertController = new UserInsert()
const userInsertProfileImage = new UserInsertProfileImage()

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', userInsertController.handle)
  app.put('/user-avatar/:id', userInsertProfileImage.handle)
}