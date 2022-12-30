import { DeletePatientController } from '@/application/controllers/patient'
import { RequiredString } from '@/application/validation'
import { ShowPatient } from '@/domain/contracts/repos'

describe('DeletePatientController', () => {
  let sut: DeletePatientController
  let deletePatient: jest.Mock
  let data: ShowPatient.Input

  beforeAll(() => {
    data = { id: 'any_id' }
    deletePatient = jest.fn()
  })

  beforeEach(() => {
    sut = new DeletePatientController(deletePatient)
  })

  it('should build validators correctly', async () => {
    const validators = await sut.buildValidators(data)
    expect(validators).toEqual([
      new RequiredString('any_id', 'id')
    ])
  })

  it('should call deletePatient with correct params', async () => {
    await sut.handle(data)

    expect(deletePatient).toHaveBeenCalledWith(data)
    expect(deletePatient).toHaveBeenCalledTimes(1)
  })

  it('should return 400 if deleteuser throws', async () => {
    deletePatient.mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(data)

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error()
    })
  })

  it('should return 200 if deletePatient succeeds', async () => {
    const httpResponse = await sut.handle(data)

    expect(httpResponse).toEqual({
      statusCode: 204,
      data: ''
    })
  })
})
