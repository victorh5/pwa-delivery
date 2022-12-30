import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'
import { CreateForeignKey } from '../helpers'

export class AddAddressColumn1663084661607 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('patients', [
      new TableColumn({
        name: 'address_id',
        type: 'int',
        isNullable: true
      }),
      new TableColumn({
        name: 'user_id',
        type: 'int',
        isNullable: true
      })
    ])
    const foreignKey = new CreateForeignKey('address_id', 'id', 'patient-address').new()
    const foreignKey2 = new CreateForeignKey('user_id', 'id', 'users').new()
    await queryRunner.createForeignKeys('patients', [foreignKey, foreignKey2])
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('patients')
    await queryRunner.dropForeignKeys(table!.name, table!.foreignKeys)
    await queryRunner.dropColumn(table!.name, 'address_id')
    await queryRunner.dropColumn(table!.name, 'user_id')
  }
}
