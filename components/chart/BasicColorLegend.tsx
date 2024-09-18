import * as React from "react";
import Typography from "@mui/material/Typography";
import { LineChart } from "@mui/x-charts/LineChart";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";
import { PiecewiseColorLegend } from "@mui/x-charts/ChartsLegend";
import { APIROUTES, DUMMYDATA } from "@/utils/constants";
import axios from "axios";
import { getMinMaxDates } from "@/utils/functions";


type BasicColorLegendProps = {
  chart: any;
};

export default function BasicColorLegend({ chart }: BasicColorLegendProps) {
  const [dataQuery, setDataQuery] = React.useState<any[]>([]);
  const [transformedDataQuery, setTransformedDataQuery] = React.useState<any[]>(
    []
  );
  const [lowMargin, setLowMargin] = React.useState<number>(0);
  const [highMargin, setHighMargin] = React.useState<number>(0);

  const dateFormatter = (date: Date) => {
    const { minDate, maxDate } = getMinMaxDates([]);
    const startYear = minDate.getFullYear();
    const startMonth = minDate.getMonth();
    const endYear = maxDate.getFullYear();
    const endMonth = maxDate.getMonth();

    const diffInYears =
      maxDate.getFullYear() -
      minDate.getFullYear() -
      (maxDate.getMonth() - minDate.getMonth() < 0 ? 1 : 0);
    const yearDifference = endYear - startYear;
    const monthDifference = endMonth - startMonth;
    const diffInMonths = yearDifference * 12 + monthDifference;

    if (diffInYears < 2) {
      if (diffInMonths < 24) {
        return date.getDay().toString();
      } else {
        return date.getMonth().toString();
      }
    } else {
      return date.getFullYear().toString();
    }
  };

  const fetchData = async (query: string) => {
    try {
      const params = new URLSearchParams({ query });
      const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${
        APIROUTES.GETCHARTDATABYQUERY
      }?${params.toString()}`;
      const response = await axios.get<any[]>(fullUrl);
      setDataQuery(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  React.useEffect(() => {
    if (chart.query) {
      fetchData(chart.query);
    }
    const lowMargin = chart.chartProperties.find(
      (property: any) => property.propertyName === "lowMargin"
    )?.propertyValue;
    setLowMargin(lowMargin);

    const highMargin = chart.chartProperties.find(
      (property: any) => property.propertyName === "highMargin"
    )?.propertyValue;
    setHighMargin(highMargin);
  }, [chart]);

  React.useEffect(() => {
    if (dataQuery && dataQuery.length > 0) {
      const updatedData = dataQuery.map((item) => ({
        ...item,
        date_key: new Date(item.date_key),
      }));
      setTransformedDataQuery(updatedData);
    }
  }, [dataQuery]);

  return (
    <div className="">
      {transformedDataQuery && (
        <LineChart
          dataset={transformedDataQuery}
          series={[
            {
              dataKey: "value",
              showMark: false,
              valueFormatter: (value) => `${value?.toFixed(2)}`,
            },
          ]}
          xAxis={[
            {
              scaleType: "time",
              dataKey: "date_key",
              disableLine: false,
              valueFormatter: dateFormatter,
            },
          ]}
          yAxis={[
            {
              disableLine: true,
              disableTicks: true,
              valueFormatter: (value) => `${value}`,
              colorMap: {
                type: "piecewise",
                thresholds: [lowMargin, highMargin],
                colors: ["blue", "gray", "red"],
              },
            },
          ]}
          grid={{ horizontal: true }}
          width={900}
          height={400}
          margin={{ top: 30, right: 150 }}
          slotProps={{ legend: { hidden: true } }}
        >
          <PiecewiseColorLegend
            axisDirection="x"
            position={{ vertical: "top", horizontal: "right" }}
            direction="column"
          />
          <ChartsReferenceLine y={0} />
        </LineChart>
      )}
    </div>
  );
}
