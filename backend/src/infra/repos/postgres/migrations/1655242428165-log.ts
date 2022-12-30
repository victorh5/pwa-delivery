import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { CreateForeignKey } from '../helpers'

export class log1655242428165 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'db_logs',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true
          },
          {
            name: 'message',
            type: 'varchar'
          },
          {
            name: 'origin',
            type: 'varchar'
          },
          {
            name: 'type',
            type: 'varchar'
          },
          {
            name: 'user_id',
            type: 'int'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )

    const foreignKey = new CreateForeignKey('user_id', 'id', 'db_users').new()
    await queryRunner.createForeignKey('db_logs', foreignKey)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('db_logs')
    await queryRunner.dropForeignKeys(table!.name, table!.foreignKeys)
    await queryRunner.dropTable(table!.name)
  }
}
