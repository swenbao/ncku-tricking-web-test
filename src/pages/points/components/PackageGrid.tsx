
import React from 'react';
import { PointPackage } from '@/lib/data';
import PackageCard from './PackageCard';

interface PackageGridProps {
  packages: PointPackage[];
  handlePurchase: (pkg: PointPackage) => void;
  columnsCount?: 2 | 3;
}

const PackageGrid: React.FC<PackageGridProps> = ({ 
  packages, 
  handlePurchase,
  columnsCount = 2
}) => {
  return (
    <div className={`grid gap-8 md:grid-cols-${columnsCount}`}>
      {packages.map((pkg) => (
        <PackageCard 
          key={pkg.id} 
          packageData={pkg} 
          onPurchase={handlePurchase} 
        />
      ))}
    </div>
  );
};

export default PackageGrid;
