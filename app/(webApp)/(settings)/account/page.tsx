"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Divider, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import { StatusModel } from "@/models/StatusModel";
import { changePassword, signout } from "@/utils/redux/actions/user";
import { UserChangePasswordModel } from "@/models/UserChangePasswordModel";
import ModalWrapper from "@/components/wrapper/ModalWrapper";
import CustomTextField from "@/components/field/CustomTextField";
import ActionButtons from "@/components/button/ActionButtons";
import DataGridBox from "@/components/wrapper/DataGridBox";

const Page = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state: any) => state.reducer);
  React.useEffect(() => {
    if (status === StatusModel.SUCCESS) {
      dispatch(signout());
    }
  }, [status]);

  // Change Password
  const changePasswordDefaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    firstName: "",
    lastName: "",
    email: "",
  };
  const [changePasswordFormData, setChangePasswordFormData] =
    useState<UserChangePasswordModel>(changePasswordDefaultValues);
  const [openChangePasssword, setOpenChangePassword] = useState(false);
  const handleChangeChangePassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setChangePasswordFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(changePassword(changePasswordFormData));
  };
  const handleCloseChangePassword = () => {
    setOpenChangePassword(false);
  };
  const changePasswordColumnsForms = [
    {
      field: "oldPassword",
      caption: "Old Password",
      type: "password",
      required: true,
      value: changePasswordFormData?.oldPassword,
      onChange: handleChangeChangePassword,
      inputProps: {
        minLength: 6,
        maxLength: 255,
      },
      showOnCreate: true,
      showOnEdit: true,
    },
    {
      field: "newPassword",
      caption: "New Password",
      type: "password",
      required: true,
      value: changePasswordFormData?.newPassword,
      onChange: handleChangeChangePassword,
      inputProps: {
        minLength: 6,
        maxLength: 255,
      },
      showOnCreate: true,
      showOnEdit: true,
    },
    {
      field: "confirmNewPassword",
      caption: "Confirm New Password",
      type: "password",
      required: true,
      value: changePasswordFormData?.confirmNewPassword,
      onChange: handleChangeChangePassword,
      inputProps: {
        minLength: 6,
        maxLength: 255,
      },
      showOnCreate: true,
      showOnEdit: true,
    },
  ];

  return (
    <DataGridBox>
      <Typography variant="h4" sx={{ textAlign: "center", width: "100%" }}>
        Account Settings
      </Typography>

      {/* Change Password */}
      <Box sx={{ width: "100%", mt: 3 }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => setOpenChangePassword(true)}
        >
          Change Password
        </Button>
      </Box>
      <ModalWrapper
        open={openChangePasssword}
        handleClose={handleCloseChangePassword}
        title="Change Password"
      >
        <form onSubmit={handleChangePasswordSubmit}>
          {changePasswordColumnsForms?.map((item, index) => {
            if (item?.showOnCreate) {
              return (
                <CustomTextField
                  key={`create-${item?.field}-${index}`}
                  item={item}
                />
              );
            }
          })}
          <ActionButtons
            onCancel={handleCloseChangePassword}
            cancelLabel="Go Back"
            submitLabel="Save"
          />
        </form>
      </ModalWrapper>
    </DataGridBox>
  );
};

export default Page;
