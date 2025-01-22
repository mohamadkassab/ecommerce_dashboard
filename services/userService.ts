import { SigninModel } from '@/models/AuthModels';
import { RoleModel } from '@/models/RoleModel';
import { UserChangePasswordModel } from '@/models/UserChangePasswordModel';
import { UserModel } from '@/models/UserModel';
import { APIROUTES, AUTHTOKEN, GLOBAL_REQUEST_TIMEOUT } from '@/utils/constants';
import {ApiRequest} from '@/utils/helpers/apiRequest';
import axios from 'axios';
import Cookies from 'js-cookie';

//+------------------------------------------------------------------+
//| Permission                                          
//+------------------------------------------------------------------+
export const GetAllPermissionsService = async () =>
  ApiRequest('GET', APIROUTES.GETALLPERMISSIONS);

//+------------------------------------------------------------------+
//| Role                                           
//+------------------------------------------------------------------+
export const GetAllRolesService = async () =>
  ApiRequest('GET', APIROUTES.GETALLROLES);

export const CreateRoleService = async (formData: RoleModel) =>
  ApiRequest('POST', APIROUTES.CREATEROLE, formData);

export const UpdateRoleService = async (formData: RoleModel) =>
  ApiRequest('PUT', APIROUTES.UPDATEROLE, formData);

export const DeleteRoleService = async (id: number) =>{
  ApiRequest('DELETE', `${APIROUTES.DELETEROLE}/${id}`);
}
 
//+------------------------------------------------------------------+
//| User                                           
//+------------------------------------------------------------------+
export const SiginUser = async (formData: SigninModel) => {
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

export const SignoutService = async () =>{
  Cookies.remove(`${AUTHTOKEN}`);
  ApiRequest('POST', APIROUTES.SIGNOUT);
};

export const GetAllUsersService = async () =>
  ApiRequest('GET', APIROUTES.GETALLUSERS);

export const CreateUserService = async (formData: UserModel) =>
  ApiRequest('POST', APIROUTES.CREATEUSER, formData);

export const UpdateUserService = async (formData: UserModel) =>
  ApiRequest('PUT', APIROUTES.UPDATEUSER, formData);

export const ChangePasswordService = async (formData: UserChangePasswordModel) =>
  ApiRequest('POST', APIROUTES.CHANGEPASSWORD, formData);
