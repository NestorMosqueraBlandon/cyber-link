import { Schema } from "mongoose";
import { StatusType } from "../../../common";
import crypto from "crypto";
import { Client } from "./client";

export const ClientSchemaMongo = new Schema<Client>(
  {
    _id: { type: String, unique: true, default: () => crypto.randomUUID() },
    uuid: { type: String },
    name: { type: String },
    lastname: { type: String },
    identification: { type: Number },
    email: { type: String },
    password: { type: String },
    address: { type: String },
    phone: { type: Number },
    status: { type: String, default: StatusType.ACTIVE },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

ClientSchemaMongo.methods.toJSON = function () {
  const { _id, ...client } = this.toObject();
  client.uuid = _id;
  return client;
};
