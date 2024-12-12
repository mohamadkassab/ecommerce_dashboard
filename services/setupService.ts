import { APIROUTES } from '@/utils/constants';
import {apiRequest, apiRequestWithFile} from '@/utils/helpers/apiRequest';

//+------------------------------------------------------------------+
//| Season                                           
//+------------------------------------------------------------------+
export const getAllSeasonsService = async () =>
    apiRequest('GET', APIROUTES.GETALLSEASONS);

export const createSeasonService = async (formData: any) =>
    apiRequest('POST', APIROUTES.CREATESEASON, formData);

export const updateSeasonService = async (formData: any) =>
    apiRequest('PUT', APIROUTES.UPDATESEASON, formData);

export const deleteSeasonService = async (id: number) =>
    apiRequest('DELETE', `${APIROUTES.DELETESEASON}/${id}`);

//+------------------------------------------------------------------+
//| Section                                           
//+------------------------------------------------------------------+
export const getAllSectionsService = async () =>
    apiRequest('GET', APIROUTES.GETALLSECTIONS);
  
export const createSectionService = async (formData: any) =>
    apiRequest('POST', APIROUTES.CREATESECTION, formData);
  
export const updateSectionService = async (formData: any) =>
    apiRequest('PUT', APIROUTES.UPDATESECTION, formData);
  
export const deleteSectionService = async (id: number) =>
    apiRequest('DELETE', `${APIROUTES.DELETESECTION}/${id}`);

//+------------------------------------------------------------------+
//| Country                                           
//+------------------------------------------------------------------+
export const getAllCountriesService = async () =>
    apiRequest('GET', APIROUTES.GETALLCOUNTRIES);
  
export const createCountryService = async (formData: any) =>
    apiRequest('POST', APIROUTES.CREATECOUNTRY, formData);
  
export const updateCountryService = async (formData: any) =>
    apiRequest('PUT', APIROUTES.UPDATECOUNTRY, formData);
  
export const deleteCountryService = async (id: number) =>
    apiRequest('DELETE', `${APIROUTES.DELETECOUNTRY}/${id}`);

//+------------------------------------------------------------------+
//| Category                                           
//+------------------------------------------------------------------+
export const getAllCategoriesService = async () =>
    apiRequest('GET', APIROUTES.GETALLCATEGORIES);
  
export const createCategoryService = async (formData: any) =>
    apiRequest('POST', APIROUTES.CREATECATEGORY, formData);
  
export const updateCategoryService = async (formData: any) =>
    apiRequest('PUT', APIROUTES.UPDATECATEGORY, formData);
  
export const deleteCategoryService = async (id: number) =>
    apiRequest('DELETE', `${APIROUTES.DELETECATEGORY}/${id}`);

//+------------------------------------------------------------------+
//| Year                                           
//+------------------------------------------------------------------+
export const getAllYearsService = async () =>
    apiRequest('GET', APIROUTES.GETALLYEARS);
  
export const createYearService = async (formData: any) =>
    apiRequest('POST', APIROUTES.CREATEYEAR, formData);
  
export const updateYearService = async (formData: any) =>
    apiRequest('PUT', APIROUTES.UPDATEYEAR, formData);
  
export const deleteYearService = async (id: number) =>
    apiRequest('DELETE', `${APIROUTES.DELETEYEAR}/${id}`);

//+------------------------------------------------------------------+
//| Tag                                           
//+------------------------------------------------------------------+
export const getAllTagsService = async () =>
    apiRequest('GET', APIROUTES.GETALLTAGS);
  
export const createTagService = async (formData: any) =>
    apiRequest('POST', APIROUTES.CREATETAG, formData);
  
export const updateTagService = async (formData: any) =>
    apiRequest('PUT', APIROUTES.UPDATETAG, formData);
  
export const deleteTagService = async (id: number) =>
    apiRequest('DELETE', `${APIROUTES.DELETETAG}/${id}`);

