import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCustomerService from '@modules/customers/service/CreateCustomerService';
import DeleteCustomerService from '@modules/customers/service/DeleteCustomerService';
import ListCustomerService from '@modules/customers/service/ListCustomerService';
import ShowCustomerService from '@modules/customers/service/ShowCustomerService';

import UpdateCustomerService from '@modules/customers/service/UpdateCustomerService';

export default class CustomersController {
  //dando tipo pro request e response com o express
  public async index(request: Request, response: Response): Promise<Response> {
    const listCostumers = new ListCustomerService();

    const customers = await listCostumers.execute();

    return response.json(customers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCostumer = new ShowCustomerService();
    const costumer = await showCostumer.execute({ id });

    return response.json(costumer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({
      name,
      email
    });

    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;

    const updateCustomer = new UpdateCustomerService();
    const customer = await updateCustomer.execute({
      id,
      name,
      email
    });

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomer = new DeleteCustomerService();

    await deleteCustomer.execute({ id });

    return response.json([]);
  }
}
