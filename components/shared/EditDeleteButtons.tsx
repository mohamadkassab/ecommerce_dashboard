import React, { useState } from 'react';
import { Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

interface EditDeleteButtonsProps {
  onDelete?: (e: React.FormEvent) => void;
  onEdit?: (e: React.FormEvent) => void;
}

const EditDeleteButtons: React.FC<EditDeleteButtonsProps> = ({ onDelete, onEdit }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (e: React.FormEvent) => {
    if (onDelete) {
      onDelete(e); 
    }
    handleClose(); 
  };

  const handleEdit = (e: React.FormEvent) =>{
    if(onEdit){
      onEdit(e);
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="flex-end" 
      sx={{ padding: '8px' }} 
    >
      {/* <IconButton onClick={handleEdit}>
        <EditIcon />
      </IconButton> */}
      <IconButton onClick={handleClickOpen} sx={{ color: (theme) => theme.palette.error.main }}>
        <DeleteOutlinedIcon />
      </IconButton>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditDeleteButtons;
