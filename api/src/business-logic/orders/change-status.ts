import { Collection, getModel } from "../../constant-definitions";
import { Order, OrderSchemaMongo, StatusType } from "../../entities";

export const ChangeStatusOrder = async (uuid: string): Promise<Order | Error> => {
  const model = getModel<Order>(Collection.ORDERS, OrderSchemaMongo);
  const order = await model.findById(uuid);
  if (!order) {
    throw new Error("order not found");
  }
  order.status = StatusType.DELETED;
  await order.save();
  return order;
};
