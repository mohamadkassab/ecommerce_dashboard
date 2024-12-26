import React from "react";
import Typography from "@mui/material/Typography";

interface FieldLabelProps {
  caption: string;
  htmlFor?: string;
}

const FieldLabel: React.FC<FieldLabelProps> = ({ caption, htmlFor}) => {
  return (
    <Typography
      variant="body1"
      component="label"
      htmlFor={htmlFor}
      sx={{
        fontWeight: "bold",
        marginTop: "12px",
        display: "block",
        color: "text.secondary",
      }}
    >
      {caption}
    </Typography>
  );
};

export default FieldLabel;
