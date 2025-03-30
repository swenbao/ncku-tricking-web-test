
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { difficultyLevels as originalDifficultyLevels } from '@/lib/difficultyLevels';
import { tricks } from '@/lib/tricks';
import { Trick } from '@/lib/data';

export interface TricktionaryData {
  difficultyLevels: { name: string; label: string; color: string }[];
  tricks: Trick[];
  isLoading: boolean;
}

// Map the difficultyLevels to match the expected format
const formatDifficultyLevels = () => {
  return originalDifficultyLevels.map((level) => {
    // Map colors based on difficulty level
    let color = '#6366f1'; // Default - purple/indigo
    if (level.name === 'Absolute Novice') color = '#22c55e'; // green
    if (level.name === 'Beginner') color = '#3b82f6'; // blue
    if (level.name === 'Intermediate') color = '#f59e0b'; // amber
    if (level.name === 'Advanced') color = '#ef4444'; // red
    if (level.name === 'Expert') color = '#8b5cf6'; // purple
    
    return {
      name: level.name,
      label: level.name,
      color: color
    };
  });
};

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
