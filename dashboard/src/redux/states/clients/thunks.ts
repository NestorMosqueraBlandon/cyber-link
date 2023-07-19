import { helebbaApi } from "@/api";
import { getConfig } from "@/utilities/getConfig";
import { loadingClientsById, setClientsById } from "./slice";
import { CreateClientDto, UpdateClientDto } from "@/types/models/client";

export const getAllClients = () => async (dispatch: any) => {
  const config = getConfig();
  dispatch(loadingClientsById());
  const { data } = await helebbaApi.get(`/clients`, config);
  dispatch(setClientsById({ clients: data }));
  return data;
};

export const deleteStatusClientThunk = async (id: string) => {
  const config = getConfig();
  const { data } = await helebbaApi.put(`/clients/${id}`, config);
  return data;
};

export const updateClientThunks = async (info: UpdateClientDto) => {
  const config = getConfig();
  const { data } = await helebbaApi.put(`/clients`, info, config);
  return data;
};

export const createClientThunk = async (info: CreateClientDto) => {
  const config = getConfig();
  const { data } = await helebbaApi.post("/clients", info, config);
  return data;
};
