import React from 'react';
import SecondaryButton from '../button/SecondaryButton';

interface WrapperProps {
  children: React.ReactNode;
  onClick: ()=> void
}

const ChartButtonWrapper: React.FC<WrapperProps> = ({ children, onClick }) => {
  return (
    <div className='flex flex-col justify-center items-center min-h-[300px]'>
      {children}
      <div className='mt-[10px]'> {/* Adjust the margin value as needed */}
    <SecondaryButton onClick={onClick}>Select</SecondaryButton>
  </div>
    </div>
  );
};

export default ChartButtonWrapper;
