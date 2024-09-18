import { APIROUTES } from '@/utils/constants';
import axios from 'axios';
import React from 'react';

interface Item {
  name: string;
  value: number;
}

interface Props {
  chart: any;
}

const TopN: React.FC<Props> = ({ chart }) => {
  const [dataQuery, setDataQuery] = React.useState<any[]>([]);

  
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

  
  return (
    <div className='w-full'>
      <div className="mt-[2rem] mx-auto p-4 bg-white rounded-lg border border-2 text-secondary border-secondary">
        <div className="max-h-[350px] overflow-y-auto pr-4"> 
        {dataQuery?.map((item, index) => (
              <li key={index} className="flex justify-between items-center py-2 border-b pr-4">
                <span className="text-lg font-bold">{item.key}</span>
                <span className="text-lg">{item.value}</span>
              </li>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TopN;
