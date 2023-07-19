import { Collection, getModel } from "../../../constant-definitions";
import { CreateUserDto, UserSchemaMongo } from "../../../entities";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

interface UserToken {
  token: string;
}

export const UserSignup = async (data: CreateUserDto) => {
  const model = await getModel(Collection.USERS, UserSchemaMongo);
  const find_user = await model.findOne({ email: data.email });
  if (find_user) {
    return new Error("Usuario ya existe");
  }
  const password = bcrypt.hashSync(data.password || "", 10);
  const user = new model({ ...data, password: password });
  await user.save();
  const token = jwt.sign({ uuid: user._id }, JWT_SECRET!, {
    expiresIn: "24h",
  });
  return { user, token };
};
