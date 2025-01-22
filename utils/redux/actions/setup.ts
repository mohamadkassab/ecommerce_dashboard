import { AttributeWithOptionsModel } from "@/models/AttributeWithOptionsModel";
import { CategoryModel } from "@/models/CategoryModel";
import { CountryModel } from "@/models/CountryModel";
import { SeasonModel } from "@/models/SeasonModel";
import { CreateAttributeService, CreateBrandService, CreateCategoryService, CreateCountryService, CreateCurrencyService, CreateSeasonService, CreateShippingMService, CreateSupplierService, DeleteAttributeService, DeleteCategoryService, DeleteCurrencyService, GetAllAttributesService, GetAllAttributesWithOptionsService, GetAllBrandsService, GetAllCategoriesService, GetAllCountriesService, GetAllCurrenciesService, GetAllSeasonsService, GetAllShippingMService, GetAllSuppliersService, UpdateAttributeService, UpdateBrandService, UpdateCategoryService, UpdateCountryService, UpdateCurrencyService, UpdateSeasonService, UpdateShippingMService, UpdateSupplierService } from "@/services/setupService";
import { createAsyncThunk } from "@reduxjs/toolkit";


//+------------------------------------------------------------------+
//| Attribute                                           
//+------------------------------------------------------------------+
export const GetAllAttributesWithOptions = createAsyncThunk('GetAllAttributesWithOptions', async () => {
  const response = await GetAllAttributesWithOptionsService();
  return response;
});
export const GetAllAttributes = createAsyncThunk('GetAllAttributes', async () => {
  const response = await GetAllAttributesService();
  return response;
});
export const CreateAttribute = createAsyncThunk('CreateAttribute', async (formData: AttributeWithOptionsModel ) => {
  const response = await CreateAttributeService(formData);
  return response;
});
export const UpdateAttribute = createAsyncThunk('UpdateAttribute', async (formData: AttributeWithOptionsModel ) => {
  const response = await UpdateAttributeService(formData);
  return response;
});
export const DeleteAttribute= createAsyncThunk('DeleteAttribute', async (id: number) => {
  const response = await DeleteAttributeService(id);
  return response;
});

//+------------------------------------------------------------------+
//| Brand                                           
//+------------------------------------------------------------------+
export const GetAllBrands = createAsyncThunk('GetAllBrands', async () => {
  const response = await GetAllBrandsService();
  return response;
});
export const GetAllBrandNames = createAsyncThunk('GetAllBrandNames', async () => {
  const response = await GetAllBrandsService();
  return response;
});
export const CreateBrand = createAsyncThunk('CreateBrand', async (formData: any ) => {
  const updatedFormData = new FormData();
  Object.keys(formData).forEach(key => {
    updatedFormData.append(key, formData[key]);
  });
  const response = await CreateBrandService(updatedFormData);
  return response;
});
export const UpdateBrand = createAsyncThunk('UpdateBrand', async (formData: any) => {
  const updatedFormData = new FormData();
  Object.keys(formData).forEach(key => {
    updatedFormData.append(key, formData[key]);
  });
  const response = await UpdateBrandService(updatedFormData);
  return response;
});

//+------------------------------------------------------------------+
//| Category                                           
//+------------------------------------------------------------------+
export const GetAllCategories = createAsyncThunk('GetAllCategories', async () => {
  const response = await GetAllCategoriesService();
  return response;
});
export const GetAllCategoryNames = createAsyncThunk('GetAllCategoryNames', async () => {
  const response = await GetAllCategoriesService();
  return response;
});
export const CreateCategory = createAsyncThunk('CreateCategory', async (formData: CategoryModel) => {
  const response = await CreateCategoryService(formData);
  return response;
});
export const UpdateCategory = createAsyncThunk('UpdateCategory', async (formData: CategoryModel) => {
  const response = await UpdateCategoryService(formData);
  return response;
});
export const DeleteCategory = createAsyncThunk('DeleteCategory', async (id: number) => {
  const response = await DeleteCategoryService(id);
  return response;
});

