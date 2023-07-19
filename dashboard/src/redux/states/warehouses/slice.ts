import { createSlice } from "@reduxjs/toolkit";
import { createWarehouse, getWarehousesByAccount } from "./thunks";

const warehousesSlice = createSlice({
 name: 'warehouses',
 initialState: {
  result: {},
  loading: false,
  error: undefined,
  success: false,
  warehouses: [],
  warehouse: {}
 } as any,
 
 reducers: {
  resetWarehouses: (state) => {
    state.loading = false;
    state.success = false;
    state.error = '';
    state.contact = {};
   }
 },
 extraReducers: (builder) => {
  builder.addCase(createWarehouse.pending, (state) => {
   state.loading = true;
   state.error = undefined;
 })
 .addCase(createWarehouse.fulfilled, (state, action) => {
   state.loading = false;
   state.warehouse = action.payload;
   state.success = true;
 })
 .addCase(createWarehouse.rejected, (state, action) => {
   state.loading = false;
   state.error = String(action.payload);
 })
 .addCase(getWarehousesByAccount.pending, (state) => {
  state.loading = true;
  state.error = undefined;
})
.addCase(getWarehousesByAccount.fulfilled, (state, action) => {
  state.loading = false;
  state.warehouses = action.payload;
})
.addCase(getWarehousesByAccount.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
})
 }
});

export const { resetWarehouses } = warehousesSlice.actions;

export default warehousesSlice;