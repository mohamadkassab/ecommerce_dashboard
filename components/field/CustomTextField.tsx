import React from 'react';
import { TextField } from '@mui/material';
import FieldLabel from '../label/FieldLabel';


interface CustomTextFieldProps {
  item: any;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ item }) => {
  return (
    <div>
      <FieldLabel caption={item?.caption} htmlFor={item?.field} />
      <TextField
        id={item?.field}
        name={item?.field}
        required={item?.required}
        type={item?.type}
        value={item?.value}
        onChange={item?.onChange}
        inputProps={item?.inputProps || undefined}
        variant="outlined"
        fullWidth
        sx={{
          marginTop: 0,
          borderRadius: "8px",
          backgroundColor: "background.default",
          boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
  );
};

export default CustomTextField;
