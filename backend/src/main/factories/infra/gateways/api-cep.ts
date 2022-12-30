import { ApiCepHandler } from '@/infra/gateways'
import { env } from '@/main/config/env'
import { makeAxiosHttpClient } from '.'

export const makeApiCepHandler = (): ApiCepHandler => {
  return new ApiCepHandler(env.apiCep.url, makeAxiosHttpClient())
}
