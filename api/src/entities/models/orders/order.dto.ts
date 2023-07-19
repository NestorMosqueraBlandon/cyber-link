import { Order } from "./schema";

export type CreateOrderDto = Omit<Order, 'id'>;
export type UpdateOrderDto = Partial<Order>;