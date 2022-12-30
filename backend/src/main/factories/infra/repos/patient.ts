import { PatientRepository } from '@/infra/repos/postgres'

export const makePatientRepo = (): PatientRepository => {
  return new PatientRepository()
}
