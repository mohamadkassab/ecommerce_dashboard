import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import {
  TextField,
  Modal,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Divider,
  FormControl,
  Autocomplete,
  Checkbox,
  ListItemText,
  InputLabel,
  IconButton,
  FormControlLabel,
  Switch,
  FormHelperText,
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
  createAttribute,
  createBrand,
  createCategory,
  deleteAttribute,
  deleteBrand,
  deleteCategory,
  getAllAttributes,
  getAllBrands,
  getAllCategories,
  getAllCountries,
  getAllCountryNames,
  getAllPaymentM,
  getAllShippingM,
  updateBrand,
  updatePaymentM,
  updateShippingM,
} from "@/utils/redux/actions/setup";
import { BrandModel } from "@/models/BrandModel";
import { ShippingMModel } from "@/models/ShippingMModel";
import { PaymentMModel } from "@/models/PaymentMModel";

// Start Dynamic components
interface rowProps extends PaymentMModel {}

const defaultValues = {
  name: "",
  iconFile: null,
  isActive: true,
};

const PaymentMDataGrid = () => {
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
      field: "iconFile",
      headerName: "Icon",
      flex: 1,
      editable: false,
      renderCell: (params) => {
        const image = params.value;
        return image ? <span>Icon</span> : <span>No Icon</span>;
      },
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

  const dispatch = useAppDispatch();
  const { allPaymentM } = useAppSelector((state: any) => state.reducer); // Dynamic component
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [formData, setFormData] = React.useState<rowProps>(defaultValues);
  const [refresh, setRefresh] = React.useState(false);
  const { status } = useAppSelector((state: any) => state.reducer);
  const [loading, setLoading] = React.useState(false);
  const handleOpenEdit = () => {
    setIsFormSubmitted(false);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updatePaymentM(formData)); // Dynamic component
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
    dispatch(getAllPaymentM()); // Dynamic component
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
      <Typography variant="h4" sx={{ textAlign: "center", width: "100%" }}>
        Payment method
      </Typography>
      <DataGrid
        rows={allPaymentM} // Start Dynamic components
        columns={columnsDataGrid}
        disableRowSelectionOnClick
        loading={loading}
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
              md: "800px",
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
            <div className="flex gap-6 justify-center">
              <div className="flex flex-col w-full">
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
                        inputProps={
                          item?.inputProps ? item.inputProps : undefined
                        }
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
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    pt: 2,
                    mt: "auto",
                  }}
                >
                  {/* Cancel Button */}
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
                    onClick={() => {
                      setIsFormSubmitted(true);
                    }}
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
              </div>

              <div className="flex flex-col gap-2 items-center pt-2 flex-none w-[300px]">
                <Image
                  src={imagePreview || "/images/default-image.png"}
                  alt="Brand Image"
                  className="mt-2 rounded-md object-contain max-w-[200px] max-h-[250px]"
                  width={300}
                  height={300}
                />

                <label
                  htmlFor="iconFile"
                  className="mt-auto cursor-pointer px-4 py-2 mt-2 bg-primary text-white rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Choose Image
                </label>

                <input
                  id="iconFile"
                  name="iconFile"
                  required={!formData?.iconFile}
                  type="file"
                  onChange={handleChangeFile}
                  accept="image/*"
                  className="hidden" // Hide the native file input
                />
                {!formData?.iconFile && isFormSubmitted && (
                  <FormHelperText error>Image is required</FormHelperText>
                )}
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default PaymentMDataGrid;
