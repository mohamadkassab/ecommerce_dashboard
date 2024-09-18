
import { SigninModel } from '@/models/AuthModels';
import { APIROUTES, GLOBAL_REQUEST_TIMEOUT } from '@/utils/constants';
import axios from 'axios';

export const siginUser = async (formData: SigninModel) => {
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

export const signoutUser = async () => {
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/logout`);
};

