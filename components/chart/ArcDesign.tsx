import * as React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';


type ArcDesignProps={
  value: number
}

export default function ArcDesign({value}:ArcDesignProps) {

  const settings = {
    width: 500,
    height: 300,
    value: value || 0 ,
  };
  return (
    <div className='w-full flex '>


    <Gauge
      {...settings}
      cornerRadius="50%"
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 40,
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: '#52b202',
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: theme.palette.text.disabled,
        },
      })}
    />
        </div>
  );
}
