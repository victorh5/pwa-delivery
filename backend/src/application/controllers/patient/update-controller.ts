import { ValidationBuilder as builder, Validator } from '@/application/validation'
import { HttpResponse, ok, badRequest } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { UpdatePatient } from '@/domain/usecases/patient'
import { UpdatePatient as Save, Patient as IPatient } from '@/domain/contracts/repos'

import { User } from '@/infra/repos/postgres/entities'

type HttpRequest = Save.Input & { passwordConfirmation?: string }

type Model = Error | IPatient
export class UpdatePatientController extends Controller {
  constructor (private readonly updatePatient: UpdatePatient) {
    super()
  }

  async perform ({ passwordConfirmation, ...data }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const response = await this.updatePatient(data)
      return ok(response!)
    } catch (error: any) {
      return badRequest(error)
    }
  }

  override async buildValidators ({ id, user, passwordConfirmation }: HttpRequest): Promise<Validator[]> {
    return [
      ...builder.of({ value: id, fieldName: 'id' }).required().build(),
      ...builder.of({ value: user?.password, fieldName: 'password' }).sometimes().between(8, 20).password(passwordConfirmation).build(),
      ...(await builder.of({ value: { value: user?.email, id }, fieldName: 'email' }).sometimes().email().unique(User)).build()
    ]
  }
}
