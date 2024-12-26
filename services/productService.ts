
import { ProductContentModel } from "@/models/ProductContentModel";
import { ProductModel } from "@/models/ProductModel";
import { TransactionModel } from "@/models/Transaction";
import { APIROUTES } from "@/utils/constants";
import { apiRequest, apiRequestWithFile } from "@/utils/helpers/apiRequest";

//+------------------------------------------------------------------+
//| Product                                           
//+------------------------------------------------------------------+
export const getAllProductsService = async () =>
    apiRequest('GET', APIROUTES.GETALLPRODUCTS);
  
export const createProductService = async (formData: ProductModel) =>
    apiRequest('POST', APIROUTES.CREATEPRODUCT, formData);
  
export const updateProductService = async (formData: ProductModel) =>
    apiRequest('PUT', APIROUTES.UPDATEPRODUCT, formData);

//+------------------------------------------------------------------+
//| Product content                                       
//+------------------------------------------------------------------+
export const getAllProductContentsService = async () =>
    apiRequest('GET', APIROUTES.GETALLPRODUCTCONTENTS);

export const getProductMediaService = async (productId: number) =>
    apiRequest('GET', APIROUTES.GETALLPRODUCTMEDIA, null, productId.toString());
  
export const createProductContentService = async (formData: any) =>
    apiRequestWithFile('POST', APIROUTES.CREATEPRODUCTCONTENT, formData, {'Content-Type': 'multipart/form-data'});
  
export const updateProductContentService = async (formData: any) =>
    apiRequestWithFile('PUT', APIROUTES.UPDATEPRODUCTCONTENT, formData, {'Content-Type': 'multipart/form-data'});

//+------------------------------------------------------------------+
//| Transaction                                    
//+------------------------------------------------------------------+
export const getAllTransactionsService = async () =>
    apiRequest('GET', APIROUTES.GETALLTRANSACTIONS);
  
export const createTransactionService = async (formData: TransactionModel) =>
    apiRequest('POST', APIROUTES.CREATETRANSACTION, formData);
