import { ContentNotFound } from '@/application/errors'
import { ShowPatient as Show } from '@/domain/contracts/repos'
import { ShowPatient, setupShowPatient } from '@/domain/usecases/patient'
import { mock, MockProxy } from 'jest-mock-extended'

describe('Show Patients', () => {
  let repo: MockProxy<Show>
  let sut: ShowPatient

  beforeAll(() => {
    repo = mock()
    repo.show.mockResolvedValue({
      id: 1,
      name: 'any_name',
      email: 'any_email',
      createdAt: '2022-03-29',
      updatedAt: '2022-03-29'
    })
  })

  beforeEach(() => {
    sut = setupShowPatient(repo)
  })

  it('should return a repo', async () => {
    const response = await sut({ id: 'any_id' })

    expect(response).toEqual({
      id: 1,
      name: 'any_name',
      email: 'any_email',
      createdAt: '2022-03-29',
      updatedAt: '2022-03-29'
    })
  })

  it('should call ListPatients with correct param', async () => {
    await sut({ id: 'any_id' })

    expect(repo.show).toHaveBeenCalledWith({ id: 'any_id' })
    expect(repo.show).toHaveBeenCalledTimes(1)
  })

  it('should throws if show returns undefined', async () => {
    repo.show.mockResolvedValueOnce(undefined)
    const promise = sut({ id: 'any_id' })
    await expect(promise).rejects.toThrow(new ContentNotFound('patient'))
  })

  it('should rethrow if show throws', async () => {
    repo.show.mockRejectedValueOnce(new Error('show_error'))
    const promise = sut({ id: 'any_id' })

    await expect(promise).rejects.toThrow(new Error('show_error'))
  })
})
