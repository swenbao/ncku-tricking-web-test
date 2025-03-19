import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Menu, X, User, LogOut, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth, UserAvatar } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling down past threshold (10px instead of 50px)
      if (currentScrollY > 10) {
        setIsScrolled(true);
        // Only set navbar visible when not in hover mode
        if (!isHovering) {
          setNavVisible(false);
        }
      } else {
        setIsScrolled(false);
        setNavVisible(true); // Always show at top
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isHovering]);

  // Function to handle mouse entering the top area
  const handleMouseEnter = () => {
    setIsHovering(true);
    setNavVisible(true);
  };

  // Function to handle mouse leaving the navbar
  const handleMouseLeave = () => {
    setIsHovering(false);
    if (window.scrollY > 10) {
      setNavVisible(false);
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Hover detection area - invisible bar at the top of the screen */}
      <div 
        className="fixed top-0 left-0 right-0 h-5 z-40" 
        onMouseEnter={handleMouseEnter}
      />
      
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled 
            ? "py-3 bg-black/80 backdrop-blur-md shadow-sm border-b border-white/10" 
            : "py-5 bg-transparent",
          navVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        )}
        style={{ pointerEvents: navVisible ? 'auto' : 'none' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="container mx-auto px-4 md:px-6">
          <nav className="flex items-center justify-between">
            <NavLink to="/" className="text-xl md:text-2xl font-bold">
              <span className="text-white">NCKU</span>
              <span className="text-red-500">TRICKING</span>
            </NavLink>

            {/* Desktop Navigation */}
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
              
              {/* Language Toggle Button - Moved to the nav links area with proper spacing */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleLanguage} 
                className="rounded-full"
              >
                <Globe className="h-5 w-5" />
                <span className="ml-1 text-xs">{language === 'en' ? 'EN' : '中'}</span>
              </Button>
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-2 rounded-full">
                      <UserAvatar />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span>{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>{language === 'en' ? 'Profile' : '個人資料'}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => logout()} className="cursor-pointer text-red-500">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{language === 'en' ? 'Log out' : '登出'}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild variant="ghost" className="ml-2">
                  <Link to="/login">{language === 'en' ? 'Log In' : '登入'}</Link>
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              {/* Mobile Language Toggle */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleLanguage} 
                className="mr-2"
              >
                <Globe className="h-5 w-5" />
              </Button>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="mr-2 rounded-full">
                      <UserAvatar />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span>{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>{language === 'en' ? 'Profile' : '個人資料'}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => logout()} className="cursor-pointer text-red-500">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{language === 'en' ? 'Log out' : '登出'}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild variant="ghost" size="sm" className="mr-2">
                  <Link to="/login">{language === 'en' ? 'Log In' : '登入'}</Link>
                </Button>
              )}
              
              <button 
                className="flex items-center"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="h-6 w-6 text-white" />
                ) : (
                  <Menu className="h-6 w-6 text-white" />
                )}
              </button>
            </div>
          </nav>

          {/* Mobile Navigation */}
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
        </div>
      </header>
    </>
  );
};

export default Navbar;
