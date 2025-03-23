
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NavLink from './NavLink';
import UserMenu from './UserMenu';

interface DesktopNavProps {
  language: string;
  toggleLanguage: () => void;
  isAuthenticated: boolean;
  user: any;
  navigate: (path: string) => void;
  handleLogout: () => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  language,
  toggleLanguage,
  isAuthenticated,
  user,
  navigate,
  handleLogout
}) => {
  return (
    <>
      <Link to="/" className="flex-shrink-0 font-bold text-xl">
        {language === 'en' ? 'NCKU Tricking' : '成大特技社'}
      </Link>

      <div className="hidden md:block">
        <div className="ml-10 flex items-center space-x-4">
          <NavLink to="/" label={language === 'en' ? 'Home' : '首頁'} />
          <NavLink to="/tricktionary" label={language === 'en' ? 'Tricktionary' : '技巧字典'} />
          <NavLink to="/points" label={language === 'en' ? 'Course Cards' : '課程卡'} />
          <NavLink to="/booking" label={language === 'en' ? 'Book Class' : '預約課程'} />
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLanguage}
        >
          {language === 'en' ? '中文' : 'EN'}
        </Button>

        <UserMenu 
          user={isAuthenticated ? user : null} 
          language={language} 
          navigate={navigate} 
          handleLogout={handleLogout} 
        />
      </div>
    </>
  );
};

export default DesktopNav;
