import { createSlice } from "@reduxjs/toolkit";
import { getAdmin } from "./thunks";

const usersSlice = createSlice({
 name: 'users',
 initialState: {
  result: {},
  loading: false,
  error: undefined,
  success: false,
  user: {}
 } as any,
 
 reducers: {},
 extraReducers: (builder) => {
  builder.addCase(getAdmin.pending, (state) => {
   state.loading = true;
   state.error = undefined;
 })
 .addCase(getAdmin.fulfilled, (state, action) => {
   state.loading = false;
   state.user = action.payload;
 })
 .addCase(getAdmin.rejected, (state, action) => {
   state.loading = false;
   state.error = action.error.message;
 })
 }
});

export default usersSlice;