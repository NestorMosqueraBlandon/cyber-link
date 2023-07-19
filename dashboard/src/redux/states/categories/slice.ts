import { CreateCategoryDto, UpdateCategoryDto } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createCategoryThunk,
  deleteCategoryThunk,
  deleteStatusCategoryThunk,
  updateCategoryThunks,
} from "./thunks";

export const createCategory = createAsyncThunk(
  "categories/create",
  async (data: CreateCategoryDto, thunkAPI) => {
    try {
      return await createCategoryThunk(data);
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/update",
  async (data: UpdateCategoryDto, thunkAPI) => {
    try {
      return await updateCategoryThunks(data);
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id: string, thunkAPI) => {
    try {
      return await deleteCategoryThunk(id);
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteStatusCategory = createAsyncThunk(
  "categories/status-delete",
  async (id: string, thunkAPI) => {
    try {
      return await deleteStatusCategoryThunk(id);
    } catch (err) {
      console.log(err);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    result: {},
    loading: false,
    error: undefined,
    success: false,
    categories: [],
    category: {},
  } as any,

  reducers: {
    resetCategory: (state) => {
      state.loading = false;
      state.success = false;
      state.error = "";
      state.category = {};
    },
    loadingCategoriesById: (state) => {
      state.loading = true;
    },
    setCategoriesById: (state, action) => {
      state.loading = false;
      state.categories = action.payload.categories;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
        state.category = {};
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
        state.category = {};
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
        state.category = {};
      })
      .addCase(deleteStatusCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStatusCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteStatusCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
        state.category = {};
      });
  },
});

export const { resetCategory } = categoriesSlice.actions;
export const { loadingCategoriesById, setCategoriesById } =
  categoriesSlice.actions;
export default categoriesSlice;
