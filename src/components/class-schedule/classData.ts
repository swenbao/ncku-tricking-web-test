
import React from 'react';
import { Flame, FlipHorizontal, Dumbbell } from 'lucide-react';

export interface ClassType {
  type: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

export interface ClassItem {
  type: string;
  difficulty: string;
  day: string;
  time: string;
  name: string;
  description: string;
  pointsCost: number;
}

export const getClassTypes = (language: string): ClassType[] => [
  {
    type: 'tricking',
    name: language === 'en' ? 'Tricking' : 'Tricking課程',
    icon: <Flame className="h-5 w-5" />,
    color: 'bg-orange-800/70 text-orange-200',
  },
  {
    type: 'flip',
    name: language === 'en' ? 'Flip' : '空翻課程',
    icon: <FlipHorizontal className="h-5 w-5" />,
    color: 'bg-purple-800/70 text-purple-200',
  },
  {
    type: 'kicking',
    name: language === 'en' ? 'Kicking' : '踢技課程',
    icon: <Dumbbell className="h-5 w-5" />,
    color: 'bg-blue-800/70 text-blue-200',
  },
];

export const getClasses = (language: string): ClassItem[] => [
  {
    type: 'tricking',
    difficulty: 'advanced',
    day: language === 'en' ? 'Monday' : '星期一',
    time: '19:30-21:00',
    name: language === 'en' ? 'Advanced Tricking' : 'Tricking進階班',
    description: language === 'en' 
      ? 'Advanced combination moves and sequences for experienced trickers.' 
      : '針對已熟悉基本技巧的學員，學習更高階的Tricking動作組合與連續技。',
    pointsCost: 3,
  },
  {
    type: 'flip',
    difficulty: 'advanced',
    day: language === 'en' ? 'Monday' : '星期一',
    time: '18:30-19:30',
    name: language === 'en' ? 'Advanced Flips' : '空翻進階班',
    description: language === 'en' 
      ? 'Master complex flipping techniques and combinations.' 
      : '學習各種複雜的空翻技巧與組合，適合已具備基礎空翻能力的學員。',
    pointsCost: 2,
  },
  {
    type: 'kicking',
    difficulty: 'advanced',
    day: language === 'en' ? 'Friday' : '星期五',
    time: '18:00-19:30',
    name: language === 'en' ? 'Advanced Kicking Techniques' : '踢技進階班',
    description: language === 'en' 
      ? 'Develop advanced kicking techniques and improve execution.' 
      : '專注於高級踢技的訓練，提升踢技的高度、速度和美感。',
    pointsCost: 3,
  },
  {
    type: 'tricking',
    difficulty: 'beginner',
    day: language === 'en' ? 'Friday' : '星期五',
    time: '19:30-21:00',
    name: language === 'en' ? 'Beginner Tricking' : '入門班',
    description: language === 'en' 
      ? 'Introduction to basic tricking movements and fundamentals.' 
      : '適合零基礎的初學者，學習Tricking的基本動作和技巧。',
    pointsCost: 2,
  },
];

// Get class type details
export const getClassTypeDetails = (type: string, language: string): ClassType => {
  const types = getClassTypes(language);
  return types.find(classType => classType.type === type) || types[0];
};
