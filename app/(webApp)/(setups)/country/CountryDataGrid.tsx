import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@mui/material";

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
  createCountry,
  getAllCountries,
  updateCountry,
} from "@/utils/redux/actions/setup";
import { CountryModel } from "@/models/CountryModel";
import DataGridBox from "@/components/wrapper/DataGridBox";
import ModalWrapper from "@/components/wrapper/ModalWrapper";
import CustomTextField from "@/components/field/CustomTextField";
import ActionButtons from "@/components/button/ActionButtons";

// Start Dynamic components
interface rowProps extends CountryModel {}

const defaultValues = {
  name: "",
  code: "",
};

const CountryDataGrid = () => {
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
      field: "code",
      headerName: "Code",
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
  const { allCountries } = useAppSelector((state: any) => state.reducer); // Dynamic component
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [formData, setFormData] = React.useState<rowProps>(defaultValues);
  const [refresh, setRefresh] = React.useState(false);
  const { status } = useAppSelector((state: any) => state.reducer);
  const [loading, setLoading] = React.useState(false);

  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createCountry(formData)); // Dynamic component
    handleCloseCreate();
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateCountry(formData)); // Dynamic component
    handleCloseEdit();
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
    dispatch(getAllCountries());
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
  ];
  // End Dynamic components

  return (
    <DataGridBox>
      <Typography variant="h4" sx={{ textAlign: "center", width: "100%" }}>
        Country
      </Typography>
      <DataGrid
        rows={allCountries} // Start Dynamic components
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

export default CountryDataGrid;
