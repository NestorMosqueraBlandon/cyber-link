import { StatusType } from "../../../common";

export interface Category {
  _id: string;
  uuid: string;
  name: string;
  status: StatusType;
}
