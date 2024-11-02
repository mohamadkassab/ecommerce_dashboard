import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { DUMMYDATA } from "@/utils/constants";


type VerticalBarChartProps = {
  xAxisData?: string[];
  seriesData?: { data: number[] }[];

};

export default function VerticalBarChart({
  xAxisData,
  seriesData,

}: VerticalBarChartProps) {
  return (
    <div className="flex flex-col items-center w-full">
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: xAxisData || DUMMYDATA["VerticalBarChart"]["xAxisData"],
          },
        ]}
        series={seriesData || DUMMYDATA["VerticalBarChart"]["seriesData"]}
        width={500}
        height={430}
        barLabel="value"
      />
    </div>
  );
}
