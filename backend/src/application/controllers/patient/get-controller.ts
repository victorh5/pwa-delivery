import { HttpResponse, ok, badRequest } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ListPatient } from '@/domain/usecases/patient'
import { Patient } from '@/domain/contracts/repos'

type Model = Error | Patient[]
export class GetPatientController extends Controller {
  constructor (private readonly listPatient: ListPatient) {
    super()
  }

  async perform (): Promise<HttpResponse<Model>> {
    try {
      const response = await this.listPatient()
      return ok(response)
    } catch (error: any) {
      return badRequest(error)
    }
  }
}
