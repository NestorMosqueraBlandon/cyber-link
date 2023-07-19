import { StatusType } from "../../../common";

export interface User {
  _id: string;
  uuid: string;
  name: string;
  lastname: string;
  identification: number;
  email: string;
  password: string;
  address: string;
  phone: number;
  photo: string;
  username: string;
  status: StatusType;
}
