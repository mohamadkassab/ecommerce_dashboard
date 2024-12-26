import { ProductContentModel } from "@/models/ProductContentModel";
import { ProductModel } from "@/models/ProductModel";
import { TransactionModel } from "@/models/Transaction";
import { createProductContentService, createProductService, createTransactionService, getAllProductContentsService, getAllProductsService, getAllTransactionsService, getProductMediaService, updateProductContentService, updateProductService } from "@/services/productService";
import { createAsyncThunk } from "@reduxjs/toolkit";

//+------------------------------------------------------------------+
//| Product                                           
//+------------------------------------------------------------------+
export const getAllProducts = createAsyncThunk('getAllProducts', async () => {
    const response = await getAllProductsService();
    return response;
});
export const createProduct = createAsyncThunk('createProduct', async (formData: ProductModel ) => {
    const response = await createProductService(formData);
    return response;
});
export const updateProduct = createAsyncThunk('updateProduct', async (formData: ProductModel ) => {
    const response = await updateProductService(formData);
    return response;
});

//+------------------------------------------------------------------+
//| Product content                                        
//+------------------------------------------------------------------+
export const getAllProductContents = createAsyncThunk('getAllProductContents', async () => {
    const response = await getAllProductContentsService();
    return response;
});
export const getProductMedia = createAsyncThunk('getProductMedia', async (productId: number) => {
    const response = await getProductMediaService(productId);
    return response;
});
export const createProductContent = createAsyncThunk('createProductContent', async (formData: any ) => {
    const updatedFormData = new FormData();
    Object.keys(formData).forEach(key => {
    updatedFormData.append(key, formData[key]);
    });
    if(formData?.media?.length > 0) {
        for(var x = 0; x < formData.media.length; x++) {
            updatedFormData.append('media', formData.media.item(x));    
        }
    } 
    const response = await createProductContentService(updatedFormData);
    return response;
});
export const updateProductContent = createAsyncThunk('updateProductContent', async (formData: any ) => {
    const updatedFormData = new FormData();
    Object.keys(formData).forEach(key => {
      updatedFormData.append(key, formData[key]);
    });
    if(formData?.media?.length > 0) {
        for(var x = 0; x < formData.media.length; x++) {
            updatedFormData.append('media', formData.media.item(x));    
        }
    } 
    const response = await updateProductContentService(updatedFormData);
    return response;
});

//+------------------------------------------------------------------+
//| Transaction                                     
//+------------------------------------------------------------------+
export const getAllTransactions = createAsyncThunk('getAllTransactions', async () => {
    const response = await getAllTransactionsService();
    return response;
});
export const createTransaction = createAsyncThunk('createTransaction', async (formData: TransactionModel ) => {
    const response = await createTransactionService(formData);
    return response;
});
export const updateTransaction = createAsyncThunk('updateTransaction', async (formData: TransactionModel ) => {
    const response = await createTransactionService(formData);
    return response;
});