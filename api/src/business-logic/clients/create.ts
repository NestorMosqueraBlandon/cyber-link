import { Collection, getModel } from "../../constant-definitions";
import { Client, ClientSchemaMongo, CreateClientDto } from "../../entities";

export const createClient = async ( data: Partial<CreateClientDto> ): Promise<Client | Error> => {
  const model = getModel<Client>(Collection.CLIENTS, ClientSchemaMongo);
  const client = new model(data);
  await client.save();
  return client;
};
