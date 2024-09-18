import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { APIROUTES } from "@/utils/constants";
import axios from "axios";


type PieActiveArcProps = {
  chart: any;
};



export default function PieActiveArc({ chart }: PieActiveArcProps) {
  const [dataQuery, setDataQuery] = React.useState<any[]>([]);
  const [transformedDataQuery, setTransformedDataQuery] = React.useState<any[]>([]);

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
      const keys = Object.keys(dataQuery[0]);
      const newTransformedDataQuery: any[] =  [];
      for(let i =0 ; i < Object.keys(dataQuery[0]).length; i++){
        const newData = {
          label: keys[i],
          value: dataQuery[0][keys[i]] 
        }
        newTransformedDataQuery.push(newData);
      }
      setTransformedDataQuery(newTransformedDataQuery);
    }
  }, [dataQuery]);

  return (
    <div className="flex ">
      {transformedDataQuery && transformedDataQuery.length > 0 &&
      <PieChart
        series={[
          {
            data: transformedDataQuery ,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        height={400}
        width={600}
      />}

    </div>
  );
}
function setDataQuery(data: any[]) {
  throw new Error("Function not implemented.");
}

