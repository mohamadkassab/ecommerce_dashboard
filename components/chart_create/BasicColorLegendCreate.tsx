import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import PrimaryButton from "../button/PrimaryButton";
import VerticalBarChart from "../chart/VerticalBarChart";
import BasicColorLegend from "../chart/BasicColorLegend";
import { DUMMYDATA } from "@/utils/constants";

interface FormData {
  label: string;
  lowMargin: number;
  highMargin: number;
  sqlSyntax: string;
}

const BasicColorLegendCreate: React.FC = () => {
  const [formData, setFormData] = React.useState<FormData>({
    label: "",
    lowMargin: 0,
    highMargin: 0,
    sqlSyntax: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type  } = event.target;

    const parsedValue =
      type === "date"
        ? new Date(value)
        : type === "number" && !isNaN(parseFloat(value))
        ? parseFloat(value)
        : value;

    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const handleSubmit = () => {
    console.log("FormData:", formData);
  };

  return (
    <div className="flex flex-wrap w-full mt-[4rem]">
      <div className=" w-full lg:w-1/3 flex flex-col justify-start items-center">
        <TextField
          required
          type="text"
          label="Label"
          variant="outlined"
          margin="normal"
          name="label" // Use name attribute to identify the field
          sx={{ width: "50%" }}
          onChange={handleChange}
        />
        <TextField
          required
          helperText="Low margin"
          type="number"
          variant="outlined"
          margin="normal"
          name="lowMargin" // Use name attribute to identify the field
          sx={{ width: "50%" }}
          onChange={handleChange}
        />
        <TextField
          required
          helperText="High margin"
          type="number"
          variant="outlined"
          margin="normal"
          name="highMargin" // Use name attribute to identify the field
          sx={{ width: "50%" }}
          onChange={handleChange}
        />
        <TextField
          required
          type="text"
          multiline
          rows={3}
          label="SQL Syntax"
          variant="outlined"
          margin="normal"
          name="sqlSyntax" // Use name attribute to identify the field
          sx={{ width: "50%" }}
          onChange={handleChange}
        />
        <PrimaryButton width={"50%"} onClick={handleSubmit}>
          ADD
        </PrimaryButton>
      </div>
      <Box className="w-full lg:w-2/3  flex justify-start items-center">
        <Card
          sx={{
            width: 1000,
            height: 500,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" gutterBottom>
              {formData["label"]}
            </Typography>
            <BasicColorLegend
              dataset={DUMMYDATA["BasicColorLegend"]["dataset"]}
              lowMargin={formData["lowMargin"]}
              highMargin={formData["highMargin"]}
            />
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default BasicColorLegendCreate;
