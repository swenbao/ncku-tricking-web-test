
import React from 'react';
import { Clock, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ClassSchedule = () => {
  const { language } = useLanguage();

  const classes = [
    {
      day: language === 'en' ? 'Monday' : '星期一',
      time: '18:30-19:30',
      name: language === 'en' ? 'Advanced Flips' : '空翻進階班',
      description: language === 'en' 
        ? 'Master complex flipping techniques and combinations.' 
        : '學習各種複雜的空翻技巧與組合，適合已具備基礎空翻能力的學員。',
      background: 'bg-flip',
      pointsCost: 2,
    },
    {
      day: language === 'en' ? 'Monday' : '星期一',
      time: '19:30-21:00',
      name: language === 'en' ? 'Advanced Tricking' : 'Tricking進階班',
      description: language === 'en' 
        ? 'Advanced combination moves and sequences for experienced trickers.' 
        : '針對已熟悉基本技巧的學員，學習更高階的Tricking動作組合與連續技。',
      background: 'bg-tricking',
      pointsCost: 3,
    },
    {
      day: language === 'en' ? 'Friday' : '星期五',
      time: '18:00-19:30',
      name: language === 'en' ? 'Advanced Kicking Techniques' : '踢技進階班',
      description: language === 'en' 
        ? 'Develop advanced kicking techniques and improve execution.' 
        : '專注於高級踢技的訓練，提升踢技的高度、速度和美感。',
      background: 'bg-kick',
      pointsCost: 3,
    },
    {
      day: language === 'en' ? 'Friday' : '星期五',
      time: '19:30-21:00',
      name: language === 'en' ? 'Beginner Tricking' : '入門班',
      description: language === 'en' 
        ? 'Introduction to basic tricking movements and fundamentals.' 
        : '適合零基礎的初學者，學習Tricking的基本動作和技巧。',
      background: 'bg-beginner',
      pointsCost: 2,
    },
  ];

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {language === 'en' ? 'Class Schedule' : '課程時間表'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'en' 
              ? 'All classes require advance booking and are subject to availability.' 
              : '所有課程都需要提前預約，並且視名額而定。'}
          </p>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {classes.map((classItem, index) => (
            <div 
              key={index} 
              className={`relative overflow-hidden rounded-lg shadow-md animate-fade-in ${classItem.background} bg-cover bg-center`}
            >
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
              <div className="relative p-6 md:p-8 z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{classItem.name}</h3>
                    <div className="flex items-center text-white/80 text-sm mb-3">
                      <span className="font-medium">{classItem.day}</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{classItem.time}</span>
                      <span className="mx-2">•</span>
                      <Users className="h-4 w-4 mr-1" />
                      <span>{classItem.pointsCost} points</span>
                    </div>
                  </div>
                </div>
                <p className="text-white/90 max-w-2xl">{classItem.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClassSchedule;
