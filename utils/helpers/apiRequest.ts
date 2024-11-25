import axios, { AxiosRequestConfig, Method } from 'axios';
import { GLOBAL_REQUEST_TIMEOUT } from '@/utils/constants';
import { getToken } from './funtions';

/**
 * A generic function for making API requests.
 *
 * @param {Method} method - HTTP method (GET, POST, PUT, DELETE).
 * @param {string} url - API endpoint relative to the base URL.
 * @param {any} [data] - Request body data (optional).
 * @param {Record<string, string>} [headers] - Additional headers (optional).
 * @returns {Promise<any>} - API response or error object.
 */
const apiRequest = async (method: Method, url: string, data?: any, headers: Record<string, string> = {}) => {
  try {
    const token = getToken();
    const config: AxiosRequestConfig = {
      method,
      url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...headers,
      },
      timeout: GLOBAL_REQUEST_TIMEOUT,
      ...(data && { data }),
    };

    const response = await axios(config);
    return response?.data;
  } catch (error) {
    console.error(`Error in ${method} request to ${url}:`, error);
    return { error };
  }
};

export default apiRequest;
