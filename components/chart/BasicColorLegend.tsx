import * as React from 'react';
import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';
import { ChartsReferenceLine } from '@mui/x-charts/ChartsReferenceLine';
import { PiecewiseColorLegend } from '@mui/x-charts/ChartsLegend';




  type datasetType = {
    year: Date,
    value:number,
  }

  type BasicColorLegendProps ={
    dataset: datasetType[],
    lowMargin: number,
    highMargin:number

  }


  

export default function BasicColorLegend({dataset, lowMargin, highMargin}:BasicColorLegendProps) {
  return (
    <div className=''>

      <LineChart
        dataset={dataset}
        series={[
          {
            dataKey: 'value',
            showMark: false,
            valueFormatter: (value) => `${value?.toFixed(2)}°`,
          },
        ]}
        xAxis={[
          {
            scaleType: 'time',
            dataKey: 'year',
            disableLine: false,
            valueFormatter: (value) => value.getFullYear().toString(),

          },
        ]}
        yAxis={[
          {
            disableLine: true,
            disableTicks: true,
            valueFormatter: (value) => `${value}°`,
            colorMap: {
              type: 'piecewise',
              thresholds: [lowMargin, highMargin],
              colors: ['blue', 'gray', 'red'],
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
          position={{ vertical: 'top', horizontal: 'right' }}
          direction="column"
        />
        <ChartsReferenceLine y={0} />
      </LineChart>
    </div>
  );
}
