import { UpdatePatientController } from '@/application/controllers/patient'
import { UpdatePatient } from '@/domain/contracts/repos'
import { BetweenValidator, EmailConfirmationValidator, PasswordConfirmationValidator, Required, RequiredString, UniqueValidator } from '@/application/validation'
import { User } from '@/infra/repos/postgres/entities'

describe('UpdatePatientController', () => {
  let sut: UpdatePatientController
  let updatePatient: jest.Mock
  let data: UpdatePatient.Input & { passwordConfirmation?: string }

  beforeAll(() => {
    data = {
      id: 'any_id',
      user: {
        id: 1,
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password'
      },
      passwordConfirmation: 'any_password'
    }
    updatePatient = jest.fn()
    updatePatient.mockResolvedValue({ patient: 'any_patient' })
  })

  beforeEach(() => {
    sut = new UpdatePatientController(updatePatient)
  })

  it('should build validators correctly', async () => {
    const validators = await sut.buildValidators(data)
    expect(validators).toEqual([

      new RequiredString('any_id', 'id'),
      new RequiredString('any_password', 'password'),
      new BetweenValidator('password', 'any_password', 8, 20),
      new PasswordConfirmationValidator('any_password', 'any_password'),
      new Required({ value: data.user!.email!, id: data.id }, 'email'),
      new EmailConfirmationValidator({ value: data.user!.email!, id: data.id }),
      new UniqueValidator(User, { value: data.user!.email!, id: data.id }, 'email')
    ])
  })

  describe('after validated', () => {
    beforeEach(() => {
      jest.spyOn(sut, 'buildValidators').mockImplementationOnce(async () => [])
    })

    it('should call updatePatient with correct params', async () => {
      await sut.handle(data)
      const { passwordConfirmation, ...update } = data
      expect(updatePatient).toHaveBeenCalledWith(update)
      expect(updatePatient).toHaveBeenCalledTimes(1)
    })

    it('should return 400 if  updatePatient throws', async () => {
      updatePatient.mockRejectedValueOnce(new Error())
      const httpResponse = await sut.handle(data)

      expect(httpResponse).toEqual({
        statusCode: 400,
        data: new Error()
      })
    })

    it('should return 200 if updatePatient succeeds', async () => {
      const httpResponse = await sut.handle(data)

      expect(httpResponse).toEqual({
        statusCode: 200,
        data: {
          patient: 'any_patient'
        }
      })
    })
  })
})
