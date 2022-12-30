import { ShowPatientController } from '@/application/controllers/patient'
import { makeShowPatient } from '@/main/factories/domain/usecases/patient'

import { makeLogController } from '@/main/factories/application/decorators'
import { Controller } from '@/application/controllers'

export const makeShowPatientController = (): Controller => {
  const controller = new ShowPatientController(makeShowPatient())
  return makeLogController(controller)
}
