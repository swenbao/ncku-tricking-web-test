
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "py-3 bg-background/80 backdrop-blur-md shadow-sm border-b" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          <NavLink to="/" className="text-xl md:text-2xl font-bold">
            <span className="text-primary">TRICK</span>
            <span className="text-accent">TOPIA</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/" className={({isActive}) => cn("nav-link", isActive && "active")}>
              Home
            </NavLink>
            <NavLink to="/tricktionary" className={({isActive}) => cn("nav-link", isActive && "active")}>
              Tricktionary
            </NavLink>
            <NavLink to="/points" className={({isActive}) => cn("nav-link", isActive && "active")}>
              Buy Points
            </NavLink>
            <NavLink to="/booking" className={({isActive}) => cn("nav-link", isActive && "active")}>
              Book Classes
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-primary" />
            ) : (
              <Menu className="h-6 w-6 text-primary" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div 
          className={cn(
            "md:hidden fixed inset-0 bg-background z-40 transition-transform transform duration-300 ease-in-out pt-20",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col items-center space-y-6 p-8">
            <NavLink to="/" className="text-lg font-medium">
              Home
            </NavLink>
            <NavLink to="/tricktionary" className="text-lg font-medium">
              Tricktionary
            </NavLink>
            <NavLink to="/points" className="text-lg font-medium">
              Buy Points
            </NavLink>
            <NavLink to="/booking" className="text-lg font-medium">
              Book Classes
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
