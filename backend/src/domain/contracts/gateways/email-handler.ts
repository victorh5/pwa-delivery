import Mail from 'nodemailer/lib/mailer'

export type Address = {
  email: string
  name: string
}

export type Email = {
  to: Address
  from?: Address
  subject: string
  body: string
}

export type MailEnv ={
  driver: string
  mDriver: string
  port: string
  userName: string
  password: string
  from: {
    email: string
    name: string
  }
}

export interface SendEmail{
  sendEmail: (input: SendEmail.Input) => Promise<void>
}

export namespace SendEmail{
  export type Input = Email
}

export interface CreateTransport{
  createTransport: (input: CreateTransport.Input) => CreateTransport.Output
}
export namespace CreateTransport{
  export type Input = MailEnv
  export type Output = Mail
}
