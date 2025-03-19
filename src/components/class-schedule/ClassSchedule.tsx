
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ClassTypeCard from './ClassTypeCard';
import ClassCard from './ClassCard';
import { getClassTypes, getClasses, getClassTypeDetails } from './classData';

const ClassSchedule = () => {
  const { language } = useLanguage();

  const classTypes = getClassTypes(language);
  const classes = getClasses(language);

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {classTypes.map((classType, index) => (
            <ClassTypeCard
              key={index}
              type={classType.type}
              name={classType.name}
              icon={classType.icon}
              color={classType.color}
              language={language}
            />
          ))}
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {classes.map((classItem, index) => {
            const typeDetails = getClassTypeDetails(classItem.type, language);
            return (
              <ClassCard
                key={index}
                classItem={classItem}
                typeDetails={typeDetails}
                language={language}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ClassSchedule;
