import { AttributeModel } from '@/models/AttributeModel';
import { BrandModel } from '@/models/BrandModel';
import { CategoryModel } from '@/models/CategoryModel';
import { CountryModel } from '@/models/CountryModel';
import { PaymentMModel } from '@/models/PaymentMModel';
import { SeasonModel } from '@/models/SeasonModel';
import { SectionModel } from '@/models/SectionModel';
import { ShippingMModel } from '@/models/ShippingMModel';
import { TagModel } from '@/models/TagModel';
import { YearModel } from '@/models/YearModel';
import { APIROUTES } from '@/utils/constants';
import {apiRequest, apiRequestWithFile} from '@/utils/helpers/apiRequest';

//+------------------------------------------------------------------+
//| Attribute                                           
//+------------------------------------------------------------------+
export const getAllAttributesService = async () =>
    apiRequest('GET', APIROUTES.GETALLATTRIBUTES);
  
export const createAttributeService = async (formData: AttributeModel) =>
    apiRequest('POST', APIROUTES.CREATEATTRIBUTE, formData);
  
export const updateAttributeService = async (formData: AttributeModel) =>
    apiRequest('PUT', APIROUTES.UPDATEATTRIBUTE, formData);
  
export const deleteAttributeService = async (id: number) =>
    apiRequest('DELETE', `${APIROUTES.DELETEATTRIBUTE}/${id}`);

//+------------------------------------------------------------------+
//| Brand                                           
//+------------------------------------------------------------------+
export const getAllBrandsService = async () =>
    apiRequest('GET', APIROUTES.GETALLBRANDS);
  
export const createBrandService = async (formData: BrandModel) =>
    apiRequestWithFile('POST', APIROUTES.CREATEBRAND, formData);
  
export const updateBrandService = async (formData: BrandModel) =>
    apiRequestWithFile('PUT', APIROUTES.UPDATEBRAND, formData);
  
export const deleteBrandService = async (id: number) =>
    apiRequest('DELETE', `${APIROUTES.DELETEBRAND}/${id}`);

//+------------------------------------------------------------------+
//| Category                                           
//+------------------------------------------------------------------+
export const getAllCategoriesService = async () =>
    apiRequest('GET', APIROUTES.GETALLCATEGORIES);
  
export const createCategoryService = async (formData: CategoryModel) =>
    apiRequest('POST', APIROUTES.CREATECATEGORY, formData);
  
export const updateCategoryService = async (formData: CategoryModel) =>
    apiRequest('PUT', APIROUTES.UPDATECATEGORY, formData);
  
export const deleteCategoryService = async (id: number) =>
    apiRequest('DELETE', `${APIROUTES.DELETECATEGORY}/${id}`);

//+------------------------------------------------------------------+
//| Country                                           
//+------------------------------------------------------------------+
export const getAllCountriesService = async () =>
    apiRequest('GET', APIROUTES.GETALLCOUNTRIES);
  
export const createCountryService = async (formData: CountryModel) =>
    apiRequest('POST', APIROUTES.CREATECOUNTRY, formData);
  
export const updateCountryService = async (formData: CountryModel) =>
    apiRequest('PUT', APIROUTES.UPDATECOUNTRY, formData);
  
export const deleteCountryService = async (id: number) =>
    apiRequest('DELETE', `${APIROUTES.DELETECOUNTRY}/${id}`);

//+------------------------------------------------------------------+
//| Currency                                           
//+------------------------------------------------------------------+
export const getAllCurrenciesService = async () =>
    apiRequest('GET', APIROUTES.GETALLCURRENCIES);
  
export const createCurrencyService = async (formData: CurrencyModel) =>
    apiRequest('POST', APIROUTES.CREATECURRENCY, formData);
  
export const updateCurrencyService = async (formData: CurrencyModel) =>
    apiRequest('PUT', APIROUTES.UPDATECURRENCY, formData);
  
export const deleteCurrencyService = async (id: number) =>
    apiRequest('DELETE', `${APIROUTES.DELETECURRENCY}/${id}`);

