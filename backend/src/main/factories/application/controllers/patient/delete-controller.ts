import { DeletePatientController } from '@/application/controllers/patient'
import { makeDeletePatient } from '@/main/factories/domain/usecases/patient'

import { makeLogController } from '@/main/factories/application/decorators'
import { Controller } from '@/application/controllers'

export const makeDeletePatientController = (): Controller => {
  const controller = new DeletePatientController(makeDeletePatient())
  return makeLogController(controller)
}
