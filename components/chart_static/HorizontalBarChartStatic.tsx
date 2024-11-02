import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
import { Typography } from "@mui/material";
import { APIROUTES, DUMMYDATA } from "@/utils/constants";
import { findPropertyValueByKey } from "@/utils/functions";

type HorizontalBarChartProps = {
    dataset?: { [key: string]: number | string }[];
    initialSelectedOption?: string;
    dataKey?: string;
    label?: string;
  };

export default function HorizontalBarChartStatic({  
    dataset,
    initialSelectedOption,

    dataKey,
    label,}: HorizontalBarChartProps) {
  const [selectedOption, setSelectedOption] = React.useState(initialSelectedOption || "london");

  const chartSetting = {
    xAxis: [{ label: "" }],
    width: 500,
    height: 390,
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className=" w-full flex items-between justify-between">
      <Typography
          variant="h6"
          component="div"
          gutterBottom
          sx={{
            wordWrap: "break-word",
            overflowWrap: "break-word",
            whiteSpace: "normal",
            maxWidth: "70%",
          }}
        >
          {label  || "Horizontal Bar Chart"}
        </Typography>
        <FormControl size="small">
          <InputLabel id="selected-item-label">Select</InputLabel>

          <Select
            labelId="selected-item-label"
            id="selected-item"
            value={selectedOption}
            label="Select"
            onChange={handleChange}
          >
              {dataset &&
              dataset.length > 0 &&
              Object.keys(dataset[0])
                .filter((key) => key !== String(dataKey))
                .map((key) => (
                  <MenuItem key={key} value={key}  sx={{
                    "&:hover": {
                      backgroundColor: "background.default",
                    },
                  }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </MenuItem>
                ))}
            {!dataset && Object.keys(DUMMYDATA["HorizontalBarChart"]["dataset"][0])
              .filter((key) => key !== "month")
              .map((key) => (
                <MenuItem
                  key={key}
                  value={key}
                  sx={{
                    "&:hover": {
                      backgroundColor: "background.default",
                    },
                  }}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>

      <BarChart
        dataset={dataset || DUMMYDATA["HorizontalBarChart"]["dataset"]}
        yAxis={[{ scaleType: "band", dataKey: dataKey || "month" }]}
        series={[{ dataKey: selectedOption }]}
        layout="horizontal"
        grid={{ vertical: true }}
        {...chartSetting}
      />
    </div>
  );
}
