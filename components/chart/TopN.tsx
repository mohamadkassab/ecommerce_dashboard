// Top10List.tsx
import React from 'react';

interface Item {
  name: string;
  value: number;
}

interface Props {
  items: Item[];
}



const TopN: React.FC<Props> = ({ items }) => {

  return (
    <div className='w-full'>
    <div className="mt-[2rem] mx-autp p-4 bg-white rounded-lg border border-2 text-secondary border-secondary ">
      <h2 className="text-lg font-bold  mb-2">Top N</h2>
      <ul>
        {items?.map((item, index) => (
          <li key={index} className="flex justify-between items-center py-2 border-b ">
            <span className="text-lg font-bold ">{item.name}</span>
            <span className="text-lg ">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
    </div>

  );
};

export default TopN;