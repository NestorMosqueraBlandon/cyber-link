import { StatusType } from "../../../common";

export interface Client {
  _id: string;
  uuid: string;
  name: string;
  lastname: string;
  identification: number;
  email: string;
  password: string;
  address: string;
  phone: number;
  status: StatusType;
}
