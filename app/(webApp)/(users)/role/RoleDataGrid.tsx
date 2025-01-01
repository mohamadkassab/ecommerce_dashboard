import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  TextField,
  Checkbox,
  ListItemText,
  Autocomplete,
  Typography,
  FormControl,
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
  getAllRoles,
  getAllPermissions,
  createRole,
  updateRole,
  deleteRole,
} from "@/utils/redux/actions/user";
import { StatusModel } from "@/models/StatusModel";
import { RoleModel } from "@/models/RoleModel";
import { PermissionModel } from "@/models/PermissionModel";
import FieldLabel from "@/components/label/FieldLabel";
import DataGridBox from "@/components/wrapper/DataGridBox";
import ModalWrapper from "@/components/wrapper/ModalWrapper";
import ActionButtons from "@/components/button/ActionButtons";
import CustomTextField from "@/components/field/CustomTextField";
import DeleteConfirmationDialog from "@/components/dialog/DeleteConfirmationDialog";

// Start Dynamic components
interface rowProps extends RoleModel {}

const defaultValues = {
  name: "",
  permissions: [],
};

const RoleDataGrid = () => {
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
      field: "name",
      headerName: "Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "permissions",
      headerName: "Permissions",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const itemsDisplayed =
          params?.value
            ?.map((permission: PermissionModel) => permission.name)
            .join(", ") || "No permissions assigned";
        return <span>{itemsDisplayed}</span>;
      },
      editable: false,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      type: "date",
      flex: 1,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => {
        return new Date(params);
      },
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
      editable: false,
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
  const { allRoles, allPermissions } = useAppSelector(
    (state: any) => state.reducer
  ); // Dynamic component
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [formData, setFormData] = React.useState<rowProps>(defaultValues);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] =
    React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState<rowProps | null>(null);
  const [refresh, setRefresh] = React.useState(false);
  const { status, error } = useAppSelector((state: any) => state.reducer);
  const [loading, setLoading] = React.useState(false);

  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createRole(formData)); // Dynamic component
    handleCloseCreate();
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      field: "name",
      caption: "Name",
      type: "text",
      required: true,
      value: formData?.name,
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
            caption="Select Permissions"
            htmlFor="permissions"
            isRequired={false}
          ></FieldLabel>

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
              const isSelected = formData?.permissions?.some(
                (permission) => permission.id === option.id
              );
              return (
                <li {...props}>
                  <Checkbox checked={selected} />
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
  ];

  // End Dynamic components

  return (
    <DataGridBox>
      <Typography variant="h4" sx={{ textAlign: "center", width: "100%" }}>
        Roles
      </Typography>
      <DataGrid
        rows={allRoles} // Start Dynamic components
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

      <DeleteConfirmationDialog
        open={openDeleteConfirmation}
        onClose={handleCloseDeleteConfirmation}
        onConfirm={handleConfirmDelete}
        itemToDelete={itemToDelete}
        dialogTitle="Delete Item"
        confirmationMessage="Are you sure you want to delete this item"
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
      />
    </DataGridBox>
  );
};

export default RoleDataGrid;
