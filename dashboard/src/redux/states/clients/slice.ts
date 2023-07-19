import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createClientThunk,
  deleteStatusClientThunk,
  updateClientThunks,
} from "./thunks";
import { CreateClientDto, UpdateClientDto } from "@/types/models/client";

export const createClient = createAsyncThunk(
  "clients/create",
  async (data: CreateClientDto, thunkAPI) => {
    try {
      return await createClientThunk(data);
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateClient = createAsyncThunk(
  "clients/update",
  async (data: UpdateClientDto, thunkAPI) => {
    try {
      return await updateClientThunks(data);
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteStatusClient = createAsyncThunk(
  "clients/status-delete",
  async (id: string, thunkAPI) => {
    try {
      return await deleteStatusClientThunk(id);
    } catch (err) {
      console.log(err);
    }
  }
);

const clientsSlice = createSlice({
  name: "clients",
  initialState: {
    result: {},
    loading: false,
    error: undefined,
    success: false,
    clients: [],
    client: {},
  } as any,

  reducers: {
    resetClient: (state) => {
      state.loading = false;
      state.success = false;
      state.error = "";
      state.client = {};
    },
    loadingClientsById: (state) => {
      state.loading = true;
    },
    setClientsById: (state, action) => {
      state.loading = false;
      state.clients = action.payload.clients;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createClient.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
        state.client = {};
      })
      .addCase(updateClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
        state.client = {};
      })
      .addCase(deleteStatusClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStatusClient.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteStatusClient.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
        state.client = {};
      });
  },
});

export const { resetClient } = clientsSlice.actions;
export const { loadingClientsById, setClientsById } = clientsSlice.actions;
export default clientsSlice;
