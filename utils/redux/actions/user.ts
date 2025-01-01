import { SigninModel } from "@/models/AuthModels";
import { RoleModel } from "@/models/RoleModel";
import { UserChangePasswordModel } from "@/models/UserChangePasswordModel";
import { UserModel } from "@/models/UserModel";
import { getAllUsersService, getAllRolesService, createUserService, updateUserService, getAllPermissionsService, createRoleService, updateRoleService, deleteRoleService, changePasswordService, signOutService, sigInUser } from "@/services/userService";
import { createAsyncThunk } from "@reduxjs/toolkit";

//+------------------------------------------------------------------+
//| Permission                                           
//+------------------------------------------------------------------+
export const getAllPermissions = createAsyncThunk('getAllPermissions', async () => {
  const response = await getAllPermissionsService();
  return response;
});

//+------------------------------------------------------------------+
//| Role                                           
//+------------------------------------------------------------------+
export const getAllRoles = createAsyncThunk('getAllRoles', async () => {
  const response = await getAllRolesService();
  return response;
});
export const createRole = createAsyncThunk('createRole', async (formData: RoleModel ) => {
  const updatedFormData = {
    ...formData,
    permissions: formData?.permissions?.map((permission: any) => permission.id)
  };
  const response = await createRoleService(updatedFormData);
  return response;
});
export const updateRole = createAsyncThunk('updateRole', async (formData: RoleModel ) => {
  const updatedFormData = {
    ...formData,
    permissions: formData?.permissions?.map((permission: any) => permission.id)
  };
  const response = await updateRoleService(updatedFormData);
  return response;
});
export const deleteRole = createAsyncThunk('deleteRole', async (id: number) => {
  const response = await deleteRoleService(id);
  return response;
});
export const getAllUsers = createAsyncThunk('getAllUsers', async () => {
    const response = await getAllUsersService();
    return response;
});

//+------------------------------------------------------------------+
//| User                                           
//+------------------------------------------------------------------+
export const signin = createAsyncThunk('signin', async (credentials: { formData: SigninModel }) => {
  const response = await sigInUser(credentials.formData);
  return response?.token;
});
export const signout = createAsyncThunk('signout', async () => {
  await signOutService();
});
export const setIdle = createAsyncThunk('setIdle', async () => {
  return true;
});
export const setUser = createAsyncThunk('setUser', async () => {
  return true;
});
export const createUser = createAsyncThunk('createUser', async (formData: UserModel ) => {
  const updatedFormData = {
    ...formData,
    roles: formData?.roles?.map((role: any) => role.id)
  };
  const response = await createUserService(updatedFormData);
  return response;
});
export const updateUser = createAsyncThunk('updateUser', async (formData: UserModel ) => {
  const updatedFormData = {
    ...formData,
    roles: formData?.roles?.map((role: any) => role.id)
  };
  const response = await updateUserService(updatedFormData);
  return response;
});
export const changePassword = createAsyncThunk('changePassword', async (formData: any ) => {
    const response = await changePasswordService(formData);
    return response;
});