import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  TextField,
  Modal,
  Checkbox,
  ListItemText,
  Autocomplete,
  Typography,
  FormControl,
  InputLabel,
  FormLabel,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Divider,
} from "@mui/material";

import {
  GridCellEditStopParams,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlots,
  GridRowCount,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import {
  getAllUsers,
  getAllRoles,
  createUser,
  deleteUser,
  updateUser,
} from "@/utils/redux/actions/user";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface roleProps {
  id: number;
  roleName: string;
  permissions: any[];
}

interface rowProps {
  id?: number;
  isNew?: boolean;
  username: string;
  firstName: string;
  lastName: string;
  dob: Date;
  phone: string;
  address: string;
  password: string;
  roles: roleProps[];
  permissions?: { id: string; permissionName: string }[];
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
}

const UserDataGrid = () => {
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
    { field: "username", headerName: "Username", flex: 1, editable: true },
    { field: "firstName", headerName: "First Name", flex: 1, editable: true },
    { field: "lastName", headerName: "Last Name", flex: 1, editable: true },
    {
      field: "dob",
      headerName: "DOB",
      type: "date",
      flex: 0.5,
      align: "left",
      headerAlign: "left",
      valueGetter: (params) => {
        return new Date(params);
      },
      editable: true,
    },
    { field: "phone", headerName: "Phone", flex: 1, editable: true },
    { field: "address", headerName: "Address", flex: 1, editable: true },
    {
      field: "roles",
      headerName: "Roles",
      flex: 1,
      renderCell: (params) => {
        const rolesDisplay =
          params.value.map((role: roleProps) => role.roleName).join(", ") ||
          "No roles assigned";
        return <span>{rolesDisplay}</span>;
      },
    },

    {
      field: "createdAt",
      headerName: "Created At",
      type: "date",
      valueGetter: (params) => {
        return new Date(params);
      },
      flex: 1,
      editable: false,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      type: "date",
      valueGetter: (params) => {
        return new Date(params);
      },
      flex: 1,
      editable: false,
    },
    { field: "createdBy", headerName: "Created By", flex: 1, editable: false },
    { field: "updatedBy", headerName: "Updated By", flex: 1, editable: false },
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
            onClick={handleEditClick(row)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={`4`}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(row)}
            color="error"
          />,
        ];
      },
    },
  ];

  const defaultValues = {
    username: "",
    firstName: "",
    lastName: "",
    dob: new Date(),
    phone: "",
    address: "",
    roles: [],
    password: "",
  };

  const dispatch = useAppDispatch();
  const [rows, setRows] = React.useState<rowProps[]>([]);
  const [roles, setRoles] = React.useState<roleProps[] | null>(null);
  const { allUsers, allRoles } = useAppSelector((state: any) => state.reducer);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [formData, setFormData] = React.useState<rowProps>(defaultValues);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState<rowProps | null>(null);
  const [refresh, setRefresh] = React.useState(false);
  const { status, error } = useAppSelector((state: any) => state.reducer);
  const [loading, setLoading] = React.useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(updateUser(formData));
    handleCloseEdit();
  };

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(createUser(formData));
    handleCloseCreate();
  };

  const handleDeleteClick = (row: any) => () => {
    setItemToDelete(row);
    setOpenDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    try {
      dispatch(deleteUser(Number(itemToDelete?.id)));
      setOpenDeleteConfirmation(false);
    } catch (e) {}
  };

  const handleEditClick = (row: rowProps) => () => {
    setFormData(row);
    setIsEditMode(true);
    handleOpenEdit();
  };

  const handleCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false);
  };



  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRolesChange = (newValue: any) => {
    if (Array.isArray(newValue)) {
      setFormData((prevState) => ({
        ...prevState,
        roles: newValue,
      }));
    }
  };

  React.useEffect(() => {
    setLoading(true);
    dispatch(getAllRoles());
    dispatch(getAllUsers());
  }, [refresh]);

  React.useEffect(() => {
    if (allUsers && allRoles) {
      setRows(allUsers);
    }
  }, [allUsers]);

  React.useEffect(() => {
    if (allRoles) {
      setRoles(allRoles);
    }
  }, [allRoles]);

  React.useEffect(() => {
    if (status === "skeletonLoading") {
      if (loading !== true) {
        setLoading(true);
      }
    } else {
      setLoading(false);
    }
  }, [status]);

  React.useEffect(() => {
    if (status === "success") {
      setRefresh(!refresh);
    }
  }, [status]);

  const columnsForms = [
    {
      field: "id",
      caption: "Id",
      type: "number",
      required: false,
      value: formData?.id,
      onChange: handleChange,
      showOnCreate: false,
      showOnEdit: false,
    },
    {
      field: "username",
      caption: "Username",
      type: "email",
      required: true,
      value: formData?.username,
      onChange: handleChange,
      inputProps: {
        minLength: 4,
        maxLength: 50,
      },
      disabled: true,
      showOnCreate: true,
      showOnEdit: true,
    },
    {
      field: "firstName",
      caption: "First Name",
      type: "text",
      required: true,
      value: formData?.firstName,
      onChange: handleChange,
      inputProps: {
        minLength: 2,
        maxLength: 50,
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
        minLength: 2,
        maxLength: 50,
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
        maxLength: 50,
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
        minLength: 0,
        maxLength: 255,
      },
      showOnCreate: true,
      showOnEdit: true,
    },
    {
      showOnCreate: true,
      showOnEdit: true,
      component: (
        <FormControl key={`CreateForm-roles`} fullWidth margin="normal">
          <Autocomplete
            multiple
            disableCloseOnSelect
            options={roles || []}
            getOptionLabel={(option) => option.roleName}
            value={formData.roles}
            onChange={(event, newValue) => {
              handleRolesChange(newValue);
            }}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox checked={selected} />
                <ListItemText primary={option.roleName} />
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Select Roles" />
            )}
          />
        </FormControl>
      ),
    },
    {
      showOnEdit: true,
      showOnCreate: true,
      component: (
        <TextField
          key={`CreateForm-password`}
          name="password"
          label="Password"
          type={isPasswordVisible ? "text" : "password"}
          required={isEditMode ? false : true}
          value={formData?.password || ""}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          fullWidth
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
            minLength: isEditMode ? undefined : 6,
            maxLength: 255,
          }}

          FormHelperTextProps={{
            sx: {
              color: 'warning.main',  
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
      ),
    },
  ];

  return (
    <Box
      sx={{
        height: "94vh",
        width: "calc(100vw - 240px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingX: "16px",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columnsDataGrid}
        editMode="row"
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
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "2px solid",
            borderColor: "primary.main",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
        }}
      />

      <Modal
        open={openCreate}
        onClose={handleCloseCreate}
        sx={{
          backdropFilter: "blur(4px)",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
            borderRadius: 3,
            p: 4,
            maxHeight: "90vh",
            maxWidth: "600px",
            transition: "all 0.3s ease-in-out",
            overflow: "auto",
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              mb: 2,
            }}
          >
            New Entry
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <form onSubmit={handleCreate}>
            {columnsForms.map((item, index) => {
              if (item?.showOnCreate) {
                if (item?.component !== undefined) {
                  return item.component;
                }
                return (
                  <TextField
                    key={`CreateForm-${item?.field}`}
                    name={item?.field}
                    required={item?.required}
                    type={item?.type}
                    label={item?.caption}
                    value={item?.value}
                    disabled={item?.disabled ? true : false}
                    onChange={item?.onChange}
                    inputProps={item?.inputProps ? item.inputProps : undefined}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    sx={{
                      borderRadius: "8px",
                      backgroundColor: "background.default",
                      boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                );
              }
            })}

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCloseCreate}
                sx={{
                  width: "48%",
                  py: 1.5,
                  borderRadius: "8px",
                  textTransform: "none",
                  ":hover": {
                    backgroundColor: "secondary.light",
                    color: "secondary.contrastText",
                  },
                }}
              >
                Cancel
              </Button>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  width: "48%",
                  py: 1.5,
                  borderRadius: "8px",
                  backgroundColor: "primary.main",
                  textTransform: "none",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  ":hover": {
                    backgroundColor: "primary.dark",
                    boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        sx={{
          backdropFilter: "blur(4px)",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
            borderRadius: 3,
            p: 4,
            maxHeight: "90vh",
            maxWidth: "600px",
            transition: "all 0.3s ease-in-out",
            overflow: "auto",
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              mb: 2,
            }}
          >
            Edit Entry
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <form onSubmit={handleUpdate}>
            {columnsForms.map((item, index) => {
              if (item?.showOnEdit) {
                if (item?.component !== undefined) {
                  return item.component;
                }
                return (
                  <TextField
                    key={`CreateForm-${item?.field}`}
                    name={item?.field}
                    required={item?.required}
                    type={item?.type}
                    disabled={item?.disabled ? true : false}
                    label={item?.caption}
                    value={item?.value}
                    onChange={item?.onChange}
                    inputProps={item?.inputProps ? item.inputProps : undefined}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    sx={{
                      borderRadius: "8px",
                      backgroundColor: "background.default",
                      boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                );
              }
            })}

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCloseEdit}
                sx={{
                  width: "48%",
                  py: 1.5,
                  borderRadius: "8px",
                  textTransform: "none",
                  ":hover": {
                    backgroundColor: "secondary.light",
                    color: "secondary.contrastText",
                  },
                }}
              >
                Cancel
              </Button>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  width: "48%",
                  py: 1.5,
                  borderRadius: "8px",
                  backgroundColor: "primary.main",
                  textTransform: "none",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  ":hover": {
                    backgroundColor: "primary.dark",
                    boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      <Dialog
        open={openDeleteConfirmation}
        onClose={handleCloseDeleteConfirmation}
        sx={{ "& .MuiDialog-paper": { padding: "20px", borderRadius: "8px" } }}
      >
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "1rem", lineHeight: "1.5" }}>
            Are you sure you want to delete{" "}
            <Typography
              component="span"
              variant="body1"
              sx={{ fontWeight: "bold", color: "error.main" }}
            >
              {itemToDelete?.username}
            </Typography>
            &nbsp;?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "flex-end", mt: 2 }}>
          <Button
            onClick={handleCloseDeleteConfirmation}
            color="primary"
            variant="outlined"
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            sx={{
              backgroundColor: "error.main",
              "&:hover": { backgroundColor: "error.dark" },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserDataGrid;
