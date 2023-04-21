import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

interface IFindProducst {
  id: string;
}

@EntityRepository(Product)
class ProductsRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.findOne({
      where: {
        name
      }
    });
    return product;
  }

  public async findAllByIds(products: IFindProducst[]): Promise<Product[]> {
    const productIds = products.map(product => product.id); //pegando somente os id dos produtos

    //verificando se esses produtos existe no banco de dados com a função In do typeOrm
    const existsProducts = await this.find({
      where: {
        id: In(productIds)
      }
    });
    return existsProducts; //retornando somente os produtos q foram encontrados
  }
}

export default ProductsRepository;
