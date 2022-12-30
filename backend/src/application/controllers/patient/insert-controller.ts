import { ValidationBuilder as builder, Validator } from '@/application/validation'
import { HttpResponse, badRequest, created } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { InsertPatient } from '@/domain/usecases/patient'

import { InsertPatient as Save, Patient as IPatient } from '@/domain/contracts/repos'
import { User } from '@/infra/repos/postgres/entities'

type HttpRequest = Save.Input

type Model = Error | IPatient
export class InsertPatientController extends Controller {
  constructor (private readonly insertPatient: InsertPatient) {
    super()
  }

  async perform (httpRequest: Save.Input): Promise<HttpResponse<Model>> {
    try {
      const response = await this.insertPatient(httpRequest)
      return created(response!)
    } catch (error: any) {
      return badRequest(new Error(error.message))
    }
  }

  override async buildValidators ({ address, name, email, phone, birthDate }: HttpRequest): Promise<Validator[]> {
    return [
      ...builder.of({ value: name, fieldName: 'name' }).required().build(),
      ...builder.of({ value: birthDate, fieldName: 'birthDate' }).required().build(),
      ...builder.of({ value: phone, fieldName: 'phone' }).required().build(),
      ...builder.of({ value: address, fieldName: 'address' }).required().build(),
      ...(await builder.of({ value: email, fieldName: 'email' }).required().email().unique(User)).build()
    ]
  }
}
