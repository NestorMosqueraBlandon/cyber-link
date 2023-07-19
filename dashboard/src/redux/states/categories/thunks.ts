import { helebbaApi } from "@/api";
import { loadingCategoriesById, setCategoriesById } from "./slice";
import { getConfig } from "@/utilities/getConfig";
import { CreateCategoryDto, UpdateCategoryDto } from "@/types";

export const getAllCategories = () => async (dispatch: any) => {
  const config = getConfig();
  dispatch(loadingCategoriesById());
  const { data } = await helebbaApi.get(`/categories`, config);
  dispatch(setCategoriesById({ categories: data }));
  return data;
};

export const deleteCategoryThunk = async (id: string) => {
  const config = getConfig();
  const { data } = await helebbaApi.delete(`/categories/${id}`, config);
  return data;
};

export const deleteStatusCategoryThunk = async (id: string) => {
  const config = getConfig();
  const { data } = await helebbaApi.put(`/categories/${id}`, config);
  return data;
};

export const updateCategoryThunks = async (info: UpdateCategoryDto) => {
  const config = getConfig();
  const { data } = await helebbaApi.put(`/categories`, info, config);
  return data;
};

export const createCategoryThunk = async (info: CreateCategoryDto) => {
  const config = getConfig();
  const { data } = await helebbaApi.post("/categories", info, config);
  return data;
};
