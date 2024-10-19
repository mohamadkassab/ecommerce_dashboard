import { APIROUTES, GLOBAL_REQUEST_TIMEOUT } from '@/utils/constants';
import axios from 'axios';


export const getAllUsersService = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${APIROUTES.GETALLUSERS}`, {
        headers: {
          
        },
        timeout: GLOBAL_REQUEST_TIMEOUT,
      });

      return response;
    } catch (e) {
      
    }
  };

  export const getAllRolesService = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${APIROUTES.GETALLROLES}`, {
        headers: {
          
        },
        timeout: GLOBAL_REQUEST_TIMEOUT,
      });

      return response;
    } catch (e) {
      
    }
  };

  export const createUserService = async (formData: any) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${APIROUTES.CREATEUSER}`,
        formData, {
        headers: {
          'Accept': '*/*', 
          'Content-Type': 'application/json',
        },
        timeout: GLOBAL_REQUEST_TIMEOUT,
      });

      return response;
    } catch (e) {
  
    }
  };

  export const updateUserService = async (formData: any) => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}${APIROUTES.UPDATEUSER}`,
        formData, {
        headers: {
          'Accept': '*/*', 
          'Content-Type': 'application/json',
        },
        timeout: GLOBAL_REQUEST_TIMEOUT,
      });

      return response;
    } catch (e) {
  
    }
  };

  export const deleteUserService = async (id: number) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}${APIROUTES.DELETEUSER}`,  {
        data:  id , 
        headers: {
          'Content-Type': 'application/json', 
        },
        timeout: GLOBAL_REQUEST_TIMEOUT,
      });

      return response;
    } catch (e) {
      console.log(e)
    }
  };
