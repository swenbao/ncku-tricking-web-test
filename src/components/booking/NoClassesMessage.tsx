
import React from 'react';
import { Button } from '@/components/ui/button';

interface NoClassesMessageProps {
  onGoBack: () => void;
}

const NoClassesMessage: React.FC<NoClassesMessageProps> = ({ onGoBack }) => {
  return (
    <div className="booking-highlight border rounded-lg p-8 text-center">
      <h3 className="text-lg font-medium mb-2">No Classes Available</h3>
      <p className="text-muted-foreground mb-4">
        There are no classes that match your selected criteria. Please try a different combination.
      </p>
      <Button onClick={onGoBack}>
        Go Back
      </Button>
    </div>
  );
};

export default NoClassesMessage;
