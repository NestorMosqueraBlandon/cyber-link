import { Schema } from "mongoose";
import crypto from "crypto";
import { Product } from "./product";
import { StatusType } from "../../../common";

export const ProductSchemaMongo = new Schema<Product>(
  {
    _id: { type: String, unique: true, default: () => crypto.randomUUID() },
    uuid: { type: String },
    name: { type: String, required: true },
    category: { type: String, ref: "category" },
    amount: { type: Number },
    sale_price: { type: Number },
    buy_price: { type: Number },
    product_state: { type: String },
    images: { type: [String] },
    status: { type: String, default: StatusType.ACTIVE },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

ProductSchemaMongo.methods.toJSON = function () {
  const { _id, ...product } = this.toObject();
  product.uuid = _id;
  return product;
};
