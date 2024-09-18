import React from 'react';

interface Item {
  name: string;
  value: number;
}

interface Props {
  items: Item[];
}

const TopNStatic: React.FC<Props> = ({ items }) => {
  return (
    <div className='w-full'>
      <div className="mt-[2rem] mx-auto p-4 bg-white rounded-lg border border-2 text-secondary border-secondary">
        <h2 className="text-lg font-bold mb-2">Top N</h2>
        <div className="max-h-[300px] overflow-y-auto pr-4"> 
          <ul>
            {items?.map((item, index) => (
              <li key={index} className="flex justify-between items-center py-2 border-b pr-4">
                <span className="text-lg font-bold">{item.name}</span>
                <span className="text-lg">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopNStatic;
