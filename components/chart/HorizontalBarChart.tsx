import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

type HorizontalBarChartProps = {
  dataset?: { [key: string]: number | string }[];
  initialSelectedOption?: string;
  xaxisLabel?: string,
  dataKey?: string,
  label?: string,
};



export default function HorizontalBarChart({
  dataset,
  initialSelectedOption,
  xaxisLabel,
  dataKey,
  label
}: HorizontalBarChartProps) {

  const chartSetting = {
    xAxis: [{ label: xaxisLabel ? String(xaxisLabel) : ""}],
    width: 500,
    height: 400,
  };


  const [selectedOption, setSelectedOption] = React.useState(initialSelectedOption);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedOption(event.target.value);
  };

  return (


<div className="flex flex-col items-center justify-center">

<div className=" w-full flex items-between justify-between">
<Typography variant="h6" component="div" gutterBottom>
                    {label}
                  </Typography>
<FormControl  size="small">
          <InputLabel id="selected-item-label">Select</InputLabel>
          <Select
            labelId="selected-item-label"
            id="selected-item"
            value={selectedOption}
            label="Select"
            onChange={handleChange}
          >
            {dataset && dataset.length > 0 && 
              Object.keys(dataset[0])
                .filter((key) => key !== String(dataKey))
                .map((key) => (
                  <MenuItem key={key} value={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </MenuItem>
                ))}
 
          </Select>
        </FormControl>
</div>
    
 
<BarChart
dataset={dataset}
yAxis={[{ scaleType: "band", dataKey: String(dataKey) }]}
series={[{ dataKey: selectedOption}]} 
layout="horizontal"
grid={{ vertical: true }}

{...chartSetting}
/>
</div>

  );
}
