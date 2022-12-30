import { PatientAddress } from '@/infra/repos/postgres/entities'
import { DeletePatientAddress, SavePatientAddress } from '@/domain/contracts/repos'

import { PgRepository } from '@/infra/repos/postgres/repository'

type SaveInput = SavePatientAddress.Input
type SaveOutput = SavePatientAddress.Output
type DeleteInput = DeletePatientAddress.Input

export class PatientAddressRepository extends PgRepository implements SavePatientAddress {
  async save (input: SaveInput): Promise<SaveOutput> {
    return await this.getRepository(PatientAddress).save(input as any)
  }

  async delete ({ id }: DeleteInput): Promise<void> {
    await this.getRepository(PatientAddress).delete(id)
  }
}
