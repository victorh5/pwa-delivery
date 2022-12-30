import { ApiCep } from '@/domain/contracts/gateways'

type Setup = (api: ApiCep) => GetAddressInformation
type Input = ApiCep.Input
type Output = ApiCep.Output

export type GetAddressInformation = (input: Input) => Promise<Output>

export const setupGetAddressInformation: Setup = (api) => async ({ cep }) => await api.get({ cep })
