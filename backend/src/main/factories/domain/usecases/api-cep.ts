import { GetAddressInformation, setupGetAddressInformation } from '@/domain/usecases'
import { makeApiCepHandler } from '@/main/factories/infra/gateways'

export const makeGetAddressInformation = (): GetAddressInformation => {
  return setupGetAddressInformation(
    makeApiCepHandler()
  )
}
