
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface MobileNavigationProps {
  isOpen: boolean;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen }) => {
  const { language } = useLanguage();
  
  return (
    <div 
      className={cn(
        "md:hidden fixed inset-0 bg-black z-40 transition-transform transform duration-300 ease-in-out pt-20",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex flex-col items-center space-y-6 p-8">
        <NavLink to="/" className="text-lg font-medium text-white">
          {language === 'en' ? 'Home' : '首頁'}
        </NavLink>
        <NavLink to="/tricktionary" className="text-lg font-medium text-white">
          {language === 'en' ? 'Tricktionary' : '招式字典'}
        </NavLink>
        <NavLink to="/points" className="text-lg font-medium text-white">
          {language === 'en' ? 'Buy Points' : '購買點數'}
        </NavLink>
        <NavLink to="/booking" className="text-lg font-medium text-white">
          {language === 'en' ? 'Book Classes' : '預約課程'}
        </NavLink>
      </div>
    </div>
  );
};

export default MobileNavigation;
