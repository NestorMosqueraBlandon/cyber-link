import { StatusType } from "../../../common";

export interface Product {
  _id: string;
  uuid: string;
  name: string;
  category: string;
  amount: number;
  buy_price: number;
  sale_price: number;
  product_state: string;
  images: string[];
  user: string;
  status: StatusType;
}
