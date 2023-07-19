import { helebbaApi } from "@/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createAccount = createAsyncThunk(
  "accounts/create",
  async (account: any, thunkAPI) => {
    try {
      const {token, ...accountWithoutToken} = account;
      const { data } = await helebbaApi.post("/accounts", accountWithoutToken, {
        headers: {
          "Authorization": `Bearer ${token}`
      }});
      
      localStorage.setItem('account', JSON.stringify(data))
      return data;
    } catch (err: any) {
      const message = err;
      return thunkAPI.rejectWithValue(message.response.data.message);
    }
  }
 );
 
 export const getAccount = createAsyncThunk<any, any>('/accounts/one', async ({token, uuid}: any) => {
  try{
    const { data } = await helebbaApi.get(`/account/${uuid}`, {
      headers: {
        "Authorization": `Bearer ${token}`
    }
    });
    
    localStorage.setItem('account', JSON.stringify(data))
    return data;
  }catch(e){
   console.log(e);
  }
  
 });
 
 export const getAccountsByUser = createAsyncThunk<any, string>('/accounts', async (token) => {
  try{
    const { data } = await helebbaApi.get(`/accounts`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return data;
  }catch(e){
   console.log(e);
  }
  
 });