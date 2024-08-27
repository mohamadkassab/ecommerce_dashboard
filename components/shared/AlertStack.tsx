"use client";
import React, { useState, useEffect } from 'react';

import { Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
import { Container } from 'postcss';
import Box from "@mui/material/Box";
import { useAppSelector } from '@/utils/redux/hooks';
import LoadingComponent from './LoadingComponent';


const AlertStack: React.FC = () => {
    const { status, error } = useAppSelector((state: any) => state.reducer);
    const [showError, setShowError] = useState(status === "failed");
    const [showSuccess, setShowSuccess] = useState(status === "success");


    useEffect(() => {
      if (status === "failed") {
        setShowError(true);
  
        const timer = setTimeout(() => {
          setShowError(false);
        }, 2000); 
  
        return () => clearTimeout(timer);
      }else if(status === "success"){
        setShowSuccess(true);
  
        const timer = setTimeout(() => {
          setShowSuccess(false);
        }, 2000); 
  
        return () => clearTimeout(timer);
      }
    }, [status]);

    return(
        <Box>
        <Stack
        spacing={2}
        sx={{ position: "fixed", bottom: 20, left: 20, zIndex: 1400 }}
      >
        {showSuccess && (
          <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
            SUCCESS
          </Alert>
        )}
        {showError && (
          <Alert
            severity="error"
            variant="filled"
            sx={{ width: "100%", bgcolor: (theme) => theme.palette.error.main }}
          >
           {error || "FAILED"} 
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