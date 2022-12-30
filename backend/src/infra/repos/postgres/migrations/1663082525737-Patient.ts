import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Patient1663082525737 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'patients',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true
          },
          {
            name: 'birth_date',
            type: 'date'
          },
          {
            name: 'phone',
            type: 'varchar'
          },
          {
            name: 'observation',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'responsible',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('patients')
  }
}
