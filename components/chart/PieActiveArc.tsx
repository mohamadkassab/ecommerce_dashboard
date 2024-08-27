import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';


type DataItem = {
  id: number;
  value: number;
  label: string;
};

type PieActiveArcProps ={
  data: DataItem[]
}

export default function PieActiveArc({data}:PieActiveArcProps) {


  return (
    <div className='flex '>


    <PieChart
     
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={300}
      width={500}

    />
        </div>
  );
}
