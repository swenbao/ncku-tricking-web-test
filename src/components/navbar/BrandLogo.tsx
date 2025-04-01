
import React from 'react';
import { NavLink } from 'react-router-dom';

const BrandLogo: React.FC = () => {
  return (
    <NavLink to="/" className="text-xl md:text-2xl font-bold">
      <span className="text-white">NCKU</span>
      <span className="text-red-500">TRICKING</span>
    </NavLink>
  );
};

export default BrandLogo;
