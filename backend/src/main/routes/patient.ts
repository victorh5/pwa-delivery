import { Router } from 'express'
import { adaptExpressRoute as adapt } from '@/main/adapters'
import { auth } from '@/main/middlewares'
import {
  makeUpdatePatientController,
  makeDeletePatientController,
  makeGetPatientController,
  makeShowPatientController,
  makeInsertPatientController
} from '@/main/factories/application/controllers/patient'

export default (router: Router): void => {
  router.get('/patients', auth, adapt(makeGetPatientController()))
  router.get('/patients/:id', auth, adapt(makeShowPatientController()))
  router.post('/patients', auth, adapt(makeInsertPatientController()))
  router.put('/patients/:id', auth, adapt(makeUpdatePatientController()))
  router.delete('/patients/:id', auth, adapt(makeDeletePatientController()))
}
