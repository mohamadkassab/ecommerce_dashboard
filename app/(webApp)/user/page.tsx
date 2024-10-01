/* eslint-disable react/jsx-key */
"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
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
  GridToolbarExport, 
  GridCellEditStopParams
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";

import DynamicDataGrid from "@/components/datagrid/DynamicDataGrid";
import { Autocomplete, Checkbox, ListItemText, MenuItem, TextField } from "@mui/material";





export default function UserPage() {

  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  
  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };
  
  const handleDeleteClick = (id: GridRowId) => () => {
    // setRows(rows.filter((row) => row.id !== id));
  };
  
  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  
    // const editedRow = rows.find((row) => row.id === id);
    // if (editedRow!.isNew) {
    //   setRows(rows.filter((row) => row.id !== id));
    // }
  };
  
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 180, editable: true },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 80,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "joinDate",
      headerName: "Join date",
      type: "date",
      width: 180,
      editable: true,
    },
    {
      field: "role",
      headerName: "Departments",
      width: 220,
      editable: true,
      renderEditCell: (params: GridCellEditStopParams) => (
        <Box sx={{ width: "100%",  }}>
          <Autocomplete
            disableCloseOnSelect
            multiple
            freeSolo
            options={[]} 
            value={(params.value as string[]) || []} 
            onChange={(event: React.SyntheticEvent, newValue: string[]) =>
              params.api.setEditCellValue({
                id: params.id,
                field: "role",
                value: newValue,
              })
            }
            renderTags={() => null}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Departments"
                variant="outlined"
                size="small"
                sx={{marginTop:0.5, }} 
              />
            )}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox checked={selected} tabIndex={-1} disableRipple />
                <ListItemText primary={option} />
              </li>
            )}
          />
        </Box>
      ),
    },
    {
      field: "oneselect",
      headerName: "Department",
      width: 220,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Market", "Finance", "Development"],
      renderEditCell: (params: GridCellEditStopParams) => (
        <TextField
          select
          size="small" // Set the size to small
          fullWidth 
          variant="outlined"
          label="Department"
          onChange={(event) => {
            params.api.setEditCellValue({
              id: params.id,
              field: "oneselect",
              value: event.target.value,
            });
          }}
          sx={{ marginTop: 0.5 }}
        >
          {["Market", "Finance", "Development"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
  
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={`1`}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={`2`}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
  
        return [
          <GridActionsCellItem
            key={`3`}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={`4`}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="error"
          />,
        ];
      },
    },
  ];



 return(
  <DynamicDataGrid/>
 )
}
