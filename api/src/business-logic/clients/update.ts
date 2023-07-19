import { Collection, getModel } from "../../constant-definitions";
import { Client, ClientSchemaMongo, UpdateClientDto } from "../../entities";

export const updateClient = async ( data: UpdateClientDto): Promise<Client | Error> => {
  const model = getModel<Client>(Collection.CLIENTS, ClientSchemaMongo);
  const client = await model.findById({ _id: data.uuid });
  if (!client) throw new Error(`client don't exist`);
  const dataToUpdate = { ...data };
  await client.updateOne(dataToUpdate);
  return client;
};
