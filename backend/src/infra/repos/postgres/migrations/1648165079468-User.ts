import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class User1648165079468 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'db_users',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'birth_date',
            type: 'date',
            isNullable: true
          },
          {
            name: 'admin',
            type: 'boolean',
            default: false
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
          },
          {
            name: 'first_access',
            type: 'timestamp',
            isNullable: true
          },
          {
            name: 'last_access',
            type: 'timestamp',
            isNullable: true
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('db_users')
  }
}
