
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { Trick } from '@/lib/data';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface TrickDetailDialogProps {
  selectedTrick: Trick | null;
  setSelectedTrick: (trick: Trick | null) => void;
}

export const TrickDetailDialog: React.FC<TrickDetailDialogProps> = ({
  selectedTrick,
  setSelectedTrick,
}) => {
  const { user, isAuthenticated, updateTrickStatus } = useAuth();
  const { language } = useLanguage();
  const t = translations[language].tricktionary;

  const getTrickProgress = (trickId: string) => {
    if (!user) return null;
    return user.completedTricks.find(t => t.trickId === trickId)?.status || null;
  };

  const handleProgressUpdate = (status: 'Started' | 'Completed' | 'Proficient' | null) => {
    if (selectedTrick && isAuthenticated) {
      const currentStatus = getTrickProgress(selectedTrick.id);
      
      if (currentStatus === status) {
        updateTrickStatus(selectedTrick.id, null);
      } else {
        updateTrickStatus(selectedTrick.id, status);
      }
    }
  };

  const getProgressStatusLabel = (status: string | null) => {
    switch(status) {
      case 'Started': return t.progressStatus.started;
      case 'Completed': return t.progressStatus.completed;
      case 'Proficient': return t.progressStatus.proficient;
      default: return t.progressStatus.notStarted;
    }
  };

  return (
    <Dialog open={!!selectedTrick} onOpenChange={(open) => !open && setSelectedTrick(null)}>
      <DialogContent className="sm:max-w-lg">
        {selectedTrick && (
          <>
            <DialogHeader>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <Badge 
                  variant="outline" 
                  className="trick-level-indicator"
                >
                  {selectedTrick.level}
                </Badge>
                
                {selectedTrick.categories.map((category, index) => (
                  <Badge key={index} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
              
              <DialogTitle className="text-xl mt-2">
                {selectedTrick.name}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="aspect-video bg-muted/20 rounded-md flex items-center justify-center mb-4 border border-white/10">
                <p className="text-muted-foreground">{t.demoAnimation}</p>
              </div>
              
              <DialogDescription className="text-base">
                {selectedTrick.description}
              </DialogDescription>
              
              {selectedTrick.prerequisites && selectedTrick.prerequisites.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-1">{t.prerequisites}</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {selectedTrick.prerequisites.map((prereq, index) => (
                      <li key={index}>{prereq}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {user && (
                <div className="border-t border-white/10 pt-4 mt-6">
                  <h4 className="text-sm font-medium mb-3">{t.updateProgress}</h4>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {(['Started', 'Completed', 'Proficient'] as const).map((status) => {
                      const currentStatus = getTrickProgress(selectedTrick.id);
                      const isActive = currentStatus === status;
                      return (
                        <Button 
                          key={status}
                          variant={isActive ? "default" : "outline"} 
                          size="sm"
                          className={cn(
                            "relative overflow-hidden transition-all duration-300",
                            isActive && "bg-accent text-accent-foreground font-medium"
                          )}
                          onClick={() => handleProgressUpdate(isActive ? null : status)}
                        >
                          {getProgressStatusLabel(status)}
                          {isActive && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white/30" />
                          )}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            
            {!user && (
              <DialogFooter>
                <p className="text-muted-foreground text-sm mr-auto">{t.logInPrompt}</p>
                <Button asChild>
                  <Link to="/login">{t.logIn}</Link>
                </Button>
              </DialogFooter>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
