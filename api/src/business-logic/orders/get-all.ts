import { Collection, getModel } from "../../constant-definitions";
import { Client, ClientSchemaMongo, Order, OrderSchemaMongo, Product, ProductSchemaMongo} from "../../entities";

export const getAllOrders = async (): Promise<Order[]> => {
  const model = getModel<Order>(Collection.ORDERS, OrderSchemaMongo);
  getModel<Client>(Collection.CLIENTS, ClientSchemaMongo);
  getModel<Product>(Collection.PRODUCTS, ProductSchemaMongo);
  const order = await model
    .find({status: "active"})
    .populate({
      path: "client",
      select: "name lastname identification phone email",
    })
    .populate({ path: "products", select: "name sale_price" });
  return order;
};
