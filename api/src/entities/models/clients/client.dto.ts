import { Client } from "./schema";

export type CreateClientDto = Omit<Client, '_id'>;
export type UpdateClientDto = Partial<Client>;