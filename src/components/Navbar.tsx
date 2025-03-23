
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth';
import { UserAvatar } from '@/components/ui/user-avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const { language, toggleLanguage } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0 font-bold text-xl">
            {language === 'en' ? 'NCKU Tricking' : '成大特技社'}
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className="px-3 py-2 text-sm hover:text-accent-foreground transition-colors"
              >
                {language === 'en' ? 'Home' : '首頁'}
              </Link>
              <Link
                to="/tricktionary"
                className="px-3 py-2 text-sm hover:text-accent-foreground transition-colors"
              >
                {language === 'en' ? 'Tricktionary' : '技巧字典'}
              </Link>
              
              {isAuthenticated && (
                <>
                  <Link
                    to="/points"
                    className="px-3 py-2 text-sm hover:text-accent-foreground transition-colors"
                  >
                    {language === 'en' ? 'Course Cards' : '課程卡'}
                  </Link>
                  <Link
                    to="/booking"
                    className="px-3 py-2 text-sm hover:text-accent-foreground transition-colors"
                  >
                    {language === 'en' ? 'Book Class' : '預約課程'}
                  </Link>
                </>
              )}
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

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <UserAvatar />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {user?.name || 'User'}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem onSelect={() => navigate('/profile')}>
                    {language === 'en' ? 'Profile' : '個人資料'}
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onSelect={() => navigate('/booking-history')}>
                    {language === 'en' ? 'Booking History' : '預約紀錄'}
                  </DropdownMenuItem>
                  
                  {user?.role === 'official' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={() => navigate('/admin')}>
                        {language === 'en' ? 'Admin Panel' : '管理員面板'}
                      </DropdownMenuItem>
                    </>
                  )}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={handleLogout}>
                    {language === 'en' ? 'Logout' : '登出'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => navigate('/login')}
              >
                {language === 'en' ? 'Login' : '登入'}
              </Button>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-400 hover:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border/20">
          <Link
            to="/"
            className="block px-3 py-2 text-base hover:text-accent-foreground transition-colors"
            onClick={toggleMenu}
          >
            {language === 'en' ? 'Home' : '首頁'}
          </Link>
          <Link
            to="/tricktionary"
            className="block px-3 py-2 text-base hover:text-accent-foreground transition-colors"
            onClick={toggleMenu}
          >
            {language === 'en' ? 'Tricktionary' : '技巧字典'}
          </Link>
          
          {isAuthenticated && (
            <>
              <Link
                to="/points"
                className="block px-3 py-2 text-base hover:text-accent-foreground transition-colors"
                onClick={toggleMenu}
              >
                {language === 'en' ? 'Course Cards' : '課程卡'}
              </Link>
              <Link
                to="/booking"
                className="block px-3 py-2 text-base hover:text-accent-foreground transition-colors"
                onClick={toggleMenu}
              >
                {language === 'en' ? 'Book Class' : '預約課程'}
              </Link>
            </>
          )}

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
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-base hover:text-accent-foreground transition-colors"
                    onClick={toggleMenu}
                  >
                    {language === 'en' ? 'Profile' : '個人資料'}
                  </Link>
                  <Link
                    to="/booking-history"
                    className="block px-3 py-2 text-base hover:text-accent-foreground transition-colors"
                    onClick={toggleMenu}
                  >
                    {language === 'en' ? 'Booking History' : '預約紀錄'}
                  </Link>
                  
                  {user?.role === 'official' && (
                    <Link
                      to="/admin"
                      className="block px-3 py-2 text-base hover:text-accent-foreground transition-colors"
                      onClick={toggleMenu}
                    >
                      {language === 'en' ? 'Admin Panel' : '管理員面板'}
                    </Link>
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
    </nav>
  );
};

export default Navbar;
