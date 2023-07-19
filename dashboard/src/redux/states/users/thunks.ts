import { helebbaApi } from "@/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAdmin = createAsyncThunk<any, string>(
  "/user",
  async (token: string) => {
    try {
      const { data } = await helebbaApi.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (e) {
      console.log(e);
    }
  }
);
