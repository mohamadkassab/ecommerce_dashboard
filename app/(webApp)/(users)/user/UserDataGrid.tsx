import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import {
  TextField,
  Checkbox,
  ListItemText,
  Autocomplete,
  Typography,
  FormControl,
  InputAdornment,
  FormControlLabel,
  Switch,
} from "@mui/material";

import {
  GridToolbarExport,
  GridToolbarQuickFilter,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridSlots,
} from "@mui/x-data-grid";

import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import {
  getAllUsers,
  getAllRoles,
  createUser,
  updateUser,
} from "@/utils/redux/actions/user";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { StatusModel } from "@/models/StatusModel";
import { UserModel } from "@/models/UserModel";
import { RoleWithoutPermissionsModel } from "@/models/RoleWithoutPermissionsModel";
import FieldLabel from "@/components/label/FieldLabel";
import DataGridBox from "@/components/wrapper/DataGridBox";
import ModalWrapper from "@/components/wrapper/ModalWrapper";
import ActionButtons from "@/components/button/ActionButtons";
import CustomTextField from "@/components/field/CustomTextField";

// Start Dynamic components
interface rowProps extends UserModel {}

const defaultValues = {
  userName: "",
  firstName: "",
  lastName: "",
  dob: new Date(),
  phone: "",
  address: "",
  roles: [],
  password: "",
  isActive: true,
};