//+------------------------------------------------------------------+
//| Attribute                                           
//+------------------------------------------------------------------+
export const getAllAttributesService = async () =>
    apiRequest('GET', APIROUTES.GETALLATTRIBUTES);
  
export const createAttributeService = async (formData: any) =>
    apiRequest('POST', APIROUTES.CREATEATTRIBUTE, formData);
  
export const updateAttributeService = async (formData: any) =>
    apiRequest('PUT', APIROUTES.UPDATEATTRIBUTE, formData);
  
export const deleteAttributeService = async (id: number) =>
    apiRequest('DELETE', `${APIROUTES.DELETEATTRIBUTE}/${id}`);

//+------------------------------------------------------------------+
//| Brand                                           
//+------------------------------------------------------------------+
export const getAllBrandsService = async () =>
    apiRequest('GET', APIROUTES.GETALLBRANDS);
  
export const createBrandService = async (formData: any) =>
    apiRequestWithFile('POST', APIROUTES.CREATEBRAND, formData);
  
export const updateBrandService = async (formData: any) =>
    apiRequestWithFile('PUT', APIROUTES.UPDATEBRAND, formData);
  
export const deleteBrandService = async (id: number) =>
    apiRequest('DELETE', `${APIROUTES.DELETEBRAND}/${id}`);

//+------------------------------------------------------------------+
//| Currency                                           
//+------------------------------------------------------------------+
export const getAllCurrenciesService = async () =>
    apiRequest('GET', APIROUTES.GETALLCURRENCIES);
  
export const createCurrencyService = async (formData: any) =>
    apiRequest('POST', APIROUTES.CREATECURRENCY, formData);
  
export const updateCurrencyService = async (formData: any) =>
    apiRequest('PUT', APIROUTES.UPDATECURRENCY, formData);
  
export const deleteCurrencyService = async (id: number) =>
    apiRequest('DELETE', `${APIROUTES.DELETECURRENCY}/${id}`);

//+------------------------------------------------------------------+
//| Supplier                                           
//+------------------------------------------------------------------+
export const getAllSuppliersService = async () =>
    apiRequest('GET', APIROUTES.GETALLSUPPLIERS);
  
export const createSupplierService = async (formData: any) =>
    apiRequest('POST', APIROUTES.CREATESUPPLIER, formData);
  
export const updateSupplierService = async (formData: any) =>
    apiRequest('PUT', APIROUTES.UPDATESUPPLIER, formData);
  
export const deleteSupplierService = async (id: number) =>
    apiRequest('DELETE', `${APIROUTES.DELETESUPPLIER}/${id}`);

//+------------------------------------------------------------------+
//| Shipping method                                           
//+------------------------------------------------------------------+
export const getAllShippingMService = async () =>
    apiRequest('GET', APIROUTES.GETALLSHIPPINGM);
  
export const createShippingMService = async (formData: any) =>
    apiRequestWithFile('POST', APIROUTES.CREATESHIPPINGM, formData);
  
export const updateShippingMService = async (formData: any) =>
    apiRequestWithFile('PUT', APIROUTES.UPDATESHIPPINGM, formData);
  
export const deleteShippingMService = async (id: number) =>
    apiRequest('DELETE', `${APIROUTES.DELETESHIPPINGM}/${id}`);

//+------------------------------------------------------------------+
//| Payment method                                           
//+------------------------------------------------------------------+
export const getAllPaymentMService = async () =>
    apiRequest('GET', APIROUTES.GETALLPAYMENTM);
  
export const createPaymentMService = async (formData: any) =>
    apiRequestWithFile('POST', APIROUTES.CREATEPAYMENTM, formData);
  
export const updatePaymentMService = async (formData: any) =>
    apiRequestWithFile('PUT', APIROUTES.UPDATEPAYMENTM, formData);
  
export const deletePaymentMService = async (id: number) =>
    apiRequest('DELETE', `${APIROUTES.DELETEPAYMENTM}/${id}`);