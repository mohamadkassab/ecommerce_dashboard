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
      console.log(formData)
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
      console.log(e)
    }
  };
