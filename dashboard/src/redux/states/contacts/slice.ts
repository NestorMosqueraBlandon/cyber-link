import { createSlice } from "@reduxjs/toolkit";
import {  createContact, getContact, getContactsByAccount, updateContact } from "./thunks";

const contactsSlice = createSlice({
 name: 'contacts',
 initialState: {
  result: {},
  loading: false,
  error: undefined,
  success: false,
  contacts: [],
  contact: {}
 } as any,
 
 reducers: {
  resetContacts: (state) => {
    state.loading = false;
    state.success = false;
    state.error = '';
    state.contact = {};
   }
 },
 extraReducers: (builder) => {
  builder.addCase(createContact.pending, (state) => {
   state.loading = true;
   state.error = undefined;
 })
 .addCase(createContact.fulfilled, (state, action) => {
   state.loading = false;
   state.contact = action.payload;
   state.success = true;
 })
 .addCase(createContact.rejected, (state, action) => {
   state.loading = false;
   state.error = String(action.payload);
 })
 .addCase(getContactsByAccount.pending, (state) => {
  state.loading = true;
  state.error = undefined;
})
.addCase(getContactsByAccount.fulfilled, (state, action) => {
  state.loading = false;
  state.contacts = action.payload;
})
.addCase(getContactsByAccount.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
})
.addCase(getContact.pending, (state) => {
  state.loading = true;
  state.error = undefined;
})
.addCase(getContact.fulfilled, (state, action) => {
  state.loading = false;
  state.contact = action.payload;
})
.addCase(getContact.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
})
.addCase(updateContact.pending, (state) => {
  state.loading = true;
  state.error = undefined;
})
.addCase(updateContact.fulfilled, (state, action) => {
  state.loading = false;
  state.success = true;
})
.addCase(updateContact.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
})
 }
});

export const { resetContacts } = contactsSlice.actions;

export default contactsSlice;