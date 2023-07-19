import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteStatusProductThunk,
  updateProductThunk,
} from "./thunks";
import { UpdateProductDto } from "@/types";

export const updateProduct = createAsyncThunk(
  "products/update",
  async (data: UpdateProductDto, thunkAPI) => {
    try {
      return await updateProductThunk(data);
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteStatusProduct = createAsyncThunk(
  "products/status-delete",
  async (id: string, thunkAPI) => {
    try {
      return await deleteStatusProductThunk(id);
    } catch (err) {
      console.log(err);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    result: {},
    loading: false,
    error: undefined,
    success: false,
    products: [],
    product: {},
  } as any,

  reducers: {
    resetProducts: (state) => {
      state.loading = false;
      state.success = false;
      state.error = "";
      state.product = {};
    },
    loadingProductById: (state) => {
      state.loading = true;
    },
    setProductById: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
      })

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
        state.product = {};
      })
      .addCase(deleteStatusProduct.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(deleteStatusProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteStatusProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
        state.product = {};
      });
  },
});

export const { resetProducts } = productsSlice.actions;
export const { loadingProductById, setProductById } = productsSlice.actions;
export default productsSlice;
