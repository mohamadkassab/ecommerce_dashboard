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

import {
  useAppSelector,
  useAppDispatch,
  useAppStore,
} from "@/utils/redux/hooks";
import { useRouter } from 'next/navigation';
import { ROUTES } from "@/utils/constants";
import { redirect } from 'next/navigation';
import { StatusModel } from "@/models/StatusModel";
import { setIdle, signin } from "@/utils/redux/actions/user";
import { SignInModel } from "@/models/SignInModel";

const SignInPage = () => {
  const router = useRouter();
  const { status } = useAppSelector((state: any) => state.reducer);
  const [formData, setFormData] = useState<SignInModel>({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const dispatch = useAppDispatch();


  const onSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(signin({ formData : formData}));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  React.useEffect(()=>{
    if(status === StatusModel.SIGNINSUCCESSFUL){
      dispatch(setIdle());
      router.push(ROUTES.DASHBOARD);
    }
  }, [status]);

  
  return (
    <Container
    component="main"
    maxWidth="lg"
    className="flex flex-col items-center justify-start min-h-screen px-4 sm:px-8"
  >
    <Box className="my-16 text-center">
      <Image src={logo} alt="Logo" width={200} height={200} />
    </Box>
  
    <Box className="bg-white p-8 sm:p-16 rounded-lg flex flex-col sm:flex-row gap-8 sm:gap-16">
      {/* Left Column: Form */}
      <Box className="w-full sm:w-[30vw]">
        <Typography variant="h3" align="center" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={onSignIn}>
          <TextField
            name="username"
            required
            type="email"
            label="Email Address"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.username}
            onChange={handleChange}
            className="mb-4"
          />
          <TextField
            required
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            inputProps={{
              minLength: 6,
              maxLength: 255,
            }}
            className="mb-6"
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
          <Box className="text-center">
            <PrimaryButton type="submit">Sign In</PrimaryButton>
          </Box>
        </form>
      </Box>
  
      {/* Right Column: Image */}
      <Box className="w-full sm:w-[50vw] flex justify-center">
        <Image src={signinImage} alt="Sign In Image" width={500} height={500} />
      </Box>
    </Box>
  </Container>
  
  );
};

export default SignInPage;
