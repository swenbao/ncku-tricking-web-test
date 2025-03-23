
import React from 'react';
import { Menu, X } from 'lucide-react';

interface MobileMenuButtonProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ isOpen, toggleMenu }) => {
  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="text-gray-400 hover:text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
};

export default MobileMenuButton;
