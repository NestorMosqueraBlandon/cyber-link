import { createSlice } from "@reduxjs/toolkit";
import { createInvoice, getInvoice, getInvoicesByAccount } from "./thunks";
import { createContact } from "../contacts";

const invoicesSlice = createSlice({
 name: 'invoices',
 initialState: {
  result: {},
  loading: false,
  error: undefined,
  success: false,
  invoices: [],
  invoice: {}
 } as any,
 
 reducers: {
  resetInvoices: (state) => {
    state.loading = false;
    state.success = false;
    state.error = '';
    state.invoice = {};
   }
 },
 extraReducers: (builder) => {
  builder.addCase(createContact.pending, (state) => {
   state.loading = true;
   state.error = undefined;
 })
 .addCase(createInvoice.fulfilled, (state, action) => {
   state.loading = false;
   state.contact = action.payload;
   state.success = true;
 })
 .addCase(createContact.rejected, (state, action) => {
   state.loading = false;
   state.error = String(action.payload);
 })
 .addCase(getInvoicesByAccount.pending, (state) => {
  state.loading = true;
  state.error = undefined;
})
.addCase(getInvoicesByAccount.fulfilled, (state, action) => {
  state.loading = false;
  state.contacts = action.payload;
})
.addCase(getInvoicesByAccount.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
})
.addCase(getInvoice.pending, (state) => {
  state.loading = true;
  state.error = undefined;
})
.addCase(getInvoice.fulfilled, (state, action) => {
  state.loading = false;
  state.contact = action.payload;
})
.addCase(getInvoice.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
})
 }
});

export const { resetInvoices } = invoicesSlice.actions;

export default invoicesSlice;