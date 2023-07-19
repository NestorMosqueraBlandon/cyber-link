import { helebbaApi } from "@/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createWarehouse = createAsyncThunk(
  "warehouses/create",
  async (warehouse: any, thunkAPI) => {
    try {
      const {token, ...accountWithoutToken} = warehouse;
      const { data } = await helebbaApi.post("/warehouses", accountWithoutToken, {
        headers: {
          "Authorization": `Bearer ${token}`
      }});
      
      return data;
    } catch (err: any) {
      const message = err;
      return thunkAPI.rejectWithValue(message.response.data.message);
    }
  }
 );
 
 export const getWarehouses = createAsyncThunk<any, any>('/warehouses/one', async ({token, uuid}: any) => {
  try{
    const { data } = await helebbaApi.get(`/warehouse/${uuid}`, {
      headers: {
        "Authorization": `Bearer ${token}`
    }
    });
    return data;
  }catch(e){
   console.log(e);
  }
  
 });
 
 export const getWarehousesByAccount = createAsyncThunk<any, any>('/warehouses', async ({token, uuid}) => {
  try{
    const { data } = await helebbaApi.get(`/warehouses/${uuid}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return data;
  }catch(e){
   console.log(e);
  }
  
 });