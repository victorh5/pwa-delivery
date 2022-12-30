import { ValidationBuilder as builder, Validator } from '@/application/validation'
import { HttpResponse, ok, badRequest } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { GetAddressInformation } from '@/domain/usecases'
import { ApiCep } from '@/domain/contracts/gateways'

type HttpRequest = { cep: string }

type Model = Error | ApiCep.Output
export class ApiCepController extends Controller {
  constructor (private readonly getAddressInformation: GetAddressInformation) {
    super()
  }

  async perform ({ cep }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const addressInformation = await this.getAddressInformation({ cep })
      return ok(addressInformation)
    } catch (err: any) {
      return badRequest(err)
    }
  }

  override async buildValidators ({ cep }: HttpRequest): Promise<Validator[]> {
    return [
      ...builder.of({ value: cep, fieldName: 'cep' }).required().build()
    ]
  }
}
