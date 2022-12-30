
import { MailEnv } from '@/domain/contracts/gateways'
import { EmailHandler } from '@/infra/gateways/email-handler'
import nodemailer from 'nodemailer'

jest.mock('nodemailer')

describe('EmailHandler', () => {
  let sut: EmailHandler
  let fakeNodeMailer: jest.Mocked<typeof nodemailer>
  let createTransportSpy: jest.Mock

  const makeTransport = (): MailEnv => ({
    driver: 'any_driver',
    mDriver: 'any_mDriver',
    port: '1',
    userName: 'any_userName',
    password: 'any_password',
    from: {
      email: 'any_email',
      name: 'any_name'
    }
  })

  describe('CreateTransport', () => {
    beforeAll(() => {
      createTransportSpy = jest.fn().mockResolvedValue({
        sendEmail: jest.fn()
      })
      fakeNodeMailer = nodemailer as jest.Mocked<typeof nodemailer>
      fakeNodeMailer.createTransport.mockImplementation(createTransportSpy)
    })

    beforeEach(() => {
      sut = new EmailHandler(makeTransport())
      console.log(sut)
    })

    it('should call createTransport with correct paramns', async () => {
      const mail = makeTransport()
      expect(createTransportSpy).toHaveBeenCalledWith({
        host: mail.mDriver,
        port: parseInt(mail.port),
        auth: {
          user: mail.userName,
          pass: mail.password
        }
      })
    })
  })
})
