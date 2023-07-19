import { Schema } from "mongoose";
import { Category } from "./category";
import crypto from "crypto";
import { StatusType } from "../../../common";

export const CategorySchemaMongo: Schema<Category> = new Schema<Category>(
  {
    _id: { type: String, unique: true, default: () => crypto.randomUUID() },
    uuid: { type: String },
    name: { type: String, required: true },
    status: { type: String, default: StatusType.ACTIVE },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

CategorySchemaMongo.methods.toJSON = function () {
  const { _id, ...category } = this.toObject();
  category.uuid = _id;
  return category;
};
