import { APIROUTES } from '@/utils/constants';
import {apiRequest} from '@/utils/helpers/apiRequest';


export const getAllUsersService = async () =>
  apiRequest('GET', APIROUTES.GETALLUSERS);

export const getAllRolesService = async () =>
  apiRequest('GET', APIROUTES.GETALLROLES);

export const getAllPermissionsService = async () =>
  apiRequest('GET', APIROUTES.GETALLPERMISSIONS);

export const createRoleService = async (formData: any) =>
  apiRequest('POST', APIROUTES.CREATEROLE, formData);

export const updateRoleService = async (formData: any) =>
  apiRequest('PUT', APIROUTES.UPDATEROLE, formData);

export const deleteRoleService = async (id: number) =>{
  apiRequest('DELETE', `${APIROUTES.DELETEROLE}/${id}`);
}
 

export const createUserService = async (formData: any) =>
  apiRequest('POST', APIROUTES.CREATEUSER, formData);

export const updateUserService = async (formData: any) =>
  apiRequest('PUT', APIROUTES.UPDATEUSER, formData);

export const deleteUserService = async (id: number) =>
  apiRequest('DELETE', `${APIROUTES.DELETEUSER}/${id}`);
