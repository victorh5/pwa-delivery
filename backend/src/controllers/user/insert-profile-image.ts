import { FastifyReply, FastifyRequest } from "fastify";
import fs from 'fs'
import util from 'util'
import { pipeline } from 'stream'
import { prisma } from '../../lib/prisma'

const pump = util.promisify(pipeline)

class UserInsertProfileImage {
  async handle (request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) {
    const { id } = request.params
    const data = await request.file()

    await pump(data!.file, fs.createWriteStream(`uploads/${data!.filename}`))

    const urlImage = `http://localhost:3333/uploads/${data!.filename}`
    const updateUser = await prisma.user.update({
      where: { id },
      data: {
        profile_image: urlImage
      }
    })

    reply
      .code(200)
      .header('Content-type', 'application/json; charset=utf-8')
      .send(updateUser)
  }
}

export { UserInsertProfileImage }