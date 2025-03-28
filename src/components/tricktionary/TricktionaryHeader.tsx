
import React from 'react';

interface TricktionaryHeaderProps {
  title: string;
  subtitle: string;
}

export const TricktionaryHeader: React.FC<TricktionaryHeaderProps> = ({ 
  title, 
  subtitle 
}) => {
  return (
    <header className="mb-12 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        {subtitle}
      </p>
    </header>
  );
};
