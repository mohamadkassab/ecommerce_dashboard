import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";
import { APIROUTES } from "@/utils/constants";

type VerticalBarChartProps = {
  chart: any;
};

export default function VerticalBarChart({ chart }: VerticalBarChartProps) {
  const [dataQuery, setDataQuery] = React.useState<any[]>([]);
  const [xAxisQueryData, setXAxisQueryData] = React.useState<string[]>([]);
  const [seriesDataQuery, setSeriesDataQuery] = React.useState<object[]>([]);
  const [propsLength, setPropsLength] = React.useState<number>(0);

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
  }, [chart]);

  React.useEffect(() => {
    if (dataQuery && dataQuery.length > 0) {
      setPropsLength(Object.keys(dataQuery[0]).length);
    }
  }, [dataQuery]);

  React.useEffect(() => {
    const groupData: string[] = [];
    const listOfValues = [];

    for (let i = 1; i < propsLength; i++) {
      const values: number[] = [];
      const key = Object.keys(dataQuery[0])[i];
      dataQuery.forEach((item) => {
        if (!groupData.includes(item.group_name)) {
          groupData.push(item.group_name);
        }
        const key = Object.keys(item)[i];
        const value = item[key as keyof typeof item];
        values.push(value);
      });
      const dataValues = {
        data: values,
      };
      listOfValues.push(dataValues);
    }

    setSeriesDataQuery(listOfValues);
    setXAxisQueryData(groupData);
  }, [propsLength]);

  return (
    <div className="flex flex-col items-center w-full">
      {xAxisQueryData && seriesDataQuery && (
        <BarChart
          xAxis={[{ scaleType: "band", data: xAxisQueryData }]}
          series={seriesDataQuery}
          width={500}
          height={450}
          barLabel="value"
        />
      )}
    </div>
  );
}
