"use client";
import React, { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import logo from "@/public/images/next.svg";
import signinImage from "@/public/images/siginin_image.svg";
import PrimaryButton from "@/components/button/PrimaryButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { login } from "@/utils/redux/slice";
import {
  useAppSelector,
  useAppDispatch,
  useAppStore,
} from "@/utils/redux/hooks";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const dispatch = useAppDispatch();
  const store = useAppStore();

  const onSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(login({ username: "user", password: "pass" }));
  };

  return (
    <Container
      component="main"
      maxWidth="lg"
      className="flex flex-col items-center justify-start min-h-screen"
    >
      <Box className="my-[4rem]">
        <Image src={logo} alt="Logo" width={200} height={200} />
      </Box>

      <Box className="bg-white p-16 rounded flex flex-row  gap-[10vw]">
        <Box className="max-w-[26vw]">
          <Typography variant="h3" align="center" gutterBottom>
            Sign In
          </Typography>
          <form onSubmit={onSignIn}>
            <TextField
              required
              type="email"
              label="Email Address"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              required
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box >
            <PrimaryButton type="submit">Sign In</PrimaryButton>
            </Box>
          
          </form>
        </Box>
        <Box >
          <Image src={signinImage} alt="Logo" width={500} height={500} />
        </Box>
      </Box>
    </Container>
  );
};

export default SignInPage;
