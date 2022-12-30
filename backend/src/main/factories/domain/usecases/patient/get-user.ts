import { ListPatient, setupListPatient } from '@/domain/usecases/patient'
import { makePatientRepo } from '@/main/factories/infra/repos'

export const makeListPatient = (): ListPatient => {
  return setupListPatient(
    makePatientRepo()
  )
}
