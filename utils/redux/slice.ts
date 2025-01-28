// src/slices/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { ActionReducerMapBuilder, AsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AUTHTOKEN } from '../constants';
import Cookies from 'js-cookie';
import { CreateChart, DeleteChart, GetAllCharts } from './actions/kpi';
import { ChangePassword, CreateRole, CreateUser, DeleteRole, GetAllPermissions, GetAllRoles, GetAllUsers, SetIdle, SetUser, Signin, Signout, UpdateRole, UpdateUser } from './actions/user';
import jwt from 'jsonwebtoken';
import { StatusModel } from '@/models/StatusModel';
import { CreateAttribute, CreateBrand, CreateCategory, CreateCountry, CreateCurrency, CreateSeason, CreateSupplier, DeleteAttribute, DeleteCategory, DeleteCurrency, GetAllAttributes, GetAllAttributesWithOptions, GetAllBrandNames, GetAllBrands, GetAllCategories, GetAllCategoryNames, GetAllCountries, GetAllCountryNames, GetAllCurrencies, GetAllSeasonNames, GetAllSeasons, GetAllShippingM, GetAllSupplierNames, GetAllSuppliers, UpdateAttribute, UpdateBrand, UpdateCategory, UpdateCountry, UpdateCurrency, UpdateSeason, UpdateShippingM, UpdateSupplier } from './actions/setup';
import { TokenModel } from '@/models/TokenModel';
import { ChartModel } from '@/models/ChartModel';
import { UserModel } from '@/models/UserModel';
import { RoleModel } from '@/models/RoleModel';
import { PermissionModel } from '@/models/PermissionModel';
import { CountryModel } from '@/models/CountryModel';
import { CategoryModel } from '@/models/CategoryModel';
import { SeasonModel } from '@/models/SeasonModel';
import { AttributeWithOptionsModel } from '@/models/AttributeWithOptionsModel';
import { BrandModel } from '@/models/BrandModel';
import { ShippingMModel } from '@/models/ShippingMModel';
import { CreateProduct, CreateProductContent, CreateTransaction, GetAllProductContents, GetAllProducts, GetAllTransactions, GetProductMedia, UpdateProduct, UpdateProductContent } from './actions/product';
import { ProductModel } from '@/models/ProductModel';
import { ProductContentModel } from '@/models/ProductContentModel';
import { TransactionModel } from '@/models/Transaction';
import { IsErrorPayload } from '../helpers/funtions';


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
  allTagNames?: string[];
  allAttributesWithOptions?: AttributeWithOptionsModel[];
  allAttributes?: string[];
  allBrands?: BrandModel[];
  allBrandNames?: string[];
  allCurrencies?: CurrencyModel[];
  allSuppliers?: SupplierModel[];
  allSupplierNames?: string[];
  allShippingM?: ShippingMModel[];
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
      if (IsErrorPayload(action.payload)) {
        state.error = action.payload?.error?.response?.data?.message || "Failed";
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
      if (IsErrorPayload(action.payload)) {
        state.error = action.payload?.error?.response?.data?.message || "Failed";
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
    handleAsyncActionWithoutSuccess(builder, GetAllAttributesWithOptions, (state, action) => {
      if (!action.payload?.error) {
        state.allAttributesWithOptions = action.payload || [];
      }       
    });
    handleAsyncActionWithoutSuccess(builder, GetAllAttributes, (state, action) => {
      if (!action.payload?.error) {
        state.allAttributes = action.payload || [];
      }       
    });
    handleAsyncAction(builder, CreateAttribute, () => {});
    handleAsyncAction(builder, UpdateAttribute, () => {});
    handleAsyncAction(builder, DeleteAttribute, () => {});

    //+------------------------------------------------------------------+
    //| Brand                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, GetAllBrands, (state, action) => {
      if (!action.payload?.error) {
        state.allBrands = action.payload || [];
      }       
    });
    handleAsyncActionWithoutSuccess(builder, GetAllBrandNames, (state, action) => {
      if (!action.payload?.error) {
        state.allBrandNames = (action.payload || []).map((item: any) => item?.name);
      }     
    });
    handleAsyncAction(builder, CreateBrand, () => {});
    handleAsyncAction(builder, UpdateBrand, () => {});

    //+------------------------------------------------------------------+
    //| Category                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, GetAllCategories, (state, action) => {
      if (!action.payload?.error) {
        state.allCategories = action.payload || [];
      }       
    });
    handleAsyncActionWithoutSuccess(builder, GetAllCategoryNames, (state, action) => {
      if (!action.payload?.error) {
        state.allCategoryNames = (action.payload || []).map((item: any) => item?.name);
      }     
    });
    handleAsyncAction(builder, CreateCategory, () => {});
    handleAsyncAction(builder, UpdateCategory, () => {});
    handleAsyncAction(builder, DeleteCategory, () => {});

    //+------------------------------------------------------------------+
    //| Country                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, GetAllCountries, (state, action) => {  
      if (!action.payload?.error) {
        state.allCountries = action.payload || [];
      }     
    });
    handleAsyncActionWithoutSuccess(builder, GetAllCountryNames, (state, action) => {
      if (!action.payload?.error) {
        state.allCountryNames = (action.payload || []).map((item: any) => item?.name);
      }     
    });
    handleAsyncAction(builder, CreateCountry, () => {});
    handleAsyncAction(builder, UpdateCountry, () => {});

    //+------------------------------------------------------------------+
    //| Currency                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, GetAllCurrencies, (state, action) => {
      if (!action.payload?.error) {
        state.allCurrencies = action.payload || [];
      }       
    });
    handleAsyncAction(builder, CreateCurrency, () => {});
    handleAsyncAction(builder, UpdateCurrency, () => {});
    handleAsyncAction(builder, DeleteCurrency, () => {});

    //+------------------------------------------------------------------+
    //| Kpi                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, GetAllCharts, (state, action) => {
      if (!action.payload?.error) {
        state.allCharts = action.payload || [];
      }
    });
    handleAsyncAction(builder, CreateChart, () => {});
    handleAsyncAction(builder, DeleteChart, () => {});

    //+------------------------------------------------------------------+
    //| Permission                                           
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, GetAllPermissions, (state, action) => {
      if (!action.payload?.error) {
        state.allPermissions = action.payload || [];
      }
    });

    //+------------------------------------------------------------------+
    //| Product                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, GetAllProducts, (state, action) => {
      if (!action.payload?.error) {
        state.allProducts = action.payload || [];
      }
    });
    handleAsyncAction(builder, CreateProduct, () => {});
    handleAsyncAction(builder, UpdateProduct, () => {});

    //+------------------------------------------------------------------+
    //| Product content                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, GetAllProductContents, (state, action) => {
      if (!action.payload?.error) {
        state.allProductContents = action.payload || [];
      }
    });
    handleAsyncActionWithoutSuccess(builder, GetProductMedia, (state, action) => {
      if (!action.payload?.error) {
        state.allProductMedia = action.payload || [];
      }
    });
    handleAsyncAction(builder, CreateProductContent, () => {});
    handleAsyncAction(builder, UpdateProductContent, () => {});

    //+------------------------------------------------------------------+
    //| Role                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, GetAllRoles, (state, action) => {
      if (!action.payload?.error) {
        state.allRoles = action.payload || [];
      }
    });
    handleAsyncAction(builder, CreateRole, () => {});
    handleAsyncAction(builder, UpdateRole, () => {});
    handleAsyncAction(builder, DeleteRole, () => {});

    //+------------------------------------------------------------------+
    //| Season                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, GetAllSeasons, (state, action) => {
      if (!action.payload?.error) {
        state.allSeasons = action.payload || [];
      }       
    });
    handleAsyncActionWithoutSuccess(builder, GetAllSeasonNames, (state, action) => {
      if (!action.payload?.error) {
        state.allSeasonNames = (action.payload || []).map((item: any) => item?.name);
      }     
    });
    handleAsyncAction(builder, CreateSeason, () => {});
    handleAsyncAction(builder, UpdateSeason, () => {});

    //+------------------------------------------------------------------+
    //| Shipping method                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, GetAllShippingM, (state, action) => {
      if (!action.payload?.error) {
        state.allShippingM = action.payload || [];
      }       
    });
    handleAsyncAction(builder, UpdateShippingM, () => {});

    //+------------------------------------------------------------------+
    //| Supplier                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, GetAllSuppliers, (state, action) => {
      if (!action.payload?.error) {
        state.allSuppliers = action.payload || [];
      }       
    });
    handleAsyncActionWithoutSuccess(builder, GetAllSupplierNames, (state, action) => {
      if (!action.payload?.error) {
        state.allSupplierNames = (action.payload || []).map((item: any) => item?.name);
      }     
    });
    handleAsyncAction(builder, CreateSupplier, () => {});
    handleAsyncAction(builder, UpdateSupplier, () => {});

    //+------------------------------------------------------------------+
    //| Transaction                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, GetAllTransactions, (state, action) => {
      if (!action.payload?.error) {
        state.allTransactions = action.payload || [];
      }       
    });
    handleAsyncAction(builder, CreateTransaction, () => {});

    //+------------------------------------------------------------------+
    //| User                                            
    //+------------------------------------------------------------------+
    builder.addCase(Signin.pending, (state) => {
      state.status = StatusModel.LOADING;
    })
    .addCase(Signin.fulfilled, (state, action) => {
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
    .addCase(Signin.rejected, (state, action) => {
      state.error = action.error?.message || null;
      state.status = StatusModel.FAILED;
    });    
    builder.addCase(Signout.fulfilled, (state) => {
      state.status = StatusModel.SIGNOUTSUCCESSFUL;
      state.user = null;
      Cookies.remove(AUTHTOKEN);
    });
    builder.addCase(SetUser.fulfilled, (state) => {
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
    builder.addCase(SetIdle.fulfilled, (state) => {
      state.status = StatusModel.IDLE;
      state.error = null;
    });
    handleAsyncActionWithoutSuccess(builder, GetAllUsers, (state, action) => {
      state.allUsers = action.payload || [];
    });
    handleAsyncAction(builder, CreateUser, () => {});
    handleAsyncAction(builder, UpdateUser, () => {});
    handleAsyncAction(builder, ChangePassword, () => {}); 
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
