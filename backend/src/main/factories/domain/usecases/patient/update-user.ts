import { UpdatePatient, setupUpdatePatient } from '@/domain/usecases/patient'
import { makeBcryptHandler } from '@/main/factories/infra/gateways'
import { makePatientAddressRepo, makeUserRepo, makePatientRepo } from '@/main/factories/infra/repos'

export const makeUpdatePatient = (): UpdatePatient => {
  return setupUpdatePatient(
    makePatientAddressRepo(),
    makePatientRepo(),
    makeUserRepo(),
    makeBcryptHandler()
  )
}
