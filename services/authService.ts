
import { SigninModel } from '@/models/AuthModels';
import { APIROUTES, AUTHTOKEN, GLOBAL_REQUEST_TIMEOUT } from '@/utils/constants';
import {apiRequest} from '@/utils/helpers/apiRequest';
import axios from 'axios';
import Cookies from 'js-cookie';

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
}


