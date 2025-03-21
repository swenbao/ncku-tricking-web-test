
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface StepHeaderProps {
  title: string;
  description: string;
  onPrevious: () => void;
}

const StepHeader: React.FC<StepHeaderProps> = ({
  title,
  description,
  onPrevious
}) => {
  return (
    <div className="flex items-center mb-6">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onPrevious}
        className="mr-2"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <div>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StepHeader;