//+------------------------------------------------------------------+
//| Payment method                                           
//+------------------------------------------------------------------+
export const getAllPaymentMService = async () =>
    apiRequest('GET', APIROUTES.GETALLPAYMENTM);
  
export const updatePaymentMService = async (formData: PaymentMModel) =>
    apiRequestWithFile('PUT', APIROUTES.UPDATEPAYMENTM, formData);

//+------------------------------------------------------------------+
//| Season                                           
//+------------------------------------------------------------------+
export const getAllSeasonsService = async () =>
    apiRequest('GET', APIROUTES.GETALLSEASONS);

export const createSeasonService = async (formData: SeasonModel) =>
    apiRequest('POST', APIROUTES.CREATESEASON, formData);

export const updateSeasonService = async (formData: SeasonModel) =>
    apiRequest('PUT', APIROUTES.UPDATESEASON, formData);

export const deleteSeasonService = async (id: number) =>
    apiRequest('DELETE', `${APIROUTES.DELETESEASON}/${id}`);

//+------------------------------------------------------------------+
//| Section                                           
//+------------------------------------------------------------------+
export const getAllSectionsService = async () =>
    apiRequest('GET', APIROUTES.GETALLSECTIONS);
  
export const createSectionService = async (formData: SectionModel) =>
    apiRequest('POST', APIROUTES.CREATESECTION, formData);
  
export const updateSectionService = async (formData: SectionModel) =>
    apiRequest('PUT', APIROUTES.UPDATESECTION, formData);
  
export const deleteSectionService = async (id: number) =>
    apiRequest('DELETE', `${APIROUTES.DELETESECTION}/${id}`);

//+------------------------------------------------------------------+
//| Shipping method                                           
//+------------------------------------------------------------------+
export const getAllShippingMService = async () =>
    apiRequest('GET', APIROUTES.GETALLSHIPPINGM);
  
export const updateShippingMService = async (formData: ShippingMModel) =>
    apiRequestWithFile('PUT', APIROUTES.UPDATESHIPPINGM, formData);

//+------------------------------------------------------------------+
//| Supplier                                           
//+------------------------------------------------------------------+
export const getAllSuppliersService = async () =>
    apiRequest('GET', APIROUTES.GETALLSUPPLIERS);
  
export const createSupplierService = async (formData: SupplierModel) =>
    apiRequest('POST', APIROUTES.CREATESUPPLIER, formData);
  
export const updateSupplierService = async (formData: SupplierModel) =>
    apiRequest('PUT', APIROUTES.UPDATESUPPLIER, formData);
  
export const deleteSupplierService = async (id: number) =>
    apiRequest('DELETE', `${APIROUTES.DELETESUPPLIER}/${id}`);

//+------------------------------------------------------------------+
//| Tag                                           
//+------------------------------------------------------------------+
export const getAllTagsService = async () =>
    apiRequest('GET', APIROUTES.GETALLTAGS);
  
export const createTagService = async (formData: TagModel) =>
    apiRequest('POST', APIROUTES.CREATETAG, formData);
  
export const updateTagService = async (formData: TagModel) =>
    apiRequest('PUT', APIROUTES.UPDATETAG, formData);
  
export const deleteTagService = async (id: number) =>
    apiRequest('DELETE', `${APIROUTES.DELETETAG}/${id}`);

//+------------------------------------------------------------------+
//| Year                                           
//+------------------------------------------------------------------+
export const getAllYearsService = async () =>
    apiRequest('GET', APIROUTES.GETALLYEARS);
  
export const createYearService = async (formData: YearModel) =>
    apiRequest('POST', APIROUTES.CREATEYEAR, formData);
  
export const updateYearService = async (formData: YearModel) =>
    apiRequest('PUT', APIROUTES.UPDATEYEAR, formData);
  
export const deleteYearService = async (id: number) =>
    apiRequest('DELETE', `${APIROUTES.DELETEYEAR}/${id}`);
