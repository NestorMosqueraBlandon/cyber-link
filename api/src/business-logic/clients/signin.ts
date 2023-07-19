import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Collection, getModel } from "../../constant-definitions";
import { Client, ClientSchemaMongo, UpdateClientDto } from "../../entities";

const { JWT_SECRET } = process.env;

export const signin = async ({ email, password }: UpdateClientDto) => {
  const model = getModel<Client>(Collection.CLIENTS, ClientSchemaMongo);
  console.log({email})
  const client = await model.findOne({ email });

  console.log(client)
  if (!client) throw new Error("Invalid credentials");
  if(password == null) return new Error('102');

  const isValidPassword = await bcrypt.compare(password, client.password);
  if(!isValidPassword) return new Error('103');
  
  const token = jwt.sign({ uuid: client.uuid }, JWT_SECRET!, { expiresIn: "24h" });
  return { 
    name: client.name,
    lastname: client.lastname,
    email: client.email, 
    phone: client.phone, 
    token };
};