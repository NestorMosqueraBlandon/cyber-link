import { helebbaApi } from "@/api";
import { getConfig } from "@/utilities/getConfig";
import { CreateOrderDto, UpdateOrderDto } from "@/types/models/order";
import { loadingOrdersById, setOrdersById } from "./slice";

export const getAllOrders = () => async (dispatch: any) => {
  const config = getConfig();
  dispatch(loadingOrdersById());
  const { data } = await helebbaApi.get(`/orders`, config);
  dispatch(setOrdersById({ orders: data }));
  return data;
};

export const deleteStatusOrderThunk = async (id: string) => {
  const config = getConfig();
  const { data } = await helebbaApi.put(`/orders/${id}`, config);
  return data;
};

export const updateStatusOrderThunk = async (id: string) => {
  const config = getConfig();
  const { data } = await helebbaApi.put(`/orders/status/${id}`, config);
  return data;
};

export const updateOrdersThunks = async (info: UpdateOrderDto) => {
  const config = getConfig();
  const { data } = await helebbaApi.put(`/orders`, info, config);
  return data;
};

export const createOrderThunk = async (info: CreateOrderDto) => {
  const config = getConfig();
  const { data } = await helebbaApi.post("/orders", info, config);
  return data;
};
