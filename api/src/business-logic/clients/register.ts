import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Client, ClientSchemaMongo, CreateClientDto } from "../../entities";
import { Collection, getModel } from '../../constant-definitions';

const { JWT_SECRET } = process.env;

interface UserToken {
  token: string;
}

export const register = async (data: CreateClientDto): Promise<any | Error> => {
    const model = await getModel<Client>(Collection.CLIENTS, ClientSchemaMongo);
    const client = await model.findOne({ email: data.email});
    if(client) {return new Error("Usuario ya existe");}
    const password = bcrypt.hashSync(data.password || "", 10);
    const NewUser = new model({...data, password: password});
    await NewUser.save(); 
    const token = jwt.sign({uuid: NewUser.id}, JWT_SECRET!, {expiresIn: '5d'});
    return { 
      name: NewUser.name,
      lastname: NewUser.lastname, 
      email: NewUser.email, 
      phone: NewUser.phone, 
      token };
};
