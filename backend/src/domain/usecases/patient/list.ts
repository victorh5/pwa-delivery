import { ListPatient as List } from '@/domain/contracts/repos'

type Setup = (repo: List) => ListPatient
type Output = List.Output

export type ListPatient = () => Promise<Output>

export const setupListPatient: Setup = (repo) => async () => await repo.get()
