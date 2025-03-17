
import React from 'react';
import { cn } from '@/lib/utils';
import { Trick, TrickLevel } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

interface TrickCardProps {
  trick: Trick;
  onClick?: () => void;
}

const getLevelColor = (level: TrickLevel): string => {
  switch(level) {
    case 'Absolute Novice':
      return 'bg-trick-beginner/20 text-trick-beginner border-trick-beginner/30';
    case 'Beginner':
      return 'bg-trick-intermediate/20 text-trick-intermediate border-trick-intermediate/30';
    case 'Intermediate':
      return 'bg-trick-advanced/20 text-trick-advanced border-trick-advanced/30';
    case 'Advanced':
    case 'Expert':
      return 'bg-trick-expert/20 text-trick-expert border-trick-expert/30';
    default:
      return 'bg-trick-beginner/20 text-trick-beginner border-trick-beginner/30';
  }
};

const TrickCard: React.FC<TrickCardProps> = ({ trick, onClick }) => {
  return (
    <div 
      className="trick-card"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-lg">{trick.name}</h3>
        <Badge 
          variant="outline" 
          className={cn("trick-level-indicator", getLevelColor(trick.level))}
        >
          {trick.level}
        </Badge>
      </div>
      
      {trick.description && (
        <p className="text-sm text-muted-foreground mb-3">{trick.description}</p>
      )}
      
      <div className="flex flex-wrap gap-2">
        {trick.categories.map((category, index) => (
          <span 
            key={index}
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary/10 text-secondary-foreground"
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TrickCard;
