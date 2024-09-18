// import { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Checkbox,
//   Select,
//   MenuItem,
//   TextField,
//   InputLabel,
//   FormControl,
//   Paper,
//   Autocomplete,
//   styled,
//   Switch
// } from "@mui/material";
// import { CheckBoxOutlineBlank, CheckBox, BorderRight } from '@mui/icons-material';
// import { useTheme } from "@emotion/react";
// import { color } from "framer-motion";
// interface DynamicDataGridProps {
//   model?: any[];
//   data?: any[];
// }

// const DynamicDataGrid: React.FC<DynamicDataGridProps> = () => {
//     const theme = useTheme();
//     const icon = <CheckBoxOutlineBlank fontSize="small" />;
//     const checkedIcon = <CheckBox fontSize="small" />;
//     const options = [
//       'option1' ,
//       'option2' ,
//       'option3' ,
//       ];

//     const [multiSelect, setMultiSelect] = useState({
//       row1: ["option2", "option3"],
//       row2: [ 'option1' ],
//     });

//     const [singleSelect, setSingleSelect] = useState({
//       row1: "optionB",
//       row2: "optionA",
//     });

//   const handleMultiSelectChange = (
//     event: React.FormEvent<HTMLSelectElement>,
//     row: any
//   ) => {
//     setMultiSelect({
//       ...multiSelect,
//       [row]: event.currentTarget.value,
//     });
//   };

//   const handleSingleSelectChange = (
//     event: React.FormEvent<HTMLSelectElement>,
//     row: any
//   ) => {
//     setSingleSelect({
//       ...singleSelect,
//       [row]: event.currentTarget.value,
//     });
//   };

//   const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     color: theme.palette.text.primary,
//     textAlign: "left",

//     borderBottom: `2px solid ${theme.palette.divider}`,
//     '&:first-child': {
//       borderLeft: `1px solid ${theme.palette.divider}`,
//     },

//     '&:last-child': {
//       borderRight: `1px solid ${theme.palette.divider}`,
//     },
//   }));

//   const StyledHeaderTableCell = styled(TableCell)(({ theme }) => ({
//     fontSize: '18px',
//     color: theme.palette.background.paper,
//     position: 'relative',
//     textAlign: "left",
//     '&:not(:last-child)::after': {
//       content: '""',
//       position: 'absolute',
//       top: '50%',
//       right: 0,
//       width: '2px',
//       height: '50%',
//       transform: 'translateY(-50%)',
//       background: theme.palette.background.paper,
//     },
//   }));

//   const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     backgroundColor: `${theme.palette.primary.main}`,
//     border: `1px solid ${theme.palette.primary.main}`,
//   }));

//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <StyledTableRow>
//             <StyledHeaderTableCell>String</StyledHeaderTableCell>
//             <StyledHeaderTableCell>Number</StyledHeaderTableCell>
//             <StyledHeaderTableCell>Boolean</StyledHeaderTableCell>
//             <StyledHeaderTableCell>List (Multiple)</StyledHeaderTableCell>
//             <StyledHeaderTableCell>List (Single)</StyledHeaderTableCell>
//             <StyledHeaderTableCell>Date</StyledHeaderTableCell>
//           </StyledTableRow>
//         </TableHead>

//         <TableBody>

//           <TableRow>
//             <StyledTableCell>Another Text</StyledTableCell>
//             <StyledTableCell>99</StyledTableCell>
//             <StyledTableCell>
//             <Switch
//             checked={true}
//             // onChange={(e) => setBooleanValue(e.target.checked)}
//             color="primary"
//           />
//             </StyledTableCell>
//             <StyledTableCell>
//               <FormControl fullWidth>
//                 <Autocomplete
//                   multiple
//                   options={options}
//                   disableCloseOnSelect
//                   getOptionLabel={(option) => option}
//                   value={multiSelect.row2}
//                   onChange={(e: any, newValue) =>
//                     handleMultiSelectChange(e, "row2")
//                   }
//                   renderOption={(props, option, { selected }) => (
//                     <li {...props}>
//                       <Checkbox
//                         icon={icon}
//                         checkedIcon={checkedIcon}
//                         style={{ marginRight: 8 }}
//                         checked={selected}
//                       />
//                       {option}
//                     </li>
//                   )}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="Select options"
//                     />
//                   )}
//                   renderTags={(value, getTagProps) => (
//                     <span>
//                       {value.length} selected
//                     </span>
//                   )}
//                 />
//               </FormControl>
//             </StyledTableCell>
//             <StyledTableCell>
//             <FormControl fullWidth>
//                 <Autocomplete
//                   options={options}
//                   disableCloseOnSelect
//                   getOptionLabel={(option) => option}
//                   value={singleSelect.row2}
//                   onChange={(e: any) => handleSingleSelectChange(e, "row2")}
//                   renderOption={(props, option, { selected }) => (
//                     <li {...props}>
//                       <Checkbox
//                         icon={icon}
//                         checkedIcon={checkedIcon}
//                         style={{ marginRight: 8 }}
//                         checked={selected}
//                       />
//                       {option}
//                     </li>
//                   )}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="Single Select"
//                       placeholder="Select options"
//                     />
//                   )}

