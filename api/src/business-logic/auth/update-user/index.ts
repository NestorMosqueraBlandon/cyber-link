import { Collection, getModel } from "../../../constant-definitions";
import { CreateUserDto, UserSchemaMongo } from "../../../entities";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

interface UserToken {
  token: string;
}

export const UserUpdate = async (userId: string, newData: Partial<CreateUserDto>): Promise<UserToken | Error> => {
    const model = await getModel(Collection.USERS, UserSchemaMongo);
  
    try {
      const user = await model.findOne({ _id: userId });
      if (!user) {
        return new Error("Usuario no encontrado");
      }
  
      if (newData.email && newData.email !== user.get("email")) {
        const existingUser = await model.findOne({ email: newData.email });
        if (existingUser) {
          return new Error("Ya existe un usuario con el nuevo correo electrónico");
        }
      }
  
      if (newData.password) {
        delete newData.password;
      }
  
      await model.updateOne({ _id: userId }, { $set: newData });
  
      const updatedUser = await model.findOne({ _id: userId });
      if (!updatedUser) {
        return new Error("Hubo un error al actualizar el usuario");
      }
  
      const token = jwt.sign({ uuid: updatedUser.id }, JWT_SECRET!, { expiresIn: '5d' });
      return { token };
    } catch (error) {
      return new Error("Hubo un error al actualizar el usuario");
    }
  };