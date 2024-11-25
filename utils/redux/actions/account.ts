import { changePasswordService } from "@/services/accountService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const changePassword = createAsyncThunk('changePassword', async (formData: any ) => {
    const response = await changePasswordService(formData);
    return response;
  });