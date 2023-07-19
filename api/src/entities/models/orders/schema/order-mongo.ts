import { Schema } from "mongoose";
import { Order } from "./order";
import crypto from "crypto";
import { OrderStatus, StatusType } from "../../../common";

export const OrderSchemaMongo = new Schema<Order>(
  {
    _id: { type: String, unique: true, default: () => crypto.randomUUID() },
    uuid: { type: String },
    client: { type: String, ref: "clients" },
    products: [{ type: String, ref: "products" }],
    total_price: { type: Number },
    address: { type: String },
    image: { type: String },
    transfer_date: { type: String },
    order_status: { type: String, default: OrderStatus.IN_REVIEW },
    status: { type: String, default: StatusType.ACTIVE },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

OrderSchemaMongo.methods.toJSON = function () {
  const { _id, ...order } = this.toObject();
  order.uuid = _id;
  return order;
};
