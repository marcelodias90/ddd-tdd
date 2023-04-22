import AppError from '@shared/errors/AppError';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository';
import { IDeleteCustomer } from '../domain/models/IDeleteCustomer';

class DeleteCustomerService {
  constructor(
    // @inject('CustomersRepository')
    private customersRepository: ICustomerRepository
  ) {}

  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('User not found.');
    }

    await this.customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
