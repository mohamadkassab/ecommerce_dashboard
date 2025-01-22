import { CreateKpiModel } from '@/models/KpiModels';
import { CreateChartService, DeleteChartService, GetAllChartsService } from '@/services/kpiService';
import { createAsyncThunk } from '@reduxjs/toolkit';

//+------------------------------------------------------------------+
//| Kpi                                           
//+------------------------------------------------------------------+
export const GetAllCharts = createAsyncThunk('GetAllCharts', async () => {
  const response = await GetAllChartsService();
  return response;
});

export const CreateChart = createAsyncThunk('CreateChart', async (formData: CreateKpiModel ) => {
    const response = await CreateChartService(formData);
    return response;
});
  
export const DeleteChart = createAsyncThunk('DeleteChart', async (id: number) => {
  const response = await DeleteChartService(id);
  return response;
});