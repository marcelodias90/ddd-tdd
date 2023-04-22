import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import { ICustomer } from '../domain/models/ICustomer';

@injectable()
class CreateCustomerService {
  constructor(
    //@inject('CustomersRepository')
    private customersRepository: ICustomerRepository
  ) {}

  public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const emailExists = await this.customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const customer = this.customersRepository.create({
      name,
      email
    });

    return customer;
  }
}

export default CreateCustomerService;
