import { ShowPatient, setupShowPatient } from '@/domain/usecases/patient'
import { makePatientRepo } from '@/main/factories/infra/repos'

export const makeShowPatient = (): ShowPatient => {
  return setupShowPatient(
    makePatientRepo()
  )
}
