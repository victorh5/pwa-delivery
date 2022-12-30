import { Patient } from '@/infra/repos/postgres/entities'
import {
  DeletePatient,
  ListPatient,
  UpdatePatient,
  ShowPatient,
  InsertPatient,
  InsertPatientDb
} from '@/domain/contracts/repos'

import { PgRepository } from '@/infra/repos/postgres/repository'

type GetOutput = ListPatient.Output
type ShowInput = ShowPatient.Input
type ShowOutput = ShowPatient.Output
type InsertInput = InsertPatientDb.Input
type UpdateInput = UpdatePatient.Input
type UpdateOutput = UpdatePatient.Output
type DeleteInput = DeletePatient.Input
type DeleteOutput = DeletePatient.Output

export class PatientRepository extends PgRepository implements ListPatient, ShowPatient, UpdatePatient, DeletePatient, InsertPatient {
  async get (): Promise<GetOutput> {
    return await this.getRepository(Patient).find({ order: { id: 'ASC' }, relations: ['user', 'address'] }) as any
  }

  async show ({ id }: ShowInput): Promise<ShowOutput> {
    return await this.getRepository(Patient).findOne(id, { relations: ['user', 'address'] })
  }

  async insert (input: InsertInput): Promise<ShowOutput> {
    const { id } = await this.getRepository(Patient).save(input)
    return this.show({ id: id.toString() })
  }

  async update ({ id, ...data }: UpdateInput): Promise<UpdateOutput> {
    await this.getRepository(Patient).save(Object.assign({}, data, { id: parseInt(id) }))
    return this.show({ id })
  }

  async delete ({ id }: DeleteInput): Promise<DeleteOutput> {
    await this.getRepository(Patient).delete(id)
  }
}
