export interface Client {
  _id: string;
  uuid?: string;
  name: string;
  lastname: string;
  identification: number;
  email: string;
  address: string;
  phone: number;
  status: string;
}

export type CreateClientDto = Omit<Client, "_id">;
export type UpdateClientDto = Partial<Client>;
