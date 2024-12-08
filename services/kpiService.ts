import { APIROUTES } from '@/utils/constants';
import {apiRequest} from '@/utils/helpers/apiRequest';


export const createChartService = async (formData: any) =>
  apiRequest('POST', APIROUTES.CREATECHART, formData);

export const getAllChartsService = async () =>
  apiRequest('GET', APIROUTES.GETALLCHARTS);

export const deleteChartService = async (id: number) =>
  apiRequest('DELETE', `${APIROUTES.DELETECHART}/${id}`);

