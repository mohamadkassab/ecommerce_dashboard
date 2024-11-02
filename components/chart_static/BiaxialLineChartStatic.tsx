import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const yearFormatter = (date: Date) => date.getFullYear().toString();
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;

type seriesProps ={
  label: string,
  data: number [],
  showMark: boolean
}

type BiaxialLineChartProps = {
  years: Date[],
  series: seriesProps[]
}

export default function BiaxialLineChartStatic({years, series}:BiaxialLineChartProps) {
  
  
const lineChartsParams = {
  series: series,
  width: 500,
  height: 430,
};
  return (
    <LineChart
      {...lineChartsParams}
      xAxis={[{ data: years, scaleType: 'time', valueFormatter: yearFormatter }]}
      series={series.map((series) => ({
        ...series,
        valueFormatter: (v) => (v === null ? '' : currencyFormatter(v)),
      }))}
    />
  );
}
