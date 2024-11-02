"use client";
import React, { useState, useEffect } from 'react';
import { Stack, IconButton, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from '@/utils/redux/hooks';
import LoadingComponent from './LoadingComponent';
import { setIdle } from '@/utils/redux/actions/auth';
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon

const AlertStack: React.FC = () => {
    const { status, error } = useAppSelector((state: any) => state.reducer);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showError, setShowError] = useState(status === "failed");
    const [showSuccess, setShowSuccess] = useState(status === "success");
    const [countdown, setCountdown] = useState(10); // Countdown state
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (status === "failed" || error !== null) {
            setErrorMessage(error);
            dispatch(setIdle());
            setShowError(true);
            setCountdown(6); // Reset countdown on error
        } else if (status === "success") {
            dispatch(setIdle());
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
            }, 1000);
        }
    }, [status, error]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (showError && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setShowError(false);
        }
        return () => clearInterval(timer);
    }, [showError, countdown]);

    const handleCloseError = () => {
        setErrorMessage(null);
        setShowError(false);
        setCountdown(6); // Reset countdown
    };

    return (
        <Box>
            <Stack
                spacing={2}
                sx={{ position: "fixed", bottom: 20, left: 20, zIndex: 1400 }}
            >
                {showSuccess && (
                    <Alert severity="success" variant="filled" sx={{ width: "100%", color: "white" }}>
                        SUCCESS
                    </Alert>
                )}
                {showError && (
                    <Alert
                        severity="error"
                        variant="filled"
                        sx={{ width: "100%", bgcolor: (theme) => theme.palette.error.main }}
                        action={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <IconButton color="inherit" size="small" onClick={handleCloseError}>
                                  <CloseIcon fontSize="small" sx={{ fontSize: '1.2rem' }}/>
                              </IconButton>
                              <Typography color="white">
                                  {countdown > 0 ? `(${countdown})` : ''}
                              </Typography>
                          </Box>
                      }
                    >
                        {errorMessage || "FAILED"}
                    </Alert>
                )}
            </Stack>
            {status === "loading" && (
                <LoadingComponent />
            )}
        </Box>
    );
};

export default AlertStack;
