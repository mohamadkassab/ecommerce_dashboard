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
  createBrand,
  getAllBrands,
  getAllCountryNames,
  updateBrand,
} from "@/utils/redux/actions/setup";
import { BrandModel } from "@/models/BrandModel";
import FieldLabel from "@/components/label/FieldLabel";
import DataGridBox from "@/components/wrapper/DataGridBox";
import ActionButtons from "@/components/button/ActionButtons";
import ImageUploader from "@/components/image/ImageUploader";
import ModalWrapper from "@/components/wrapper/ModalWrapper";
import CustomTextField from "@/components/field/CustomTextField";
import { FileTypeEnum } from "@/models/FileTypeEnum";
import { maxSize_2MB } from "@/utils/constants";

// Start Dynamic components
interface rowProps extends BrandModel {}

const defaultValues = {
  name: "",
  website: "",
  logoFile: null,
  country: null,
};

const BrandDataGrid = () => {
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
    { field: "name", headerName: "Name", flex: 1, align: "center", headerAlign: "center", editable: false },
    { field: "website", headerName: "Website", flex: 1, align: "center", headerAlign: "center", editable: false },
    {
      field: "logoFile",
      headerName: "Logo",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const logoImage = params.value;
        return logoImage ? <span>Logo</span> : <span>No Logo</span>;
      },
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

    { field: "updatedBy", headerName: "Updated By", flex: 1, align: "center", headerAlign: "center",  editable: false },
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
  const { allBrands, allCountryNames } = useAppSelector(
    (state: any) => state.reducer
  ); // Dynamic component
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [formData, setFormData] = React.useState<rowProps>(defaultValues);
  const [refresh, setRefresh] = React.useState(false);
  const { status } = useAppSelector((state: any) => state.reducer);
  const [loading, setLoading] = React.useState(false);

  const handleOpenCreate = () => {
    setIsFormSubmitted(false);
    setImagePreview(null);
    setOpenCreate(true);
  };
  const handleCloseCreate = () => setOpenCreate(false);
  const handleOpenEdit = () => {
    setIsFormSubmitted(false);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createBrand(formData)); // Dynamic component
    handleCloseCreate();
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateBrand(formData)); // Dynamic component
    handleCloseEdit();
  };

  const handleUpdateClick = (row: rowProps) => () => {
    setFormData(row);
    if (row?.logoFile) {
      setImagePreview(`data:image/jpeg;base64,${row?.logoFile}`);
    }
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

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    if (!file.size || !file.type) {
      return;
    }
    if (file && file.size > maxSize_2MB) {
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    setFormData((prev: any) => {
      return {
        ...prev,
        logoFile: file,
      };
    });
  };

  React.useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

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
    dispatch(getAllBrands()); // Dynamic component
    dispatch(getAllCountryNames()); // Dynamic component
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
  ];
  // End Dynamic components

  return (
    <DataGridBox>
      <Typography variant="h4" sx={{ textAlign: "center", width: "100%" }}>
        Brand
      </Typography>
      <DataGrid
        rows={allBrands} // Start Dynamic components
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
        mdWidth="800px"
      >
        <form onSubmit={handleCreate}>
          <div className="flex gap-6 justify-center">
            <div className="flex flex-col w-full">
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
                onSubmit={() => setIsFormSubmitted(true)}
                cancelLabel="Go Back"
                submitLabel="Save"
              />
            </div>

            <ImageUploader
              imagePreview={imagePreview}
              onChange={handleChangeFile}
              required={!formData?.logoFile}
              isFormSubmitted={isFormSubmitted}
              fileType={FileTypeEnum.Image}
              errorMessage={`Image is required & less then ${(
                maxSize_2MB / 1000000
              ).toFixed(0)} MB`}
              label="Choose Image"
            />
          </div>
        </form>
      </ModalWrapper>

      <ModalWrapper
        open={openEdit}
        handleClose={handleCloseEdit}
        title="Edit Entry"
        mdWidth="800px"
      >
        <form onSubmit={handleUpdate}>
          <div className="flex gap-6 justify-center">
            <div className="flex flex-col w-full">
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
                onSubmit={() => setIsFormSubmitted(true)}
                cancelLabel="Go Back"
                submitLabel="Save"
              />
            </div>
            <ImageUploader
              imagePreview={imagePreview}
              onChange={handleChangeFile}
              required={!formData?.logoFile}
              isFormSubmitted={isFormSubmitted}
              errorMessage="Please upload a valid image file."
              label="Choose Image"
            />
          </div>
        </form>
      </ModalWrapper>
    </DataGridBox>
  );
};

export default BrandDataGrid;
