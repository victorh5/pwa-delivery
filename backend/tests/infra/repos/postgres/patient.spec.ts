import { IBackup } from 'pg-mem'
import { getConnection, getRepository, Repository } from 'typeorm'
import { makeFakeDb } from '@/tests/infra/repos/postgres/mocks'
import { PatientRepository } from '@/infra/repos/postgres'
import { Log, Patient as Repo } from '@/infra/repos/postgres/entities'
import { Patient } from '@/domain/contracts/repos'

describe('PatientRepository', () => {
  let sut: PatientRepository
  let PatientRepo: Repository<Repo>
  let backup: IBackup

  const makeFakePatient = (): Patient => ({
    id: 1,
    phone: 'any_phone'
  })

  beforeAll(async () => {
    const db = await makeFakeDb([Repo, Log])
    backup = db.backup()
    PatientRepo = getRepository(Repo)
  })

  beforeEach(async () => {
    backup.restore()
    sut = new PatientRepository()
    await PatientRepo.save(makeFakePatient() as any)
  })

  afterAll(async () => {
    await getConnection().close()
  })

  describe('List', () => {
    it('should return patients', async () => {
      const account = await sut.get()
      expect(account).toHaveLength(1)
    })

    it('should return undefined if patients table are empty', async () => {
      backup.restore()
      const patients = await sut.get()
      expect(patients).toEqual([])
    })
  })

  describe('Show', () => {
    it('should return an patient if id exists', async () => {
      const patient = await sut.show({ id: '1' })
      expect(patient?.id).toBe(1)
    })

    it('should return undefined if patient does not exists on show', async () => {
      const patient = await sut.show({ id: '0' })
      expect(patient).toBeUndefined()
    })
  })
  describe('Delete', () => {
    it('should delete an patient if id exists', async () => {
      await sut.delete({ id: '1' })
      const patient = await sut.show({ id: '1' })
      expect(patient).toBeUndefined()
    })

    it('should return undefined if patient does not exists on delete function', async () => {
      const patient = await sut.delete({ id: '0' })
      expect(patient).toBeUndefined()
    })
  })

  describe('Create', () => {
    it('should create an patient if id is undefined', async () => {
      await sut.insert({
        phone: 'any_phone2'
      })
      const Patient = await PatientRepo.count()
      expect(Patient).toBe(2)
    })
  })

  describe('Update', () => {
    it('should update an patient if id is defined', async () => {
      const patient = await sut.update({ id: '1', phone: 'update_phone' })
      expect(patient).toMatchObject({ id: 1, phone: 'update_phone' })
    })
  })
})
