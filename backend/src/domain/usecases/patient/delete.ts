import { DeletePatient as Delete, ShowPatient as Show, DeletePatientAddress, DeleteUser } from '@/domain/contracts/repos'

type Setup = (addressrepo: DeletePatientAddress, repo: Show & Delete, userRepo: DeleteUser,) => DeletePatient
type Input = { id: string }

export type DeletePatient = (input: Input) => Promise<void>

export const setupDeletePatient: Setup = (addressrepo, repo, userRepo) => async input => {
  const old = await repo.show(input)
  await repo.delete(input)
  if (old?.user !== undefined) await userRepo.delete({ id: old.user.id.toString() })
  if (old?.address !== undefined) await addressrepo.delete({ id: old.address.id.toString() })
}
