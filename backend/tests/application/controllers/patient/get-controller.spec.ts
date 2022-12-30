import { GetPatientController } from '@/application/controllers/patient'

describe('GetPatientController', () => {
  let sut: GetPatientController
  let getPatient: jest.Mock

  beforeAll(() => {
    getPatient = jest.fn()
    getPatient.mockResolvedValue({ data: 'any_value' })
  })

  beforeEach(() => {
    sut = new GetPatientController(getPatient)
  })

  it('should call ListPatients with correct params', async () => {
    await sut.perform()

    expect(getPatient).toHaveBeenCalledWith()
    expect(getPatient).toHaveBeenCalledTimes(1)
  })

  it('should return 200 if ListPatients succeeds', async () => {
    const httpResponse = await sut.perform()

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        data: 'any_value'
      }
    })
  })

  it('should return 400 if getBannerHome throws', async () => {
    getPatient.mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error()
    })
  })
})