//                 />
//               </FormControl>

//             </StyledTableCell>
//             <StyledTableCell>
//               <TextField type="date" defaultValue="2024-09-17" fullWidth />
//             </StyledTableCell>
//           </TableRow>

//           <TableRow>
//             <StyledTableCell>Another Text</StyledTableCell>
//             <StyledTableCell>99</StyledTableCell>
//             <StyledTableCell>
//             <Switch
//             checked={true} // Replace with your state/variable for boolean value
//             // onChange={(e) => setBooleanValue(e.target.checked)} // Update state on change
//             color="primary" // Optional: Change color
//           />
//             </StyledTableCell>
//             <StyledTableCell>
//               <FormControl fullWidth>
//                 <Autocomplete
//                   multiple
//                   options={options}
//                   disableCloseOnSelect
//                   getOptionLabel={(option) => option}
//                   value={multiSelect.row2}
//                   onChange={(e: any, newValue) =>
//                     handleMultiSelectChange(e, "row2")
//                   }
//                   renderOption={(props, option, { selected }) => (
//                     <li {...props}>
//                       <Checkbox
//                         icon={icon}
//                         checkedIcon={checkedIcon}
//                         style={{ marginRight: 8 }}
//                         checked={selected}
//                       />
//                       {option}
//                     </li>
//                   )}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="Select options"
//                     />
//                   )}
//                   renderTags={(value, getTagProps) => (
//                     <span>
//                       {value.length} selected
//                     </span>
//                   )}
//                 />
//               </FormControl>
//             </StyledTableCell>
//             <StyledTableCell>
//             <FormControl fullWidth>
//                 <Autocomplete
//                   options={options}
//                   disableCloseOnSelect
//                   getOptionLabel={(option) => option}
//                   value={singleSelect.row2}
//                   onChange={(e: any) => handleSingleSelectChange(e, "row2")}
//                   renderOption={(props, option, { selected }) => (
//                     <li {...props}>
//                       <Checkbox
//                         icon={icon}
//                         checkedIcon={checkedIcon}
//                         style={{ marginRight: 8 }}
//                         checked={selected}
//                       />
//                       {option}
//                     </li>
//                   )}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="Single Select"
//                       placeholder="Select options"
//                     />
//                   )}

//                 />
//               </FormControl>

//             </StyledTableCell>
//             <StyledTableCell>
//               <TextField type="date" defaultValue="2024-09-17" fullWidth />
//             </StyledTableCell>
//           </TableRow>

//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };
// export default DynamicDataGrid;
// pages/table.tsx

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
  Chip,
  Checkbox,
  ListItemText,
  Autocomplete,
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
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";

const roles = [
  "Market",
  "Finance",
  "Development",
  "option1",
  "option2",
  "option3",
];
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows: GridRowsProp = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: ["Market"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: ["Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: ["Market", "Finance"],
    oneselect: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: ["Development"],
    oneselect: randomRole(),
  },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, name: "", age: "", role: [], isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
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

export default function DynamicDataGrid() {
  const [isTrue, setIsTrue] = React.useState<boolean>(false);
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsTrue(true);
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

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
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
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

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
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
            options={roles} // Assuming 'roles' is an array of string options
            value={(params.value as string[]) || []} // Cast to string[] for type safety
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

  return (
    <Box
      sx={{
        height: "94vh",
        width: "100%",
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
        // loading={!isTrue}

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
    </Box>
  );
}
