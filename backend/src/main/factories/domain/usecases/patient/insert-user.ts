import { InsertPatient, setupInsertPatient } from '@/domain/usecases/patient'
import { makeBcryptHandler } from '@/main/factories/infra/gateways'
import { makePatientAddressRepo, makePatientRepo, makeUserRepo } from '@/main/factories/infra/repos'
import { makeSendEmail } from '@/main/factories/domain/helpers'

export const makeInsertPatient = (): InsertPatient => {
  return setupInsertPatient(
    makePatientAddressRepo(),
    makePatientRepo(),
    makeUserRepo(),
    makeBcryptHandler(),
    makeSendEmail()
  )
}
