import { OrderStatus, StatusType } from "../../../common";

export interface Order {
  _id: string;
  uuid: string;
  client: string;
  products: string[];
  total_price: number;
  order_status: OrderStatus;
  status: StatusType;
  address: string;
  image: string;
  transfer_date: string;
}
