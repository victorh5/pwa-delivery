import { ListPatient as List } from '@/domain/contracts/repos'
import { ListPatient, setupListPatient } from '@/domain/usecases/patient'
import { mock, MockProxy } from 'jest-mock-extended'

describe('List Patient', () => {
  let repo: MockProxy<List>
  let sut: ListPatient

  beforeAll(() => {
    repo = mock()
    repo.get.mockResolvedValue([])
  })

  beforeEach(() => {
    sut = setupListPatient(repo)
  })

  it('should call ListPatient with correct param', async () => {
    await sut()
    expect(repo.get).toHaveBeenCalledWith()
    expect(repo.get).toHaveBeenCalledTimes(1)
  })

  it('should return a list', async () => {
    const response = await sut()
    expect(response).toEqual([])
  })

  it('should return empty if repo is not found', async () => {
    repo.get.mockResolvedValueOnce([])
    const response = await sut()
    expect(response).toEqual([])
  })

  it('should rethrow if load throws', async () => {
    repo.get.mockRejectedValueOnce(new Error('list_error'))
    const promise = sut()
    await expect(promise).rejects.toThrow(new Error('list_error'))
  })
})
