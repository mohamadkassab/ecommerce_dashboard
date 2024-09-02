"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";

const AddUserPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const userTypes = ["Admin", "User", "Moderator"];

  const handleSubmit = () => {
    // Here, you would typically send the data to your server or state management
    console.log("User added:", { name, type });
    router.push("/users/users"); // Redirect back to users list
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Paper sx={{ padding: "30px", maxWidth: "600px", margin: "0 auto" }}>
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Add New User
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          label="Type"
          variant="outlined"
          select
          fullWidth
          value={type}
          onChange={(e) => setType(e.target.value)}
          sx={{ marginBottom: "20px" }}
        >
          {userTypes.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              padding: "10px 20px",
              backgroundColor: "primary.main",
              "&:hover": { backgroundColor: "primary.light" },
            }}
          >
            Add User
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => router.push("/users/users")}
            sx={{ padding: "10px 20px" }}
          >
            Cancel
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddUserPage;
