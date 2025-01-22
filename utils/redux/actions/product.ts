import { ProductContentModel } from "@/models/ProductContentModel";
import { ProductModel } from "@/models/ProductModel";
import { TransactionModel } from "@/models/Transaction";
import { CreateProductContentService, CreateProductService, CreateTransactionService, GetAllProductContentsService, GetAllProductsService, GetAllTransactionsService, GetProductMediaService, UpdateProductContentService, UpdateProductService } from "@/services/productService";
import { createAsyncThunk } from "@reduxjs/toolkit";

//+------------------------------------------------------------------+
//| Product                                           
//+------------------------------------------------------------------+
export const GetAllProducts = createAsyncThunk('GetAllProducts', async () => {
    const response = await GetAllProductsService();
    return response;
});
export const CreateProduct = createAsyncThunk('CreateProduct', async (formData: ProductModel ) => {
    const response = await CreateProductService(formData);
    return response;
});
export const UpdateProduct = createAsyncThunk('UpdateProduct', async (formData: ProductModel ) => {
    const response = await UpdateProductService(formData);
    return response;
});

//+------------------------------------------------------------------+
//| Product content                                        
//+------------------------------------------------------------------+
export const GetAllProductContents = createAsyncThunk('GetAllProductContents', async () => {
    const response = await GetAllProductContentsService();
    return response;
});
export const GetProductMedia = createAsyncThunk('GetProductMedia', async (productId: number) => {
    const response = await GetProductMediaService(productId);
    return response;
});
export const CreateProductContent = createAsyncThunk('CreateProductContent', async (formData: any ) => {
    const updatedFormData = new FormData();
    Object.keys(formData).forEach(key => {
    updatedFormData.append(key, formData[key]);
    });
    if(formData?.media?.length > 0) {
        for(var x = 0; x < formData.media.length; x++) {
            updatedFormData.append('media', formData.media.item(x));    
        }
    } 
    const response = await CreateProductContentService(updatedFormData);
    return response;
});
export const UpdateProductContent = createAsyncThunk('UpdateProductContent', async (formData: any ) => {
    const updatedFormData = new FormData();
    Object.keys(formData).forEach(key => {
      updatedFormData.append(key, formData[key]);
    });
    if(formData?.media?.length > 0) {
        for(var x = 0; x < formData.media.length; x++) {
            updatedFormData.append('media', formData.media.item(x));    
        }
    } 
    const response = await UpdateProductContentService(updatedFormData);
    return response;
});

//+------------------------------------------------------------------+
//| Transaction                                     
//+------------------------------------------------------------------+
export const GetAllTransactions = createAsyncThunk('GetAllTransactions', async () => {
    const response = await GetAllTransactionsService();
    return response;
});
export const CreateTransaction = createAsyncThunk('CreateTransaction', async (formData: TransactionModel ) => {
    const response = await CreateTransactionService(formData);
    return response;
});
export const UpdateTransaction = createAsyncThunk('UpdateTransaction', async (formData: TransactionModel ) => {
    const response = await CreateTransactionService(formData);
    return response;
});