import { createAttributeService, createBrandService, createCategoryService, createCountryService, createCurrencyService, createSeasonService, createSectionService, createTagService, createYearService, deleteAttributeService, deleteBrandService, deleteCategoryService, deleteCountryService, deleteCurrencyService, deleteSeasonService, deleteSectionService, deleteTagService, deleteYearService, getAllAttributesService, getAllBrandsService, getAllCategoriesService, getAllCountriesService, getAllCurrenciesService, getAllSeasonsService, getAllSectionsService, getAllTagsService, getAllYearsService, updateAttributeService, updateBrandService, updateCategoryService, updateCountryService, updateCurrencyService, updateSeasonService, updateSectionService, updateTagService, updateYearService } from "@/services/setupService";
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
  const updatedFormData = {
    ...formData,
    categories: formData.categories.map((item: any) => item.id)
  };
  const response = await createSectionService(updatedFormData);
  return response;
});
export const updateSection = createAsyncThunk('updateSection', async (formData: any ) => {
  const updatedFormData = {
    ...formData,
    categories: formData.categories.map((item: any) => item.id)
  };
  const response = await updateSectionService(updatedFormData);
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
  
//+------------------------------------------------------------------+
//| Attribute                                           
//+------------------------------------------------------------------+
export const getAllAttributes = createAsyncThunk('getAllAttributes', async () => {
  const response = await getAllAttributesService();
  return response;
});
export const createAttribute = createAsyncThunk('createAttribute', async (formData: any ) => {
  const response = await createAttributeService(formData);
  return response;
});
export const updateAttribute= createAsyncThunk('updateAttribute', async (formData: any ) => {
  const response = await updateAttributeService(formData);
  return response;
});
export const deleteAttribute= createAsyncThunk('deleteAttribute', async (id: number) => {
  const response = await deleteAttributeService(id);
  return response;
});

//+------------------------------------------------------------------+
//| Brand                                           
//+------------------------------------------------------------------+
export const getAllBrands = createAsyncThunk('getAllBrands', async () => {
  const response = await getAllBrandsService();
  return response;
});
export const createBrand = createAsyncThunk('createBrand', async (formData: any ) => {
  const { logoFile, ...restOfFormData } = formData;
  const updatedFormData = new FormData();
  Object.keys(restOfFormData).forEach(key => {
    updatedFormData.append(key, restOfFormData[key]);
  });
  if (logoFile) {
    updatedFormData.append('logoFile', logoFile);
  }
  const response = await createBrandService(updatedFormData);
  return response;
});
export const updateBrand = createAsyncThunk('updateBrand', async (formData: any) => {
  const { updatedBy, updatedAt, logoFile, ...restOfFormData } = formData;
  const updatedFormData = new FormData();
  Object.keys(restOfFormData).forEach(key => {
    updatedFormData.append(key, restOfFormData[key]);
  });
  if (logoFile && logoFile instanceof File) {
    updatedFormData.append('logoFile', logoFile);
  }
  const response = await updateBrandService(updatedFormData);
  return response;
});
export const deleteBrand = createAsyncThunk('deleteBrand', async (id: number) => {
  const response = await deleteBrandService(id);
  return response;
});

//+------------------------------------------------------------------+
//| Currency                                           
//+------------------------------------------------------------------+
export const getAllCurrencies = createAsyncThunk('getAllCurrencies', async () => {
  const response = await getAllCurrenciesService();
  return response;
});
export const createCurrency = createAsyncThunk('createCurrency', async (formData: any ) => {
  const response = await createCurrencyService(formData);
  return response;
});
export const updateCurrency = createAsyncThunk('updateCurrency', async (formData: any) => {
  const response = await updateCurrencyService(formData);
  return response;
});
export const deleteCurrency = createAsyncThunk('deleteCurrency', async (id: number) => {
  const response = await deleteCurrencyService(id);
  return response;
});

