

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  TextField,
  Modal,
  Checkbox,
  ListItemText,
  Autocomplete,
  Typography,
  FormControl,
  InputLabel,
  FormLabel
} from "@mui/material";

import {
  GridCellEditStopParams,
  GridToolbarExport,
  GridToolbarQuickFilter,
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
  GridRowCount,
} from "@mui/x-data-grid";
import {

  randomId,
} from "@mui/x-data-grid-generator";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import { getAllUsers, getAllRoles, createUser } from "@/utils/redux/actions/user";
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';


type PasswordVisibilityMap = {
  [key: string]: boolean; 
};


interface roleProps {
  id: number,
  roleName: string,
  permissions: any[]
}



interface rowProps {
  id?: number,
  isNew?: boolean,
  username: string,
  firstName: string,
  lastName: string,
  age: number,
  phone: string,
  address: string,
  password: string,
  roles: roleProps[],
  permissions?: {id:string, permissionName:string}[],
  createdAt?: Date,
  updatedAt?: Date,
  createdBy?: string,
  updatedBy?: string,
}


interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}



export default function DynamicDataGrid() {

  function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;
  
    const handleClick = () => {
      handleOpen();
      // const id = randomId();
      // setRows((oldRows) => [
      //   ...oldRows,
      //   { id, username: "", firstName: "",lastName: "", age: 20 ,phone: "",address: "", roles: [],createdAt: new Date(), updatedAt:new Date(),  isNew: true },
      // ]);
      // setRowModesModel((oldModel) => ({
      //   ...oldModel,
      //   [id]: { mode: GridRowModes.Edit, },
      // }));
    };
  
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
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
  const [isLoading, setIsLoading] = React.useState(true);
  const [rows, setRows] = React.useState<rowProps[]>([]);
  const [roles, setRoles] = React.useState<roleProps[] | null>(null);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const { allUsers, allRoles } = useAppSelector((state: any) => state.reducer);
  const [passwordVisibility, setPasswordVisibility] = React.useState<PasswordVisibilityMap>({});

  const handleToggleShowPassword = (id: any) => {
    setPasswordVisibility((prev:any) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    const foundRow = rows.find((row) => row.id === id);
    if (foundRow) {
      const { id, createdAt, updatedAt, isNew, ...params } = foundRow;
      if(true){
        const requiredFields: Array<keyof typeof params> = ['username', 'lastName', 'firstName', 'phone', 'password'];
        const emptyFields = requiredFields.filter(field => !params[field]);
    
        if (emptyFields.length > 0) {
          alert(`The following fields are required: ${emptyFields.join(', ')}`);
          return; 
        }
    
        dispatch(createUser(params));
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
      }
      else{

      }
    }
  };
  
  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: rowProps) => {
    const updatedRow = { ...newRow, isNew: false,};
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [

    {
      field: "id",
      headerName: "Id",
      type: "number",
      flex: 0.5,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    { field: "username", headerName: "Username", flex: 1, editable: true, },
    { field: "firstName", headerName: "First Name", flex: 1, editable: true },
    { field: "lastName", headerName: "Last Name", flex: 1, editable: true },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      flex: 0.5,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    { field: "phone", headerName: "Phone", flex: 1, editable: true },
    { field: "address", headerName: "Address", flex: 1, editable: true },
    {
      field: "roles",
      headerName: "Roles",
      flex: 1,
      renderCell: (params) => {
        const rolesDisplay = params.value.map((role: roleProps) => role.roleName).join(', ') || 'No roles assigned';
        return <span>{rolesDisplay}</span>; 
      },
    },  
    {
      field: "password",
      headerName: "Password",
      flex: 1,
      editable: true,
      renderCell: (params) => (
        <div>
          {params.value ? '******' : '******'} {/* Always show asterisks */}
        </div>
      ),
      renderEditCell: (params: GridCellEditStopParams) => {
        const isVisible = passwordVisibility[params.id] || false;
        const passwordValue = params.value || '';

        return (
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <TextField
              type={isVisible ? "text" : "password"} // Toggle password visibility
              value={passwordValue}
              onChange={(event) => {
                const newValue = event.target.value;
                params.api.setEditCellValue({ id: params.id, field: "password", value: newValue });
              }}
              variant="outlined"
              size="small"
              sx={{  flex: 1 }}
            />
            <IconButton onClick={() => handleToggleShowPassword(params.id)}>
              {isVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
        );
      },
    },  
    {
      field: "createdAt",
      headerName: "Created At",
      type: "date",
      valueGetter: (params) => {
        return new Date(params); 
      },
      flex: 1,
      editable: false,
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
    { field: "createdBy", headerName: "Created By",flex: 1, editable: false },
    { field: "updatedBy", headerName: "Updated By", flex: 1, editable: false },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 0.6,
      cellClassName: "actions",
      getActions: ({ id,row, }) => {
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

  // ADD RECORD FORM 
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<rowProps>({username: "", firstName: "", lastName: "", age: 20, phone: "", address: "",roles: [], password: ""  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: any) => {
    const { name, value, } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRolesChange = (newValue: any) => {
    if (Array.isArray(newValue)) {
      setFormData((prevState) => ({
        ...prevState,
        roles: newValue,
      }));
    }
    console.log(newValue)
    console.log(formData)
  };

  const handleSubmit = () => {
    // setData([...data, { id: data.length + 1, ...formData }]);
    // setFormData({ name: '', age: '' });
    handleClose();
  };
  // END ADD RECORD FORM 
  
  React.useEffect(()=>{
    dispatch(getAllRoles());
    dispatch(getAllUsers());
  },[])


  React.useEffect(()=>{
    if(allUsers && allRoles){
      setRows(allUsers); 
    }
  },[allUsers])

  React.useEffect(()=>{
    if(allRoles){
      setRoles(allRoles);
    }
  },[allRoles])

  React.useEffect(()=>{
    setIsLoading(false);
  },[rows])

  return (
    <Box
      sx={{
        height: "94vh",
        width: "calc(100vw - 240px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingX: "16px",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        disableRowSelectionOnClick
       

        slots={{
          toolbar: EditToolbar as GridSlots["toolbar"],
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
        }}
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: '2px solid',
            borderColor: 'primary.main', 
          },
          '& .MuiDataGrid-columnHeaderTitle':{
            fontWeight: 'bold', 
          }
        }}
      />
  <Modal open={open} onClose={handleClose}>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      borderRadius: 2,
      width: 400,
    }}
  >
    <Typography variant="h6" component="h2" gutterBottom>
      Create New Entry
    </Typography>
    <form onSubmit={handleSubmit}>
      <TextField
        required
        type="email"
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        required
        type="text"
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        required
        type="text"
        label="Last Name"
        name="lastName"
        value={formData.lastName} // Fixed value here
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        required
        type="number"
        label="Age"
        name="age"
        value={formData.age}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        required
        type="tel"
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        required
        type="text"
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <FormControl fullWidth margin="normal">
        <Autocomplete
          multiple
          disableCloseOnSelect
          options={roles || []}
          getOptionLabel={(option) => option.roleName}
          value={formData.roles}
          onChange={(event, newValue) => {
            handleRolesChange(newValue);
          }}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox checked={selected} />
              <ListItemText primary={option.roleName} />
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Select Roles" />
          )}
        />
      </FormControl>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit
      </Button>
    </form>
  </Box>
</Modal>

    </Box>
  );
}
