import { Schema } from "mongoose";
import { Admin } from "./admin";
import { StatusType } from "../../../common";
import crypto from "crypto";

export const AdminSchemaMongo: Schema<Admin> = new Schema<Admin>(
  {
    id: { type: String, unique: true, default: () => crypto.randomUUID() },
    name: { type: String, required: true },
    lastname: { type: String },
    phone: { type: Number },
    email: { type: String },
    password: { type: String },
    rol: { type: String },
    photo: { type: String },
    status: { type: String, default: StatusType.ACTIVE },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

AdminSchemaMongo.methods.toJSON = function () {
  const { id, ...admin } = this.toObject();
  admin.uuid = id;
  return admin;
};
