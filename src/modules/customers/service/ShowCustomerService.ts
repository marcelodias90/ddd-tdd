import AppError from '@shared/errors/AppError';
import Customer from '../infra/typeorm/entities/Customer';
import { IShowCustomer } from '../domain/models/IShowCustomer';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository';

class ShowCustomerService {
  constructor(
    // @inject('CustomersRepository')
    private customersRepository: ICustomerRepository
  ) {}
  public async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('User not found.');
    }

    return customer;
  }
}

export default ShowCustomerService;
