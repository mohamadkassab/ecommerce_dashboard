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
import { setIdle, signin } from "@/utils/redux/actions/auth";
import {
  useAppSelector,
  useAppDispatch,
  useAppStore,
} from "@/utils/redux/hooks";
import { useRouter } from 'next/navigation';
import { ROUTES } from "@/utils/constants";
import { redirect } from 'next/navigation';

interface FormData {
  username: string;
  password: string;
}

const SignInPage = () => {
  const { status } = useAppSelector((state: any) => state.reducer);
  const [formData, setFormData] = useState<FormData>({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const dispatch = useAppDispatch();


  const onSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(signin({ formData : formData}));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  React.useEffect(()=>{
    console.log(status)
    if(status === "loginSuccessful"){
      dispatch(setIdle());
      redirect(ROUTES.DASHBOARD);
    }
  }, [status]);

  
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
              name="username"
              required
              type="email"
              label="Email Address"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.username} 
              onChange={handleChange} 
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
