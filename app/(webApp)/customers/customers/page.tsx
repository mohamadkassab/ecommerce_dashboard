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
  Select,
  MenuItem,
  Grid,
  SelectChangeEvent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";

const initialCustomers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main St, Cityville, ST 12345",
    numberOfOrders: 5,
    dateAdded: "2024-08-31", // Adding a dateAdded field
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 234 567 891",
    address: "456 Elm St, Townsville, ST 67890",
    numberOfOrders: 3,
    dateAdded: "2024-08-30", // Adding a dateAdded field
  },
  // Add more customer data here
];

const CustomersPage = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("high-to-low");

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

  const sortedCustomers = [...customers].sort((a, b) => {
    if (sortOrder === "high-to-low") {
      return b.numberOfOrders - a.numberOfOrders;
    }
    return a.numberOfOrders - b.numberOfOrders;
  });

  const filteredCustomers = sortedCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Customers
      </Typography>

      {/* Search Bar, Sort Selector, and Add Customer Button */}
      <Paper
        sx={{
          padding: "10px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // Added to space out items
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <TextField
              label="Search Customers"
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
              sx={{ width: "200px" }} // Fixed width for the search field
            />
          </Grid>
          <Grid item>
            <Select
              value={sortOrder}
              onChange={handleSortChange}
              sx={{ width: "200px" }}
            >
              <MenuItem value="high-to-low">
                Number of Orders: High to Low
              </MenuItem>
              <MenuItem value="low-to-high">
                Number of Orders: Low to High
              </MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Link href="/customers/customers/add">
          <Button
            variant="contained"
            color="primary"
            sx={{ height: "56px", width: "200px" }} // Matches the height of the TextField
          >
            Add Customer
          </Button>
        </Link>
      </Paper>

      {/* Customers Table */}
      <Paper sx={{ padding: "20px" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Number of Orders</TableCell>
                <TableCell>Date Added</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.address}</TableCell>
                    <TableCell>{customer.numberOfOrders}</TableCell>
                    <TableCell>{customer.dateAdded}</TableCell>
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
          count={filteredCustomers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default CustomersPage;
