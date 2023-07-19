import { CreateOrderDto, UpdateOrderDto } from "@/types/models/order";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createOrderThunk,
  deleteStatusOrderThunk,
  updateOrdersThunks,
  updateStatusOrderThunk,
} from "./thunks";

export const createOrder = createAsyncThunk(
  "orders/create",
  async (data: CreateOrderDto, thunkAPI) => {
    try {
      return await createOrderThunk(data);
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "orders/update",
  async (data: UpdateOrderDto, thunkAPI) => {
    try {
      return await updateOrdersThunks(data);
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteStatusOrder = createAsyncThunk(
  "orders/status-delete",
  async (id: string, thunkAPI) => {
    try {
      return await deleteStatusOrderThunk(id);
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateStatusOrder = createAsyncThunk(
  "orders/status-update",
  async (id: string, thunkAPI) => {
    try {
      return await updateStatusOrderThunk(id);
    } catch (err) {
      console.log(err);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    result: {},
    loading: false,
    error: undefined,
    success: false,
    orders: [],
    order: {},
  } as any,

  reducers: {
    resetOrders: (state) => {
      state.loading = false;
      state.success = false;
      state.error = "";
      state.order = {};
    },
    loadingOrdersById: (state) => {
      state.loading = true;
    },
    setOrdersById: (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
        state.order = {};
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
        state.order = {};
      })
      .addCase(deleteStatusOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStatusOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteStatusOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
        state.order = {};
      })
      .addCase(updateStatusOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStatusOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateStatusOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
        state.order = {};
      });
  },
});

export const { resetOrders } = ordersSlice.actions;
export const { loadingOrdersById, setOrdersById } = ordersSlice.actions;
export default ordersSlice;
