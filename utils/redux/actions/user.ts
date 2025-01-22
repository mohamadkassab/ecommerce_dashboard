import { SigninModel } from "@/models/AuthModels";
import { RoleModel } from "@/models/RoleModel";
import { UserChangePasswordModel } from "@/models/UserChangePasswordModel";
import { UserModel } from "@/models/UserModel";
import { GetAllUsersService, GetAllRolesService, CreateUserService, UpdateUserService, GetAllPermissionsService, CreateRoleService, UpdateRoleService, DeleteRoleService, ChangePasswordService, SignoutService, SiginUser } from "@/services/userService";
import { createAsyncThunk } from "@reduxjs/toolkit";

//+------------------------------------------------------------------+
//| Permission                                           
//+------------------------------------------------------------------+
export const GetAllPermissions = createAsyncThunk('GetAllPermissions', async () => {
  const response = await GetAllPermissionsService();
  return response;
});

//+------------------------------------------------------------------+
//| Role                                           
//+------------------------------------------------------------------+
export const GetAllRoles = createAsyncThunk('GetAllRoles', async () => {
  const response = await GetAllRolesService();
  return response;
});
export const CreateRole = createAsyncThunk('CreateRole', async (formData: RoleModel ) => {
  const updatedFormData = {
    ...formData,
    permissions: formData?.permissions?.map((permission: any) => permission.id)
  };
  const response = await CreateRoleService(updatedFormData);
  return response;
});
export const UpdateRole = createAsyncThunk('UpdateRole', async (formData: RoleModel ) => {
  const updatedFormData = {
    ...formData,
    permissions: formData?.permissions?.map((permission: any) => permission.id)
  };
  const response = await UpdateRoleService(updatedFormData);
  return response;
});
export const DeleteRole = createAsyncThunk('DeleteRole', async (id: number) => {
  const response = await DeleteRoleService(id);
  return response;
});
export const GetAllUsers = createAsyncThunk('GetAllUsers', async () => {
    const response = await GetAllUsersService();
    return response;
});

//+------------------------------------------------------------------+
//| User                                           
//+------------------------------------------------------------------+
export const Signin = createAsyncThunk('Signin', async (credentials: { formData: SigninModel }) => {
  const response = await SiginUser(credentials.formData);
  return response?.token;
});
export const Signout = createAsyncThunk('Signout', async () => {
  await SignoutService();
});
export const SetIdle = createAsyncThunk('SetIdle', async () => {
  return true;
});
export const SetUser = createAsyncThunk('SetUser', async () => {
  return true;
});
export const CreateUser = createAsyncThunk('CreateUser', async (formData: UserModel ) => {
  const updatedFormData = {
    ...formData,
    roles: formData?.roles?.map((role: any) => role.id)
  };
  const response = await CreateUserService(updatedFormData);
  return response;
});
export const UpdateUser = createAsyncThunk('UpdateUser', async (formData: UserModel ) => {
  const updatedFormData = {
    ...formData,
    roles: formData?.roles?.map((role: any) => role.id)
  };
  const response = await UpdateUserService(updatedFormData);
  return response;
});
export const ChangePassword = createAsyncThunk('ChangePassword', async (formData: any ) => {
    const response = await ChangePasswordService(formData);
    return response;
});