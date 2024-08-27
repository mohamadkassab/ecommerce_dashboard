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
import PieActiveArc from "../chart/PieActiveArc";

interface FormData {
  label: string;
  numberOfGroups: number;
  sqlSyntax: string;
}

type DataItem = {
    id: number;
    value: number;
    label: string;
  };

const PieActiveArcCreate: React.FC = () => {
  const [formData, setFormData] = React.useState<FormData>({
    label: "",
    numberOfGroups: 0,
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

  const [data, setData] = React.useState<DataItem[]>([]);

  const generateSeriesData = (groupCount: number) => {
    const neData = [];
    for (let i = 0; i < groupCount; i++) {
        neData.push({
        id:Number(`${i + 1}`),
        value: Math.random() * 30,
        label: `Option ${i + 1}`,
      });
    }
    return neData;
  };

  React.useEffect(() => {
    const newData = generateSeriesData(formData["numberOfGroups"]);
    setData(newData);
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
            <PieActiveArc data={data}/>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default PieActiveArcCreate;
