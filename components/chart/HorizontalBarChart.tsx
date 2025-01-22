import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
import { Typography } from "@mui/material";
import { APIROUTES } from "@/utils/constants";
import { FindPropertyValueByKey } from "@/utils/helpers/funtions";

type HorizontalBarChartProps = {
  chart: any;
};

export default function HorizontalBarChart({ chart }: HorizontalBarChartProps) {
  const [dataQuery, setDataQuery] = React.useState<any[]>([]);
  const [selctedOptionQuery, setSelctedOptionQuery] = React.useState<
    string | undefined
  >(undefined);

  const chartSetting = {
    xAxis: [{ label: "" }],
    width: 500,
    height: 450,
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSelctedOptionQuery(event.target.value);
  };

  const fetchData = async (query: string) => {
    try {
      const params = new URLSearchParams({ query });
      const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${
        APIROUTES.GETCHARTDATABYQUERY
      }?${params.toString()}`;
      const response = await axios.get<[]>(fullUrl);
      setDataQuery(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  React.useEffect(() => {
    if (chart.query) {
      fetchData(chart.query);
    }
  }, [chart]);



  React.useEffect(() => {
    if (dataQuery?.length > 0) {
      const firstObject = dataQuery[0];
      const firstKey = Object.keys(firstObject).find(
        (key) => key !== "key"
      );
      setSelctedOptionQuery(firstKey);
    }
  }, [dataQuery]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className=" w-full flex items-between justify-between">
        {/* <Typography
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
          {chart.label}
        </Typography> */}
        <FormControl size="small">
          <InputLabel id="selected-item-label">Select</InputLabel>

          {dataQuery && selctedOptionQuery && (
            <Select
              labelId="selected-item-label"
              id="selected-item"
              value={selctedOptionQuery}
              label="Select"
              onChange={handleChange}
            >
              {dataQuery &&
                dataQuery.length > 0 &&
                selctedOptionQuery &&
                Object.keys(dataQuery[0])
                  .filter((key) => key !== "key")
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
          )}
        </FormControl>
      </div>
      {dataQuery &&
        chart.chartProperties &&

        selctedOptionQuery && (
          <BarChart
            dataset={dataQuery}
            yAxis={[{ scaleType: "band", dataKey: "key" }]}
            series={[{ dataKey: selctedOptionQuery }]}
            layout="horizontal"
            grid={{ vertical: true }}
            {...chartSetting}
          />
        )}
    </div>
  );
}
