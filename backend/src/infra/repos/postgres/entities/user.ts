import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { Log } from '.'

@Entity({ name: 'db_users' })
export class User {
  @PrimaryColumn()
  id!: number

  @Column({ nullable: false })
  name?: string

  @Column({ unique: true })
  email!: string

  @Column({ nullable: false })
  image!: string

  @Column({ nullable: true })
  password!: string

  @Column({ default: false })
  admin?: boolean

  @Column({ name: 'birth_date' })
  birthDate!: Date

  @Column({ name: 'first_access', nullable: true })
  firstAccess?: Date

  @Column({ name: 'last_access', nullable: true })
  lastAccess?: Date

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date

  @OneToMany(() => Log, log => log.user, { lazy: false })
  logs?: Log[]
}
