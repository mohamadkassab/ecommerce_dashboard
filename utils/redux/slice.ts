// src/slices/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, logoutUser } from '@/services/authService';


interface AuthState {
  isAuthenticated: boolean;
  user?: { username: string; role: string }; 
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk('auth/login', async (credentials: { username: string; password: string }) => {
  const response = await loginUser(credentials.username, credentials.password);
  // return response.user;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutUser();
});

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        // state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = undefined;
      });
  },
});


export default slice.reducer;
