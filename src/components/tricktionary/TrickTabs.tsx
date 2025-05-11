
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrickCard } from './TrickCard';
import { Trick } from '@/lib/data';

interface TrickTabsProps {
  difficultyLevels: { name: string; label: string; color: string }[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  filteredTricks: Trick[];
  onTrickSelect: (trick: Trick | null) => void;
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
  translations,
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-6 flex h-auto flex-wrap space-x-2 space-y-2 bg-transparent p-0">
        {difficultyLevels.map((level) => (
          <TabsTrigger
            key={level.name}
            value={level.name}
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
            style={{
              borderBottom: `2px solid ${activeTab === level.name ? level.color : 'transparent'}`,
            }}
          >
            {level.label}
          </TabsTrigger>
        ))}
        <TabsTrigger
          value="all"
          className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
          style={{
            borderBottom: `2px solid ${activeTab === 'all' ? '#94a3b8' : 'transparent'}`,
          }}
        >
          All Levels
        </TabsTrigger>
      </TabsList>

      {/* All levels tab content */}
      <TabsContent value="all" className="mt-0">
        {filteredTricks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTricks.map((trick) => (
              <TrickCard 
                key={trick.id} 
                trick={trick} 
                onClick={() => onTrickSelect(trick)} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{translations.noTricksFound}</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              {translations.tryAdjusting}
            </p>
          </div>
        )}
      </TabsContent>

      {/* Individual level tabs */}
      {difficultyLevels.map((level) => (
        <TabsContent key={level.name} value={level.name} className="mt-0">
          {filteredTricks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredTricks.map((trick) => (
                <TrickCard 
                  key={trick.id} 
                  trick={trick} 
                  onClick={() => onTrickSelect(trick)} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{translations.noTricksFound}</p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                {translations.tryAdjusting}
              </p>
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};
