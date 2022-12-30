import 'dotenv/config'

export const env = {
  port: process.env.SERVER_PORT!,
  jwtSecret: process.env.JWT_SECRET!,
  defaultPass: process.env.DEFAULT_PASS!,
  mail: {
    driver: process.env.DRIVER ?? '',
    mDriver: process.env.MAIL_DRIVER ?? '',
    port: process.env.MAIL_PORT ?? '',
    userName: process.env.MAIL_USERNAME ?? '',
    password: process.env.MAIL_PASSWORD ?? '',
    from: {
      email: process.env.MAIL_EMAIL ?? '',
      name: process.env.MAIL_NAME ?? ''
    }
  },
  apiCep: {
    url: process.env.API_CEP_URL ?? ''
  }
}
