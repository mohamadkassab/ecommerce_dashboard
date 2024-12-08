import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  TextField,
  Modal,
  Checkbox,
  ListItemText,
  Autocomplete,
  Typography,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Divider,
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
  deleteUser,
  updateUser,
  getAllPermissions,
  createRole,
  updateRole,
  deleteRole,
} from "@/utils/redux/actions/user";
import { StatusModel } from "@/models/StatusModel";


// Start Dynamic components
interface permissionProps {
  id: number;
  name: string;
}

interface rowProps {
  id?: number;
  name?: string;
  permissions: permissionProps[];
  updatedAt?: Date;
  updatedBy?: string;
}


const RoleDataGrid = () => {

  const defaultValues = {
    name: "",
    permissions: [],
  };

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
    { field: "name", headerName: "Name", flex: 1, editable: false },
    {
      field: "permissions",
      headerName: "Permissions",
      flex: 1,
      renderCell: (params) => {
        const itemsDisplayed =
          params?.value?.map((permission: permissionProps) => permission.name).join(", ") ||
          "No permissions assigned";
        return <span>{itemsDisplayed}</span>;
      },
      editable: false
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
            onClick={handleUpdateClick(row)}
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
      editable: false
    },
  ];
  // End Dynamic components

  function EditToolbar() {
    const handleClickAddRecord = () => {
      setFormData(defaultValues);
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
  const {allRoles, allPermissions } = useAppSelector((state: any) => state.reducer); // Dynamic component
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [formData, setFormData] = React.useState<rowProps>(defaultValues);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState<rowProps | null>(null);
  const [refresh, setRefresh] = React.useState(false);
  const {status, error} = useAppSelector((state: any) => state.reducer);
  const [loading, setLoading] = React.useState(false);

  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(createRole(formData)); // Dynamic component
    handleCloseCreate();
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(updateRole(formData)); // Dynamic component
    handleCloseEdit();
  };

  const handleConfirmDelete = () => {
    try {
      dispatch(deleteRole(Number(itemToDelete?.id))); // Dynamic component
      setOpenDeleteConfirmation(false);
    } catch (e) {}
  };

  const handleUpdateClick = (row: rowProps) => () => { 
    setFormData(row);
    handleOpenEdit();
  };

  const handleDeleteClick = (row: any) => () => {
    setItemToDelete(row);
    setOpenDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
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
    dispatch(getAllPermissions());
  }, [refresh]);

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
      field: "name",
      caption: "Name",
      type: "text",
      required: true,
      value: formData?.name,
      onChange: handleChange,
      inputProps: {
        minLength: 1,
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
            options={allPermissions || []}
            getOptionLabel={(option) => option.name}
            value={formData.permissions}
            onChange={(event, newValue) => {
              handleArrayChange("permissions", newValue);
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderOption={(props, option, { selected }) => {
              const isSelected = formData.permissions.some(permission => permission.id === option.id);
              return (
                <li {...props}>
                  <Checkbox checked={selected} />
                  <ListItemText primary={option.name} />
                </li>
              );
            }}
            renderInput={(params) => (
              /*Dynamic component*/
              <TextField {...params} variant="outlined" label="Select Permissions" />
            )}
          />
        </FormControl>
      ),
    },
  ];

  // End Dynamic components

  return (
    <Box
      sx={{
        height: "calc(100vh - 100px)",
        maxWidth: "calc(100vw - 240px)",
        borderRadius: 2,
        paddingX: 2,

        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
          <Typography variant="h4" sx={{ textAlign: 'center', width:"100%" }}>
      Roles
    </Typography>
      <DataGrid
        rows={allRoles}   // Start Dynamic components
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
          mt:1,
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
            width: {
              xs: "90vw",   
              md: "600px", 
            },
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
            }}
          >
            New Entry
          </Typography>

          <Divider sx={{ mb: 1 }} />

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
            width: {
              xs: "90vw",   
              md: "600px", 
            },
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
            }}
          >
            Edit Entry
          </Typography>

          <Divider sx={{ mb: 1 }} />

          <form onSubmit={handleUpdate}>
            {columnsForms.map((item, index) => {
              if (item?.showOnEdit) {
                if (item?.component !== undefined) {
                  return item.component;
                }
                return (
                  <TextField
                    key={`EditForm-${item?.field}`}
                    name={item?.field}
                    required={item?.required}
                    type={item?.type}
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
              
              {/*Dynamic component */}
              {itemToDelete?.name}  
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

export default RoleDataGrid;
