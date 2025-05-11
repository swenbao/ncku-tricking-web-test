
import React from 'react';
import { Menu, X } from 'lucide-react';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button 
      className="flex items-center"
      onClick={onClick}
      aria-label="Toggle menu"
    >
      {isOpen ? (
        <X className="h-6 w-6 text-white" />
      ) : (
        <Menu className="h-6 w-6 text-white" />
      )}
    </button>
  );
};

export default MobileMenuButton;
