import { helebbaApi } from "@/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createInvoice = createAsyncThunk(
  "/invoices/create",
  async (contact: any, thunkAPI) => {
    try {
      const {token, ...accountWithoutToken} = contact;
      const { data } = await helebbaApi.post("/invoices", accountWithoutToken, {
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
 
 export const getInvoice = createAsyncThunk<any, any>('/invoices/one', async ({token, uuid}: any) => {
  try{
    const { data } = await helebbaApi.get(`/invoice/${uuid}`, {
      headers: {
        "Authorization": `Bearer ${token}`
    }
    });
    return data;
  }catch(e){
   console.log(e);
  }
  
 });
 
 export const getInvoicesByAccount = createAsyncThunk<any, any>('/invoices', async ({token, uuid}) => {
  try{
    const { data } = await helebbaApi.get(`/invoices/${uuid}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return data;
  }catch(e){
   console.log(e);
  }
  
 });