// src/slices/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { AUTHTOKEN } from '../constants';
import Cookies from 'js-cookie';
import { setIdle, setUser, signin, signout } from './actions/auth';
import { createChart, deleteChart, getAllCharts } from './actions/kpi';
import { createRole, createUser, deleteRole, deleteUser, getAllPermissions, getAllRoles, getAllUsers, updateRole, updateUser } from './actions/user';
import { act } from 'react';
import jwt from 'jsonwebtoken';

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
  status: 'idle' | 'loading' | 'success' | 'failed' | 'loginSuccessful' | 'signOutSuccessful' |  'ok' | 'chartDeleted' | 'skeletonLoading';
  error: string | null | object;

}

const initialState: InitialState = {
  status: 'idle',
  error: null,
};


const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      ///////////////////////////////////////////////////////////

      //SetIdle
      .addCase(setIdle.fulfilled, (state, action) => {
        state.status = 'idle';
        state.error = null;
      })

      ///////////////////////////////////////////////////////////

      // Signin
      .addCase(signin.pending, (state) => {
        state.status = 'loading';
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
          state.status = 'loginSuccessful';
        } else {
          state.status = 'failed';
        }
      })
      .addCase(signin.rejected, (state, action) => {
        state.error = action.error?.message || null;
        state.status = 'failed';
      })

      ///////////////////////////////////////////////////////////
     
      // SetUser
      .addCase(setUser.fulfilled, (state) => {
        if(state.user === undefined){
          const jwtToken = Cookies.get(AUTHTOKEN);
          if (jwtToken) {
            const decodedToken = jwt.decode(jwtToken);
            if (decodedToken && typeof decodedToken === 'object' && decodedToken.exp) {
              const currentTime = Math.floor(Date.now() / 1000);
              if (decodedToken.exp > currentTime) {
                state.user = decodedToken as UserToken | null;
              } 
            }
          }
        }
      })

      ///////////////////////////////////////////////////////////
     
      // Signout
      .addCase(signout.fulfilled, (state) => {
        state.status = 'signOutSuccessful';
      })

      ///////////////////////////////////////////////////////////

      //CreateChart
      .addCase(createChart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createChart.fulfilled, (state, action) => {
        const response = action.payload;
        if (response) {
          const hasError = (response as { error?: unknown })?.error !== undefined;
          const errorMessage = (response as { error?: { response?: { data?: { message?: string } } } })?.error?.response?.data?.message;
          if (hasError) {
            if(errorMessage){
              state.error = errorMessage;
            }else{
              state.status = 'failed';
            }
          } else {
            state.status = 'success';
          }
        } else {
          state.status = 'failed';
        }
      })
      .addCase(createChart.rejected, (state, action) => {
        state.error = action.error?.message || null;
        state.status = 'failed';
      })

      ///////////////////////////////////////////////////////////

      //GetAllCharts
      .addCase(getAllCharts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllCharts.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          state.allCharts = action.payload.data;
          state.status = 'ok';
        } else {
          state.status = 'failed';
        }
      })
      .addCase(getAllCharts.rejected, (state, action) => {
        state.error = action.error?.message || null;
        state.status = 'failed';
      })

      ///////////////////////////////////////////////////////////

      //DeleteChart
      .addCase(deleteChart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteChart.fulfilled, (state, action) => {
        const response = action.payload;
        if (response) {
          const hasError = (response as { error?: unknown })?.error !== undefined;
          const errorMessage = (response as { error?: { response?: { data?: { message?: string } } } })?.error?.response?.data?.message;
          if (hasError) {
            if(errorMessage){
              state.error = errorMessage;
            }else{
              state.status = 'failed';
            }
          } else {
            state.status = 'success';
          }
        } else {
          state.status = 'failed';
        }
      })
      .addCase(deleteChart.rejected, (state, action) => {
        state.error = action.error?.message || null;
        state.status = 'failed';
      })

      ///////////////////////////////////////////////////////////

      //GetAllUsers
      .addCase(getAllUsers.pending, (state) => {
        state.status = 'skeletonLoading';
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          state.allUsers = action.payload.data;
          state.status = 'ok';
        } else {
          state.status = 'failed';
        }
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.error?.message || null;
        state.status = 'failed';
      })

      ///////////////////////////////////////////////////////////

      //GetAllRoles
      .addCase(getAllRoles.pending, (state) => {
        state.status = 'skeletonLoading';
      })
      .addCase(getAllRoles.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          state.allRoles = action.payload.data;
          state.status = 'ok';
        } else {
          state.status = 'failed';
        }
      })
      .addCase(getAllRoles.rejected, (state, action) => {
        state.error = action.error?.message || null;
        state.status = 'failed';
      })

      ///////////////////////////////////////////////////////////

      //GetAllPermissions
      .addCase(getAllPermissions.pending, (state) => {
        state.status = 'skeletonLoading';
      })
      .addCase(getAllPermissions.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          state.allPermissions = action.payload.data;
          state.status = 'ok';
        } else {
          state.status = 'failed';
        }
      })
      .addCase(getAllPermissions.rejected, (state, action) => {
        state.error = action.error?.message || null;
        state.status = 'failed';
      })
      
      ///////////////////////////////////////////////////////////

      //CreateUser
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        const response = action.payload;
        if (response) {
          const hasError = (response as { error?: unknown })?.error !== undefined;
          const errorMessage = (response as { error?: { response?: { data?: { message?: string } } } })?.error?.response?.data?.message;
          if (hasError) {
            if(errorMessage){
              state.error = errorMessage;
            }else{
              state.status = 'failed';
            }
          } else {
            state.status = 'success';
          }
        } else {
          state.status = 'failed';
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.error?.message || null;
        state.status = 'failed';
      })

      ///////////////////////////////////////////////////////////

      //UpdateUser
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const response = action.payload;
        if (response) {
          const hasError = (response as { error?: unknown })?.error !== undefined;
          const errorMessage = (response as { error?: { response?: { data?: { message?: string } } } })?.error?.response?.data?.message;
          if (hasError) {
            if(errorMessage){
              state.error = errorMessage;
            }else{
              state.status = 'failed';
            }
          } else {
            state.status = 'success';
          }
        } else {
          state.status = 'failed';
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error?.message || null;
        state.status = 'failed';
      })

      ///////////////////////////////////////////////////////////

      //DeleteUser
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const response = action.payload;
        if (response) {
          const hasError = (response as { error?: unknown })?.error !== undefined;
          const errorMessage = (response as { error?: { response?: { data?: { message?: string } } } })?.error?.response?.data?.message;
          if (hasError) {
            if(errorMessage){
              state.error = errorMessage;
            }else{
              state.status = 'failed';
            }
          } else {
            state.status = 'success';
          }
        } else {
          state.status = 'failed';
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error?.message || null;
        state.status = 'failed';
      })

      ///////////////////////////////////////////////////////////

      //CreateRole
      .addCase(createRole.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createRole.fulfilled, (state, action) => {
        const response = action.payload;
        if (response) {
          const hasError = (response as { error?: unknown })?.error !== undefined;
          const errorMessage = (response as { error?: { response?: { data?: { message?: string } } } })?.error?.response?.data?.message;
          if (hasError) {
            if(errorMessage){
              state.error = errorMessage;
            }else{
              state.status = 'failed';
            }
          } else {
            state.status = 'success';
          }
        } else {
          state.status = 'failed';
        }
      })
      .addCase(createRole.rejected, (state, action) => {
        state.error = action.error?.message || null;
        state.status = 'failed';
      })
  
      ///////////////////////////////////////////////////////////

      //UpdateUser
      .addCase(updateRole.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        const response = action.payload;
        if (response) {
          const hasError = (response as { error?: unknown })?.error !== undefined;
          const errorMessage = (response as { error?: { response?: { data?: { message?: string } } } })?.error?.response?.data?.message;
          if (hasError) {
            if(errorMessage){
              state.error = errorMessage;
            }else{
              state.status = 'failed';
            }
          } else {
            state.status = 'success';
          }
        } else {
          state.status = 'failed';
        }
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.error = action.error?.message || null;
        state.status = 'failed';
      })
  
      ///////////////////////////////////////////////////////////

      //DeleteUser
      .addCase(deleteRole.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        const response = action.payload;
        if (response) {
          const hasError = (response as { error?: unknown })?.error !== undefined;
          const errorMessage = (response as { error?: { response?: { data?: { message?: string } } } })?.error?.response?.data?.message;
          if (hasError) {
            if(errorMessage){
              state.error = errorMessage;
            }else{
              state.status = 'failed';
            }
          } else {
            state.status = 'success';
          }
        } else {
          state.status = 'failed';
        }
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.error = action.error?.message || null;
        state.status = 'failed';
      })

      ///////////////////////////////////////////////////////////

  },
});


export default slice.reducer;
