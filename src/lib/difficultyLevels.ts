
// Difficulty levels (referenced from the database)
export interface DifficultyLevel {
  id: string;
  name: string;
  displayOrder: number;
}

export const difficultyLevels: DifficultyLevel[] = [
  { id: 'absolute-novice', name: 'Absolute Novice', displayOrder: 1 },
  { id: 'beginner', name: 'Beginner', displayOrder: 2 },
  { id: 'intermediate', name: 'Intermediate', displayOrder: 3 },
  { id: 'advanced', name: 'Advanced', displayOrder: 4 },
  { id: 'expert', name: 'Expert', displayOrder: 5 }
];