const UserDataGrid = () => {
  const columnsDataGrid: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      type: "number",
      flex: 0.5,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "dob",
      headerName: "DOB",
      type: "date",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => {
        return new Date(params);
      },
      editable: false,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "roles",
      headerName: "Roles",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const rolesDisplay =
          params?.value
            ?.map((role: RoleWithoutPermissionsModel) => role.name)
            .join(", ") || "No roles assigned";
        return <span>{rolesDisplay}</span>;
      },
      editable: false,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      type: "date",
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => {
        return new Date(params);
      },
      flex: 1,
      editable: false,
    },

    {
      field: "updatedBy",
      headerName: "Updated By",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "failedLoginAttempts",
      headerName: "Failed logins",
      type: "number",
      align: "center",
      headerAlign: "center",
      flex: 1,
      editable: false,
    },
    {
      field: "isActive",
      headerName: "Is Active",
      type: "boolean",
      align: "center",
      headerAlign: "center",
      flex: 1,
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 0.6,
      cellClassName: "actions",
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            key={`3`}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleUpdateClick(row)}
            color="inherit"
          />,
        ];
      },
      editable: false,
    },
  ];
  // End Dynamic components

  function EditToolbar() {
    const handleClickAddRecord = () => {
      setFormData(defaultValues);
      setIsEditMode(false);
      handleOpenCreate();
    };

    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClickAddRecord}
        >
          Add record
        </Button>
        <GridToolbarExport />
        <div style={{ marginLeft: "auto" }}>
          <GridToolbarQuickFilter />
          {/* <GridRowCount rowCount={5} visibleRowCount={1}/> */}
        </div>
      </GridToolbarContainer>
    );
  }

  const dispatch = useAppDispatch();
  const { allUsers, allRoles } = useAppSelector((state: any) => state.reducer); // Dynamic component
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false); // Dynamic component
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [formData, setFormData] = React.useState<rowProps>(defaultValues);
  const [refresh, setRefresh] = React.useState(false);
  const { status } = useAppSelector((state: any) => state.reducer);
  const [loading, setLoading] = React.useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createUser(formData)); // Dynamic component
    handleCloseCreate();
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser(formData)); // Dynamic component
    handleCloseEdit();
  };

  const handleUpdateClick = (row: rowProps) => () => {
    setFormData(row);
    setIsEditMode(true);
    handleOpenEdit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeBoolean = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleArrayChange = (key: string, newValue: any) => {
    if (Array.isArray(newValue)) {
      setFormData((prevState) => ({
        ...prevState,
        [`${key}`]: newValue,
      }));
    }
  };

  React.useEffect(() => {
    if (status === StatusModel.SKELETONLOADING) {
      if (loading !== true) {
        setLoading(true);
      }
    } else {
      setLoading(false);
    }
  }, [status]);

  React.useEffect(() => {
    if (status === StatusModel.SUCCESS) {
      setRefresh(!refresh);
    }
  }, [status]);

  // Start Dynamic components
  React.useEffect(() => {
    dispatch(getAllRoles());
    dispatch(getAllUsers());
  }, [refresh]);

  const columnsForms = [
    {
      field: "userName",
      caption: "Username",
      type: "email",
      required: true,
      value: formData?.userName,
      onChange: handleChange,
      inputProps: {
        minLength: 4,
        maxLength: 255,
      },
      disabled: isEditMode ? true : false,
      showOnCreate: true,
      showOnEdit: false,
    },
    {
      field: "firstName",
      caption: "First Name",
      type: "text",
      required: true,
      value: formData?.firstName,
      onChange: handleChange,
      inputProps: {
        maxLength: 255,
      },
      showOnCreate: true,
      showOnEdit: true,
    },
    {
      field: "lastName",
      caption: "Last Name",
      type: "text",
      required: true,
      value: formData?.lastName,
      onChange: handleChange,
      inputProps: {
        maxLength: 255,
      },
      showOnCreate: true,
      showOnEdit: true,
    },
    {
      field: "dob",
      caption: "DOB",
      type: "date",
      required: true,
      value: formData?.dob,
      onChange: handleChange,
      showOnCreate: true,
      showOnEdit: true,
    },
    {
      field: "phone",
      caption: "Phone",
      type: "tel",
      required: true,
      value: formData?.phone,
      onChange: handleChange,
      inputProps: {
        minLength: 1,
        maxLength: 255,
        onInput: (e: React.FormEvent<HTMLInputElement>) => {
          const target = e.target as HTMLInputElement;
          target.value = target.value
            .replace(/[^0-9+]/g, "")
            .replace(/(?!^)\+/g, "");
        },
      },
      showOnCreate: true,
      showOnEdit: true,
    },
    {
      field: "address",
      caption: "Address",
      type: "text",
      required: false,
      value: formData?.address,
      onChange: handleChange,
      inputProps: {
        maxLength: 255,
      },
      showOnCreate: true,
      showOnEdit: true,
    },
    {
      showOnCreate: true,
      showOnEdit: true,
      component: (
        <FormControl key={`form-roles`} fullWidth>
          <FieldLabel
            caption="Select Roles"
            htmlFor="roles"
            isRequired={false}
          ></FieldLabel>
          <Autocomplete
            multiple
            disableCloseOnSelect
            options={allRoles || []}
            getOptionLabel={(option) => option.name}
            value={formData.roles}
            onChange={(event, newValue) => {
              handleArrayChange("roles", newValue);
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderOption={(props, option) => {
              const isSelected = formData?.roles?.some(
                (role) => role.id === option.id
              );
              return (
                <li {...props}>
                  <Checkbox checked={isSelected} />
                  <ListItemText primary={option.name} />
                </li>
              );
            }}
            renderInput={(params) => (
              /*Dynamic component*/
              <TextField {...params} variant="outlined" />
            )}
          />
        </FormControl>
      ),
    },
    {
      showOnEdit: true,
      showOnCreate: true,
      component: (
        <div key={`form-password`}>
          <FieldLabel
            caption="Password"
            htmlFor="password"
            isRequired={isEditMode ? false : true}
          />
          <TextField
            name="password"
            type={isPasswordVisible ? "text" : "password"}
            required={isEditMode ? false : true}
            value={formData?.password}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            autoComplete="off"
            placeholder={
              isEditMode
                ? "Leave empty to keep current password"
                : "Enter a new password"
            }
            helperText={
              isEditMode
                ? "Leave empty if you do not wish to change the password"
                : ""
            }
            inputProps={{
              minLength: 6,
              maxLength: 255,
            }}
            FormHelperTextProps={{
              sx: {
                color: "warning.main",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      ),
    },
    {
      showOnCreate: true,
      showOnEdit: true,
      component: (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            key={`form-is-active`}
            label="Is Active"
            control={
              <Switch
                name={`isActive`}
                checked={Boolean(formData?.isActive)}
                onChange={(e) => handleChangeBoolean(e)}
              />
            }
          />
        </Box>
      ),
    },
  ];
  // End Dynamic components

  return (
    <DataGridBox>
      <Typography variant="h4" sx={{ textAlign: "center", width: "100%" }}>
        Users
      </Typography>
      <DataGrid
        rows={allUsers} // Start Dynamic components
        columns={columnsDataGrid}
        disableRowSelectionOnClick
        loading={loading}
        slots={{
          toolbar: EditToolbar as GridSlots["toolbar"],
        }}
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
        }}
        sx={{
          mt: 1,
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "2px solid",
            borderColor: "primary.main",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
        }}
      />

      <ModalWrapper
        open={openCreate}
        handleClose={handleCloseCreate}
        title="New Entry"
      >
        <form onSubmit={handleCreate}>
          {columnsForms.map((item, index) => {
            if (item?.showOnCreate) {
              if (item?.component !== undefined) {
                return item.component;
              }
              return (
                <CustomTextField
                  key={`create-${item?.field}-${index}`}
                  item={item}
                />
              );
            }
          })}

          <ActionButtons
            onCancel={handleCloseCreate}
            cancelLabel="Go Back"
            submitLabel="Save"
          />
        </form>
      </ModalWrapper>

      <ModalWrapper
        open={openEdit}
        handleClose={handleCloseEdit}
        title="Edit Entry"
      >
        <form onSubmit={handleUpdate}>
          {columnsForms.map((item, index) => {
            if (item?.showOnEdit) {
              if (item?.component !== undefined) {
                return item.component;
              }
              return (
                <CustomTextField
                  key={`edit-${item?.field}-${index}`}
                  item={item}
                />
              );
            }
          })}

          <ActionButtons
            onCancel={handleCloseEdit}
            cancelLabel="Go Back"
            submitLabel="Save"
          />
        </form>
      </ModalWrapper>
    </DataGridBox>
  );
};

export default UserDataGrid;
