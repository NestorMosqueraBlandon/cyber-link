import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, logout, registerUser } from "./thunks";

export interface BodyPassword {
  userId: string;
  currentPassword: string;
  newPassword: string;
}


const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : {},
  error: "",
  success: false,
  loading: false,
  userInfo: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.loading = false;
      state.success = false;
      state.error = "";
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
        state.user = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
        state.user = null;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
        state.user = null;
      })
    ;
  },
});

export const { resetAuth } = authSlice.actions;

export default authSlice.reducer;
