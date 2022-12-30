import { ResetPasswordController } from '@/application/controllers'
import { BetweenValidator, ExistConfirmationValidator, PasswordConfirmationValidator, RequiredString } from '@/application/validation'
import { User } from '@/infra/repos/postgres/entities'

describe('ResetPasswordController', () => {
  let sut: ResetPasswordController
  let resetPass: jest.Mock
  let data: { id: string, password: string, passwordConfirmation: string }

  beforeAll(() => {
    data = { id: 'any_id', password: 'any_password', passwordConfirmation: 'any_password' }
    resetPass = jest.fn()
    resetPass.mockResolvedValue({ user: 'any_user' })
  })

  beforeEach(() => {
    sut = new ResetPasswordController(resetPass)
  })

  it('should build validators correctly', async () => {
    const validators = await sut.buildValidators(data)
    expect(validators).toEqual([
      new RequiredString('any_id', 'id'),
      new ExistConfirmationValidator(User, data.id, 'id'),
      new RequiredString('any_password', 'password'),
      new BetweenValidator('password', 'any_password', 8, 20),
      new PasswordConfirmationValidator('any_password', 'any_password')
    ])
  })

  it('should call resetPass with correct params', async () => {
    await sut.perform(data)

    expect(resetPass).toHaveBeenCalledWith(data)
    expect(resetPass).toHaveBeenCalledTimes(1)
  })

  it('should return 404 if no resetPass throws', async () => {
    resetPass.mockRejectedValueOnce(new Error())
    const httpResponse = await sut.perform(data)

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error()
    })
  })

  it('should return 200 if resetPass succeeds', async () => {
    const httpResponse = await sut.perform(data)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        message: 'password reseted with success'
      }
    })
  })
})
