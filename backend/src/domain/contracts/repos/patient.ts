import { User, PatientAddress } from '.'

export type Patient = {
  id: number
  birthDate?: Date | string
  phone?: string
  observation?: string
  responsible?: string
  user?: User
  address?: PatientAddress
}

export interface ListPatient {
  get: () => Promise<ListPatient.Output>
}

export namespace ListPatient {
  export type Output = Patient[]
}

export interface ShowPatient {
  show: (input: ShowPatient.Input) => Promise<ShowPatient.Output>
}

export namespace ShowPatient {
  export type Input = { id: string }
  export type Output = Patient | undefined
}

export interface UpdatePatient {
  update: (input: UpdatePatient.Input) => Promise<UpdatePatient.Output>
}

export namespace UpdatePatient {
  export type Input = Omit<Patient, 'createdAt' | 'updatedAt' | 'id' | 'user'> & { id: string, user?: User }
  export type Output = Patient | undefined
}

export interface InsertPatient {
  insert: (input: InsertPatient.Input) => Promise<InsertPatient.Output>
}

export namespace InsertPatient {
  export type Input = {
    name: string
    email: string
    password: string
    admin?: boolean
    firstAccess?: Date | string
    lastAccess?: Date | string
    birthDate?: Date | string
    phone?: string
    observation?: string
    responsible?: string
    address?: PatientAddress
  }
  export type Output = Patient | undefined
}

export interface DeletePatient {
  delete: (input: DeletePatient.Input) => Promise<DeletePatient.Output>
}

export namespace DeletePatient {
  export type Input = { id: string }
  export type Output<T = any> = T
}

export interface InsertPatientDb {
  insert: (input: InsertPatientDb.Input) => Promise<ShowPatient.Output>
}

export namespace InsertPatientDb {
  export type Input = {
    birthDate?: Date | string
    phone?: string
    observation?: string
    responsible?: string
    address?: PatientAddress
  }
}
