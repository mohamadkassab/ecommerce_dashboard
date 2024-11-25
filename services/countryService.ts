import { APIROUTES } from '@/utils/constants';
import apiRequest from '@/utils/helpers/apiRequest';


export const getAllCountriesService = async () =>
  apiRequest('GET', APIROUTES.GETALLCOUNTRIES);

export const createCountryService = async (formData: any) =>
  apiRequest('POST', APIROUTES.CREATECOUNTRY, formData);

export const updateCountryService = async (formData: any) =>
  apiRequest('PUT', APIROUTES.UPDATECOUNTRY, formData);

export const deleteCountryService = async (id: number) =>
  apiRequest('DELETE', APIROUTES.DELETECOUNTRY, { id });