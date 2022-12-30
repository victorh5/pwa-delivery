import { InsertPatientController } from '@/application/controllers/patient'
import { makeInsertPatient } from '@/main/factories/domain/usecases/patient'

import { makeLogController } from '@/main/factories/application/decorators'
import { Controller } from '@/application/controllers'

export const makeInsertPatientController = (): Controller => {
  const controller = new InsertPatientController(makeInsertPatient())
  return makeLogController(controller)
}
