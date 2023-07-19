import { createSlice } from "@reduxjs/toolkit";
import { createAccount, getAccountsByUser, getAccount } from "./thunks";

const accountsSlice = createSlice({
 name: 'accounts',
 initialState: {
  result: {},
  loading: false,
  error: undefined,
  success: false,
  accounts: [],
  account: localStorage.getItem('account')?  JSON.parse(localStorage.getItem('account') as string) : {}
 } as any,
 
 reducers: {
  resetAccounts: (state) => {
    state.loading = false;
    state.success = false;
    state.error = '';
    state.account = {};
    state.accounts = [];
   } 
 },
 extraReducers: (builder) => {
  builder.addCase(createAccount.pending, (state) => {
   state.loading = true;
   state.error = undefined;
 })
 .addCase(createAccount.fulfilled, (state, action) => {
   state.loading = false;
   state.account = action.payload;
   state.success = true;
 })
 .addCase(createAccount.rejected, (state, action) => {
   state.loading = false;
   state.error = String(action.payload);
 })
 .addCase(getAccountsByUser.pending, (state) => {
  state.loading = true;
  state.error = undefined;
})
.addCase(getAccountsByUser.fulfilled, (state, action) => {
  state.loading = false;
  state.accounts = action.payload;
})
.addCase(getAccountsByUser.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
})
.addCase(getAccount.pending, (state) => {
  state.loading = true;
  state.error = undefined;
})
.addCase(getAccount.fulfilled, (state, action) => {
  state.loading = false;
  state.account = action.payload;
})
.addCase(getAccount.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
})
 }
});

export const { resetAccounts }  = accountsSlice.actions 
export default accountsSlice;