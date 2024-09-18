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