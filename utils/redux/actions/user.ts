import { getAllUsersService } from "@/services/userService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllUsers = createAsyncThunk('getAllUsers', async () => {
    const response = await getAllUsersService();
    return response;
  });