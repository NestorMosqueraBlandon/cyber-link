import { StatusType } from "../../../common";

export interface Admin {
  uuid: string;
  id: string;
  name: string;
  lastname: string;
  phone: number;
  email: string;
  password: string;
  rol: string;
  photo: string;
  status: StatusType;
}
