export interface ApiCep {
  get: (input: ApiCep.Input) => Promise<ApiCep.Output>
}

export namespace ApiCep {
  export type Input = { cep: string }
  export type Output = {
    cep: string
    tipoCep: string
    subTipoCep: string
    uf: string
    cidade: string
    bairro: string
    endereco: string
    complemento: string
    codigoIBGE: string
  }
}
