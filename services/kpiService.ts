import { CreateKpiModel } from '@/models/KpiModels';
import { APIROUTES, GLOBAL_REQUEST_TIMEOUT } from '@/utils/constants';
import { getToken } from '@/utils/functions';
import axios from 'axios';

  export const createChartService = async (formData: CreateKpiModel) => {
    try {
      const token = getToken();
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${APIROUTES.CREATECHART}`,
         { label: formData.label, query: formData.query, chartType: formData.chartType, chartProperties: formData.chartProperties,  }, {
        headers: {
          'Accept': '*/*', 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        timeout: GLOBAL_REQUEST_TIMEOUT,
      });

      return response;
    } catch (e) {
      return {error: e};
    }
  };

  export const getAllChartsService = async () => {
    try {
      const token = getToken();
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${APIROUTES.GETALLCHARTS}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        timeout: GLOBAL_REQUEST_TIMEOUT,
      });

      return response;
    } catch (e) {
      
    }
  };

  export const deleteChartService = async (id: number) => {
    try {
      const token = getToken();
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}${APIROUTES.DELETECHART}`,  {
        data:  id , 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        timeout: GLOBAL_REQUEST_TIMEOUT,
      });

      return response;
    } catch (e) {
      return {error: e};    
    }
  };