import { SigninModel } from '@/models/AuthModels';
import { RoleModel } from '@/models/RoleModel';
import { UserChangePasswordModel } from '@/models/UserChangePasswordModel';
import { UserModel } from '@/models/UserModel';
import { APIROUTES, AUTHTOKEN, GLOBAL_REQUEST_TIMEOUT } from '@/utils/constants';
import {apiRequest} from '@/utils/helpers/apiRequest';
import axios from 'axios';
import Cookies from 'js-cookie';

//+------------------------------------------------------------------+
//| Permission                                          
//+------------------------------------------------------------------+
export const getAllPermissionsService = async () =>
  apiRequest('GET', APIROUTES.GETALLPERMISSIONS);

//+------------------------------------------------------------------+
//| Role                                           
//+------------------------------------------------------------------+
export const getAllRolesService = async () =>
  apiRequest('GET', APIROUTES.GETALLROLES);

export const createRoleService = async (formData: RoleModel) =>
  apiRequest('POST', APIROUTES.CREATEROLE, formData);

export const updateRoleService = async (formData: RoleModel) =>
  apiRequest('PUT', APIROUTES.UPDATEROLE, formData);

export const deleteRoleService = async (id: number) =>{
  apiRequest('DELETE', `${APIROUTES.DELETEROLE}/${id}`);
}
 
//+------------------------------------------------------------------+
//| User                                           
//+------------------------------------------------------------------+
export const sigInUser = async (formData: SigninModel) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${APIROUTES.SIGNIN}`, { username: formData.username, password: formData.password }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: GLOBAL_REQUEST_TIMEOUT,
    });
    return response?.data;
  } catch (e) {
  }
};

export const signOutService = async () =>{
  Cookies.remove(`${AUTHTOKEN}`);
  apiRequest('POST', APIROUTES.SIGNOUT);
};

export const getAllUsersService = async () =>
  apiRequest('GET', APIROUTES.GETALLUSERS);

export const createUserService = async (formData: UserModel) =>
  apiRequest('POST', APIROUTES.CREATEUSER, formData);

export const updateUserService = async (formData: UserModel) =>
  apiRequest('PUT', APIROUTES.UPDATEUSER, formData);

export const changePasswordService = async (formData: UserChangePasswordModel) =>
  apiRequest('POST', APIROUTES.CHANGEPASSWORD, formData);
