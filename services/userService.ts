import { APIROUTES, GLOBAL_REQUEST_TIMEOUT } from '@/utils/constants';
import { getToken } from '@/utils/functions';
import axios from 'axios';


  export const getAllUsersService = async () => {
    try {
      const token = getToken();
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${APIROUTES.GETALLUSERS}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        timeout: GLOBAL_REQUEST_TIMEOUT,
      });

      return response;
    } catch (e) {
      
    }
  };

  export const getAllRolesService = async () => {
    try {
      const token = getToken();
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${APIROUTES.GETALLROLES}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        timeout: GLOBAL_REQUEST_TIMEOUT,
      });
      return response;
    } catch (e) {
      
    }
  };

  export const getAllPermissionsService = async () => {
    try {
      const token = getToken();
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${APIROUTES.GETALLPERMISSIONS}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        timeout: GLOBAL_REQUEST_TIMEOUT,
      });
      return response;
    } catch (e) {
      
    }
  };

  export const createRoleService = async (formData: any) => {
    try {
      const token = getToken();
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${APIROUTES.CREATEROLE}`,
        formData, {
        headers: {
          'Accept': '*/*', 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        timeout: GLOBAL_REQUEST_TIMEOUT,
      });

      return response;
    } catch (e) {
      return {error: e};
    }
  };

  export const updateRoleService = async (formData: any) => {
    try {
      const token = getToken();
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}${APIROUTES.UPDATEROLE}`,
        formData, {
        headers: {
          'Accept': '*/*', 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        timeout: GLOBAL_REQUEST_TIMEOUT,
      });

      return response;
    } catch (e) {
      return {error: e};
    }
  };

  export const deleteRoleService = async (id: number) => {
    try {
      const token = getToken();
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}${APIROUTES.DELETEROLE}`,  {
        data:  id , 
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`,
        },
        timeout: GLOBAL_REQUEST_TIMEOUT,
      });

      return response;
    } catch (e) {
      return {error: e};
    }
  };

  export const createUserService = async (formData: any) => {
    try {
      const token = getToken();
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${APIROUTES.CREATEUSER}`,
        formData, {
        headers: {
          'Accept': '*/*', 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        timeout: GLOBAL_REQUEST_TIMEOUT,
      });
      return response;
    } catch (e) {
      return {error: e};
    }
  };

  export const updateUserService = async (formData: any) => {
    try {
      const token = getToken();
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}${APIROUTES.UPDATEUSER}`,
        formData, {
        headers: {
          'Accept': '*/*', 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        timeout: GLOBAL_REQUEST_TIMEOUT,
      });

      return response;
    } catch (e) {
      return {error: e};
    }
  };

  export const deleteUserService = async (id: number) => {
    try {
      const token = getToken();
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}${APIROUTES.DELETEUSER}`,  {
        data:  id , 
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`,
        },
        timeout: GLOBAL_REQUEST_TIMEOUT,
      });

      return response;
    } catch (e) {
      return {error: e};
    }
  };
