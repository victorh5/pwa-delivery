import { IBackup } from 'pg-mem'
import { getConnection, getRepository, Repository } from 'typeorm'
import { makeFakeDb } from '@/tests/infra/repos/postgres/mocks'
import { PatientAddressRepository } from '@/infra/repos/postgres'
import { Log, PatientAddress as Repo } from '@/infra/repos/postgres/entities'
import { PatientAddress } from '@/domain/contracts/repos'

describe('PatientAddressRepository', () => {
  let sut: PatientAddressRepository
  let PatientAddressRepo: Repository<Repo>
  let backup: IBackup

  const makeFakePatientAddress = (): PatientAddress => ({
    id: 1,
    name: 'any_name',
    cep: 'any_cep',
    street: 'any_street',
    number: 10,
    complement: 'any_complement',
    city: 'any_city',
    state: 'any_state'
  })

  beforeAll(async () => {
    const db = await makeFakeDb([Repo, Log])
    backup = db.backup()
    PatientAddressRepo = getRepository(Repo)
  })

  beforeEach(async () => {
    backup.restore()
    sut = new PatientAddressRepository()
    await PatientAddressRepo.save(makeFakePatientAddress() as any)
  })

  afterAll(async () => {
    await getConnection().close()
  })

  describe('Create', () => {
    it('should create an patient if id is undefined', async () => {
      await sut.save({
        name: 'any_name',
        cep: 'any_cep',
        street: 'any_street',
        number: 10,
        complement: 'any_complement',
        city: 'any_city',
        state: 'any_state'
      })
      const PatientAddress = await PatientAddressRepo.count()
      expect(PatientAddress).toBe(2)
    })
  })

  describe('Update', () => {
    it('should update an patient if id is defined', async () => {
      const patient = await sut.save({
        id: 1,
        name: 'bd_name',
        cep: 'bd_cep',
        street: 'bd_street',
        number: 10,
        complement: 'bd_complement',
        city: 'bd_city',
        state: 'bd_state'
      })
      expect(patient).toMatchObject({
        id: 1,
        name: 'bd_name',
        cep: 'bd_cep',
        street: 'bd_street',
        number: 10,
        complement: 'bd_complement',
        city: 'bd_city',
        state: 'bd_state'
      })
    })
  })
})
