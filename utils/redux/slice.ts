// src/slices/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { ActionReducerMapBuilder, AsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AUTHTOKEN } from '../constants';
import Cookies from 'js-cookie';
import { createChart, deleteChart, getAllCharts } from './actions/kpi';
import { changePassword, createRole, createUser, deleteRole, deleteUser, getAllPermissions, getAllRoles, getAllUsers, setIdle, setUser, signin, signout, updateRole, updateUser } from './actions/user';
import jwt from 'jsonwebtoken';
import { StatusModel } from '@/models/StatusModel';
import { createAttribute, createBrand, createCategory, createCountry, createCurrency, createSeason, createSection, createSupplier, createTag, deleteAttribute, deleteBrand, deleteCategory, deleteCurrency, deleteSeason, deleteSection, deleteSupplier, deleteTag, getAllAttributes, getAllBrandNames, getAllBrands, getAllCategories, getAllCategoryNames, getAllCountries, getAllCountryNames, getAllCurrencies, getAllPaymentM, getAllSeasonNames, getAllSeasons, getAllSections, getAllShippingM, getAllSupplierNames, getAllSuppliers, getAllTagNames, getAllTags, updateAttribute, updateBrand, updateCategory, updateCountry, updateCurrency, updatePaymentM, updateSeason, updateSection, updateShippingM, updateSupplier, updateTag } from './actions/setup';
import { TokenModel } from '@/models/TokenModel';
import { ChartModel } from '@/models/ChartModel';
import { UserModel } from '@/models/UserModel';
import { RoleModel } from '@/models/RoleModel';
import { PermissionModel } from '@/models/PermissionModel';
import { CountryModel } from '@/models/CountryModel';
import { CategoryModel } from '@/models/CategoryModel';
import { SeasonModel } from '@/models/SeasonModel';
import { SectionModel } from '@/models/SectionModel';
import { TagModel } from '@/models/TagModel';
import { AttributeModel } from '@/models/AttributeModel';
import { BrandModel } from '@/models/BrandModel';
import { ShippingMModel } from '@/models/ShippingMModel';
import { PaymentMModel } from '@/models/PaymentMModel';
import { createProduct, createProductContent, createTransaction, getAllProductContents, getAllProducts, getAllTransactions, getProductMedia, updateProduct, updateProductContent } from './actions/product';
import { ProductModel } from '@/models/ProductModel';
import { ProductContentModel } from '@/models/ProductContentModel';
import { TransactionModel } from '@/models/Transaction';


interface InitialState {
  user?: TokenModel | null;
  allCharts?: ChartModel[];
  allUsers?: UserModel[];
  allRoles?: RoleModel[];
  allPermissions?: PermissionModel[];
  allCountries?: CountryModel[];
  allCountryNames?: string[];
  allCategories?: CategoryModel[];
  allCategoryNames?: string[];
  allSeasons?: SeasonModel[];
  allSeasonNames?: string[];
  allSections?: SectionModel[];
  allTags?: TagModel[];
  allTagNames?: string[];
  allAttributes?: AttributeModel[];
  allBrands?: BrandModel[];
  allBrandNames?: string[];
  allCurrencies?: CurrencyModel[];
  allSuppliers?: SupplierModel[];
  allSupplierNames?: string[];
  allShippingM?: ShippingMModel[];
  allPaymentM?: PaymentMModel[];
  allProducts?: ProductModel[];
  allProductContents?: ProductContentModel[];
  allProductMedia?: File[];
  allTransactions?: TransactionModel[];
  status: StatusModel;
  error: string | null | object;
}

const initialState: InitialState = {
  status: StatusModel.IDLE,
  error: null,
};

//+------------------------------------------------------------------+
//| Helper function to decode and verify JWT token                                           
//+------------------------------------------------------------------+
const decodeAndVerifyToken = (token: string | undefined): TokenModel | null => {
  if (!token) return null;
  const decoded = jwt.decode(token) as TokenModel | null;
  if (decoded?.exp && decoded.exp > Math.floor(Date.now() / 1000)) {
    return decoded;
  }
  return null;
};

//+------------------------------------------------------------------+
//| Helper function to check if payload contains error                                          
//+------------------------------------------------------------------+
function isErrorPayload(payload: any): payload is { error: any } {
  return payload && typeof payload.error !== "undefined";
}

