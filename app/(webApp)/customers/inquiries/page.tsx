"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  TextField,
  IconButton,
  Grid,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";

const initialInquiries = [
  {
    id: 1,
    customerName: "John Doe",
    inquiryDate: "2024-08-31",
    subject: "Order Issue",
    message: "There was an issue with my recent order.",
    status: "Pending",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    inquiryDate: "2024-08-30",
    subject: "Product Return",
    message: "I would like to return a product I purchased.",
    status: "Resolved",
  },
  // Add more inquiry data here
];

const CustomerInquiriesPage = () => {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("new-to-old");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortOrder(event.target.value);
  };

  const sortedInquiries = [...inquiries].sort((a, b) => {
    if (sortOrder === "new-to-old") {
      return (
        new Date(b.inquiryDate).getTime() - new Date(a.inquiryDate).getTime()
      );
    }
    return (
      new Date(a.inquiryDate).getTime() - new Date(b.inquiryDate).getTime()
    );
  });

  const filteredInquiries = sortedInquiries.filter((inquiry) =>
    inquiry.customerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Customer Inquiries
      </Typography>

      {/* Search Bar, Sort Selector, and Add Inquiry Button */}
      <Paper
        sx={{
          padding: "10px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <TextField
              label="Search Inquiries"
              variant="outlined"
              value={search}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
              sx={{ width: "200px" }}
            />
          </Grid>
          <Grid item>
            <Select
              value={sortOrder}
              onChange={handleSortChange}
              sx={{ width: "200px" }}
            >
              <MenuItem value="new-to-old">Date: New to Old</MenuItem>
              <MenuItem value="old-to-new">Date: Old to New</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Link href="/customers/inquiries/add">
          <Button variant="contained" color="primary" sx={{ height: "56px" }}>
            Add Inquiry
          </Button>
        </Link>
      </Paper>

      {/* Inquiries Table */}
      <Paper sx={{ padding: "20px" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer Name</TableCell>
                <TableCell>Inquiry Date</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredInquiries
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell>{inquiry.customerName}</TableCell>
                    <TableCell>{inquiry.inquiryDate}</TableCell>
                    <TableCell>{inquiry.subject}</TableCell>
                    <TableCell>{inquiry.message}</TableCell>
                    <TableCell>{inquiry.status}</TableCell>
                    <TableCell>
                      <IconButton color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filteredInquiries.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default CustomerInquiriesPage;
