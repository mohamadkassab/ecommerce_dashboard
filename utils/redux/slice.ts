// src/slices/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { AUTHTOKEN } from '../constants';
import Cookies from 'js-cookie';
import { setIdle, signin, signout } from './actions/auth';
import { createChart, deleteChart, getAllCharts } from './actions/kpi';
import { getAllRoles, getAllUsers } from './actions/user';





interface InitialState {
  allCharts? : any[];
  allUsers? : any[];
  allRoles?: any[];
  status: 'idle' | 'loading' | 'success' | 'failed' | 'loginSuccessful' | 'ok' | 'chartDeleted';
  error: string | null;
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

      // Signin
      .addCase(signin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signin.fulfilled, (state, action) => {
        if (action.payload) { 
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


       // Signout
      .addCase(signout.fulfilled, (state) => {


      })


      //CreateChart
      .addCase(createChart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createChart.fulfilled, (state, action) => {
        if (action.payload) { 
          state.status = 'success'; 
        } else {
          state.status = 'failed';
        }
      })
      .addCase(createChart.rejected, (state, action) => {
        state.error = action.error?.message || null; 
        state.status = 'failed';
      })

      
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


      //DeleteChart
      .addCase(deleteChart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteChart.fulfilled, (state, action) => {
        state.status = 'chartDeleted'; 
      })
      .addCase(deleteChart.rejected, (state, action) => {
        state.error = action.error?.message || null; 
        state.status = 'failed';
      })


        //SetIdle
      .addCase(setIdle.fulfilled, (state, action) => {
        state.status = 'idle'; 
      })

      //GetAllUsers
      .addCase(getAllUsers.pending, (state) => {
        state.status = 'loading';
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

         //GetAllRoles
         .addCase(getAllRoles.pending, (state) => {
          state.status = 'loading';
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
    
  },
});


export default slice.reducer;
