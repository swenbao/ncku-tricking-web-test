
import React from 'react';
import PointsHeader from './components/PointsHeader';
import PointsPackages from './components/PointsPackages';
import FAQ from './components/FAQ';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PointsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <PointsHeader />
        <PointsPackages />
        <FAQ />
      </div>
      <Footer />
    </div>
  );
};

export default PointsPage;
