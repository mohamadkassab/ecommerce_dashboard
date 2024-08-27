import React from 'react';
import { Button } from '@mui/material';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  width?: string | number; // Dynamic width
  type?: 'button' | 'submit' | 'reset'; // Button type
}

const PrimaryButton: React.FC<ButtonProps> = ({ onClick=()=>{}, children, width = '100%', type = 'button' }) => {
  return (
    <Button
      type={type}
      variant="contained"
      color="primary"
      sx={{ mt:2, py: 2, width }} 
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
