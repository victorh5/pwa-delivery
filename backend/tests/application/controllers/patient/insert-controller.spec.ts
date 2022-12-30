import { InsertPatientController } from '@/application/controllers/patient'
import {
  EmailConfirmationValidator,
  Required,
  RequiredString,
  UniqueValidator
} from '@/application/validation'
import { InsertPatient } from '@/domain/contracts/repos'
import { User } from '@/infra/repos/postgres/entities'

describe('InsertPatientController', () => {
  let sut: InsertPatientController
  let insertPatient: jest.Mock
  let data: InsertPatient.Input & { passwordConfirmation: string }

  beforeAll(() => {
    data = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
      passwordConfirmation: 'any_password',
      birthDate: 'any_birthDate',
      phone: 'any_phone',
      address: { id: 1 }
    }
    insertPatient = jest.fn()
    insertPatient.mockResolvedValue({ patient: 'any_patient' })
  })

  beforeEach(() => {
    sut = new InsertPatientController(insertPatient)
  })

  it('should build validators correctly', async () => {
    const validators = await sut.buildValidators(data)
    expect(validators).toEqual([
      new RequiredString('any_name', 'name'),
      new RequiredString('any_birthDate', 'birthDate'),
      new RequiredString('any_phone', 'phone'),
      new Required(data.address, 'address'),
      new RequiredString('any_email@email.com', 'email'),
      new EmailConfirmationValidator('any_email@email.com'),
      new UniqueValidator(User, 'any_email@email.com', 'email')
    ])
  })

  describe('after validated', () => {
    beforeEach(() => {
      jest.spyOn(sut, 'buildValidators').mockImplementationOnce(async () => [])
    })

    it('should call insertPatient with correct params', async () => {
      await sut.handle(data)
      expect(insertPatient).toHaveBeenCalledWith(data)
      expect(insertPatient).toHaveBeenCalledTimes(1)
    })

    it('should return 404 if insertPatient throws', async () => {
      insertPatient.mockRejectedValueOnce(new Error())
      const httpResponse = await sut.handle(data)

      expect(httpResponse).toEqual({
        statusCode: 400,
        data: new Error()
      })
    })

    it('should return 201 if insertPatient succeeds', async () => {
      insertPatient.mockResolvedValueOnce({ patient: 'any_patient' })
      const httpResponse = await sut.handle(data)

      expect(httpResponse).toEqual({
        statusCode: 201,
        data: { patient: 'any_patient' }

      })
    })
  })
})
