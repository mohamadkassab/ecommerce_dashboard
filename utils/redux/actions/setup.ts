import { createCategoryService, createCountryService, createSeasonService, createSectionService, createTagService, createYearService, deleteCategoryService, deleteCountryService, deleteSeasonService, deleteSectionService, deleteTagService, deleteYearService, getAllCategoriesService, getAllCountriesService, getAllSeasonsService, getAllSectionsService, getAllTagsService, getAllYearsService, updateCategoryService, updateCountryService, updateSeasonService, updateSectionService, updateTagService, updateYearService } from "@/services/setupService";
import { createAsyncThunk } from "@reduxjs/toolkit";

//+------------------------------------------------------------------+
//| Category                                           
//+------------------------------------------------------------------+
export const getAllCategories = createAsyncThunk('getAllCategories', async () => {
    const response = await getAllCategoriesService();
    return response;
});
export const createCategory = createAsyncThunk('createCategory', async (formData: any ) => {
  const response = await createCategoryService(formData);
  return response;
});
export const updateCategory = createAsyncThunk('updateCategory', async (formData: any ) => {
  const response = await updateCategoryService(formData);
  return response;
});
export const deleteCategory = createAsyncThunk('deleteCategory', async (id: number) => {
  const response = await deleteCategoryService(id);
  return response;
});

//+------------------------------------------------------------------+
//| Section                                           
//+------------------------------------------------------------------+
export const getAllSections = createAsyncThunk('getAllSections', async () => {
    const response = await getAllSectionsService();
    return response;
});
export const createSection = createAsyncThunk('createSection', async (formData: any ) => {
  const response = await createSectionService(formData);
  return response;
});
export const updateSection = createAsyncThunk('updateSection', async (formData: any ) => {
  const response = await updateSectionService(formData);
  return response;
});
export const deleteSection = createAsyncThunk('deleteSection', async (id: number) => {
  const response = await deleteSectionService(id);
  return response;
});

//+------------------------------------------------------------------+
//| Season                                           
//+------------------------------------------------------------------+
export const getAllSeasons = createAsyncThunk('getAllSeasons', async () => {
    const response = await getAllSeasonsService();
    return response;
});
export const createSeason = createAsyncThunk('createSeason', async (formData: any ) => {
  const response = await createSeasonService(formData);
  return response;
});
export const updateSeason = createAsyncThunk('updateSeason', async (formData: any ) => {
  const response = await updateSeasonService(formData);
  return response;
});
export const deleteSeason = createAsyncThunk('deleteSeason', async (id: number) => {
  const response = await deleteSeasonService(id);
  return response;
});

//+------------------------------------------------------------------+
//| Country                                           
//+------------------------------------------------------------------+
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

//+------------------------------------------------------------------+
//| Year                                           
//+------------------------------------------------------------------+
export const getAllYears = createAsyncThunk('getAllYears', async () => {
  const response = await getAllYearsService();
  return response;
});
export const createYear = createAsyncThunk('createYear', async (formData: any ) => {
const response = await createYearService(formData);
return response;
});
export const updateYear = createAsyncThunk('updateYear', async (formData: any ) => {
const response = await updateYearService(formData);
return response;
});
export const deleteYear = createAsyncThunk('deleteYear', async (id: number) => {
const response = await deleteYearService(id);
return response;
});

//+------------------------------------------------------------------+
//| Tag                                           
//+------------------------------------------------------------------+
export const getAllTags = createAsyncThunk('getAllTags', async () => {
  const response = await getAllTagsService();
  return response;
});
export const createTag = createAsyncThunk('createTag', async (formData: any ) => {
const response = await createTagService(formData);
return response;
});
export const updateTag= createAsyncThunk('updateTag', async (formData: any ) => {
const response = await updateTagService(formData);
return response;
});
export const deleteTag= createAsyncThunk('deleteTag', async (id: number) => {
const response = await deleteTagService(id);
return response;
});
  
  
  