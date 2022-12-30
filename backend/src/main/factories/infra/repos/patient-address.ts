import { PatientAddressRepository } from '@/infra/repos/postgres'

export const makePatientAddressRepo = (): PatientAddressRepository => {
  return new PatientAddressRepository()
}
