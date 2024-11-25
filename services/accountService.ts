import { APIROUTES } from '@/utils/constants';
import apiRequest from '@/utils/helpers/apiRequest';

export const changePasswordService = async (formData: any) =>
  apiRequest('POST', APIROUTES.CHANGEPASSWORD, formData);