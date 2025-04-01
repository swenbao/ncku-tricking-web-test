
export interface CourseCardType {
  id: string;
  name: string;
  description?: string;
}

export interface CourseCardPlan {
  id: string;
  name: string;
  price: number;
  includedCards: {
    quantity: number;
    type: string; // References CourseCardType.id
  };
  expiryDate: string | null; // null means no expiration
  difficultyLevel: 'Beginner' | 'Advanced';
  description: string;
  quantitySelectionAllowed: boolean;
  popular?: boolean;
}

// Course card types
export const courseCardTypes: CourseCardType[] = [
  {
    id: 'beginner',
    name: 'Beginner Course Card',
    description: 'For introductory classes, suitable for all levels'
  },
  {
    id: 'advanced',
    name: 'Advanced Course Card',
    description: 'For advanced classes, requires passing the advanced threshold assessment'
  }
];

// Course card plans data
export const courseCardPlans: CourseCardPlan[] = [
  // Beginner Plans
  {
    id: 'beginner-single',
    name: 'Beginner Single Session',
    price: 30,
    includedCards: {
      quantity: 1,
      type: 'beginner'
    },
    expiryDate: null, // No expiration
    difficultyLevel: 'Beginner',
    description: 'Access to a single beginner class, ideal for first-timers',
    quantitySelectionAllowed: true
  },
  {
    id: 'beginner-bundle',
    name: 'Beginner Semester Bundle',
    price: 250,
    includedCards: {
      quantity: 10,
      type: 'beginner'
    },
    expiryDate: '2025/06/20',
    difficultyLevel: 'Beginner',
    description: 'Semester-long training package for beginners, perfect for consistent learning',
    quantitySelectionAllowed: false,
    popular: true
  },
  
  // Advanced Plans
  {
    id: 'advanced-single',
    name: 'Advanced Single Session',
    price: 50,
    includedCards: {
      quantity: 1,
      type: 'advanced'
    },
    expiryDate: null,
    difficultyLevel: 'Advanced',
    description: 'Access to a single advanced class for experienced trickers',
    quantitySelectionAllowed: true
  },
  {
    id: 'advanced-bundle-basic',
    name: 'Advanced Semester Bundle - Basic',
    price: 600,
    includedCards: {
      quantity: 18,
      type: 'advanced'
    },
    expiryDate: '2025/06/20',
    difficultyLevel: 'Advanced',
    description: 'Basic semester package with 18 advanced course cards',
    quantitySelectionAllowed: false
  },
  {
    id: 'advanced-bundle-intermediate',
    name: 'Advanced Semester Bundle - Intermediate',
    price: 650,
    includedCards: {
      quantity: 36,
      type: 'advanced'
    },
    expiryDate: '2025/06/20',
    difficultyLevel: 'Advanced',
    description: 'Intermediate semester package with 36 advanced course cards, ideal for regular practice',
    quantitySelectionAllowed: false,
    popular: true
  },
  {
    id: 'advanced-bundle-advanced',
    name: 'Advanced Semester Bundle - Advanced',
    price: 700,
    includedCards: {
      quantity: 54,
      type: 'advanced'
    },
    expiryDate: '2025/06/20',
    difficultyLevel: 'Advanced',
    description: 'Comprehensive semester package with 54 advanced course cards for intensive training',
    quantitySelectionAllowed: false
  }
];

// Tab structure for the purchase flow
export interface PurchaseTab {
  id: string;
  title: string;
  description: string;
  filterField: keyof CourseCardPlan;
  filterValue: any;
  filterOperation: 'equals' | 'greater-than' | 'less-than' | 'contains';
}

export interface PurchaseLevel {
  id: string;
  tabs: PurchaseTab[];
}

// Define the purchase flow structure
export const purchaseFlow: PurchaseLevel[] = [
  {
    id: 'difficulty-level',
    tabs: [
      {
        id: 'beginner-plans',
        title: 'Beginner Plans',
        description: 'Course card plans suitable for beginners',
        filterField: 'difficultyLevel',
        filterValue: 'Beginner',
        filterOperation: 'equals'
      },
      {
        id: 'advanced-plans',
        title: 'Advanced Plans',
        description: 'Course card plans suitable for advanced learners',
        filterField: 'difficultyLevel',
        filterValue: 'Advanced',
        filterOperation: 'equals'
      }
    ]
  },
  {
    id: 'session-type',
    tabs: [
      {
        id: 'single-session',
        title: 'Single Session',
        description: 'One-time class experience',
        filterField: 'includedCards',
        filterValue: { quantity: 1 },
        filterOperation: 'equals'
      },
      {
        id: 'semester-bundle',
        title: 'Semester Bundle',
        description: 'Long-term training packages',
        filterField: 'includedCards',
        filterValue: { quantity: 1 },
        filterOperation: 'greater-than'
      }
    ]
  }
];

// Legacy PointPackage interface for backward compatibility
export interface PointPackage {
  id: string;
  name: string;
  points: number;
  price: number;
  description: string;
  popular?: boolean;
}

// Legacy point packages data
export const pointPackages: PointPackage[] = [
  {
    id: 'basic',
    name: 'Basic Package',
    points: 10,
    price: 1000,
    description: 'Good for beginners or occasional participants',
  },
  {
    id: 'standard',
    name: 'Standard Package',
    points: 20,
    price: 1800,
    description: 'Our most popular option for regular participants',
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium Package',
    points: 40,
    price: 3200,
    description: 'Best value for dedicated trickers',
  },
];
