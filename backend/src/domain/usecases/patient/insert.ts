import { ContentNotFound } from '@/application/errors'
import { Encrypter } from '@/domain/contracts/gateways'
import { InsertPatient as Save, SavePatientAddress as SavePA, InsertUser as SaveUser } from '@/domain/contracts/repos'
import { SendEmail } from '@/domain/helpers'

type Setup = (addressRepo: SavePA, patientRepo: Save, userRepo: SaveUser, encrypter: Encrypter, sendEmail: SendEmail) => InsertPatient

export type InsertPatient = (input: Save.Input) => Promise<Save.Output>

export const setupInsertPatient: Setup = (addressRepo, patientRepo, userRepo, encrypter, sendEmail) => async input => {
  let { address, ...patient } = input
  if (address !== undefined) address = await addressRepo.save(address)
  const { birthDate, phone, observation, responsible, ...user } = patient
  const code = Math.random().toString().replace('.', '').slice(1, 9)
  user.password = await encrypter.encrypt(code)
  const savedUser = await userRepo.insert(user)
  if (savedUser !== undefined) {
    const savedPatient = await patientRepo.insert(Object.assign({}, { user: savedUser }, { address }, { birthDate }, { phone }, { observation }, { responsible }))
    if (savedPatient !== undefined) {
      const mountEmail = {
        name: savedUser.name!,
        email: savedUser.email!,
        body: `
          <div>Código para acessar o sistema: ${code}</div>
        `,
        subject: 'Senha Provisória para acessar o sistema MONITORASMA'
      }
      await sendEmail(mountEmail)
      return savedPatient
    }
  }
  throw new ContentNotFound('patient')
}
