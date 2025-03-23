
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const PointsHeader = () => {
  const { language } = useLanguage();
  
  return (
    <header className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        {language === 'en' ? 'Course Cards' : '課程卡'}
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        {language === 'en' 
          ? 'Purchase course cards to book classes and track your progress.' 
          : '購買課程卡以預約課程並追蹤您的進度。'}
      </p>
    </header>
  );
};

export default PointsHeader;
