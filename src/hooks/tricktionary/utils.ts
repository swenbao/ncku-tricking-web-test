
import { difficultyLevels as originalDifficultyLevels } from '@/lib/difficultyLevels';
import { DifficultyLevel } from './types';

/**
 * Maps the difficulty levels to include color coding
 * @returns Formatted difficulty levels with color
 */
export const formatDifficultyLevels = (): DifficultyLevel[] => {
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
