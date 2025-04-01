
import React from 'react';

interface TricktionaryLoadingProps {
  message: string;
}

export const TricktionaryLoading: React.FC<TricktionaryLoadingProps> = ({ message }) => {
  return (
    <div className="page-transition min-h-screen flex flex-col items-center justify-center">
      <div className="animate-pulse text-white">{message}</div>
    </div>
  );
};
