import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class AddProductIdToOrdersProducts1678750050271
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders_products',
      new TableColumn({
        name: 'product_id',
        type: 'uuid',
        isNullable: true //caso o cliente seja deletado, os pedidos iram ficar salvos no sistema
      })
    );

    //criando uma foreIgnkey
    await queryRunner.createForeignKey(
      'orders_products',
      new TableForeignKey({
        name: 'OrdersProductsProduct',
        columnNames: ['product_id'],
        referencedTableName: 'products', //referenciando a tabela orders com a products
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL' //caso o cliente seja deletado o id ficara nulo
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'orders_products',
      'OrdersProductsProduct'
    );
    await queryRunner.dropColumn('orders_products', 'product_id');
  }
}
