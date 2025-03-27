// Types for tricks data
export type TrickLevel = string;

export interface Trick {
  id: string;
  name: string;
  level: TrickLevel;
  description: string;
  videoUrl?: string;
  prerequisites?: string[];
  categories: string[];
}

// Note: We're keeping this array for backwards compatibility,
// but the actual data is now fetched from Supabase
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
];
