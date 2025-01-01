import { AttributeModel } from "@/models/AttributeModel";
import { BrandModel } from "@/models/BrandModel";
import { CategoryModel } from "@/models/CategoryModel";
import { CountryModel } from "@/models/CountryModel";
import { SeasonModel } from "@/models/SeasonModel";
import { SectionModel } from "@/models/SectionModel";
import { TagModel } from "@/models/TagModel";
import { createAttributeService, createBrandService, createCategoryService, createCountryService, createCurrencyService, createSeasonService, createSectionService, createShippingMService, createSupplierService, createTagService, deleteAttributeService, deleteCategoryService, deleteCurrencyService, deleteSectionService, deleteTagService, getAllAttributesService, getAllBrandsService, getAllCategoriesService, getAllCountriesService, getAllCurrenciesService, getAllSeasonsService, getAllSectionsService, getAllShippingMService, getAllSuppliersService, getAllTagsService, updateAttributeService, updateBrandService, updateCategoryService, updateCountryService, updateCurrencyService, updateSeasonService, updateSectionService, updateShippingMService, updateSupplierService, updateTagService } from "@/services/setupService";
import { createAsyncThunk } from "@reduxjs/toolkit";


//+------------------------------------------------------------------+
//| Attribute                                           
//+------------------------------------------------------------------+
export const getAllAttributes = createAsyncThunk('getAllAttributes', async () => {
  const response = await getAllAttributesService();
  return response;
});
export const createAttribute = createAsyncThunk('createAttribute', async (formData: AttributeModel ) => {
  const response = await createAttributeService(formData);
  return response;
});
export const updateAttribute= createAsyncThunk('updateAttribute', async (formData: AttributeModel ) => {
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
export const getAllBrandNames = createAsyncThunk('getAllBrandNames', async () => {
  const response = await getAllBrandsService();
  return response;
});
export const createBrand = createAsyncThunk('createBrand', async (formData: any ) => {
  const updatedFormData = new FormData();
  Object.keys(formData).forEach(key => {
    updatedFormData.append(key, formData[key]);
  });
  const response = await createBrandService(updatedFormData);
  return response;
});
export const updateBrand = createAsyncThunk('updateBrand', async (formData: any) => {
  const updatedFormData = new FormData();
  Object.keys(formData).forEach(key => {
    updatedFormData.append(key, formData[key]);
  });
  const response = await updateBrandService(updatedFormData);
  return response;
});

//+------------------------------------------------------------------+
//| Category                                           
//+------------------------------------------------------------------+
export const getAllCategories = createAsyncThunk('getAllCategories', async () => {
  const response = await getAllCategoriesService();
  return response;
});
export const getAllCategoryNames = createAsyncThunk('getAllCategoryNames', async () => {
  const response = await getAllCategoriesService();
  return response;
});
export const createCategory = createAsyncThunk('createCategory', async (formData: CategoryModel) => {
  const response = await createCategoryService(formData);
  return response;
});
export const updateCategory = createAsyncThunk('updateCategory', async (formData: CategoryModel) => {
  const response = await updateCategoryService(formData);
  return response;
});
export const deleteCategory = createAsyncThunk('deleteCategory', async (id: number) => {
  const response = await deleteCategoryService(id);
  return response;
});

//+------------------------------------------------------------------+
//| Country                                           
//+------------------------------------------------------------------+
export const getAllCountries = createAsyncThunk('getAllCountries', async () => {
  const response = await getAllCountriesService();
  return response;
});
export const getAllCountryNames = createAsyncThunk('getAllCountryNames', async () => {
  const response = await getAllCountriesService();
  return response;
});
export const createCountry = createAsyncThunk('createCountry', async (formData: CountryModel ) => {
  const response = await createCountryService(formData);
  return response;
});
export const updateCountry = createAsyncThunk('updateCountry', async (formData: CountryModel ) => {
  const response = await updateCountryService(formData);
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

//+------------------------------------------------------------------+
//| Season                                           
//+------------------------------------------------------------------+
export const getAllSeasons = createAsyncThunk('getAllSeasons', async () => {
  const response = await getAllSeasonsService();
  return response;
});
export const getAllSeasonNames = createAsyncThunk('getAllSeasonNames', async () => {
  const response = await getAllSeasonsService();
  return response;
});
export const createSeason = createAsyncThunk('createSeason', async (formData: SeasonModel ) => {
  const response = await createSeasonService(formData);
  return response;
});
export const updateSeason = createAsyncThunk('updateSeason', async (formData: SeasonModel ) => {
  const response = await updateSeasonService(formData);
  return response;
});

//+------------------------------------------------------------------+
//| Section                                           
//+------------------------------------------------------------------+
export const getAllSections = createAsyncThunk('getAllSections', async () => {
  const response = await getAllSectionsService();
  return response;
});
export const createSection = createAsyncThunk('createSection', async (formData: SectionModel ) => {
  const updatedFormData = {
    ...formData,
    categories: formData?.categories?.map((item: any) => item.id)
  };
  const response = await createSectionService(updatedFormData);
  return response;
});
export const updateSection = createAsyncThunk('updateSection', async (formData: SectionModel ) => {
  const updatedFormData = {
    ...formData,
    categories: formData?.categories?.map((item: any) => item.id)
  };
  const response = await updateSectionService(updatedFormData);
  return response;
});
export const deleteSection = createAsyncThunk('deleteSection', async (id: number) => {
  const response = await deleteSectionService(id);
  return response;
});

//+------------------------------------------------------------------+
//| Shipping method                                           
//+------------------------------------------------------------------+
export const getAllShippingM = createAsyncThunk('getAllShippingM', async () => {
  const response = await getAllShippingMService();
  return response;
});
export const createShippingM = createAsyncThunk('createShippingM', async (formData: any) => {
  const updatedFormData = new FormData();
  Object.keys(formData).forEach(key => {
    updatedFormData.append(key, formData[key]);
  });
  const response = await createShippingMService(updatedFormData);
  return response;
});
export const updateShippingM = createAsyncThunk('updateShippingM', async (formData: any) => {
  const updatedFormData = new FormData();
  Object.keys(formData).forEach(key => {
    updatedFormData.append(key, formData[key]);
  });
  const response = await updateShippingMService(updatedFormData);
  return response;
});

//+------------------------------------------------------------------+
//| Supplier                                           
//+------------------------------------------------------------------+
export const getAllSuppliers = createAsyncThunk('getAllSuppliers', async () => {
  const response = await getAllSuppliersService();
  return response;
});
export const getAllSupplierNames = createAsyncThunk('getAllSupplierNames', async () => {
  const response = await getAllSuppliersService();
  return response;
});
export const createSupplier = createAsyncThunk('createSupplier', async (formData: any ) => {
  const response = await createSupplierService(formData);
  return response;
});
export const updateSupplier = createAsyncThunk('updateSupplier', async (formData: any) => {
  const response = await updateSupplierService(formData);
  return response;
});

//+------------------------------------------------------------------+
//| Tag                                           
//+------------------------------------------------------------------+
export const getAllTags = createAsyncThunk('getAllTags', async () => {
  const response = await getAllTagsService();
  return response;
});
export const getAllTagNames = createAsyncThunk('getAllTagNames', async () => {
  const response = await getAllTagsService();
  return response;
});
export const createTag = createAsyncThunk('createTag', async (formData: TagModel ) => {
  const response = await createTagService(formData);
  return response;
});
export const updateTag= createAsyncThunk('updateTag', async (formData: TagModel ) => {
  const response = await updateTagService(formData);
  return response;
});
export const deleteTag= createAsyncThunk('deleteTag', async (id: number) => {
  const response = await deleteTagService(id);
  return response;
});
  










