import React, { PropsWithChildren } from "react";
import { Box } from "@mui/material";

const DataGridBox: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Box
      sx={{
        height: "calc(100vh - 100px)",
        maxWidth: "calc(100vw - 240px)",
        borderRadius: 2,
        paddingX: 2,

        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
          {children}
    </Box>
  );
};

export default DataGridBox;
