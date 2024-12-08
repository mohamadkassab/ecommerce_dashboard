// src/slices/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { ActionReducerMapBuilder, AsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AUTHTOKEN } from '../constants';
import Cookies from 'js-cookie';
import { setIdle, setUser, signin, signout } from './actions/auth';
import { createChart, deleteChart, getAllCharts } from './actions/kpi';
import { createRole, createUser, deleteRole, deleteUser, getAllPermissions, getAllRoles, getAllUsers, updateRole, updateUser } from './actions/user';
import jwt from 'jsonwebtoken';
import { changePassword } from './actions/account';
import { StatusModel } from '@/models/StatusModel';
import { createAttribute, createBrand, createCategory, createCountry, createSeason, createSection, createTag, createYear, deleteAttribute, deleteBrand, deleteCategory, deleteCountry, deleteSeason, deleteSection, deleteTag, deleteYear, getAllAttributes, getAllBrands, getAllCategories, getAllCountries, getAllSeasons, getAllSections, getAllTags, getAllYears, updateAttribute, updateBrand, updateCategory, updateCountry, updateSeason, updateSection, updateTag, updateYear } from './actions/setup';

interface UserToken {
  username: string;
  jti: string;
  role: string;
  permission: string[];
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}

interface InitialState {
  user?: UserToken | null;
  allCharts?: any[];
  allUsers?: any[];
  allRoles?: any[];
  allPermissions?: any[];
  allCountries?: any[];
  allCategories?: any[];
  allSeasons?: any[];
  allSections?: any[];
  allYears?: any[];
  allTags?: any[];
  allAttributes?: any[];
  allBrands?: any[];
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
const decodeAndVerifyToken = (token: string | undefined): UserToken | null => {
  if (!token) return null;
  const decoded = jwt.decode(token) as UserToken | null;
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
        state.error = action.payload.error.message || "Failed";
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
        state.error = action.payload.error.message || "Failed";
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
    //| Set Idle                                            
    //+------------------------------------------------------------------+
    builder.addCase(setIdle.fulfilled, (state) => {
      state.status = StatusModel.IDLE;
      state.error = null;
    });

    //+------------------------------------------------------------------+
    //| User                                            
    //+------------------------------------------------------------------+
    builder.addCase(signin.pending, (state) => {
      state.status = StatusModel.LOADING;
    })
    .addCase(signin.fulfilled, (state, action) => {
      if (action.payload) {
        const decodedToken = jwt.decode(action.payload) as UserToken | null;
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
    handleAsyncActionWithoutSuccess(builder, getAllUsers, (state, action) => {
      state.allUsers = action.payload || [];
    });
    handleAsyncAction(builder, createUser, () => {});
    handleAsyncAction(builder, updateUser, () => {});
    handleAsyncAction(builder, deleteUser, () => {});
    handleAsyncAction(builder, changePassword, () => {});

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
    //| Permission                                           
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, getAllPermissions, (state, action) => {
      if (!action.payload.error) {
        state.allPermissions = action.payload || [];
      }
    });
    
    //+------------------------------------------------------------------+
    //| Country                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, getAllCountries, (state, action) => {
      if (!action.payload.error) {
        state.allCountries = action.payload || [];
      }       
    });
    handleAsyncAction(builder, createCountry, () => {});
    handleAsyncAction(builder, updateCountry, () => {});
    handleAsyncAction(builder, deleteCountry, () => {});

    //+------------------------------------------------------------------+
    //| Category                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, getAllCategories, (state, action) => {
      if (!action.payload.error) {
        state.allCategories = action.payload || [];
      }       
    });
    handleAsyncAction(builder, createCategory, () => {});
    handleAsyncAction(builder, updateCategory, () => {});
    handleAsyncAction(builder, deleteCategory, () => {});

    //+------------------------------------------------------------------+
    //| Season                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, getAllSeasons, (state, action) => {
      if (!action.payload.error) {
        state.allSeasons = action.payload || [];
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
    //| Year                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, getAllYears, (state, action) => {
      if (!action.payload.error) {
        state.allYears = action.payload || [];
      }       
    });
    handleAsyncAction(builder, createYear, () => {});
    handleAsyncAction(builder, updateYear, () => {});
    handleAsyncAction(builder, deleteYear, () => {});

    //+------------------------------------------------------------------+
    //| Tag                                            
    //+------------------------------------------------------------------+
    handleAsyncActionWithoutSuccess(builder, getAllTags, (state, action) => {
      if (!action.payload.error) {
        state.allTags = action.payload || [];
      }       
    });
    handleAsyncAction(builder, createTag, () => {});
    handleAsyncAction(builder, updateTag, () => {});
    handleAsyncAction(builder, deleteTag, () => {});

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
    handleAsyncAction(builder, createBrand, () => {});
    handleAsyncAction(builder, updateBrand, () => {});
    handleAsyncAction(builder, deleteBrand, () => {});

      
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
