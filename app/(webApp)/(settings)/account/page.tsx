"use client";
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Divider } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import { StatusModel } from "@/models/StatusModel";
import { changePassword, signout } from "@/utils/redux/actions/user";
import { UserChangePasswordModel } from "@/models/UserChangePasswordModel";

const AccountPage = () => {
  const dispatch = useAppDispatch();
  const defaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  const [formData, setFormData] = useState<UserChangePasswordModel>(defaultValues);
  const { status } = useAppSelector((state: any) => state.reducer);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(changePassword(formData));
  };

  React.useEffect(() => {
    if (status === StatusModel.SUCCESS) {
      dispatch(signout());
    }
  }, [status]);

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          height: "96.6vh",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          mt: 1,
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center", width: "100%" }}>
          Account Settings
        </Typography>

        {/* Forgot Password Section */}
        <Typography
          variant="h6"
          sx={{ mt: 1, textAlign: "start", width: "100%" }}
        >
          Forgot Password
        </Typography>
        <TextField
          label="Old Password"
          variant="outlined"
          margin="normal"
          type="password"
          name="oldPassword"
          required
          inputProps={{ minLength: 6 }}
          value={formData.oldPassword}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="New Password"
          variant="outlined"
          margin="normal"
          type="password"
          name="newPassword"
          required
          inputProps={{ minLength: 6, maxLength: 255 }}
          value={formData.newPassword}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Confirm New Password"
          variant="outlined"
          margin="normal"
          type="password"
          name="confirmNewPassword"
          required
          inputProps={{ minLength: 6, maxLength: 255 }}
          value={formData.confirmNewPassword}
          onChange={handleChange}
          fullWidth
        />
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          type="submit"
          disabled={
            formData.newPassword === "" ||
            formData.newPassword !== formData.confirmNewPassword
          }
        >
          Change Password
        </Button>

        <Divider sx={{ my: 4, width: "100%" }} />
      </Box>
    </form>
  );
};

export default AccountPage;
