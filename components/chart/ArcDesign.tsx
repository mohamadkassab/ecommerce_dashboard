import * as React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { APIROUTES } from '@/utils/constants';
import axios from 'axios';


type ArcDesignProps={
  chart: any
}

export default function ArcDesign({chart}:ArcDesignProps) {
  const [dataQuery, setDataQuery] = React.useState<any[]>([]);
  const [settings, setSettings] = React.useState<Object>({});


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
    if(dataQuery && dataQuery.length > 0){
      const values = Object.values(dataQuery[0]);
        const settings = {
          width: 600,
          height: 400,
          value: values[0] ,
        }
        setSettings(settings);
    }
  }, [dataQuery]);
  
  return (
    <div className='w-full flex '>

    {settings &&     
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
    />}


        </div>
  );
}
