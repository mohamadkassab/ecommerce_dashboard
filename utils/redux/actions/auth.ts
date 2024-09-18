import { createAsyncThunk } from '@reduxjs/toolkit';
import { siginUser, signoutUser } from '@/services/authService';
import { SigninModel } from '@/models/AuthModels';



export const signin = createAsyncThunk('signin', async (credentials: { formData: SigninModel }) => {
    const response = await siginUser(credentials.formData);
    return response?.token;
  });

  export const signout = createAsyncThunk('signout', async () => {
    await signoutUser();
  });

  export const setIdle = createAsyncThunk('setIdle', async () => {
    return true;
  });
  