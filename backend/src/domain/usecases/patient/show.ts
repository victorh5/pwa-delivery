import { ContentNotFound } from '@/application/errors'
import { ShowPatient as Show } from '@/domain/contracts/repos'

type Setup = (repo: Show) => ShowPatient
type Input = { id: string }
type Output = Show.Output

export type ShowPatient = (input: Input) => Promise<Output>

export const setupShowPatient: Setup = (repo) => async input => {
  const response = await repo.show(input)
  if (response !== undefined) return response
  throw new ContentNotFound('patient')
}
