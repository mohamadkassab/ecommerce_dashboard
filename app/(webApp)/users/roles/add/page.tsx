"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const AddRolePage = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    // Here, you would typically send the data to your server or state management
    console.log("Role added:", { title, description });
    router.push("/users/roles"); // Redirect back to roles list
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Paper sx={{ padding: "30px", maxWidth: "600px", margin: "0 auto" }}>
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Add New Role
        </Typography>
        <TextField
          label="Role Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          label="Role Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />
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
            Add Role
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => router.push("/users/roles")}
            sx={{ padding: "10px 20px" }}
          >
            Cancel
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddRolePage;
