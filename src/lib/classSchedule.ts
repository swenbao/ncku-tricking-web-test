
export interface ClassSession {
  time: string;
  name: string;
  level: string;
  pointsCost: number;
  description: string;
}

export interface ClassSchedule {
  day: string;
  sessions: ClassSession[];
}

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
