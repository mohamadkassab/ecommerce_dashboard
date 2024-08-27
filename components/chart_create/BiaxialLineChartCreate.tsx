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
import BiaxialLineChart from "../chart/BiaxialLineChart";
import { DUMMYDATA } from "@/utils/constants";

interface FormData {
  label: string;
  numberOfGroups: number;
  xAxisKey: string;
  sqlSyntax: string;
}

type seriesProps ={
    label: string,
    data: number [],
    showMark: boolean
  }

const BiaxialLineChartCreate: React.FC = () => {
  const [formData, setFormData] = React.useState<FormData>({
    label: "",
    numberOfGroups: 0,
    xAxisKey: "",
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

  const [series, setSeries] = React.useState<seriesProps[]>([]);
  const generateSeriesData = (groupCount: number) => {
    const newSeries = [];
    for (let i = 0; i < groupCount; i++) {
      newSeries.push({
        label: `Option ${i + 1}`,
        data: Array.from({ length: 29 }, () => Math.random() * 30), 
        showMark: false,
      });
    }
    return newSeries;
  };

  React.useEffect(() => {
    const newSeries = generateSeriesData(formData["numberOfGroups"]);
    setSeries(newSeries);
  }, [formData["numberOfGroups"]]);

 

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
          type="text"
          label="X axis key"
          variant="outlined"
          margin="normal"
          name="xAxisKey" // Use name attribute to identify the field
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
            <BiaxialLineChart
            years={DUMMYDATA["BiaxialLineChart"]["years"]}
            series={series}

            />
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default BiaxialLineChartCreate;
