"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const AddCustomerPage = () => {
  const router = useRouter();

  // State for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [numberOfOrders, setNumberOfOrders] = useState(0); // Default to 0
  const [dateAdded, setDateAdded] = useState(
    new Date().toISOString().split("T")[0]
  ); // Default to current date

  // Handle form submission
  const handleSubmit = () => {
    // Here, you would typically send the data to your server or state management
    console.log("Customer added:", {
      name,
      email,
      phone,
      address,
      numberOfOrders,
      dateAdded,
    });
    router.push("/customers/customers"); // Redirect back to customers list
  };

  // Handle cancel button
  const handleCancel = () => {
    router.push("/customers/customers");
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Paper sx={{ padding: "30px", maxWidth: "600px", margin: "0 auto" }}>
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Add New Customer
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
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          label="Number of Orders"
          variant="outlined"
          fullWidth
          type="number"
          value={numberOfOrders}
          onChange={(e) => setNumberOfOrders(Number(e.target.value))}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          label="Date Added"
          variant="outlined"
          fullWidth
          type="date"
          InputLabelProps={{ shrink: true }}
          value={dateAdded}
          onChange={(e) => setDateAdded(e.target.value)}
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
            Add Customer
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleCancel}
            sx={{ padding: "10px 20px" }}
          >
            Cancel
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddCustomerPage;
