import { Request, Response } from 'express';
import CreateCustomerService from '../service/CreateCustomerService';
import DeleteCustomerService from '../service/DeleteCustomerService';
import ListCustomerService from '../service/ListCustomerService';
import ShowCustomerService from '../service/ShowCustomerService';

import UpdateCustomerService from '../service/UpdateCustomerService';

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

    const createCustomer = new CreateCustomerService();

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
