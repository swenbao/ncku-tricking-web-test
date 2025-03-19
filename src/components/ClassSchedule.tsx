
import React from 'react';
import { Clock, Users, BookOpen, Dumbbell, Star, FlipHorizontal, Flame, ArrowDown, ArrowRight, ArrowUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ClassSchedule = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const classTypes = [
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
      type: 'gymnastics',
      name: language === 'en' ? 'Gymnastics' : '體操課程',
      icon: <Dumbbell className="h-5 w-5" />,
      color: 'bg-blue-800/70 text-blue-200',
    },
    {
      type: 'specialty',
      name: language === 'en' ? 'Specialization' : '專項課程',
      icon: <Star className="h-5 w-5" />,
      color: 'bg-emerald-800/70 text-emerald-200',
    },
  ];

  // Updated to have only these 4 classes
  const classes = [
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
      type: 'gymnastics',
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

  // Get difficulty icon based on level
  const getDifficultyIcon = (difficulty: string) => {
    switch(difficulty) {
      case 'beginner':
        return <ArrowDown className="h-4 w-4" />;
      case 'intermediate':
        return <ArrowRight className="h-4 w-4" />;
      case 'advanced':
        return <ArrowUp className="h-4 w-4" />;
      default:
        return <ArrowDown className="h-4 w-4" />;
    }
  };

  // Get class type details
  const getClassTypeDetails = (type: string) => {
    return classTypes.find(classType => classType.type === type) || classTypes[0];
  };

  // Handle booking redirection
  const handleBookClass = (classType: string) => {
    navigate(`/booking?type=${classType}`);
  };

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

        {/* Class Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          {classTypes.map((classType, index) => (
            <div 
              key={index}
              className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
              onClick={() => handleBookClass(classType.type)}
            >
              <div className={`p-6 text-center ${classType.color}`}>
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="rounded-full bg-white/20 p-3">
                    {classType.icon}
                  </div>
                  <h3 className="text-xl font-bold">{classType.name}</h3>
                  <Button variant="secondary" className="mt-2 w-full">
                    {language === 'en' ? 'Book Now' : '立即預約'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {classes.map((classItem, index) => {
            const typeDetails = getClassTypeDetails(classItem.type);
            return (
              <div 
                key={index} 
                className="relative overflow-hidden rounded-lg shadow-md"
              >
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                <div className="relative p-6 md:p-8 z-10">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div className="flex items-center mb-3 md:mb-0">
                      <div className={`rounded-full ${typeDetails.color} p-2 mr-3`}>
                        {typeDetails.icon}
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{classItem.name}</h3>
                        <div className="flex items-center space-x-4 text-white/80 text-sm">
                          <span className="inline-flex items-center">
                            {getDifficultyIcon(classItem.difficulty)}
                            <span className="ml-1 capitalize">{classItem.difficulty}</span>
                          </span>
                          <span className="mx-2">•</span>
                          <span className="font-medium">{classItem.day}</span>
                          <span className="mx-2">•</span>
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{classItem.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-yellow-900/60 text-yellow-200 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span>{classItem.pointsCost} points</span>
                      </div>
                      <Button 
                        onClick={() => handleBookClass(classItem.type)}
                        variant="secondary"
                        className="whitespace-nowrap"
                      >
                        {language === 'en' ? 'Book Class' : '預約課程'}
                      </Button>
                    </div>
                  </div>
                  <p className="text-white/90 max-w-2xl">{classItem.description}</p>
                </div>
              </div>
            )}
          )}
        </div>
      </div>
    </section>
  );
};

export default ClassSchedule;
