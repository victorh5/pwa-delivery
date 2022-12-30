import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class PatientAddress1663084155489 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'patient-address',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true
          },
          {
            name: 'cep',
            type: 'varchar'
          },
          {
            name: 'street',
            type: 'varchar'
          },
          {
            name: 'number',
            type: 'int',
            isNullable: true
          },
          {
            name: 'complement',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'city',
            type: 'varchar'
          },
          {
            name: 'state',
            type: 'varchar'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('patient-address')
  }
}
