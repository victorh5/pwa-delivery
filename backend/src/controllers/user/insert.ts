import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

const insertUser = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
  confirmPassword: z.string().min(4),
  phone: z.object({
    number: z.string()
  }),
  address: z.object({
    cep: z.string(),
    number: z.number(),
    street: z.string(),
    state: z.string(),
    city: z.string(),
    complement: z.string().optional()
  })
})

class UserInsert {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const {
      name,
      email,
      password,
      confirmPassword,
      phone,
      address
    } = insertUser.parse(request.body)

    if (password !== confirmPassword) {
      throw new Error('Passwords does not match')
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        address: {
          create: {
            cep: address.cep,
            city: address.city,
            complement: address.complement,
            number: address.number,
            state: address.state,
          }
        },
        phone: {
          create: {
            number: phone.number
          }
        },
        createdAt: new Date()
      }
    })
    reply
      .code(201)
      .header('Content-type', 'application/json; charset=utf-8')
      .send(newUser)
  }
}

export { UserInsert }