import { ICustomerPaginate } from '@modules/customers/domain/models/ICustomerPaginate';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository';

interface SearchParams {
  page: number;
  limit: number;
}

//@injectable()
class ListCustomerService {
  constructor(
    // @inject('CustomersRepository')
    private customersRepository: ICustomerRepository
  ) {}

  public async execute({
    page,
    limit
  }: SearchParams): Promise<ICustomerPaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const customers = await this.customersRepository.findAll({
      page,
      skip,
      take
    });

    return customers;
  }
}

export default ListCustomerService;
