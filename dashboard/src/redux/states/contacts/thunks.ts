import { helebbaApi } from "@/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createContact = createAsyncThunk(
  "contacts/create",
  async (contact: any, thunkAPI) => {
    try {
      const {token, ...accountWithoutToken} = contact;
      const { data } = await helebbaApi.post("/contacts", accountWithoutToken, {
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
 
 export const updateContact = createAsyncThunk(
  "contacts/update",
  async (contact: any, thunkAPI) => {
    try {
      const {token, ...accountWithoutToken} = contact;
      console.log({accountWithoutToken})
      const { data } = await helebbaApi.put("/contacts", accountWithoutToken, {
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
 
 export const getContact = createAsyncThunk<any, any>('/contacts/one', async ({token, uuid}: any) => {
  try{
    const { data } = await helebbaApi.get(`/contact/${uuid}`, {
      headers: {
        "Authorization": `Bearer ${token}`
    }
    });
    return data;
  }catch(e){
   console.log(e);
  }
  
 });
 
 export const getContactsByAccount = createAsyncThunk<any, any>('/contacts', async ({token, uuid}) => {
  try{
    const { data } = await helebbaApi.get(`/contacts/${uuid}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return data;
  }catch(e){
   console.log(e);
  }
  
 });