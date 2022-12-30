import { ContentNotFound } from '@/application/errors'
import { Encrypter } from '@/domain/contracts/gateways'
import { InsertPatient as Save, InsertUser, SavePatientAddress } from '@/domain/contracts/repos'
import { SendEmail } from '@/domain/helpers'
import { InsertPatient, setupInsertPatient } from '@/domain/usecases/patient'
import { mock, MockProxy } from 'jest-mock-extended'

describe('Insert Patients', () => {
  let addressRepo: MockProxy<SavePatientAddress>
  let userRepo: MockProxy<InsertUser>
  let patientRepo: MockProxy<Save>
  let sendEmail: MockProxy<SendEmail>
  let encrypter: MockProxy<Encrypter>
  let sut: InsertPatient
  let data: Save.Input

  const makeFakeUser = (): InsertUser.Output => ({
    id: 1,
    name: 'bd_name',
    email: 'bd_email',
    createdAt: 'bd_createdAt',
    updatedAt: 'bd_updatedAt'
  })

  const makeFakeAddress = (): SavePatientAddress.Output => ({ id: 1, name: 'bd_name' })

  const makeFakePatient = (): Save.Output => ({
    id: 1,
    user: makeFakeUser(),
    address: makeFakeAddress()
  })

  beforeAll(() => {
    addressRepo = mock()
    userRepo = mock()
    patientRepo = mock()
    encrypter = mock()
    sendEmail = jest.fn()
    addressRepo.save.mockResolvedValue(makeFakeAddress())
    userRepo.insert.mockResolvedValue(makeFakeUser())
    patientRepo.insert.mockResolvedValue(makeFakePatient())
    encrypter.encrypt.mockResolvedValue('hashed_password')
    data = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      address: { id: 1 },
      observation: 'any_observation'
    }
  })

  beforeEach(() => {
    sut = setupInsertPatient(addressRepo, patientRepo, userRepo, encrypter, sendEmail)
  })

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
    expect(encrypter.encrypt).toHaveBeenCalled()
    expect(encrypter.encrypt).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if encrypter.encrypt throws', async () => {
    encrypter.encrypt.mockRejectedValueOnce(new Error('save_error'))
    const promise = sut(data)
    await expect(promise).rejects.toThrow(new Error('save_error'))
  })

  it('should call userRepo.insert with correct params', async () => {
    await sut(data)
    expect(userRepo.insert).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'hashed_password'
    })
    expect(userRepo.insert).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if userRepo.insert throws', async () => {
    userRepo.insert.mockRejectedValueOnce(new Error('save_error'))
    const promise = sut(data)
    await expect(promise).rejects.toThrow(new Error('save_error'))
  })

  it('should throw if userRepo.insert return undefined', async () => {
    userRepo.insert.mockResolvedValueOnce(undefined as any)
    const promise = sut(data)
    await expect(promise).rejects.toThrow(new ContentNotFound('patient'))
  })

  it('should call patientRepo.insert with correct params when have address', async () => {
    await sut(data)
    expect(patientRepo.insert).toHaveBeenCalledWith({
      observation: 'any_observation',
      birthDate: undefined,
      phone: undefined,
      responsible: undefined,
      user: makeFakeUser(),
      address: makeFakeAddress()
    })
    expect(patientRepo.insert).toHaveBeenCalledTimes(1)
  })

  it('should call patientRepo.insert with correct params when not have address', async () => {
    addressRepo.save.mockResolvedValueOnce(undefined as any)
    await sut(data)
    expect(patientRepo.insert).toHaveBeenCalledWith({
      observation: 'any_observation',
      birthDate: undefined,
      phone: undefined,
      responsible: undefined,
      user: makeFakeUser(),
      address: undefined
    })
    expect(patientRepo.insert).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if patientRepo.insert throws', async () => {
    patientRepo.insert.mockRejectedValueOnce(new Error('save_error'))
    const promise = sut(data)
    await expect(promise).rejects.toThrow(new Error('save_error'))
  })

  it('should throw if userRepo.insert return undefined', async () => {
    patientRepo.insert.mockResolvedValueOnce(undefined as any)
    const promise = sut(data)
    await expect(promise).rejects.toThrow(new ContentNotFound('patient'))
  })
})
