import { Router } from 'express'
import { makeApiCepController } from '@/main/factories/application/controllers'
import { adaptExpressRoute as adapt } from '@/main/adapters'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.get('/api-cep/:cep', auth, adapt(makeApiCepController()))
}
