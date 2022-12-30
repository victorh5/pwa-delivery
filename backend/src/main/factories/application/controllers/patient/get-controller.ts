import { GetPatientController } from '@/application/controllers/patient'
import { makeListPatient } from '@/main/factories/domain/usecases/patient'

import { makeLogController } from '@/main/factories/application/decorators'
import { Controller } from '@/application/controllers'

export const makeGetPatientController = (): Controller => {
  const controller = new GetPatientController(makeListPatient())
  return makeLogController(controller)
}
