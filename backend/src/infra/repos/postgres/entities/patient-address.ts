import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Patient } from '.'

@Entity({ name: 'patient-address' })
export class PatientAddress {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  cep?: string

  @Column()
  street?: string

  @Column({ nullable: true })
  number?: number

  @Column({ nullable: true })
  complement?: string

  @Column()
  city?: string

  @Column()
  state?: string

  @OneToMany(() => Patient, patient => patient.address, { lazy: false })
  patient?: Patient
}