//+------------------------------------------------------------------+
//| Utility to handle common async action states (pending, fulfilled, rejected)                                          
//+------------------------------------------------------------------+
const handleAsyncAction = <T>(
  builder: ActionReducerMapBuilder<InitialState>, 
  action: AsyncThunk<T, any, {}>, 
  onSuccess: (state: InitialState, action: PayloadAction<T>) => void
) => {
  builder
    .addCase(action.pending, (state) => {
      state.status = StatusModel.LOADING;
      state.error = null;
    })
    .addCase(action.fulfilled, (state, action) => {
      onSuccess(state, action);
      if (isErrorPayload(action.payload)) {
        state.error = action.payload.error.response.data.message || "Failed";
        state.status = StatusModel.FAILED;
      }else{
        state.status = StatusModel.SUCCESS;
      }
    })
    .addCase(action.rejected, (state, action) => {
      state.error = action.error?.message || null;
      state.status = StatusModel.FAILED;
    });
};

const handleAsyncActionWithoutSuccess = <T>(
  builder: ActionReducerMapBuilder<InitialState>, 
  action: AsyncThunk<T, any, {}>, 
  onSuccess: (state: InitialState, action: PayloadAction<T>) => void
) => {
  builder
    .addCase(action.pending, (state) => {
      state.status = StatusModel.LOADING;
      state.error = null;
    })
    .addCase(action.fulfilled, (state, action) => {
      onSuccess(state, action);
      if (isErrorPayload(action.payload)) {
        state.error = action.payload.error.response.data.message || "Failed";
        state.status = StatusModel.FAILED;
      }else{
        state.status = StatusModel.OK;
      }
    })
    .addCase(action.rejected, (state, action) => {
      state.error = action.error?.message || null;
      state.status = StatusModel.FAILED;
    });
};

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

    //+------------------------------------------------------------------+
    //| Attribute                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, getAllAttributes, (state, action) => {
      if (!action.payload.error) {
        state.allAttributes = action.payload || [];
      }       
    });
    handleAsyncAction(builder, createAttribute, () => {});
    handleAsyncAction(builder, updateAttribute, () => {});
    handleAsyncAction(builder, deleteAttribute, () => {});

    //+------------------------------------------------------------------+
    //| Brand                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, getAllBrands, (state, action) => {
      if (!action.payload.error) {
        state.allBrands = action.payload || [];
      }       
    });
    handleAsyncActionWithoutSuccess(builder, getAllBrandNames, (state, action) => {
      if (!action.payload.error) {
        state.allBrandNames = (action.payload || []).map((item: any) => item?.name);
      }     
    });
    handleAsyncAction(builder, createBrand, () => {});
    handleAsyncAction(builder, updateBrand, () => {});
    handleAsyncAction(builder, deleteBrand, () => {});

    //+------------------------------------------------------------------+
    //| Category                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, getAllCategories, (state, action) => {
      if (!action.payload.error) {
        state.allCategories = action.payload || [];
      }       
    });
    handleAsyncActionWithoutSuccess(builder, getAllCategoryNames, (state, action) => {
      if (!action.payload.error) {
        state.allCategoryNames = (action.payload || []).map((item: any) => item?.name);
      }     
    });
    handleAsyncAction(builder, createCategory, () => {});
    handleAsyncAction(builder, updateCategory, () => {});
    handleAsyncAction(builder, deleteCategory, () => {});

    //+------------------------------------------------------------------+
    //| Country                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, getAllCountries, (state, action) => {  
      if (!action.payload.error) {
        state.allCountries = action.payload || [];
      }     
    });
    handleAsyncActionWithoutSuccess(builder, getAllCountryNames, (state, action) => {
      if (!action.payload.error) {
        state.allCountryNames = (action.payload || []).map((item: any) => item?.name);
      }     
    });
    handleAsyncAction(builder, createCountry, () => {});
    handleAsyncAction(builder, updateCountry, () => {});

    //+------------------------------------------------------------------+
    //| Currency                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, getAllCurrencies, (state, action) => {
      if (!action.payload.error) {
        state.allCurrencies = action.payload || [];
      }       
    });
    handleAsyncAction(builder, createCurrency, () => {});
    handleAsyncAction(builder, updateCurrency, () => {});
    handleAsyncAction(builder, deleteCurrency, () => {});

    //+------------------------------------------------------------------+
    //| Kpi                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, getAllCharts, (state, action) => {
      if (!action.payload.error) {
        state.allCharts = action.payload || [];
      }
    });
    handleAsyncAction(builder, createChart, () => {});
    handleAsyncAction(builder, deleteChart, () => {});

    //+------------------------------------------------------------------+
    //| Payment method                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, getAllPaymentM, (state, action) => {
      if (!action.payload.error) {
        state.allPaymentM = action.payload || [];
      }       
    });
    handleAsyncAction(builder, updatePaymentM, () => {}); 

    //+------------------------------------------------------------------+
    //| Permission                                           
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, getAllPermissions, (state, action) => {
      if (!action.payload.error) {
        state.allPermissions = action.payload || [];
      }
    });

    //+------------------------------------------------------------------+
    //| Product                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, getAllProducts, (state, action) => {
      if (!action.payload.error) {
        state.allProducts = action.payload || [];
      }
    });
    handleAsyncAction(builder, createProduct, () => {});
    handleAsyncAction(builder, updateProduct, () => {});

    //+------------------------------------------------------------------+
    //| Product content                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, getAllProductContents, (state, action) => {
      if (!action.payload.error) {
        state.allProductContents = action.payload || [];
      }
    });
    handleAsyncActionWithoutSuccess(builder, getProductMedia, (state, action) => {
      if (!action.payload.error) {
        state.allProductMedia = action.payload || [];
      }
    });
    handleAsyncAction(builder, createProductContent, () => {});
    handleAsyncAction(builder, updateProductContent, () => {});

    //+------------------------------------------------------------------+
    //| Role                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, getAllRoles, (state, action) => {
      if (!action.payload.error) {
        state.allRoles = action.payload || [];
      }
    });
    handleAsyncAction(builder, createRole, () => {});
    handleAsyncAction(builder, updateRole, () => {});
    handleAsyncAction(builder, deleteRole, () => {});

    //+------------------------------------------------------------------+
    //| Season                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, getAllSeasons, (state, action) => {
      if (!action.payload.error) {
        state.allSeasons = action.payload || [];
      }       
    });
    handleAsyncActionWithoutSuccess(builder, getAllSeasonNames, (state, action) => {
      if (!action.payload.error) {
        state.allSeasonNames = (action.payload || []).map((item: any) => item?.name);
      }     
    });
    handleAsyncAction(builder, createSeason, () => {});
    handleAsyncAction(builder, updateSeason, () => {});
    handleAsyncAction(builder, deleteSeason, () => {});

    //+------------------------------------------------------------------+
    //| Section                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, getAllSections, (state, action) => {
      if (!action.payload.error) {
        state.allSections = action.payload || [];
      }       
    });
    handleAsyncAction(builder, createSection, () => {});
    handleAsyncAction(builder, updateSection, () => {});
    handleAsyncAction(builder, deleteSection, () => {});

    //+------------------------------------------------------------------+
    //| Shipping method                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, getAllShippingM, (state, action) => {
      if (!action.payload.error) {
        state.allShippingM = action.payload || [];
      }       
    });
    handleAsyncAction(builder, updateShippingM, () => {});

    //+------------------------------------------------------------------+
    //| Supplier                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, getAllSuppliers, (state, action) => {
      if (!action.payload.error) {
        state.allSuppliers = action.payload || [];
      }       
    });
    handleAsyncActionWithoutSuccess(builder, getAllSupplierNames, (state, action) => {
      if (!action.payload.error) {
        state.allSupplierNames = (action.payload || []).map((item: any) => item?.name);
      }     
    });
    handleAsyncAction(builder, createSupplier, () => {});
    handleAsyncAction(builder, updateSupplier, () => {});
    handleAsyncAction(builder, deleteSupplier, () => {});

    //+------------------------------------------------------------------+
    //| Tag                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, getAllTags, (state, action) => {
      if (!action.payload.error) {
        state.allTags = action.payload || [];
      }       
    });
    handleAsyncActionWithoutSuccess(builder, getAllTagNames, (state, action) => {
      if (!action.payload.error) {
        state.allTagNames = (action.payload || []).map((item: any) => item?.name);
      }     
    });
    handleAsyncAction(builder, createTag, () => {});
    handleAsyncAction(builder, updateTag, () => {});
    handleAsyncAction(builder, deleteTag, () => {});

    //+------------------------------------------------------------------+
    //| Transaction                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, getAllTransactions, (state, action) => {
      if (!action.payload.error) {
        state.allTransactions = action.payload || [];
      }       
    });
    handleAsyncAction(builder, createTransaction, () => {});

    //+------------------------------------------------------------------+
    //| User                                            
    //+------------------------------------------------------------------+
    builder.addCase(signin.pending, (state) => {
      state.status = StatusModel.LOADING;
    })
    .addCase(signin.fulfilled, (state, action) => {
      if (action.payload) {
        const decodedToken = jwt.decode(action.payload) as TokenModel | null;
        if (decodedToken) {
          state.user = decodedToken;
        }
        const expirationMinutes = 720;
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + expirationMinutes * 60 * 1000);

        Cookies.set(AUTHTOKEN, action.payload, {
          expires: expirationDate,
          secure: true,
          sameSite: 'Strict',
        });
        state.status = StatusModel.SIGNINSUCCESSFUL;
      } else {
        state.status = StatusModel.FAILED;
      }
    })
    .addCase(signin.rejected, (state, action) => {
      state.error = action.error?.message || null;
      state.status = StatusModel.FAILED;
    });    
    builder.addCase(signout.fulfilled, (state) => {
      state.status = StatusModel.SIGNOUTSUCCESSFUL;
      state.user = null;
      Cookies.remove(AUTHTOKEN);
    });
    builder.addCase(setUser.fulfilled, (state) => {
      if (!state.user) {
        const jwtToken = Cookies.get(AUTHTOKEN);
        if (jwtToken) {
          const decodedToken = decodeAndVerifyToken(jwtToken);
          if (decodedToken) {
            state.user = decodedToken;
          }
        }
      }
    });
    builder.addCase(setIdle.fulfilled, (state) => {
      state.status = StatusModel.IDLE;
      state.error = null;
    });
    handleAsyncActionWithoutSuccess(builder, getAllUsers, (state, action) => {
      state.allUsers = action.payload || [];
    });
    handleAsyncAction(builder, createUser, () => {});
    handleAsyncAction(builder, updateUser, () => {});
    handleAsyncAction(builder, deleteUser, () => {});
    handleAsyncAction(builder, changePassword, () => {}); 
  },
});

