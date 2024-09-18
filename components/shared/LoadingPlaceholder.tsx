import React, { FC } from 'react';

const LoadingPlaceholder: FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-[80%] h-[80%] bg-gray-300 animate-pulse rounded"></div>
    </div>
  );
};

export default LoadingPlaceholder;
