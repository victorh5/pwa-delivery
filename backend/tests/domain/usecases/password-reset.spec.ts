import { ResetPassword, setupResetPassword } from '@/domain/usecases'
import { Encrypter, ResetPassword as ResetPass } from '@/domain/contracts/gateways'
import { ShowUser, UpdateUser } from '@/domain/contracts/repos'
import { mock, MockProxy } from 'jest-mock-extended'
import { set, reset as reset1 } from 'mockdate'

describe('PasswordReset', () => {
  let sut: ResetPassword
  let encrypter: MockProxy<Encrypter>
  let user: MockProxy<ShowUser & UpdateUser>
  let reset: MockProxy<ResetPass>
  let data: { id: string, password: string }

  beforeAll(() => {
    set(new Date(2021, 9, 3, 10, 10, 10))
    data = { id: 'any_id', password: 'any_password' }
    reset = mock()
    encrypter = mock()
    user = mock()
    user.show.mockResolvedValue({
      id: 1,
      name: 'any_name',
      email: 'any_email',
      firstAccess: undefined,
      createdAt: '2022-03-29',
      updatedAt: '2022-03-29'
    })
    reset.resetPassword.mockResolvedValue()
    encrypter.encrypt.mockResolvedValue('hashed_password')
  })

  afterAll(() => reset1())

  beforeEach(() => {
    sut = setupResetPassword(reset, encrypter, user)
  })

  it('should call resetPassword with correct params', async () => {
    await sut(data)
    expect(reset.resetPassword).toHaveBeenCalledWith({ id: 'any_id', hashedPassword: 'hashed_password' })
    expect(reset.resetPassword).toHaveBeenCalledTimes(1)
  })

  it('should call encrypt with correct params', async () => {
    await sut(data)

    expect(encrypter.encrypt).toHaveBeenCalledWith(data.password)
    expect(encrypter.encrypt).toHaveBeenCalledTimes(1)
  })

  it('should call user.show with correct params', async () => {
    await sut(data)
    expect(user.show).toHaveBeenCalledWith({ id: 'any_id' })
    expect(user.show).toHaveBeenCalledTimes(1)
  })

  it('should call user.update with correct params', async () => {
    await sut(data)
    expect(user.update).toHaveBeenCalledWith({ id: 'any_id', firstAccess: new Date(2021, 9, 3, 10, 10, 10) })
    expect(user.update).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if save throws', async () => {
    reset.resetPassword.mockRejectedValueOnce(new Error('save_error'))
    const promise = sut(data)

    await expect(promise).rejects.toThrow(new Error('save_error'))
  })
})
