import { Encrypter, ResetPassword as ResetPass } from '@/domain/contracts/gateways'
import { ShowUser, UpdateUser } from '@/domain/contracts/repos'
type Setup = (resetPassRepo: ResetPass, encrypter: Encrypter, userRepo: ShowUser & UpdateUser) => ResetPassword
type Input = { id: string, password: string }

export type ResetPassword = (input: Input) => Promise<void>

export const setupResetPassword: Setup = (resetPassRepo, encrypter, userRepo) => async ({ id, password }) => {
  const hashedPassword = await encrypter.encrypt(password)
  const user = await userRepo.show({ id })
  if (user?.firstAccess === null || user?.firstAccess === undefined) await userRepo.update({ id, firstAccess: new Date() })
  await resetPassRepo.resetPassword({ id, hashedPassword })
}
