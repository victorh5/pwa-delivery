import { ValidationBuilder as builder, Validator } from '@/application/validation'
import { HttpResponse, ok, contentNotFound } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ShowPatient } from '@/domain/usecases/patient'
import { Patient } from '@/domain/contracts/repos'

type HttpRequest = { id: string }

type Model = Error | Patient | undefined
export class ShowPatientController extends Controller {
  constructor (private readonly showPatient: ShowPatient) {
    super()
  }

  async perform ({ id }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const response = await this.showPatient({ id })
      return ok(response)
    } catch {
      return contentNotFound('patient')
    }
  }

  override async buildValidators ({ id }: HttpRequest): Promise<Validator[]> {
    return [
      ...builder.of({ value: id, fieldName: 'id' }).required().build()
    ]
  }
}
