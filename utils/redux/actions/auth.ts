import { createAsyncThunk } from '@reduxjs/toolkit';
import { sigInUser, signOutService } from '@/services/authService';
import { SigninModel } from '@/models/AuthModels';
import { AUTHTOKEN } from '@/utils/constants';
import Cookies from 'js-cookie';


export const signin = createAsyncThunk('signin', async (credentials: { formData: SigninModel }) => {
    const response = await sigInUser(credentials.formData);
    return response?.token;
  });

  export const signout = createAsyncThunk('signout', async () => {
    await signOutService();
  });

  export const setIdle = createAsyncThunk('setIdle', async () => {
    return true;
  });

  export const setUser = createAsyncThunk('setUser', async () => {
    return true;
  });
  
  