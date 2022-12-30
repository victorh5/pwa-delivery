import { DeletePatient as Delete, ShowPatient as Show, DeletePatientAddress, DeleteUser } from '@/domain/contracts/repos'
import { DeletePatient, setupDeletePatient } from '@/domain/usecases/patient'
import { mock, MockProxy } from 'jest-mock-extended'

describe('Delete Patients', () => {
  let repo: MockProxy<Delete & Show>
  let addressRepo: MockProxy<DeletePatientAddress>
  let userRepo: MockProxy<DeleteUser>
  let sut: DeletePatient

  beforeAll(() => {
    repo = mock()
    addressRepo = mock()
    userRepo = mock()
  })

  beforeEach(() => {
    sut = setupDeletePatient(addressRepo, repo, userRepo)
  })

  it('should call DeletePatient with correct param', async () => {
    await sut({ id: 'any_id' })

    expect(repo.delete).toHaveBeenCalledWith({ id: 'any_id' })
    expect(repo.delete).toHaveBeenCalledTimes(1)
  })

  it('should return', async () => {
    const response = await sut({ id: 'any_id' })

    expect(response).toBeUndefined()
  })

  it('should rethrow if delete throws', async () => {
    repo.delete.mockRejectedValueOnce(new Error('delete_error'))
    const promise = sut({ id: 'any_id' })

    await expect(promise).rejects.toThrow(new Error('delete_error'))
  })
})
