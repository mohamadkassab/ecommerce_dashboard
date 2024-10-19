import { getAllUsersService, getAllRolesService, createUserService, deleteUserService, updateUserService } from "@/services/userService";
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
  const updatedFormData = {
    ...formData,
    roles: formData.roles.map((role: any) => role.id)
  };
  const response = await createUserService(updatedFormData);
  return response;
});

export const updateUser = createAsyncThunk('updateUser', async (formData: any ) => {
  const updatedFormData = {
    ...formData,
    roles: formData.roles.map((role: any) => role.id)
  };
  const response = await updateUserService(updatedFormData);
  return response;
});

export const deleteUser = createAsyncThunk('deleteUser', async (id: number) => {
  const response = await deleteUserService(id);
  return response;
});