import { ApiCep } from '@/domain/contracts/gateways'
import { HttpGetClient } from './client'

export class ApiCepHandler implements ApiCep {
  constructor (
    private readonly url: string,
    private readonly axios: HttpGetClient
  ) {}

  async get ({ cep }: ApiCep.Input): Promise<ApiCep.Output> {
    const url = this.url.replace('_CEP', cep)
    return await this.axios.get({ url })
  }
}
