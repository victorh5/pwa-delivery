import { ContentNotFound } from '@/application/errors'
import { Encrypter } from '@/domain/contracts/gateways'
import { UpdatePatient as Save, UpdateUser, SavePatientAddress } from '@/domain/contracts/repos'
import { UpdatePatient, setupUpdatePatient } from '@/domain/usecases/patient'
import { mock, MockProxy } from 'jest-mock-extended'
import { set, reset } from 'mockdate'

describe('Insert Patients', () => {
  let addressRepo: MockProxy<SavePatientAddress>
  let userRepo: MockProxy<UpdateUser>
  let patientRepo: MockProxy<Save>
  let encrypter: MockProxy<Encrypter>
  let sut: UpdatePatient
  let data: Save.Input

  const makeFakeUser = (): UpdateUser.Output => ({
    id: 1,
    name: 'bd_name',
    email: 'bd_email',
    createdAt: 'bd_createdAt',
    updatedAt: 'bd_updatedAt'
  })

  const makeFakeAddress = (): SavePatientAddress.Output => ({ id: 1, name: 'bd_name' })

  const makeFakePatient = (): Save.Output => ({
    id: 1,
    user: makeFakeUser()!,
    address: makeFakeAddress()
  })

  beforeAll(() => {
    set(new Date(2021, 9, 3, 10, 10, 10))
    addressRepo = mock()
    userRepo = mock()
    patientRepo = mock()
    encrypter = mock()
    addressRepo.save.mockResolvedValue(makeFakeAddress())
    userRepo.update.mockResolvedValue(makeFakeUser())
    patientRepo.update.mockResolvedValue(makeFakePatient())
    encrypter.encrypt.mockResolvedValue('hashed_password')
  })

  beforeEach(() => {
    data = {
      id: '1',
      user: { id: 1 as any, name: 'any_name', password: 'any_password' },
      address: { id: 1 },
      observation: 'any_observation'
    }
    sut = setupUpdatePatient(addressRepo, patientRepo, userRepo, encrypter)
  })

  afterAll(() => reset())

  it('should call addressRepo.save with correct params', async () => {
    await sut(data)
    expect(addressRepo.save).toHaveBeenCalledWith({ id: 1 })
    expect(addressRepo.save).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if addressRepo.save throws', async () => {
    addressRepo.save.mockRejectedValueOnce(new Error('save_error'))
    const promise = sut(data)
    await expect(promise).rejects.toThrow(new Error('save_error'))
  })

  it('should call encrypter.encrypt with correct params', async () => {
    await sut(data)
    expect(encrypter.encrypt).toHaveBeenCalledWith('any_password')
    expect(encrypter.encrypt).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if encrypter.encrypt throws', async () => {
    encrypter.encrypt.mockRejectedValueOnce(new Error('save_error'))
    const promise = sut(data)
    await expect(promise).rejects.toThrow(new Error('save_error'))
  })

  it('should call patientRepo.update with correct params', async () => {
    await sut(data)
    expect(userRepo.update).toHaveBeenCalledWith({
      id: 1,
      name: 'any_name',
      password: 'hashed_password',
      firstAccess: new Date(2021, 9, 3, 10, 10, 10)

    })
    expect(userRepo.update).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if userRepo.update throws', async () => {
    userRepo.update.mockRejectedValueOnce(new Error('save_error'))
    const promise = sut(data)
    await expect(promise).rejects.toThrow(new Error('save_error'))
  })

  it('should throw if userRepo.update return undefined', async () => {
    userRepo.update.mockResolvedValueOnce(undefined as any)
    const promise = sut(data)
    await expect(promise).rejects.toThrow(new ContentNotFound('patient'))
  })

  it('should call patientRepo.update with correct params when have address', async () => {
    await sut(data)
    expect(patientRepo.update).toHaveBeenCalledWith({
      id: 1,
      observation: 'any_observation',
      birthDate: undefined,
      phone: undefined,
      responsible: undefined,
      user: makeFakeUser(),
      address: makeFakeAddress()
    })
    expect(patientRepo.update).toHaveBeenCalledTimes(1)
  })

  it('should call patientRepo.update with correct params when not have address', async () => {
    addressRepo.save.mockResolvedValueOnce(undefined as any)
    await sut(data)
    expect(patientRepo.update).toHaveBeenCalledWith({
      id: 1,
      observation: 'any_observation',
      birthDate: undefined,
      phone: undefined,
      responsible: undefined,
      user: makeFakeUser(),
      address: undefined
    })
    expect(patientRepo.update).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if patientRepo.update throws', async () => {
    patientRepo.update.mockRejectedValueOnce(new Error('save_error'))
    const promise = sut(data)
    await expect(promise).rejects.toThrow(new Error('save_error'))
  })

  it('should throw if userRepo.update return undefined', async () => {
    patientRepo.update.mockResolvedValueOnce(undefined as any)
    const promise = sut(data)
    await expect(promise).rejects.toThrow(new ContentNotFound('patient'))
  })
})
