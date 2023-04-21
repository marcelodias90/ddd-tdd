import { Request, Response } from 'express';
import CreateOrderService from '../../../service/CreateOrderService';
import ShowOrderService from '../../../service/ShowOrderService';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrder = new ShowOrderService();
    const order = await showOrder.execute({ id });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const createOrder = new CreateOrderService();

    const order = await createOrder.execute({
      customer_id,
      products
    });

    return response.json(order);
  }
}
