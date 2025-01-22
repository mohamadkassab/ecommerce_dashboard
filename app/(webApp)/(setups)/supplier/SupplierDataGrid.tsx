import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import {
  TextField,
  Typography,
  FormControl,
  Autocomplete,
  Checkbox,
  ListItemText,
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
import { StatusModel } from "@/models/StatusModel";
import {
  CreateSupplier,
  GetAllCountryNames,
  GetAllSuppliers,
  UpdateSupplier,
} from "@/utils/redux/actions/setup";
import FieldLabel from "@/components/label/FieldLabel";
import DataGridBox from "@/components/wrapper/DataGridBox";
import ModalWrapper from "@/components/wrapper/ModalWrapper";
import ActionButtons from "@/components/button/ActionButtons";
import CustomTextField from "@/components/field/CustomTextField";

// Start Dynamic components
interface rowProps extends SupplierModel {}

const defaultValues = {
  name: "",
  phone: "",
  address: "",
  city: "",
  email: "",
  website: "",
  country: null,
};

const SupplierDataGrid = () => {
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
      field: "city",
      headerName: "City",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "website",
      headerName: "Website",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
      align: "center",
      headerAlign: "center",
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
  const { allSuppliers, allCountryNames } = useAppSelector(
    (state: any) => state.reducer
  ); // Dynamic component
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [formData, setFormData] = React.useState<rowProps>(defaultValues);
  const [refresh, setRefresh] = React.useState(false);
  const { status } = useAppSelector((state: any) => state.reducer);
  const [loading, setLoading] = React.useState(false);

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };
  const handleCloseCreate = () => setOpenCreate(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(CreateSupplier(formData)); // Dynamic component
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(UpdateSupplier(formData)); // Dynamic component
  };

  const handleUpdateClick = (row: rowProps) => () => {
    setFormData(row);
    handleOpenEdit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeCountry = (newValue: any) => {
    setFormData((prev) => ({
      ...prev,
      country: newValue,
    }));
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
      setFormData(defaultValues);
      setRefresh(!refresh);
    }
  }, [status]);

  // Start Dynamic components
  React.useEffect(() => {
    dispatch(GetAllSuppliers()); // Dynamic component
    dispatch(GetAllCountryNames()); // Dynamic component
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
      field: "phone",
      caption: "Phone",
      type: "tel",
      required: false,
      value: formData?.phone,
      onChange: handleChange,
      inputProps: {
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
      field: "city",
      caption: "City",
      type: "text",
      required: false,
      value: formData?.city,
      onChange: handleChange,
      inputProps: {
        maxLength: 255,
      },
      showOnCreate: true,
      showOnEdit: true,
    },
    {
      field: "email",
      caption: "Email",
      type: "text",
      required: false,
      value: formData?.email,
      onChange: handleChange,
      inputProps: {
        maxLength: 255,
      },
      showOnCreate: true,
      showOnEdit: true,
    },
    {
      field: "website",
      caption: "Website",
      type: "text",
      required: false,
      value: formData?.website,
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
        <FormControl key={`form-country`} fullWidth>
          <FieldLabel
            caption="Select Country"
            htmlFor="country"
            isRequired={true}
          ></FieldLabel>
          <Autocomplete
            options={allCountryNames || []}
            getOptionLabel={(option) => option}
            value={formData?.country}
            onChange={(event, newValue) => {
              handleChangeCountry(newValue);
            }}
            isOptionEqualToValue={(option, value) => option === value}
            renderOption={(props, option, { selected }) => {
              return (
                <li {...props} key={option}>
                  <Checkbox checked={selected} />
                  <ListItemText primary={option} />
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" required />
            )}
            freeSolo={false}
          />
        </FormControl>
      ),
    },
  ];
  // End Dynamic components

  return (
    <DataGridBox>
      <Typography variant="h4" sx={{ textAlign: "center", width: "100%" }}>
        Supplier
      </Typography>
      <DataGrid
        rows={allSuppliers} // Start Dynamic components
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
          <div>
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
          </div>
        </form>
      </ModalWrapper>

      <ModalWrapper
        open={openEdit}
        handleClose={handleCloseEdit}
        title="Edit Entry"
      >
        <form onSubmit={handleUpdate}>
          <div>
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
          </div>
        </form>
      </ModalWrapper>
    </DataGridBox>
  );
};

export default SupplierDataGrid;
