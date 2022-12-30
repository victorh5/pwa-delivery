import { ShowPatientController } from '@/application/controllers/patient'
import { ContentNotFound } from '@/application/errors'
import { RequiredString } from '@/application/validation'
import { ShowPatient } from '@/domain/contracts/repos'
import { AuthenticationError } from '@/domain/entities/errors'

describe('ShowPatientController', () => {
  let sut: ShowPatientController
  let listPatient: jest.Mock
  let data: ShowPatient.Input

  beforeAll(() => {
    data = { id: 'any_id' }
    listPatient = jest.fn()
    listPatient.mockResolvedValue({ patient: 'any_patient' })
  })

  beforeEach(() => {
    sut = new ShowPatientController(listPatient)
  })

  it('should build validators correctly', async () => {
    const validators = await sut.buildValidators(data)
    expect(validators).toEqual([
      new RequiredString('any_id', 'id')
    ])
  })

  it('should call ListPatient with correct params', async () => {
    await sut.handle(data)

    expect(listPatient).toHaveBeenCalledWith(data)
    expect(listPatient).toHaveBeenCalledTimes(1)
  })

  it('should return 404 if no patient are not found', async () => {
    listPatient.mockRejectedValueOnce(new AuthenticationError())
    const httpResponse = await sut.handle(data)

    expect(httpResponse).toEqual({
      statusCode: 404,
      data: new ContentNotFound('patient')
    })
  })

  it('should return 200 if listPatient succeeds', async () => {
    const httpResponse = await sut.handle(data)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        patient: 'any_patient'
      }
    })
  })
})
