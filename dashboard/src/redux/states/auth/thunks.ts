import { helebbaApi } from "@/api";
import { CreateUserDto, UpdateUserDto } from "@/types/models/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

interface BodyPassword {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

export const login = createAsyncThunk(
  "auth/signin",
  async (user: { email: string; password: string }, thunkAPI) => {
    try {
      const { data } = await helebbaApi.post("/login", user);
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("user", JSON.stringify(data.user));
      return data;
    } catch (err: any) {
      const message = err;
      return thunkAPI.rejectWithValue(message.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user: CreateUserDto, thunkAPI) => {
    try {
      const { data } = await helebbaApi.post("/register", user);
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("user", JSON.stringify(data.user));
      return data;
    } catch (err: any) {
      const message = err;
      return thunkAPI.rejectWithValue(message.response.data.message);
    }
  }
);

export const updatePasswordThunks = createAsyncThunk(
  "user/update/password",
  async (newData: BodyPassword) => {
    const { data } = await helebbaApi.put(`/users/change/password`, newData);
    return data;
  }
);

export const UpdateUser = createAsyncThunk(
  "user/update",
  async (newData: UpdateUserDto) => {
    const { data } = await helebbaApi.put(`/users/${newData.uuid}`, newData);
    return data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Validar que los elementos se hayan eliminado correctamente
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!user && !token) {
      window.location.replace("/");
    } else {
      throw new Error(
        "Error al eliminar los elementos del almacenamiento local."
      );
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});
