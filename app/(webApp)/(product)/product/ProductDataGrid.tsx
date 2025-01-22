import * as React from "react";
import Box from "@mui/material/Box";
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
import { StatusModel } from "@/models/StatusModel";
import {
  GetAllAttributes,
  GetAllBrandNames,
  GetAllSeasonNames,
  GetAllSupplierNames,
} from "@/utils/redux/actions/setup";
import FieldLabel from "@/components/label/FieldLabel";
import DataGridBox from "@/components/wrapper/DataGridBox";
import ModalWrapper from "@/components/wrapper/ModalWrapper";
import CustomTextField from "@/components/field/CustomTextField";
import ActionButtons from "@/components/button/ActionButtons";
import { ProductModel } from "@/models/ProductModel";
import {
  CreateProduct,
  GetAllProducts,
  UpdateProduct,
} from "@/utils/redux/actions/product";

// Start Dynamic components
interface rowProps extends ProductModel {}

const defaultValues = {
  code: "",
  name: "",
  cost: 0,
  price: 0,
  discount: 0,
  attributes: [],
  supplier: "",
  brand: "",
  season: "",
  note: "",
  isActive: true,
};

const ProductDataGrid = () => {
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
      field: "code",
      headerName: "Code",
      flex: 1,
      align: "center",
      headerAlign: "center",
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
      field: "cost",
      headerName: "Cost",
      type: "number",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "discount",
      headerName: "Discount",
      type: "number",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "year",
      headerName: "Year",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "attributes",
      headerName: "Attributes",
      flex: 1,
      align: "center",
      headerAlign: "center",
      valueGetter: (params: string[]) => {
        return (
          params
            ?.map(
              (item: string) =>
                `${item}`
            )
            .join(" | ") || ""
        );
      },
      editable: false,
    },
    {
      field: "supplier",
      headerName: "Supplier",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "brand",
      headerName: "Brand",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
    },

    {
      field: "season",
      headerName: "Season",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "note",
      headerName: "Note",
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
  const { allProducts, allSupplierNames, allBrandNames, allSeasonNames, allAttributes } =
    useAppSelector((state: any) => state.reducer); // Dynamic component
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
    dispatch(CreateProduct(formData)); // Dynamic component
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(UpdateProduct(formData)); // Dynamic component
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

  const handleChangeByName = (key: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleChangeBoolean = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: checked,
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
    dispatch(GetAllProducts()); // Dynamic component
    dispatch(GetAllSeasonNames()); // Dynamic component
    dispatch(GetAllBrandNames()); // Dynamic component
    dispatch(GetAllSupplierNames()); // Dynamic component
    dispatch(GetAllAttributes()); // Dynamic component
  }, [refresh]);

  const columnsForms = [
    {
      field: "code",
      caption: "Code",
      type: "text",
      required: true,
      value: formData?.code,
      onChange: handleChange,
      inputProps: {
        maxLength: 255,
      },
      showOnCreate: true,
      showOnEdit: true,
    },
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
      field: "cost",
      caption: "Cost",
      required: true,
      value: formData?.cost,
      onChange: handleChange,
      inputProps: {
        inputMode: "decimal",
        maxLength: 20,
      },
      showOnCreate: true,
      showOnEdit: true,
    },
    {
      field: "price",
      caption: "Price",
      required: true,
      value: formData?.price,
      onChange: handleChange,
      inputProps: {
        inputMode: "decimal",
        maxLength: 20,
      },
      showOnCreate: true,
      showOnEdit: true,
    },
    {
      field: "discount",
      caption: "Discount",
      required: true,
      value: formData?.discount,
      onChange: handleChange,
      inputProps: {
        inputMode: "decimal",
        min: 0,
        max: 99.99
      },
      showOnCreate: true,
      showOnEdit: true,
    },
    {
      field: "year",
      caption: "Year",
      required: true,
      inputProps: {
        inputMode: "numeric",
        pattern: "[0-9]*",
        maxLength: 9,
      },
      value: formData?.year,
      onChange: handleChange,
      showOnCreate: true,
      showOnEdit: true,
    },
    {
      showOnCreate: true,
      showOnEdit: true,
      component: (
        <FormControl key={`form-attribute`} fullWidth>
          <FieldLabel
            caption="Select Attributes"
            htmlFor="attributes"
            isRequired={true}
          ></FieldLabel>
          <Autocomplete
            multiple
            disableCloseOnSelect
            options={allAttributes || []}
            getOptionLabel={(option) => option}
            value={formData?.attributes || []}
            onChange={(event, newValue) => {
              handleChangeByName("attributes", newValue);
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
              <TextField {...params} variant="outlined" />
            )}
            freeSolo={false}
          />
        </FormControl>
      ),
    },
    {
      showOnCreate: true,
      showOnEdit: true,
      component: (
        <FormControl key={`form-supplier`} fullWidth>
          <FieldLabel
            caption="Select Supplier"
            htmlFor="supplier"
            isRequired={true}
          ></FieldLabel>
          <Autocomplete
            options={allSupplierNames || []}
            getOptionLabel={(option) => option}
            value={formData?.supplier}
            onChange={(event, newValue) => {
              handleChangeByName("supplier", newValue);
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
    {
      showOnCreate: true,
      showOnEdit: true,
      component: (
        <FormControl key={`form-brand`} fullWidth>
          <FieldLabel
            caption="Select Brand"
            htmlFor="brand"
            isRequired={true}
          ></FieldLabel>
          <Autocomplete
            options={allBrandNames || []}
            getOptionLabel={(option) => option}
            value={formData?.brand}
            onChange={(event, newValue) => {
              handleChangeByName("brand", newValue);
            }}
            isOptionEqualToValue={(option, value) => option === value}
            renderOption={(props, option, { selected }) => {
              return (
                <li {...props}>
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
    {
      showOnCreate: true,
      showOnEdit: true,
      component: (
        <FormControl key={`form-season`} fullWidth>
          <FieldLabel
            caption="Select Season"
            htmlFor="season"
            isRequired={true}
          ></FieldLabel>
          <Autocomplete
            options={allSeasonNames || []}
            getOptionLabel={(option) => option}
            value={formData?.season}
            onChange={(event, newValue) => {
              handleChangeByName("season", newValue);
            }}
            isOptionEqualToValue={(option, value) => option === value}
            renderOption={(props, option, { selected }) => {
              return (
                <li {...props}>
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
    {
      field: "note",
      caption: "Note",
      type: "text",
      required: false,
      value: formData?.note,
      onChange: handleChange,
      showOnCreate: true,
      showOnEdit: true,
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
        Product
      </Typography>
      <DataGrid
        rows={allProducts} // Start Dynamic components
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

export default ProductDataGrid;
