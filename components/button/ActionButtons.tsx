import React from "react";
import { Box, Button } from "@mui/material";

interface ActionButtonsProps {
  onCancel: () => void;
  onSubmit?: () => void;
  isFormSubmitted?: boolean;
  cancelLabel?: string;
  submitLabel?: string;
  customStyles?: React.CSSProperties;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onCancel,
  onSubmit,
  isFormSubmitted,
  cancelLabel = "Cancel",
  submitLabel = "Submit",
  customStyles = {},
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        pt: 4,
        mt: "auto",
        ...customStyles,
      }}
    >
      {/* Cancel Button */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={onCancel}
        sx={{
          width: "48%",
          py: 1.5,
          borderRadius: "8px",
          textTransform: "none",
          ":hover": {
            backgroundColor: "secondary.light",
            color: "secondary.contrastText",
          },
        }}
      >
        {cancelLabel}
      </Button>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => {
          if (onSubmit) onSubmit();
        }}
        sx={{
          width: "48%",
          py: 1.5,
          borderRadius: "8px",
          backgroundColor: "primary.main",
          textTransform: "none",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          ":hover": {
            backgroundColor: "primary.dark",
            boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        {submitLabel}
      </Button>
    </Box>
  );
};

export default ActionButtons;
