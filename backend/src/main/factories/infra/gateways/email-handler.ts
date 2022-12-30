import { EmailHandler } from '@/infra/gateways'
import { env } from '@/main/config/env'

export const makeEmailHandler = (): EmailHandler => {
  return new EmailHandler(env.mail)
}
