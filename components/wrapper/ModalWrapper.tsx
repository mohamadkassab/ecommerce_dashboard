import React, { ReactNode } from "react";
import { Modal, Box, Typography, Divider } from "@mui/material";

interface ModalWrapperProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  children?: ReactNode; // The form content passed as a child
  mdWidth?: string | number; // Optional custom width for the modal
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  open,
  handleClose,
  title,
  children,
  mdWidth = "600px", // Default width
}) => {
  return (
    <Modal open={open} onClose={handleClose} sx={{ backdropFilter: "blur(4px)", transition: "all 0.3s ease-in-out" }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
          borderRadius: 3,
          p: 4,
          maxHeight: "90vh",
          width: {
            xs: "90vw",
            md: mdWidth,
          },
          transition: "all 0.3s ease-in-out",
          overflow: "auto",
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          {title}
        </Typography>
        <Divider sx={{ mb: 1 }} />
          {children}
      </Box>
    </Modal>
  );
};

export default ModalWrapper;
