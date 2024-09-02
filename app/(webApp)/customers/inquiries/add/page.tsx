"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const AddInquiryPage = () => {
  const router = useRouter();

  const [customerName, setCustomerName] = useState("");
  const [inquiryDate, setInquiryDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Default to today's date
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleSubmit = () => {
    // Here, you would typically send the data to your server or state management
    console.log("Inquiry added:", {
      customerName,
      inquiryDate,
      subject,
      message,
      status,
    });
    router.push("/customers/inquiries"); // Redirect back to inquiries list
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Paper sx={{ padding: "30px", maxWidth: "600px", margin: "0 auto" }}>
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Add New Inquiry
        </Typography>
        <TextField
          label="Customer Name"
          variant="outlined"
          fullWidth
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          label="Inquiry Date"
          type="date"
          variant="outlined"
          fullWidth
          value={inquiryDate}
          onChange={(e) => setInquiryDate(e.target.value)}
          sx={{ marginBottom: "20px" }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Subject"
          variant="outlined"
          fullWidth
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />
        <Select
          label="Status"
          value={status}
          onChange={(e: SelectChangeEvent<string>) => setStatus(e.target.value)}
          fullWidth
          sx={{ marginBottom: "20px" }}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Resolved">Resolved</MenuItem>
          <MenuItem value="Closed">Closed</MenuItem>
        </Select>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              padding: "10px 20px",
              backgroundColor: "primary.main",
              "&:hover": { backgroundColor: "primary.light" },
              width: "300px",
            }}
          >
            Add Inquiry
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => router.push("/customers/inquiries")}
            sx={{ padding: "10px 20px" }}
          >
            Cancel
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddInquiryPage;
