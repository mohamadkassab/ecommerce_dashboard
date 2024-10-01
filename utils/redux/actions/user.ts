import { getAllUsersService, getAllRolesService, createUserService } from "@/services/userService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllUsers = createAsyncThunk('getAllUsers', async () => {
    const response = await getAllUsersService();
    return response;
});


export const getAllRoles = createAsyncThunk('getAllRoles', async () => {
  const response = await getAllRolesService();
  return response;
});


export const createUser = createAsyncThunk('createUser', async (formData: any ) => {
  const response = await createUserService(formData);
  return response;
});