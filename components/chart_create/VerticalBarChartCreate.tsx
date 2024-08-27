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

interface FormData {
  label: string;
  numberOfGroups: number;
  numberOfColumns: number;
  sqlSyntax: string;
}

const VerticalBarChartCreate: React.FC = () => {
  const [formData, setFormData] = React.useState<FormData>({
    label: "",
    numberOfGroups: 0,
    numberOfColumns: 0,
    sqlSyntax: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const parsedValue = isNaN(parseFloat(value)) || value.trim() === ""
    ? value 
    : parseFloat(value); 

    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const [xAxisData, setXAxisData] = React.useState<string[]>([]);
  const [seriesData, setSeriesData] = React.useState<{ data: number[] }[]>([]);

  // Effect to generate new data only when numberOfGroups or numberOfColumns changes
  React.useEffect(() => {
    // Generate new xAxisData based on numberOfGroups
    const newXAxisData = Array.from(
      { length: formData.numberOfGroups },
      (_, index) => `Group ${index + 1}`
    );
    setXAxisData(newXAxisData);

    // Generate new seriesData based on numberOfColumns and numberOfGroups
    const newSeriesData = Array.from(
      { length: formData.numberOfColumns },
      (_, index) => ({
        data: Array(formData.numberOfGroups)
          .fill(0)
          .map(() => Math.floor(Math.random() * 10) + 1), // Random data for demonstration
      })
    );
    setSeriesData(newSeriesData);
  }, [formData.numberOfGroups, formData.numberOfColumns]);

  const handleSubmit = () => {
    console.log("FormData:", formData);
  };

  return (
    <div className="flex flex-wrap w-full mt-[4rem]">
      <div className="w-full lg:w-1/2 flex flex-col justify-start items-center">
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
          type="number"
          label="Number of groups"
          variant="outlined"
          margin="normal"
          name="numberOfGroups" // Use name attribute to identify the field
          sx={{ width: "50%" }}
          onChange={handleChange}
        />
        <TextField
          required
          type="number"
          label="Number of columns"
          variant="outlined"
          margin="normal"
          name="numberOfColumns" // Use name attribute to identify the field
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
      <Box className="w-full lg:w-1/2 xl:w-1/3 flex justify-center">
              <Card
                sx={{
                  width: 500,
                  height: 500,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" gutterBottom>
              {formData["label"]}
            </Typography>
            <VerticalBarChart
              xAxisData={xAxisData}
              seriesData={seriesData}
              label="Example chart"
            />
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default VerticalBarChartCreate;
