import { APIROUTES } from '@/utils/constants';
import {ApiRequest} from '@/utils/helpers/apiRequest';

//+------------------------------------------------------------------+
//| Kpi                                           
//+------------------------------------------------------------------+
export const GetAllChartsService = async () =>
  ApiRequest('GET', APIROUTES.GETALLCHARTS);

export const CreateChartService = async (formData: any) =>
  ApiRequest('POST', APIROUTES.CREATECHART, formData);

export const DeleteChartService = async (id: number) =>
  ApiRequest('DELETE', `${APIROUTES.DELETECHART}/${id}`);

