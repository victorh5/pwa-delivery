import { SendEmail as ISendEmail } from '@/domain/contracts/gateways'

type Setup = (emailHandler: ISendEmail) => SendEmail
type Input = {
  name: string
  email: string
  body: string
  subject: string
}
export type SendEmail = (input: Input) => Promise<void>

export const sendEmail: Setup = (emailHandler) => async ({ name, email, body, subject }) => {
  const message = { to: { name, email }, subject, body }
  await emailHandler.sendEmail(message)
}
