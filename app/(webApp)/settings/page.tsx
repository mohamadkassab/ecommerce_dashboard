"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Switch,
  Avatar,
  Grid,
  FormControlLabel,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { SelectChangeEvent } from "@mui/material/Select";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    storeName: "",
    owner: "",
    email: "",
    phone: "",
    country: "",
    timezone: "",
    theme: "light",
    darkMode: false,
    bankAccount: "",
    paymentMethod: "",
    tenantGroup: "",
    tenantEmailNotifications: "",
    propertyType: "",
    propertyAddress: "",
    leaseStartDate: "",
    leaseEndDate: "",
    fontSize: "medium",
    layout: "compact",
    notifications: { email: true, sms: false, push: true },
    backgroundImage: "",
    language: "English",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>, field: string) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [field]: e.target.value,
    }));
  };

  const handleSaveSettings = () => {
    console.log("Settings saved:", settings);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Settings
      </Typography>

      {/* Account Information */}
      <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
          Account Information
        </Typography>
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{ marginBottom: "20px" }}
        >
          <Grid item>
            <Avatar sx={{ width: 100, height: 100 }}>JD</Avatar>
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              label="Store Name"
              variant="outlined"
              name="storeName"
              value={settings.storeName}
              onChange={handleInputChange}
              sx={{ marginBottom: "20px" }}
            />
            <TextField
              fullWidth
              label="Store Owner"
              variant="outlined"
              name="owner"
              value={settings.owner}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          name="email"
          value={settings.email}
          onChange={handleInputChange}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          fullWidth
          label="Phone"
          variant="outlined"
          name="phone"
          value={settings.phone}
          onChange={handleInputChange}
        />
      </Paper>

      {/* Financial and Payments */}
      <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
          Financial and Payments
        </Typography>
        <TextField
          fullWidth
          label="Bank Account Number"
          variant="outlined"
          name="bankAccount"
          value={settings.bankAccount || ""}
          onChange={handleInputChange}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          fullWidth
          label="Payment Method"
          variant="outlined"
          name="paymentMethod"
          value={settings.paymentMethod || ""}
          onChange={handleInputChange}
          sx={{ marginBottom: "20px" }}
        />
      </Paper>

      {/* Tenant Management */}
      <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
          Tenant Management
        </Typography>
        <TextField
          fullWidth
          label="Tenant Group"
          variant="outlined"
          name="tenantGroup"
          value={settings.tenantGroup || ""}
          onChange={handleInputChange}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          fullWidth
          label="Tenant Email Notifications"
          variant="outlined"
          name="tenantEmailNotifications"
          value={settings.tenantEmailNotifications || ""}
          onChange={handleInputChange}
          sx={{ marginBottom: "20px" }}
        />
      </Paper>

      {/* Property Management */}
      <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
          Property Management
        </Typography>
        <TextField
          fullWidth
          label="Property Type"
          variant="outlined"
          name="propertyType"
          value={settings.propertyType || ""}
          onChange={handleInputChange}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          fullWidth
          label="Property Address"
          variant="outlined"
          name="propertyAddress"
          value={settings.propertyAddress || ""}
          onChange={handleInputChange}
          sx={{ marginBottom: "20px" }}
        />
      </Paper>

      {/* Lease Management */}
      <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
          Lease Management
        </Typography>
        <TextField
          fullWidth
          label="Lease Start Date"
          variant="outlined"
          name="leaseStartDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={settings.leaseStartDate || ""}
          onChange={handleInputChange}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          fullWidth
          label="Lease End Date"
          variant="outlined"
          name="leaseEndDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={settings.leaseEndDate || ""}
          onChange={handleInputChange}
          sx={{ marginBottom: "20px" }}
        />
      </Paper>

      {/* Preferences */}
      <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
          Preferences
        </Typography>

        {/* Theme Selection */}
        <FormControl fullWidth sx={{ marginBottom: "20px" }}>
          <InputLabel>Theme</InputLabel>
          <Select
            value={settings.theme}
            onChange={(e) => handleSelectChange(e, "theme")}
            label="Theme"
          >
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
            <MenuItem value="high-contrast">High Contrast</MenuItem>
          </Select>
        </FormControl>

        {/* Language Selection */}
        <FormControl fullWidth sx={{ marginBottom: "20px" }}>
          <InputLabel>Language</InputLabel>
          <Select
            value={settings.language}
            onChange={(e) => handleSelectChange(e, "language")}
            label="Language"
          >
            <MenuItem value="english">English</MenuItem>
            <MenuItem value="spanish">Spanish</MenuItem>
            <MenuItem value="french">French</MenuItem>
            <MenuItem value="german">German</MenuItem>
          </Select>
        </FormControl>

        {/* Notifications Preferences */}
        <Typography variant="subtitle1" sx={{ marginBottom: "10px" }}>
          Notifications
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={settings.notifications.email}
              onChange={(e) => handleInputChange(e as any)}
              name="emailNotifications"
            />
          }
          label="Email Notifications"
          sx={{ marginBottom: "10px" }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={settings.notifications.sms}
              onChange={(e) => handleInputChange(e as any)}
              name="smsAlerts"
            />
          }
          label="SMS Alerts"
          sx={{ marginBottom: "10px" }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={settings.notifications.push}
              onChange={(e) => handleInputChange(e as any)}
              name="pushNotifications"
            />
          }
          label="Push Notifications"
          sx={{ marginBottom: "20px" }}
        />

        {/* Accessibility */}
        <Typography variant="subtitle1" sx={{ marginBottom: "10px" }}>
          Accessibility
        </Typography>
        <FormControl fullWidth sx={{ marginBottom: "20px" }}>
          <InputLabel>Font Size</InputLabel>
          <Select
            value={settings.fontSize}
            onChange={(e) => handleSelectChange(e, "fontSize")}
            label="Font Size"
          >
            <MenuItem value="small">Small</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="large">Large</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: "20px" }}>
          <InputLabel>Layout</InputLabel>
          <Select
            value={settings.layout}
            onChange={(e) => handleSelectChange(e, "layout")}
            label="Layout"
          >
            <MenuItem value="compact">Compact</MenuItem>
            <MenuItem value="spacious">Spacious</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      <Button
        variant="contained"
        color="primary"
        startIcon={<SaveIcon />}
        onClick={handleSaveSettings}
      >
        Save Settings
      </Button>
    </Box>
  );
};

export default SettingsPage;
