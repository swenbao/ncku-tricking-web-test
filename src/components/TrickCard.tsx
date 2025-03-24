
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/auth';
import { Trick } from '@/lib/data';

interface TrickCardProps {
  trick: Trick & { points?: number };
}

const TrickCard: React.FC<TrickCardProps> = ({ trick }) => {
  const { user } = useAuth();
  
  // Check if the trick is completed by the user
  const isCompleted = user?.completedTricks?.includes(trick.id);
  
  if (!trick) {
    return null;
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{trick.name || 'Unnamed Trick'}</CardTitle>
        <CardDescription>{trick.description || 'No description available'}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge variant="secondary">{trick.level || 'Unspecified Level'}</Badge>
        {trick.categories && trick.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {trick.categories.map((category, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        {trick.points !== undefined && <p>Points: {trick.points}</p>}
        {isCompleted ? (
          <Button variant="outline" disabled>
            Completed
          </Button>
        ) : (
          <Button>Learn More</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TrickCard;
