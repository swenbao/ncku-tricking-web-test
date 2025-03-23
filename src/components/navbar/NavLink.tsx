
import React from 'react';
import { Link } from 'react-router-dom';
import { NavLinkProps } from './types';

const NavLink: React.FC<NavLinkProps> = ({ to, label, onClick }) => {
  return (
    <Link
      to={to}
      className="px-3 py-2 text-sm hover:text-accent-foreground transition-colors"
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default NavLink;