//+------------------------------------------------------------------+
//| Country                                           
//+------------------------------------------------------------------+
export const GetAllCountries = createAsyncThunk('GetAllCountries', async () => {
  const response = await GetAllCountriesService();
  return response;
});
export const GetAllCountryNames = createAsyncThunk('GetAllCountryNames', async () => {
  const response = await GetAllCountriesService();
  return response;
});
export const CreateCountry = createAsyncThunk('CreateCountry', async (formData: CountryModel ) => {
  const response = await CreateCountryService(formData);
  return response;
});
export const UpdateCountry = createAsyncThunk('UpdateCountry', async (formData: CountryModel ) => {
  const response = await UpdateCountryService(formData);
  return response;
});

//+------------------------------------------------------------------+
//| Currency                                           
//+------------------------------------------------------------------+
export const GetAllCurrencies = createAsyncThunk('GetAllCurrencies', async () => {
  const response = await GetAllCurrenciesService();
  return response;
});
export const CreateCurrency = createAsyncThunk('CreateCurrency', async (formData: any ) => {
  const response = await CreateCurrencyService(formData);
  return response;
});
export const UpdateCurrency = createAsyncThunk('UpdateCurrency', async (formData: any) => {
  const response = await UpdateCurrencyService(formData);
  return response;
});
export const DeleteCurrency = createAsyncThunk('DeleteCurrency', async (id: number) => {
  const response = await DeleteCurrencyService(id);
  return response;
});

//+------------------------------------------------------------------+
//| Season                                           
//+------------------------------------------------------------------+
export const GetAllSeasons = createAsyncThunk('GetAllSeasons', async () => {
  const response = await GetAllSeasonsService();
  return response;
});
export const GetAllSeasonNames = createAsyncThunk('GetAllSeasonNames', async () => {
  const response = await GetAllSeasonsService();
  return response;
});
export const CreateSeason = createAsyncThunk('CreateSeason', async (formData: SeasonModel ) => {
  const response = await CreateSeasonService(formData);
  return response;
});
export const UpdateSeason = createAsyncThunk('UpdateSeason', async (formData: SeasonModel ) => {
  const response = await UpdateSeasonService(formData);
  return response;
});

//+------------------------------------------------------------------+
//| Shipping method                                           
//+------------------------------------------------------------------+
export const GetAllShippingM = createAsyncThunk('GetAllShippingM', async () => {
  const response = await GetAllShippingMService();
  return response;
});
export const CreateShippingM = createAsyncThunk('CreateShippingM', async (formData: any) => {
  const updatedFormData = new FormData();
  Object.keys(formData).forEach(key => {
    updatedFormData.append(key, formData[key]);
  });
  const response = await CreateShippingMService(updatedFormData);
  return response;
});
export const UpdateShippingM = createAsyncThunk('UpdateShippingM', async (formData: any) => {
  const updatedFormData = new FormData();
  Object.keys(formData).forEach(key => {
    updatedFormData.append(key, formData[key]);
  });
  const response = await UpdateShippingMService(updatedFormData);
  return response;
});

//+------------------------------------------------------------------+
//| Supplier                                           
//+------------------------------------------------------------------+
export const GetAllSuppliers = createAsyncThunk('GetAllSuppliers', async () => {
  const response = await GetAllSuppliersService();
  return response;
});
export const GetAllSupplierNames = createAsyncThunk('GetAllSupplierNames', async () => {
  const response = await GetAllSuppliersService();
  return response;
});
export const CreateSupplier = createAsyncThunk('CreateSupplier', async (formData: any ) => {
  const response = await CreateSupplierService(formData);
  return response;
});
export const UpdateSupplier = createAsyncThunk('UpdateSupplier', async (formData: any) => {
  const response = await UpdateSupplierService(formData);
  return response;
});

  










