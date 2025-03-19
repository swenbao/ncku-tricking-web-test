
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { classTypes } from '@/lib/bookingData';

interface ClassTypeStepProps {
  selectedType: string | null;
  setSelectedType: (type: string) => void;
}

const ClassTypeStep: React.FC<ClassTypeStepProps> = ({ selectedType, setSelectedType }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Select Class Type</h2>
      <p className="text-muted-foreground mb-6">
        Choose the type of class you're interested in attending.
      </p>
      
      <div className="grid gap-6 md:grid-cols-2">
        {classTypes.map((type) => (
          <Card 
            key={type.id}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md overflow-hidden",
              selectedType === type.id ? "ring-2 ring-primary" : "border"
            )}
            onClick={() => setSelectedType(type.id)}
          >
            <CardContent className="p-0">
              <div className={`${type.color} p-4`}>
                <div className="flex items-center mb-3">
                  <div className="bg-white/20 p-2 rounded-full mr-3">
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-bold">{type.name}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-muted-foreground mb-3">{type.description}</p>
                {selectedType === type.id && (
                  <Badge className="bg-primary hover:bg-primary/90">Selected</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClassTypeStep;
