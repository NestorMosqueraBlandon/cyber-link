import { helebbaApi } from "@/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadingProductById, setProductById } from "./slice";
import { UpdateProductDto } from "@/types";
import { getConfig } from "@/utilities/getConfig";

export const createProduct = createAsyncThunk(
  "products/create",
  async (product: any, thunkAPI) => {
    try {
      const { token, ...accountWithoutToken } = product;
      const { data } = await helebbaApi.post("/products", accountWithoutToken, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (err: any) {
      const message = err;
      return thunkAPI.rejectWithValue(message.response.data.message);
    }
  }
);

export const getAllProducts = () => async (dispatch: any) => {
  const config = getConfig();
  dispatch(loadingProductById());
  const { data } = await helebbaApi.get(`/products`, config);
  dispatch(setProductById({ products: data }));
  return data;
};

export const updateProductThunk = async (product: UpdateProductDto) => {
  const config = getConfig();
  const { data } = await helebbaApi.put(`/products`, product, config);
  return data;
};

export const deleteStatusProductThunk = async (id: string) => {
  const config = getConfig();
  const { data } = await helebbaApi.put(`/products/${id}`, config);
  return data;
};
