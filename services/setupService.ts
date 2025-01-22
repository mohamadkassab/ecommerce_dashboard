import { AttributeWithOptionsModel } from '@/models/AttributeWithOptionsModel';
import { CategoryModel } from '@/models/CategoryModel';
import { CountryModel } from '@/models/CountryModel';
import { SeasonModel } from '@/models/SeasonModel';
import { APIROUTES } from '@/utils/constants';
import {ApiRequest, ApiRequestWithFile} from '@/utils/helpers/apiRequest';

//+------------------------------------------------------------------+
//| Attribute                                           
//+------------------------------------------------------------------+
export const GetAllAttributesWithOptionsService = async () =>
    ApiRequest('GET', APIROUTES.GETALLATTRIBUTESWITHOPTIONS);

export const GetAllAttributesService = async () =>
    ApiRequest('GET', APIROUTES.GETALLATTRIBUTES);
  
export const CreateAttributeService = async (formData: AttributeWithOptionsModel) =>
    ApiRequest('POST', APIROUTES.CREATEATTRIBUTE, formData);
  
export const UpdateAttributeService = async (formData: AttributeWithOptionsModel) =>
    ApiRequest('PUT', APIROUTES.UPDATEATTRIBUTE, formData);
  
export const DeleteAttributeService = async (id: number) =>
    ApiRequest('DELETE', `${APIROUTES.DELETEATTRIBUTE}/${id}`);

//+------------------------------------------------------------------+
//| Brand                                           
//+------------------------------------------------------------------+
export const GetAllBrandsService = async () =>
    ApiRequest('GET', APIROUTES.GETALLBRANDS);
  
export const CreateBrandService = async (formData: any) =>
    ApiRequestWithFile('POST', APIROUTES.CREATEBRAND, formData);
  
export const UpdateBrandService = async (formData: any) =>
    ApiRequestWithFile('PUT', APIROUTES.UPDATEBRAND, formData);

//+------------------------------------------------------------------+
//| Category                                           
//+------------------------------------------------------------------+
export const GetAllCategoriesService = async () =>
    ApiRequest('GET', APIROUTES.GETALLCATEGORIES);
  
export const CreateCategoryService = async (formData: CategoryModel) =>
    ApiRequest('POST', APIROUTES.CREATECATEGORY, formData);
  
export const UpdateCategoryService = async (formData: CategoryModel) =>
    ApiRequest('PUT', APIROUTES.UPDATECATEGORY, formData);
  
export const DeleteCategoryService = async (id: number) =>
    ApiRequest('DELETE', `${APIROUTES.DELETECATEGORY}/${id}`);

//+------------------------------------------------------------------+
//| Country                                           
//+------------------------------------------------------------------+
export const GetAllCountriesService = async () =>
    ApiRequest('GET', APIROUTES.GETALLCOUNTRIES);
  
export const CreateCountryService = async (formData: CountryModel) =>
    ApiRequest('POST', APIROUTES.CREATECOUNTRY, formData);
  
export const UpdateCountryService = async (formData: CountryModel) =>
    ApiRequest('PUT', APIROUTES.UPDATECOUNTRY, formData);

//+------------------------------------------------------------------+
//| Currency                                           
//+------------------------------------------------------------------+
export const GetAllCurrenciesService = async () =>
    ApiRequest('GET', APIROUTES.GETALLCURRENCIES);
  
export const CreateCurrencyService = async (formData: CurrencyModel) =>
    ApiRequest('POST', APIROUTES.CREATECURRENCY, formData);
  
export const UpdateCurrencyService = async (formData: CurrencyModel) =>
    ApiRequest('PUT', APIROUTES.UPDATECURRENCY, formData);
  
export const DeleteCurrencyService = async (id: number) =>
    ApiRequest('DELETE', `${APIROUTES.DELETECURRENCY}/${id}`);

//+------------------------------------------------------------------+
//| Season                                           
//+------------------------------------------------------------------+
export const GetAllSeasonsService = async () =>
    ApiRequest('GET', APIROUTES.GETALLSEASONS);

export const CreateSeasonService = async (formData: SeasonModel) =>
    ApiRequest('POST', APIROUTES.CREATESEASON, formData);

export const UpdateSeasonService = async (formData: SeasonModel) =>
    ApiRequest('PUT', APIROUTES.UPDATESEASON, formData);

//+------------------------------------------------------------------+
//| Shipping method                                           
//+------------------------------------------------------------------+
export const GetAllShippingMService = async () =>
    ApiRequest('GET', APIROUTES.GETALLSHIPPINGM);
  
export const CreateShippingMService = async (formData: any) =>
    ApiRequestWithFile('POST', APIROUTES.CREATESHIPPINGM, formData);

export const UpdateShippingMService = async (formData: any) =>
    ApiRequestWithFile('PUT', APIROUTES.UPDATESHIPPINGM, formData);

//+------------------------------------------------------------------+
//| Supplier                                           
//+------------------------------------------------------------------+
export const GetAllSuppliersService = async () =>
    ApiRequest('GET', APIROUTES.GETALLSUPPLIERS);
  
export const CreateSupplierService = async (formData: SupplierModel) =>
    ApiRequest('POST', APIROUTES.CREATESUPPLIER, formData);
  
export const UpdateSupplierService = async (formData: SupplierModel) =>
    ApiRequest('PUT', APIROUTES.UPDATESUPPLIER, formData);

