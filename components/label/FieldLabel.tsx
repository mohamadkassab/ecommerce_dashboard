import React from "react";
import Typography from "@mui/material/Typography";

interface FieldLabelProps {
  caption: string;
  htmlFor?: string;
  isRequired?: boolean
}

const FieldLabel: React.FC<FieldLabelProps> = ({ caption, htmlFor, isRequired}) => {
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
      {caption}{isRequired ? "" : " (Optional)"}
    </Typography>
  );
};

export default FieldLabel;
