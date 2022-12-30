import nodemailer from 'nodemailer'
import { CreateTransport, MailEnv, SendEmail } from '@/domain/contracts/gateways'
import Mail from 'nodemailer/lib/mailer'

export class EmailHandler implements SendEmail, CreateTransport {
  private readonly transporter: Mail
  constructor (
    private readonly mail: MailEnv
  ) {
    this.transporter = this.createTransport(mail)
  }

  createTransport (mail: MailEnv): Mail {
    const transporter = nodemailer.createTransport({
      host: mail.mDriver,
      port: parseInt(mail.port),
      auth: {
        user: mail.userName,
        pass: mail.password
      }
    })
    return transporter
  }

  async sendEmail (email: SendEmail.Input): Promise<void> {
    const { to, subject, body } = email
    const from = email.from ?? this.mail.from
    await this.transporter.sendMail({
      to: {
        name: to.name,
        address: to.email
      },
      from: {
        name: from.name,
        address: from.email
      },
      subject: subject,
      html: body
    })
  }
}
