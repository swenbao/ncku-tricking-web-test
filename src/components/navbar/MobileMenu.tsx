
import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/ui/user-avatar';
import { MobileMenuProps } from './types';
import NavLink from './NavLink';

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  toggleMenu,
  language,
  toggleLanguage,
  isAuthenticated,
  user,
  handleLogout,
  navigate
}) => {
  return (
    <div
      className={cn(
        "md:hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
      )}
    >
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border/20">
        <NavLink 
          to="/" 
          label={language === 'en' ? 'Home' : '首頁'} 
          onClick={toggleMenu} 
        />
        <NavLink 
          to="/tricktionary" 
          label={language === 'en' ? 'Tricktionary' : '技巧字典'} 
          onClick={toggleMenu} 
        />
        <NavLink 
          to="/points" 
          label={language === 'en' ? 'Course Cards' : '課程卡'} 
          onClick={toggleMenu} 
        />
        <NavLink 
          to="/booking" 
          label={language === 'en' ? 'Book Class' : '預約課程'} 
          onClick={toggleMenu} 
        />

        {isAuthenticated ? (
          <>
            <div className="pt-4 pb-3 border-t border-border/20">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <UserAvatar />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium">{user?.name}</div>
                  <div className="text-sm text-muted-foreground">{user?.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <NavLink 
                  to="/profile" 
                  label={language === 'en' ? 'Profile' : '個人資料'} 
                  onClick={toggleMenu} 
                />
                <NavLink 
                  to="/booking-history" 
                  label={language === 'en' ? 'Booking History' : '預約紀錄'} 
                  onClick={toggleMenu} 
                />
                
                {user?.role === 'official' && (
                  <NavLink 
                    to="/admin" 
                    label={language === 'en' ? 'Admin Panel' : '管理員面板'} 
                    onClick={toggleMenu} 
                  />
                )}
                
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="block w-full text-left px-3 py-2 text-base hover:text-accent-foreground transition-colors"
                >
                  {language === 'en' ? 'Logout' : '登出'}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="pt-4 pb-3 border-t border-border/20">
            <div className="flex gap-2 px-2">
              <Button
                variant="default"
                className="w-full"
                onClick={() => {
                  navigate('/login');
                  toggleMenu();
                }}
              >
                {language === 'en' ? 'Login' : '登入'}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  navigate('/signup');
                  toggleMenu();
                }}
              >
                {language === 'en' ? 'Sign Up' : '註冊'}
              </Button>
            </div>
          </div>
        )}

        <div className="px-5 pt-4 flex justify-between items-center border-t border-border/20">
          <span className="text-sm text-muted-foreground">
            {language === 'en' ? 'Language' : '語言'}:
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              toggleLanguage();
            }}
          >
            {language === 'en' ? '中文' : 'EN'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
