
import React from 'react';
import { cn } from '@/lib/utils';
import BrandLogo from './BrandLogo';
import DesktopNavigation from './DesktopNavigation';
import MobileControls from './MobileControls';

interface NavbarHeaderProps {
  isOpen: boolean;
  toggleMenu: () => void;
  isScrolled: boolean;
  navVisible: boolean;
}

const NavbarHeader: React.FC<NavbarHeaderProps> = ({ 
  isOpen, 
  toggleMenu, 
  isScrolled, 
  navVisible 
}) => {
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "py-3 bg-black/80 backdrop-blur-md shadow-sm border-b border-white/10" 
          : "py-5 bg-transparent",
        navVisible 
          ? "translate-y-0 opacity-100 pointer-events-auto" 
          : "-translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          <BrandLogo />
          <DesktopNavigation />
          <MobileControls isOpen={isOpen} toggleMenu={toggleMenu} />
        </nav>
      </div>
    </header>
  );
};

export default NavbarHeader;
