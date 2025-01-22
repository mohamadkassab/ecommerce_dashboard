import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
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
  GridSlots,
} from "@mui/x-data-grid";

import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import { StatusModel } from "@/models/StatusModel";
import FieldLabel from "@/components/label/FieldLabel";
import DataGridBox from "@/components/wrapper/DataGridBox";
import ModalWrapper from "@/components/wrapper/ModalWrapper";
import CustomTextField from "@/components/field/CustomTextField";
import ActionButtons from "@/components/button/ActionButtons";
import {
  CreateTransaction,
  GetAllTransactions,
} from "@/utils/redux/actions/product";
import { TransactionModel } from "@/models/Transaction";
import { AttributeWithOptionsModel } from "@/models/AttributeWithOptionsModel";
import { TransactionTypeEnum } from "@/models/TransactionTypeEnum";
import { GetAllAttributesWithOptions } from "@/utils/redux/actions/setup";

// Start Dynamic components
interface rowProps extends TransactionModel {}

const defaultValues = {
  productId: 0,
  quantity: 0,
  note: "",
  transactionAttributes: [],
};

const TransactionDataGrid = () => {
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
      field: "productId",
      headerName: "Product Id",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "transactionType",
      headerName: "Transaction Type",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "transactionAttributes",
      headerName: "Transaction Attributes",
      flex: 1,
      align: "center",
      headerAlign: "center",
      valueGetter: (params: any) => {
        return (
          params
            ?.map(
              (item: { name: string; option: string }) =>
                `${item.name}: ${item.option}`
            )
            .join(" | ") || ""
        );
      },
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
  const { allTransactions, allAttributesWithOptions } = useAppSelector(
    (state: any) => state.reducer
  ); // Dynamic component
  const [openCreate, setOpenCreate] = React.useState(false);
  const [formData, setFormData] = React.useState<rowProps>(defaultValues);
  const [refresh, setRefresh] = React.useState(false);
  const { status } = useAppSelector((state: any) => state.reducer);
  const [loading, setLoading] = React.useState(false);

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };
  const handleCloseCreate = () => setOpenCreate(false);
  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(CreateTransaction(formData)); // Dynamic component
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
    dispatch(GetAllTransactions()); // Dynamic component
    dispatch(GetAllAttributesWithOptions()); // Dynamic component
  }, [refresh]);

  const columnsForms = [
    {
      field: "productId",
      caption: "Product Id",
      required: true,
      value: formData?.productId,
      onChange: handleChange,
      inputProps: {
        inputMode: "numeric",
        pattern: "[0-9]*",
        maxLength: 9,
      },
      showOnCreate: true,
      showOnEdit: true,
    },
    {
      field: "quantity",
      caption: "Quantity",
      required: true,
      value: formData?.quantity,
      onChange: handleChange,
      inputProps: {
        inputMode: "numeric",
        pattern: "[0-9]*",
        maxLength: 9,
      },
      showOnCreate: true,
      showOnEdit: true,
    },
    {
      showOnCreate: true,
      showOnEdit: true,
      component: (
        <FormControl key={`form-transaction-type`} fullWidth>
          <FieldLabel
            caption="Transaction Type"
            htmlFor="transactionType"
            isRequired={true}
          ></FieldLabel>
          <Autocomplete
            options={Object.values(TransactionTypeEnum)}
            getOptionLabel={(option) => option}
            value={formData?.transactionType || ""}
            onChange={(event, newValue) => {
              handleChangeByName("transactionType", newValue);
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
        <FormControl key={`form-transaction-attributes`} fullWidth>
          <FieldLabel
            caption="Transaction Attributes"
            htmlFor="transactionAttributes"
            isRequired={false}
          ></FieldLabel>
          <Autocomplete
            multiple
            disableCloseOnSelect
            options={
              allAttributesWithOptions?.flatMap(
                (attr: AttributeWithOptionsModel) =>
                  attr.options.map((option: string) => ({
                    name: attr.name,
                    option,
                  }))
              ) || []
            }
            getOptionLabel={(option) => `${option.name}: ${option.option}`}
            value={formData?.transactionAttributes || []}
            onChange={(event, newValue) => {
              const uniqueAttributes = new Map();
              newValue.forEach((attr) => {
                uniqueAttributes.set(attr.name, attr);
              });
              handleChangeByName(
                "transactionAttributes",
                Array.from(uniqueAttributes.values())
              );
            }}
            isOptionEqualToValue={(option, value) =>
              option.name === value.name && option.option === value.option
            }
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox checked={selected} />
                <ListItemText primary={`${option.name}: ${option.option}`} />
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
            freeSolo={false}
          />
        </FormControl>
      ),
    },
    {
      field: "note",
      caption: "Note",
      required: false,
      value: formData?.note,
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
        Transaction
      </Typography>
      <DataGrid
        rows={allTransactions} // Start Dynamic components
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
    </DataGridBox>
  );
};

export default TransactionDataGrid;
