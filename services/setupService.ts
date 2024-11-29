import { APIROUTES } from '@/utils/constants';
import apiRequest from '@/utils/helpers/apiRequest';

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
    apiRequest('DELETE',  `${APIROUTES.DELETESEASON}/${id}`);


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
    apiRequest('DELETE',  `${APIROUTES.DELETESECTION}/${id}`);

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
    apiRequest('DELETE',  `${APIROUTES.DELETECATEGORY}/${id}`);

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
    apiRequest('DELETE',  `${APIROUTES.DELETEYEAR}/${id}`);

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
    apiRequest('DELETE',  `${APIROUTES.DELETETAG}/${id}`);