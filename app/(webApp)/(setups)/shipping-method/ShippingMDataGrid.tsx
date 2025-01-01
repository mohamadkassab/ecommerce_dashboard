import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Typography, FormControlLabel, Switch } from "@mui/material";

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
  createShippingM,
  getAllShippingM,
  updateShippingM,
} from "@/utils/redux/actions/setup";
import { ShippingMModel } from "@/models/ShippingMModel";
import DataGridBox from "@/components/wrapper/DataGridBox";
import ModalWrapper from "@/components/wrapper/ModalWrapper";
import CustomTextField from "@/components/field/CustomTextField";
import ActionButtons from "@/components/button/ActionButtons";
import ImageUploader from "@/components/image/ImageUploader";
import { FileTypeEnum } from "@/models/FileTypeEnum";
import { maxSize_2MB } from "@/utils/constants";

// Start Dynamic components
interface rowProps extends ShippingMModel {}

const defaultValues = {
  name: "",
  iconFile: null,
  overseas: false,
  isActive: true,
};

const ShippingMDataGrid = () => {
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
      field: "iconFile",
      headerName: "Icon",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
      renderCell: (params) => {
        const image = params.value;
        return image ? <span>Icon</span> : <span>No Icon</span>;
      },
    },
    {
      field: "overseas",
      headerName: "Overseas",
      type: "boolean",
      align: "center",
      headerAlign: "center",
      flex: 1,
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
  const { allShippingM } = useAppSelector((state: any) => state.reducer); // Dynamic component
  const [openCreate, setOpenCreate] = React.useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
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
    dispatch(createShippingM(formData)); // Dynamic component
    handleCloseCreate();
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateShippingM(formData)); // Dynamic component
    handleCloseEdit();
  };

  const handleUpdateClick = (row: rowProps) => () => {
    setFormData(row);
    if (row?.iconFile) {
      setImagePreview(`data:image/jpeg;base64,${row?.iconFile}`);
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
        iconFile: file,
      };
    });
  };

  const handleChangeBoolean = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: checked,
    }));
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
    dispatch(getAllShippingM()); // Dynamic component
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            key={`form-overseas`}
            label="Overseas"
            control={
              <Switch
                name={`overseas`}
                checked={Boolean(formData?.overseas)}
                onChange={(e) => handleChangeBoolean(e)}
              />
            }
          />
        </Box>
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
        Shipping method
      </Typography>
      <DataGrid
        rows={allShippingM} // Start Dynamic components
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
                cancelLabel="Go Back"
                submitLabel="Save"
              />
            </div>

            <ImageUploader
              imagePreview={imagePreview}
              onChange={handleChangeFile}
              required={!formData?.iconFile}
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
              required={!formData?.iconFile}
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

export default ShippingMDataGrid;
