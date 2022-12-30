import { DeletePatient, setupDeletePatient } from '@/domain/usecases/patient'
import { makePatientAddressRepo, makePatientRepo, makeUserRepo } from '@/main/factories/infra/repos'

export const makeDeletePatient = (): DeletePatient => {
  return setupDeletePatient(
    makePatientAddressRepo(),
    makePatientRepo(),
    makeUserRepo()
  )
}
