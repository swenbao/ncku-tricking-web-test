
export type TrickLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Trick {
  id: string;
  name: string;
  description: string;
  level: TrickLevel;
  videoUrl?: string;
  video_url?: string; // For database compatibility
  prerequisites?: string[];
  categories: string[];
  created_at?: string;
}

export interface TrickFormData {
  id: string;
  name: string;
  description: string;
  level: TrickLevel;
  videoUrl: string;
  prerequisites?: string[];
  categories: string[];
}

export interface TricktionaryManagerState {
  tricks: Trick[];
  isLoading: boolean;
  error: string | null;
  selectedTrick: Trick | null;
  isDialogOpen: boolean;
  filterCategory: string;
  filterLevel: string;
  searchQuery: string;
}
