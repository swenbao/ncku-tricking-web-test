
import { ReactElement } from 'react';

// Step type definition
export type BookingStep = 'difficulty' | 'type' | 'schedule' | 'confirm' | 'complete';

// Class type definition
export interface ClassType {
  id: string;
  name: string;
  icon: ReactElement;
  color: string;
  description: string;
}

// Difficulty level definition
export interface DifficultyLevel {
  id: string;
  name: string;
  icon: ReactElement;
  color: string;
  description: string;
}

// Class data interface
export interface ClassData {
  id: string;
  type: string;
  difficulty: string;
  day: string;
  time: string;
  name: string;
  description: string;
  pointsCost: number;
  instructor: string;
  maxCapacity: number;
  availableSpots: number;
}
