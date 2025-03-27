
import React from 'react';
import LanguageToggle from './LanguageToggle';
import UserMenu from './UserMenu';
import MobileMenuButton from './MobileMenuButton';

interface MobileControlsProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileControls: React.FC<MobileControlsProps> = ({ isOpen, toggleMenu }) => {
  return (
    <div className="md:hidden flex items-center">
      <LanguageToggle variant="minimal" />
      <UserMenu />
      <MobileMenuButton isOpen={isOpen} onClick={toggleMenu} />
    </div>
  );
};

export default MobileControls;
