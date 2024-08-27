import React from 'react';
import { Button } from '@mui/material';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  width?: string | number; // Dynamic width
  type?: 'button' | 'submit' | 'reset'; // Button type
}

const SecondaryButton: React.FC<ButtonProps> = ({ onClick=()=>{}, children, width = '100px', type = 'button' }) => {
  return (
    <Button
      type={type}
      variant="contained"
      color="secondary"
      sx={{ width }} 
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
