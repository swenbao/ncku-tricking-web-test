
import { Trick } from '@/lib/data';

export interface TricktionaryData {
  difficultyLevels: { name: string; label: string; color: string }[];
  tricks: Trick[];
  isLoading: boolean;
}

export interface DifficultyLevel {
  name: string;
  label: string;
  color: string;
}
