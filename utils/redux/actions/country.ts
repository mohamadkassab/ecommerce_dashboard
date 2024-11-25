import { createCountryService, deleteCountryService, getAllCountriesService, updateCountryService } from "@/services/countryService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllCountries = createAsyncThunk('getAllCountries', async () => {
    const response = await getAllCountriesService();
    return response;
});

export const createCountry = createAsyncThunk('createCountry', async (formData: any ) => {
  const response = await createCountryService(formData);
  return response;
});

export const updateCountry = createAsyncThunk('updateCountry', async (formData: any ) => {
  const response = await updateCountryService(formData);
  return response;
});

export const deleteCountry = createAsyncThunk('deleteCountry', async (id: number) => {
  const response = await deleteCountryService(id);
  return response;
});
  