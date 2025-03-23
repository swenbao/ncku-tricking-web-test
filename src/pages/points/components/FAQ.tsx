
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const FAQ = () => {
  const { language } = useLanguage();
  
  return (
    <div className="mt-20 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {language === 'en' ? 'Frequently Asked Questions' : '常見問題'}
      </h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">
            {language === 'en' ? 'How do course cards work?' : '課程卡如何運作？'}
          </h3>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'Course cards allow you to book classes. Each class costs a specific number of points from your card balance. You can view your balance in your profile.' 
              : '課程卡允許您預約課程。每堂課都需要消耗特定數量的點數。您可以在個人資料頁面查看您的點數餘額。'}
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">
            {language === 'en' ? 'What\'s the difference between beginner and advanced cards?' : '初學者卡和進階卡有什麼區別？'}
          </h3>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'Beginner cards can only be used for beginner level classes, while advanced cards can be used for all class types including advanced techniques.' 
              : '初學者卡只能用於初學者課程，而進階卡可用於所有類型的課程，包括進階技術。'}
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">
            {language === 'en' ? 'How do I use my course card?' : '如何使用我的課程卡？'}
          </h3>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'After purchasing a course card, you can immediately book classes through the booking page. The system will automatically deduct points when you book a class.' 
              : '購買課程卡後，您可以立即通過預約頁面預約課程。系統會在您預約課程時自動扣除點數。'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
