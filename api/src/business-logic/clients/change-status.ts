import { Collection, getModel } from "../../constant-definitions";
import { Client, ClientSchemaMongo, StatusType } from "../../entities";

export const ChangeStatusClient = async (uuid: string): Promise<Client | Error> => {
  const model = getModel<Client>(Collection.CLIENTS, ClientSchemaMongo);
  const client = await model.findById(uuid);
  if (!client) {
    throw new Error("client not found");
  }
  client.status = StatusType.DELETED;
  await client.save();
  return client;
};
