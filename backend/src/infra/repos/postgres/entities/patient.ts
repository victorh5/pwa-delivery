import { Column, CreateDateColumn, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { PatientAddress, User } from '.'

@Entity({ name: 'patients' })
export class Patient {
  @PrimaryGeneratedColumn()
  id!: number

  @CreateDateColumn({ name: 'birth_date' })
  birthDate?: Date

  @Column()
  phone?: string

  @Column({ nullable: true })
  observation?: string

  @Column({ nullable: true })
  responsible?: string

  @OneToOne(() => User, user => user.patient, { cascade: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: User

  @ManyToOne(() => PatientAddress, address => address.patient, { cascade: false })
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  address?: PatientAddress
}
