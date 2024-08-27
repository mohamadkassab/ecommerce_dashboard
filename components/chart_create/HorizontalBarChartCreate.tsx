import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import PrimaryButton from "../button/PrimaryButton";
import VerticalBarChart from "../chart/VerticalBarChart";
import HorizontalBarChart from "../chart/HorizontalBarChart";

interface FormData {
  label: string;
  xAxisLabel: string;
  key: string;
  numberOfOptions: number;

}

const HorizontalBarChartCreate: React.FC = () => {
  const [formData, setFormData] = React.useState<FormData>({
    label: "",
    xAxisLabel: "",
    key: "",
    numberOfOptions: 0,

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

  type DataPoint = {
    [key: string]: number | string;
  };

  const [data, setData] = React.useState<DataPoint[]>([]);
 


  React.useEffect(() => {

    const data: DataPoint[] = [];
    for (let i = 1; i < 12; i++) {
      const dataPoint: DataPoint = {};
      
      dataPoint[formData.key] = `${formData.key} ${i}`; 

      for (let j = 1; j <= formData.numberOfOptions; j++) { 
        const otherKey = `option ${j}`; 
        dataPoint[otherKey] = Math.floor(Math.random() * 10); 
      }
  
      data.push(dataPoint);
    }

    setData(data);
    console.log(data)

  }, [formData.numberOfOptions, formData.key]);


  const handleSubmit = () => {
   
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
          name="label" 
          sx={{ width: "50%" }}
          onChange={handleChange}
        />

<TextField
          required
          type="text"
          label="X axis label"
          variant="outlined"
          margin="normal"
          name="xAxisLabel" 
          sx={{ width: "50%" }}
          onChange={handleChange}
        />

<TextField
          required
          type="text"
          label="Key"
          variant="outlined"
          margin="normal"
          name="key" 
          sx={{ width: "50%" }}
          onChange={handleChange}
        />

        <TextField
          required
          type="number"
          label="Number of options"
          variant="outlined"
          margin="normal"
          name="numberOfOptions" // Use name attribute to identify the field
          sx={{ width: "50%" }}
          onChange={handleChange}
        />
   

        <PrimaryButton width={"50%"} onClick={handleSubmit}>
          ADD
        </PrimaryButton>
      </div>
      <Box className="w-full lg:w-1/2 xl:w-1/3  flex justify-center ">
              <Card
                sx={{
                  width: 500,
                  height: 500,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
          <CardContent sx={{ flexGrow: 1 }}>
        
            <HorizontalBarChart  dataset={data} initialSelectedOption={`option 1`} dataKey={formData.key} xaxisLabel={formData.xAxisLabel} label={formData["label"]}/>
          </CardContent>
        </Card>
      </Box>

    </div>
  );
};

export default HorizontalBarChartCreate;
