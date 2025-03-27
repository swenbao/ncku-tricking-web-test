
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import UserMenu from './UserMenu';

const DesktopNavigation: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="hidden md:flex items-center space-x-2">
      <NavLink to="/" className={({isActive}) => cn("nav-link", isActive && "active")}>
        {language === 'en' ? 'Home' : '首頁'}
      </NavLink>
      <NavLink to="/tricktionary" className={({isActive}) => cn("nav-link", isActive && "active")}>
        {language === 'en' ? 'Tricktionary' : '招式字典'}
      </NavLink>
      <NavLink to="/points" className={({isActive}) => cn("nav-link", isActive && "active")}>
        {language === 'en' ? 'Buy Points' : '購買點數'}
      </NavLink>
      <NavLink to="/booking" className={({isActive}) => cn("nav-link", isActive && "active")}>
        {language === 'en' ? 'Book Classes' : '預約課程'}
      </NavLink>
      
      <LanguageToggle />
      <UserMenu />
    </div>
  );
};

export default DesktopNavigation;
