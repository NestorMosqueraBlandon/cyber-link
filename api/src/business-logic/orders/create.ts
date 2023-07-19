import { Collection, getModel } from "../../constant-definitions";
import { CreateOrderDto, Order, OrderSchemaMongo } from "../../entities";

export const createOrder = async ( data: Partial<CreateOrderDto> ): Promise<Order | Error> => {
  const model = getModel<Order>(Collection.ORDERS, OrderSchemaMongo);
  const order = new model(data);
  await order.save();
  return order;
};
