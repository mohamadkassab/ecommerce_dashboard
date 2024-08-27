// import * as React from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';

// export default function VerticalBarChart() {
//   return (
//     <BarChart
//     xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C', ] }]}
//     series={[{ data: [4,2,3 ] }, { data: [1,2, 1 ] }]}
//     width={400}
//     height={300}
//     barLabel="value"
//     />
//   );
// }

import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography } from '@mui/material';

type VerticalBarChartProps = {
  xAxisData: string[];
  seriesData: { data: number[] }[];
  label: string;
};

export default function VerticalBarChart({
  xAxisData,
  seriesData,
  label
}: VerticalBarChartProps) {


  return (
    <div className='flex flex-col items-center w-full'>

    <BarChart
      xAxis={[{ scaleType: 'band', data: xAxisData }]}
      series={seriesData}
      width={500}
      height={400}
      barLabel="value"
    />
  </div>
  );
}
