import { Schema } from "mongoose";
import { User } from "./user";
import { StatusType } from "../../../common";
import crypto from "crypto";

export const UserSchemaMongo: Schema<User> = new Schema<User>(
  {
    _id: { type: String, unique: true, default: () => crypto.randomUUID() },
    uuid: { type: String },
    name: { type: String },
    lastname: { type: String },
    identification: { type: Number },
    email: { type: String },
    address: { type: String },
    phone: { type: Number },
    photo: { type: String },
    username: { type: String },
    password: { type: String },
    status: { type: String, default: StatusType.ACTIVE },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

UserSchemaMongo.methods.toJSON = function () {
  const { _id, ...user } = this.toObject();
  user.uuid = _id;
  return user;
};
