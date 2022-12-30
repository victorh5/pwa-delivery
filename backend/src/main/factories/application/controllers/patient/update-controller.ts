import { UpdatePatientController } from '@/application/controllers/patient'
import { makeUpdatePatient } from '@/main/factories/domain/usecases/patient'

import { makeLogController } from '@/main/factories/application/decorators'
import { Controller } from '@/application/controllers'

export const makeUpdatePatientController = (): Controller => {
  const controller = new UpdatePatientController(makeUpdatePatient())
  return makeLogController(controller)
}
