import React from 'react';
import { cn } from '@/lib/utils';
import { Trick, TrickLevel } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/auth';

interface TrickCardProps {
  trick: Trick;
  onClick?: () => void;
}

const TrickCard: React.FC<TrickCardProps> = ({ trick, onClick }) => {
  const { user } = useAuth();
  
  // Find the user's progress on this trick
  const trickProgress = user?.completedTricks.find(t => t.trickId === trick.id);
  const progressStatus = trickProgress?.status || null;
  
  // Determine card styling based on progress
  let cardClassNames = "trick-card transition-all duration-300 transform hover:-translate-y-1";
  let titleClassNames = "font-medium text-lg";
  let descriptionClassNames = "text-sm text-muted-foreground mb-3";
  
  if (user) {
    if (progressStatus === 'Completed' || progressStatus === 'Proficient') {
      // Learned tricks: Medium brightness with higher contrast
      cardClassNames = cn(
        cardClassNames, 
        "bg-white/15 border-accent/20",
        "shadow-[0_0_8px_2px_rgba(255,255,255,0.07)]"
      );
      titleClassNames = cn(titleClassNames, "text-white");
      descriptionClassNames = cn(descriptionClassNames, "text-white/70");
    } else {
      // Not learned tricks: Darker with lower contrast
      cardClassNames = cn(
        cardClassNames, 
        "bg-white/8 border-border/5",
        "hover:bg-white/10"
      );
      titleClassNames = cn(titleClassNames, "text-white/60");
      descriptionClassNames = cn(descriptionClassNames, "text-white/40");
    }
  } else {
    // Default state for guests
    cardClassNames = cn(
      cardClassNames, 
      "bg-white/10 border-border/10",
      "hover:bg-white/15"
    );
  }
  
  return (
    <div 
      className={cardClassNames}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className={titleClassNames}>
          {trick.name}
        </h3>
      </div>
      
      {trick.description && (
        <p className={descriptionClassNames}>{trick.description}</p>
      )}
      
      <div className="flex flex-wrap gap-2">
        {trick.categories.map((category, index) => (
          <span 
            key={index}
            className={cn(
              "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary/10",
              progressStatus === 'Completed' || progressStatus === 'Proficient' 
                ? "text-secondary-foreground" 
                : "text-secondary-foreground/60"
            )}
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TrickCard;
