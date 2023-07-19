import { Collection, getModel } from "../../constant-definitions";
import { Client, ClientSchemaMongo } from "../../entities";

export const getAllClients = async (): Promise<Client[]> => {
  const model = getModel<Client>(Collection.CLIENTS, ClientSchemaMongo);
  const cients = await model.find({status: "active"});
  return cients;
};
