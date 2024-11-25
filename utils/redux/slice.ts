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
import { createCountry, deleteCountry, getAllCountries, updateCountry } from './actions/country';

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
      state.status = StatusModel.SUCCESS;
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
      state.status = StatusModel.OK;
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

  },
});

export default slice.reducer;






// //+------------------------------------------------------------------+
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
