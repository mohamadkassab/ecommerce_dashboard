"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Paper,
  TableContainer,
  Checkbox,
  TextField,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import PrimaryButton from "@/components/button/PrimaryButton";

const UsersPage = () => {
  const router = useRouter();

  // Dummy data for users
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", type: "Admin" },
    { id: 2, name: "Jane Smith", type: "User" },
    { id: 3, name: "Sam Wilson", type: "Moderator" },
  ]);

  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddUser = () => {
    router.push("/users/users/add");
  };

  const handleEditUser = (id: number) => {
    router.push(`/users/edit/${id}`);
  };

  const handleDeleteUser = (id: number) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleRoleClick = (id: number) => {
    console.log("Manage role for user with ID:", id);
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Users List
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search users"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ marginRight: "10px", width: "300px" }}
        />
        {/* <IconButton color="primary">
          <FilterListIcon />
        </IconButton> */}
        <Link href="/users/users/add">
          <PrimaryButton width={"150px"}>Add User</PrimaryButton>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "background.default" }}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedUsers.length === users.length}
                  onChange={() =>
                    setSelectedUsers(
                      selectedUsers.length === users.length
                        ? []
                        : users.map((user) => user.id)
                    )
                  }
                />
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                Type
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  "&:hover": { backgroundColor: "action.hover" },
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                  />
                </TableCell>
                <TableCell sx={{ padding: "10px", textAlign: "center" }}>
                  {user.name}
                </TableCell>
                <TableCell sx={{ padding: "10px", textAlign: "center" }}>
                  {user.type}
                </TableCell>
                <TableCell sx={{ padding: "10px", textAlign: "center" }}>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditUser(user.id)}
                    sx={{ marginRight: "10px" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteUser(user.id)}
                    sx={{ marginRight: "10px" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handleRoleClick(user.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersPage;
