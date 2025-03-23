
import React from 'react';
import { cn } from '@/lib/utils';
import { NavbarContainerProps } from './types';

const NavbarContainer: React.FC<NavbarContainerProps> = ({ children, scrolled, visible }) => {
  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      scrolled 
        ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border/40" 
        : "bg-background/80 backdrop-blur-sm border-b border-border/40",
      visible ? "translate-y-0" : "-translate-y-full"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {children}
        </div>
      </div>
    </nav>
  );
};

export default NavbarContainer;
