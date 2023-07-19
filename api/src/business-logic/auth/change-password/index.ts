import { Collection, getModel } from "../../../constant-definitions";
import { User, UserSchemaMongo } from "../../../entities";
import bcrypt from "bcrypt";

interface BodyPassword {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

export const ChangePassword = async (
  data: BodyPassword
): Promise<void | Error> => {
  console.log("LA DATA ===========================>", data);
  const model = await getModel<User>(Collection.USERS, UserSchemaMongo);
  const user = await model.findById(data.userId);
  console.log("================================user", user);
  if (!user) {
    return new Error("Usuario no encontrado");
  }

  const password = bcrypt.hashSync(data.newPassword || "", 10);
  console.log("LA pass ===========================>", password);
  user.password = password;
  await user.save();
};
