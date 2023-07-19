import { Collection, getModel } from "../../constant-definitions";
import { Order, OrderSchemaMongo, OrderStatus } from "../../entities";

export const UpdateStatusOrder = async (
  uuid: string
): Promise<Order | Error> => {
  const model = getModel<Order>(Collection.ORDERS, OrderSchemaMongo);
  const order = await model.findById(uuid);
  if (!order) {
    throw new Error("order not found");
  }
  order.order_status = OrderStatus.SOLD;
  await order.save();
  return order;
};
