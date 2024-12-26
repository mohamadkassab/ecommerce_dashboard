import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemToDelete?: { name: string } | null;
  dialogTitle?: string;
  confirmationMessage?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  itemToDelete,
  dialogTitle = "Confirm Deletion",
  confirmationMessage = "Are you sure you want to delete",
  cancelButtonText = "Cancel",
  confirmButtonText = "Confirm",
}) => {
  const itemName = itemToDelete?.name || "Item";
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ "& .MuiDialog-paper": { padding: "20px", borderRadius: "8px" } }}
    >
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
        {dialogTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontSize: "1rem", lineHeight: "1.5" }}>
          {confirmationMessage}{" "}
          <Typography
            component="span"
            variant="body1"
            sx={{ fontWeight: "bold", color: "error.main" }}
          >
            {itemName}
          </Typography>
          &nbsp;?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-end", mt: 2 }}>
        <Button
          onClick={onClose}
          color="primary"
          variant="outlined"
          sx={{ mr: 1 }}
        >
          {cancelButtonText}
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          sx={{
            backgroundColor: "error.main",
            "&:hover": { backgroundColor: "error.dark" },
          }}
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
