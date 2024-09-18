import { CreateKpiModel } from '@/models/KpiModels';
import { createChartService, deleteChartService, getAllChartsService } from '@/services/kpiService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createChart = createAsyncThunk('createChart', async (formData: CreateKpiModel ) => {
    const response = await createChartService(formData);
    return response;
  });

export const getAllCharts = createAsyncThunk('getAllCharts', async () => {
    const response = await getAllChartsService();
    return response;
  });

  
export const deleteChart = createAsyncThunk('deleteChart', async (id: number) => {
  const response = await deleteChartService(id);
  return response;
});