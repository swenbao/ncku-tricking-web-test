
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TrickCard from '@/components/TrickCard';
import { Trick } from '@/lib/data';

interface TrickTabsProps {
  difficultyLevels: any[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  filteredTricks: Trick[];
  onTrickSelect: (trick: Trick) => void;
  translations: {
    noTricksFound: string;
    tryAdjusting: string;
  };
}

export const TrickTabs: React.FC<TrickTabsProps> = ({
  difficultyLevels,
  activeTab,
  setActiveTab,
  filteredTricks,
  onTrickSelect,
  translations
}) => {
  // Filter tricks based on the active difficulty level
  const tricksInActiveTab = activeTab === 'all' 
    ? filteredTricks 
    : filteredTricks.filter(trick => trick.level === activeTab);

  return (
    <Tabs defaultValue={difficultyLevels[0]?.name} value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-8 flex overflow-x-auto pb-2 scrollbar-hide">
        {difficultyLevels.map((level) => (
          <TabsTrigger key={level.id} value={level.name} className="min-w-max">
            {level.name}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {difficultyLevels.map((level) => (
        <TabsContent key={level.id} value={level.name} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tricksInActiveTab.length > 0 ? (
              tricksInActiveTab.map((trick) => (
                <TrickCard
                  key={trick.id}
                  trick={trick}
                  onClick={() => onTrickSelect(trick)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-medium mb-2">{translations.noTricksFound}</h3>
                <p className="text-muted-foreground">
                  {translations.tryAdjusting}
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};
