import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { APIROUTES } from '@/utils/constants';
import axios from 'axios';
import { getMinMaxDates } from '@/utils/helpers/funtions';






type lineChartsProps ={
  series: seriesProps[],
  width: number,
  height: number
}

type seriesProps ={
  label: string,
  data: any [],
  showMark: boolean
}

type BiaxialLineChartProps = {
  chart: any,

}

export default function BiaxialLineChart({chart}:BiaxialLineChartProps) {


  const [dataQuery, setDataQuery] = React.useState<any[]>([]);
  const [series, setSeries] = React.useState<seriesProps[] | undefined>();
  const [lineCharts, setLineCharts] = React.useState<lineChartsProps | undefined>();
  const [dateSeries, setDateSeries] = React.useState<Date[]>([]);

  
  const dateFormatter = (date: Date) => {
    const { minDate, maxDate } = getMinMaxDates(dateSeries);
    const startYear = minDate.getFullYear();
    const startMonth = minDate.getMonth();
    const endYear = maxDate.getFullYear();
    const endMonth = maxDate.getMonth();
  
    const diffInYears = (maxDate.getFullYear() - minDate.getFullYear()) - ((maxDate.getMonth() - minDate.getMonth()) < 0 ? 1 : 0);
    const yearDifference = endYear - startYear;
    const monthDifference = endMonth - startMonth;
    const diffInMonths = yearDifference * 12 + monthDifference;
  
    if (diffInYears < 2) {
      if(diffInMonths < 24){
        return date.getDay().toString(); 
      }else{
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
  }, [chart]);

  React.useEffect(() => {
    if(dataQuery && dataQuery.length > 0){
      const newSeries: seriesProps[] = [];
      const propsLength = Object.keys(dataQuery[0]).length;
      const keys = Object.keys(dataQuery[0]);
  
      for(let i = 0 ; i < propsLength ; i++){
        if(keys[i] !== "date_key"){
          const seriesData: any[] = [];
          dataQuery.forEach(item => {
            seriesData.push(item[`${keys[i]}`]);
          });

          newSeries.push({
            label: keys[i],
            data: seriesData,
            showMark: false,
          })
        }else{
          const newDates:Date[] = [];
          dataQuery.forEach(item => {
            const newDate = new Date(item[`${keys[i]}`]);
            newDates.push(newDate);

          });
          setDateSeries(newDates);
        }   
      }
      setSeries(newSeries);

    }
  }, [dataQuery]);

  React.useEffect(() => {
  
   setLineCharts({
    series: series || [],
    width: 500,
    height: 450,

   })
  }, [series]);


  return (
    <div>
      {series &&  lineCharts &&  dateSeries &&  
      <LineChart
          {...lineCharts}
          xAxis={[{ data: dateSeries, scaleType: 'time', valueFormatter: dateFormatter }]}
          series={series?.map((series) => ({
            ...series,
          })) || []}
        />}
    </div>


  );
}
