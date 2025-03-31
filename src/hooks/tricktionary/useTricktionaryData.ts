
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { tricks } from '@/lib/tricks';
import { TricktionaryData } from './types';
import { formatDifficultyLevels } from './utils';

export const useTricktionaryData = (): TricktionaryData => {
  const [isLoading, setIsLoading] = useState(true);
  const [formattedDifficultyLevels, setFormattedDifficultyLevels] = useState<{ name: string; label: string; color: string }[]>([]);
  const { toast } = useToast();

  // In a real application, we would fetch this data from an API
  // For now, we'll simulate a loading state and use the mock data
  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate API request latency
        await new Promise(resolve => setTimeout(resolve, 800));
        setFormattedDifficultyLevels(formatDifficultyLevels());
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading tricktionary data:', error);
        toast({
          title: 'Error loading data',
          description: 'Failed to load tricktionary data. Please try again later.',
          variant: 'destructive',
        });
      }
    };

    loadData();
  }, [toast]);

  return {
    difficultyLevels: formattedDifficultyLevels,
    tricks,
    isLoading,
  };
};
