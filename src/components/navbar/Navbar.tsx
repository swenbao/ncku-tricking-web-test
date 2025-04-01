
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavbarHeader from './NavbarHeader';
import MobileNavigation from './MobileNavigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 10) {
        setIsScrolled(true);
        setNavVisible(true); // Always show when scrolled past 10px
      } else {
        setIsScrolled(false);
        setNavVisible(false); // Hidden when at top (unless hovering)
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to handle mouse entering the top area
  const handleMouseEnter = () => {
    setIsHovering(true);
    setNavVisible(true);
  };

  // Function to handle mouse leaving the navbar
  const handleMouseLeave = () => {
    setIsHovering(false);
    if (window.scrollY <= 10) {
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
        className="fixed top-0 left-0 right-0 h-10 z-40" 
        onMouseEnter={handleMouseEnter}
      />
      
      <NavbarHeader 
        isOpen={isOpen}
        toggleMenu={() => setIsOpen(!isOpen)}
        isScrolled={isScrolled}
        navVisible={navVisible}
      />

      <MobileNavigation isOpen={isOpen} />
    </>
  );
};

export default Navbar;
