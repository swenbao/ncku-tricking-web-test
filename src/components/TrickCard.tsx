import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Trick } from '@/lib/data';

interface TrickCardProps {
  trick: Trick;
}

const TrickCard: React.FC<TrickCardProps> = ({ trick }) => {
  const { user } = useAuth();
  
  // Check if the trick is completed by the user
  const isCompleted = user?.completedTricks?.includes(trick.id);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{trick.name}</CardTitle>
        <CardDescription>{trick.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge variant="secondary">{trick.level}</Badge>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p>Points: {trick.points}</p>
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
