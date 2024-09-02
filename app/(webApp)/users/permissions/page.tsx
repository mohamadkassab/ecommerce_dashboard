"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
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
import SearchIcon from "@mui/icons-material/Search";
import PrimaryButton from "@/components/button/PrimaryButton";
import Link from "next/link";

const PermissionsPage = () => {
  const router = useRouter();

  // Dummy data for permissions
  const [permissions, setPermissions] = useState([
    {
      id: 1,
      title: "View Dashboard",
      description: "Allows viewing of the dashboard",
    },
    {
      id: 2,
      title: "Edit Users",
      description: "Allows editing of user information",
    },
    { id: 3, title: "Delete Posts", description: "Allows deletion of posts" },
  ]);

  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddPermission = () => {
    router.push("/permissions/add");
  };

  const handleEditPermission = (id: number) => {
    router.push(`/permissions/edit/${id}`);
  };

  const handleDeletePermission = (id: number) => {
    const updatedPermissions = permissions.filter(
      (permission) => permission.id !== id
    );
    setPermissions(updatedPermissions);
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedPermissions((prev) =>
      prev.includes(id)
        ? prev.filter((permissionId) => permissionId !== id)
        : [...prev, id]
    );
  };

  const filteredPermissions = permissions.filter((permission) =>
    permission.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Permissions List
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
          placeholder="Search permissions"
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
        <Link href="/users/permissions/add">
          <PrimaryButton width={"170px"} onClick={handleAddPermission}>
            Add Permission
          </PrimaryButton>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="permissions table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "background.default" }}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedPermissions.length === permissions.length}
                  onChange={() =>
                    setSelectedPermissions(
                      selectedPermissions.length === permissions.length
                        ? []
                        : permissions.map((permission) => permission.id)
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
                Permission Title
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
            {filteredPermissions.map((permission) => (
              <TableRow
                key={permission.id}
                sx={{
                  "&:hover": { backgroundColor: "action.hover" },
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedPermissions.includes(permission.id)}
                    onChange={() => handleCheckboxChange(permission.id)}
                  />
                </TableCell>
                <TableCell sx={{ padding: "10px", textAlign: "center" }}>
                  {permission.title}
                </TableCell>
                <TableCell sx={{ padding: "10px", textAlign: "center" }}>
                  {permission.description}
                </TableCell>
                <TableCell sx={{ padding: "10px", textAlign: "center" }}>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditPermission(permission.id)}
                    sx={{ marginRight: "10px" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeletePermission(permission.id)}
                  >
                    <DeleteIcon />
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

export default PermissionsPage;
