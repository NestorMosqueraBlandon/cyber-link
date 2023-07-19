import { Collection, getModel } from "../../../constant-definitions";
import { User, UpdateUserDto, UserSchemaMongo } from "../../../entities";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const UserSignin = async ({ email, password }: UpdateUserDto) => {
  const model = getModel<User>(Collection.USERS, UserSchemaMongo);
  const user = await model.findOne({ email });
  if (!user) throw new Error("Invalid credentials");
  if (password == null) return new Error("102");
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return new Error("103");
  const token = jwt.sign({ uuid: user._id }, JWT_SECRET!, { expiresIn: "24h" });
  return { user, token };
};
