import { ValidationBuilder as builder, Validator } from '@/application/validation'
import { HttpResponse, ok, badRequest } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ResetPassword } from '@/domain/usecases'
import { User } from '@/infra/repos/postgres/entities'

type HttpRequest = { id: string, password: string, passwordConfirmation: string }

type Model = Error | {message: string}
export class ResetPasswordController extends Controller {
  constructor (private readonly resetPassword: ResetPassword) { super() }

  async perform (input: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      await this.resetPassword(input)
      return ok({ message: 'password reseted with success' })
    } catch (err: any) {
      return badRequest(err)
    }
  }

  override async buildValidators ({ id, password, passwordConfirmation }: HttpRequest): Promise<Validator[]> {
    return [
      ...(await builder.of({ value: id, fieldName: 'id' }).required().exists(User)).build(),
      ...builder.of({ value: password, fieldName: 'password' }).required().between(8, 20).password(passwordConfirmation).build()
    ]
  }
}
