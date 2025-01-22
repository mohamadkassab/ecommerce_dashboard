
import { ProductContentModel } from "@/models/ProductContentModel";
import { ProductModel } from "@/models/ProductModel";
import { TransactionModel } from "@/models/Transaction";
import { APIROUTES } from "@/utils/constants";
import { ApiRequest, ApiRequestWithFile } from "@/utils/helpers/apiRequest";

//+------------------------------------------------------------------+
//| Product                                           
//+------------------------------------------------------------------+
export const GetAllProductsService = async () =>
    ApiRequest('GET', APIROUTES.GETALLPRODUCTS);
  
export const CreateProductService = async (formData: ProductModel) =>
    ApiRequest('POST', APIROUTES.CREATEPRODUCT, formData);
  
export const UpdateProductService = async (formData: ProductModel) =>
    ApiRequest('PUT', APIROUTES.UPDATEPRODUCT, formData);

//+------------------------------------------------------------------+
//| Product content                                       
//+------------------------------------------------------------------+
export const GetAllProductContentsService = async () =>
    ApiRequest('GET', APIROUTES.GETALLPRODUCTCONTENTS);

export const GetProductMediaService = async (productId: number) =>
    ApiRequest('GET', APIROUTES.GETALLPRODUCTMEDIA, null, productId.toString());
  
export const CreateProductContentService = async (formData: any) =>
    ApiRequestWithFile('POST', APIROUTES.CREATEPRODUCTCONTENT, formData, {'Content-Type': 'multipart/form-data'});
  
export const UpdateProductContentService = async (formData: any) =>
    ApiRequestWithFile('PUT', APIROUTES.UPDATEPRODUCTCONTENT, formData, {'Content-Type': 'multipart/form-data'});

//+------------------------------------------------------------------+
//| Transaction                                    
//+------------------------------------------------------------------+
export const GetAllTransactionsService = async () =>
    ApiRequest('GET', APIROUTES.GETALLTRANSACTIONS);
  
export const CreateTransactionService = async (formData: TransactionModel) =>
    ApiRequest('POST', APIROUTES.CREATETRANSACTION, formData);
