import { createAsyncThunk } from '@reduxjs/toolkit';
import { siginUser, signoutService } from '@/services/authService';
import { SigninModel } from '@/models/AuthModels';



export const signin = createAsyncThunk('signin', async (credentials: { formData: SigninModel }) => {
    const response = await siginUser(credentials.formData);
    return response?.token;
  });

  export const signout = createAsyncThunk('signout', async () => {
    await signoutService();
  });

  export const setIdle = createAsyncThunk('setIdle', async () => {
    return true;
  });

  export const setUser = createAsyncThunk('setUser', async () => {
    return true;
  });
  
  