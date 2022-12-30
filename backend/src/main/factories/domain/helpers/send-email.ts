import { sendEmail, SendEmail } from '@/domain/helpers'
import { makeEmailHandler } from '@/main/factories/infra/gateways'

export const makeSendEmail = (): SendEmail => {
  return sendEmail(
    makeEmailHandler()
  )
}
