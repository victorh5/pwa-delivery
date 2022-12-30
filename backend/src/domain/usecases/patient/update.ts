import { ContentNotFound } from '@/application/errors'
import { Encrypter } from '@/domain/contracts/gateways'
import { UpdatePatient as Save, SavePatientAddress as SavePA, UpdateUser as SaveUser } from '@/domain/contracts/repos'

type Setup = (addressRepo: SavePA, patientRepo: Save, userRepo: SaveUser, encrypter: Encrypter) => UpdatePatient

export type UpdatePatient = (input: Save.Input) => Promise<Save.Output>

export const setupUpdatePatient: Setup = (addressRepo, patientRepo, userRepo, encrypter) => async input => {
  let { id, address, user, ...patient } = input
  if (address !== undefined) address = await addressRepo.save(address)
  if (user !== undefined) {
    let { password, ...dUser } = user
    password &&= await encrypter.encrypt(password)
    dUser.firstAccess ||= new Date()
    const savedUser = await userRepo.update(Object.assign({}, dUser, { password }) as any)
    if (savedUser !== undefined) {
      const savedPatient = await patientRepo.update(Object.assign({}, patient, { id: parseInt(id) }, { user: savedUser }, { address }))
      if (savedPatient !== undefined) return savedPatient
    }
  }
  throw new ContentNotFound('patient')
}
