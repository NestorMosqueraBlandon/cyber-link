import { Collection, getModel } from "../../constant-definitions";
import { Order, OrderSchemaMongo, UpdateOrderDto } from "../../entities";

export const updateOrder = async ( data: UpdateOrderDto): Promise<Order | Error> => {
  const model = getModel<Order>(Collection.ORDERS, OrderSchemaMongo);
  const order = await model.findById({ _id: data.uuid });
  if (!order) throw new Error(`Order don't exist`);
  const dataToUpdate = { ...data };
  await order.updateOne(dataToUpdate);
  return order;
};
