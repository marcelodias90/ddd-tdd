import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm';
//criando uma migração de coluna para a tabela orders
export class AddCustomerIdToOrders1678739257180 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'customer_id',
        type: 'uuid',
        isNullable: true //caso o cliente seja deletado, os pedidos iram ficar salvos no sistema
      })
    );

    //criando uma foreIgnkey
    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        name: 'OrdersCustomer',
        columnNames: ['customer_id'],
        referencedTableName: 'customers', //referenciando a tabela orders com a customres
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL' //caso o cliente seja deletado o id ficara nulo
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // sempre desfazer na hora inversa
    await queryRunner.dropForeignKey('orders', 'OrdersCustomer');
    await queryRunner.dropColumn('orders', 'customer_id');
  }
}
