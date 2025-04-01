
// Mock data for the Tricking Club Website

export type TrickLevel = 'Absolute Novice' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface Trick {
  id: string;
  name: string;
  level: TrickLevel;
  description: string;
  videoUrl?: string;
  prerequisites?: string[];
  categories: ('Kick' | 'Flip' | 'Twist' | 'Transition')[];
}

export interface ClassSchedule {
  day: string;
  sessions: {
    time: string;
    name: string;
    level: string;
    pointsCost: number;
    description: string;
  }[];
}

export interface PointPackage {
  id: string;
  name: string;
  points: number;
  price: number;
  description: string;
  popular?: boolean;
}

// Trick data
export const tricks: Trick[] = [
  {
    id: '1',
    name: '360 Front Kick',
    level: 'Absolute Novice',
    description: 'A basic 360-degree rotation followed by a front kick.',
    categories: ['Kick'],
  },
  {
    id: '2',
    name: '540',
    level: 'Absolute Novice',
    description: 'A 540-degree rotation with a kick, landing on the kicking leg.',
    categories: ['Kick'],
  },
  {
    id: '3',
    name: 'Aerial',
    level: 'Absolute Novice',
    description: 'A side flip with no hands touching the ground.',
    categories: ['Flip'],
  },
  {
    id: '4',
    name: 'Aeriola',
    level: 'Absolute Novice',
    description: 'A variation of the Aerial with a specific landing.',
    categories: ['Flip'],
  },
  {
    id: '5',
    name: 'Au-Batido',
    level: 'Absolute Novice',
    description: 'A cartwheel that transitions into a kick.',
    categories: ['Transition', 'Kick'],
  },
  {
    id: '6',
    name: 'Auto-Bahn',
    level: 'Absolute Novice',
    description: 'A forward moving trick combining elements of parkour and tricking.',
    categories: ['Transition'],
  },
  {
    id: '7',
    name: 'Back Flip',
    level: 'Absolute Novice',
    description: 'A basic backward rotation in the air, landing on both feet.',
    categories: ['Flip'],
  },
  {
    id: '8',
    name: 'Back Layout',
    level: 'Absolute Novice',
    description: 'A back flip with the body in a straight position.',
    categories: ['Flip'],
  },
  {
    id: '9',
    name: 'Backside 720',
    level: 'Beginner',
    description: 'A 720-degree rotation executed from a backside approach.',
    categories: ['Twist'],
  },
  {
    id: '10',
    name: 'Butterfly Kick',
    level: 'Absolute Novice',
    description: 'A horizontal rotation with the body parallel to the ground.',
    categories: ['Kick'],
  },
  {
    id: '11',
    name: 'Feilong',
    level: 'Absolute Novice',
    description: 'A specific sequence of movements inspired by martial arts.',
    categories: ['Transition'],
  },
  {
    id: '12',
    name: 'Front Flip',
    level: 'Absolute Novice',
    description: 'A basic forward rotation in the air, landing on both feet.',
    categories: ['Flip'],
  },
  // More tricks can be added as needed
];

// Class schedule data
export const classSchedule: ClassSchedule[] = [
  {
    day: 'Monday',
    sessions: [
      {
        time: '18:30-19:30',
        name: 'Advanced Flips',
        level: 'Advanced',
        pointsCost: 2,
        description: 'Master complex flipping techniques and combinations.',
      },
      {
        time: '19:30-21:00',
        name: 'Advanced Tricking',
        level: 'Advanced',
        pointsCost: 3,
        description: 'Advanced combination moves and sequences for experienced trickers.',
      },
    ],
  },
  {
    day: 'Friday',
    sessions: [
      {
        time: '18:00-19:30',
        name: 'Advanced Kicking Techniques',
        level: 'Advanced',
        pointsCost: 3,
        description: 'Develop advanced kicking techniques and improve execution.',
      },
      {
        time: '19:30-21:00',
        name: 'Beginner Tricking',
        level: 'Beginner',
        pointsCost: 2,
        description: 'Introduction to basic tricking movements and fundamentals.',
      },
    ],
  },
];

// Point packages data
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
