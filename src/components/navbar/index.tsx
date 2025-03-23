
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/auth';
import { useNavbarScroll } from './useNavbarScroll';
import NavbarContainer from './NavbarContainer';
import DesktopNav from './DesktopNav';
import MobileMenuButton from './MobileMenuButton';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const { language, toggleLanguage } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { scrolled, visible } = useNavbarScroll();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <NavbarContainer scrolled={scrolled} visible={visible}>
        <DesktopNav
          language={language}
          toggleLanguage={toggleLanguage}
          isAuthenticated={isAuthenticated}
          user={user}
          navigate={navigate}
          handleLogout={handleLogout}
        />
        <MobileMenuButton 
          isOpen={isOpen} 
          toggleMenu={toggleMenu} 
        />
      </NavbarContainer>

      <MobileMenu
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        language={language}
        toggleLanguage={toggleLanguage}
        isAuthenticated={isAuthenticated}
        user={user}
        handleLogout={handleLogout}
        navigate={navigate}
      />
    </>
  );
};

export default Navbar;
