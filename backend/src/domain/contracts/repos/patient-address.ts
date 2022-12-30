export type PatientAddress = {
  id: number
  name?: string
  cep?: string
  street?: string
  number?: number
  complement?: string
  city?: string
  state?: string
}

export interface SavePatientAddress {
  save: (input: SavePatientAddress.Input) => Promise<SavePatientAddress.Output>
}

export namespace SavePatientAddress {
  export type Input = Omit<PatientAddress, 'id'> & { id?: number | string}
  export type Output = PatientAddress | undefined
}

export interface DeletePatientAddress {
  delete: (input: DeletePatientAddress.Input) => Promise<DeletePatientAddress.Output>
}

export namespace DeletePatientAddress {
  export type Input = { id: string }
  export type Output<T = any> = T
}
