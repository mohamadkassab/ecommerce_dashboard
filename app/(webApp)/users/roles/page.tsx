"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import SecurityIcon from "@mui/icons-material/Security";
import SearchIcon from "@mui/icons-material/Search";
import PrimaryButton from "@/components/button/PrimaryButton";
import Link from "next/link";

const RolesPage = () => {
  const router = useRouter();

  // Dummy data for roles
  const [roles, setRoles] = useState([
    { id: 1, title: "Admin one", description: "Administrator role" },
    { id: 2, title: "Admin two", description: "root role" },
    { id: 3, title: "User Alpha", description: "Regular user role" },
    { id: 4, title: "Moderator Beta", description: "Moderator role" },
  ]);

  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddRole = () => {
    router.push("/roles/add");
  };

  const handleEditRole = (id: number) => {
    router.push(`/roles/edit/${id}`);
  };

  const handleDeleteRole = (id: number) => {
    const updatedRoles = roles.filter((role) => role.id !== id);
    setRoles(updatedRoles);
  };

  const handlePermissionsClick = (id: number) => {
    console.log("Manage permissions for role with ID:", id);
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedRoles((prev) =>
      prev.includes(id) ? prev.filter((roleId) => roleId !== id) : [...prev, id]
    );
  };

  const filteredRoles = roles.filter((role) =>
    role.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Roles List
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
          placeholder="Search roles"
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
        <Link href="/users/roles/add">
          <PrimaryButton width={"150px"} onClick={handleAddRole}>
            Add Role
          </PrimaryButton>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="roles table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "background.default" }}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedRoles.length === roles.length}
                  onChange={() =>
                    setSelectedRoles(
                      selectedRoles.length === roles.length
                        ? []
                        : roles.map((role) => role.id)
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
                Role Title
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                Description
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
            {filteredRoles.map((role) => (
              <TableRow
                key={role.id}
                sx={{
                  "&:hover": { backgroundColor: "action.hover" },
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedRoles.includes(role.id)}
                    onChange={() => handleCheckboxChange(role.id)}
                  />
                </TableCell>
                <TableCell sx={{ padding: "10px", textAlign: "center" }}>
                  {role.title}
                </TableCell>
                <TableCell sx={{ padding: "10px", textAlign: "center" }}>
                  {role.description}
                </TableCell>
                <TableCell sx={{ padding: "10px", textAlign: "center" }}>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditRole(role.id)}
                    sx={{ marginRight: "10px" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteRole(role.id)}
                    sx={{ marginRight: "10px" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handlePermissionsClick(role.id)}
                  >
                    <SecurityIcon />
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

export default RolesPage;