export default slice.reducer;






//        //+------------------------------------------------------------------+
//       //| Create Chart                                            
//       //+------------------------------------------------------------------+
//       .addCase(createChart.pending, (state) => {
//         state.status = StatusModel.loading;
//       })
//       .addCase(createChart.fulfilled, (state, action) => {
//         const response = action.payload;
//         if (response) {
//           const hasError = (response as { error?: unknown })?.error !== undefined;
//           const errorMessage = (response as { error?: { response?: { data?: { message?: string } } } })?.error?.response?.data?.message;
//           if (hasError) {
//             if(errorMessage){
//               state.error = errorMessage;
//             }else{
//               state.status = StatusModel.failed;
//             }
//           } else {
//             state.status = StatusModel.success;
//           }
//         } else {
//           state.status = StatusModel.failed;
//         }
//       })
//       .addCase(createChart.rejected, (state, action) => {
//         state.error = action.error?.message || null;
//         state.status = StatusModel.failed;
//       })

//       //+------------------------------------------------------------------+
//       //| Get All Charts                                            
//       //+------------------------------------------------------------------+
//       .addCase(getAllCharts.pending, (state) => {
//         state.status = StatusModel.loading;
//       })
//       .addCase(getAllCharts.fulfilled, (state, action) => {
//         if (action.payload && action.payload) {
//           state.allCharts = action.payload;
//           state.status = StatusModel.ok;
//         } else {
//           state.status = StatusModel.failed;
//         }
//       })
//       .addCase(getAllCharts.rejected, (state, action) => {
//         state.error = action.error?.message || null;
//         state.status = StatusModel.failed;
//       })
