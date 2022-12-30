import { ApiCepController } from '@/application/controllers/api-cep-controller'
import { makeGetAddressInformation } from '@/main/factories/domain/usecases'

export const makeApiCepController = (): ApiCepController => {
  return new ApiCepController(makeGetAddressInformation())
}
