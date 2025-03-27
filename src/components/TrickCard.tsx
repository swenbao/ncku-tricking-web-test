
import React from 'react';
import { cn } from '@/lib/utils';
import { Trick } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/auth';
import { useLanguage } from '@/contexts/LanguageContext';

interface TrickCardProps {
  trick: Trick;
  onClick?: () => void;
}

const TrickCard: React.FC<TrickCardProps> = ({ trick, onClick }) => {
  const { user } = useAuth();
  const { language } = useLanguage();
  
  // Find the user's progress on this trick
  const trickProgress = user?.completedTricks.find(t => t.trickId === trick.id);
  const progressStatus = trickProgress?.status || null;
  
  // Determine card styling based on progress
  let cardClassNames = "trick-card relative group cursor-pointer rounded-lg border p-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,50,50,0.15)]";
  let titleClassNames = "font-medium text-lg mb-2";
  let descriptionClassNames = "text-sm mb-3";
  
  if (user) {
    if (progressStatus === 'Completed' || progressStatus === 'Proficient') {
      // Learned tricks: Medium brightness with higher contrast
      cardClassNames = cn(
        cardClassNames, 
        "bg-gray-800 border-gray-700",
        "shadow-[0_0_8px_2px_rgba(255,255,255,0.07)]"
      );
      titleClassNames = cn(titleClassNames, "text-white");
      descriptionClassNames = cn(descriptionClassNames, "text-gray-300");
    } else {
      // Not learned tricks: Darker with lower contrast
      cardClassNames = cn(
        cardClassNames, 
        "bg-gray-900 border-gray-800",
        "hover:bg-gray-800"
      );
      titleClassNames = cn(titleClassNames, "text-gray-400");
      descriptionClassNames = cn(descriptionClassNames, "text-gray-500");
    }
  } else {
    // Default state for guests
    cardClassNames = cn(
      cardClassNames, 
      "bg-gray-800 border-gray-700",
      "hover:bg-gray-700"
    );
    titleClassNames = cn(titleClassNames, "text-white");
    descriptionClassNames = cn(descriptionClassNames, "text-gray-300");
  }
  
  // Get progress indicator label
  const getProgressLabel = () => {
    if (!progressStatus) return null;
    
    const labels = {
      Started: language === 'en' ? 'Learning' : '學習中',
      Completed: language === 'en' ? 'Completed' : '已完成',
      Proficient: language === 'en' ? 'Mastered' : '已精通'
    };
    
    return labels[progressStatus as keyof typeof labels];
  };
  
  const progressLabel = getProgressLabel();
  
  return (
    <div 
      className={cardClassNames}
      onClick={onClick}
    >
      {progressLabel && (
        <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
          {progressLabel}
        </div>
      )}
      
      <div className="flex justify-between items-start">
        <h3 className={titleClassNames}>
          {/* Don't translate trick name */}
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
              "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
              progressStatus === 'Completed' || progressStatus === 'Proficient' || !user
                ? "border-gray-700 bg-gray-800 text-gray-300" 
                : "border-gray-800 bg-gray-900 text-gray-500"
            )}
          >
            {/* Don't translate category names */}
            {category}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TrickCard;
