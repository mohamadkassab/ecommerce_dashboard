"use client";
import React, { useState, useEffect } from 'react';

import { Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
import { Container } from 'postcss';
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from '@/utils/redux/hooks';
import LoadingComponent from './LoadingComponent';
import { setIdle } from '@/utils/redux/actions/auth';



const AlertStack: React.FC = () => {
    const { status, error } = useAppSelector((state: any) => state.reducer);
    const [showError, setShowError] = useState(status === "failed");
    const [showSuccess, setShowSuccess] = useState(status === "success");
    const dispatch = useAppDispatch();



    useEffect(() => {
      if (status === "failed") {
        dispatch(setIdle());
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 1000); 
      }else if(status === "success"){
        dispatch(setIdle());
        setShowSuccess(true);
  
        setTimeout(() => {
          setShowSuccess(false);
        }, 1000); 
      }
    }, [status]);

    return(
        <Box>
        <Stack
        spacing={2}
        sx={{ position: "fixed", bottom: 20, left: 20, zIndex: 1400 }}
      >
        {showSuccess && (
          <Alert severity="success" variant="filled" sx={{ width: "100%",  color: "white" }}>
            SUCCESS
          </Alert>
        )}
        {showError && (
          <Alert
            severity="error"
            variant="filled"
            sx={{ width: "100%", bgcolor: (theme) => theme.palette.error.main }}
          >
           {error?.error || "FAILED"} 
          </Alert>
        )}
      </Stack>
      {status === "loading" && (
        <LoadingComponent  />
      )}
      </Box>
    );
};

export default AlertStack;