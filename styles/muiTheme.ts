"use client";
import { createTheme } from "@mui/material/styles";

export const globalRadius = "8px";

const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#0091D5", 
      light: "#cceaff",
      dark: "#006399",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#484848", // Dark gray
      light: "#6d6d6d",
      dark: "#2c2c2c",
      contrastText: "#ffffff",
    },
    error: {
      main: "#d9534f", // Red
    },
    warning: {
      main: "#ff9800", // Orange
    },
    success: {
      main: "#4caf50", // Green
    },
    info: {
      main: "#2196f3", // Blue
    },
    background: {
      default: "#ffffff", 
      paper: "#ffffff", // White
    },
    text: {
      primary: "#000000", // Black
      secondary: "#484848", // Dark gray
    },
    action: {
      active: "#484848", 
      hover: "#cceaff", 
      selected: "#ffffff",
      disabled: "#9e9e9e", 
    },
  },

  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2.125rem",
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: "0.015em",
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 700,
      lineHeight: 1.4,
      letterSpacing: "0.015em",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 700,
      lineHeight: 1.4,
      letterSpacing: "0.015em",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      textTransform: "uppercase", // Consistent button text case
      fontWeight: 700,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: globalRadius,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: globalRadius,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: globalRadius,
          "& .MuiInputBase-root": {
            borderRadius: globalRadius,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: globalRadius,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#484848",
          "&.Mui-checked": {
            color: "#0091D5",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "16px",
          borderRadius: globalRadius,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: globalRadius,
          padding: "24px",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#c1c1c1",
          fontFamily: "Roboto, Arial, sans-serif",
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        },
        "*": {
          boxSizing: "inherit",
        },
        a: {
          textDecoration: "none",
          color: "inherit",
        },
      },
    },
  },

  spacing: 8, 

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },

  direction: "ltr", // Consider RTL if needed
});

export default muiTheme;
