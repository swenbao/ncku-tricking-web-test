
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PointsHeader from './components/PointsHeader';
import PointsPackages from './components/PointsPackages';
import FAQ from './components/FAQ';

const PointsPage = () => {
  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <PointsHeader />
          <PointsPackages />
          <FAQ />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PointsPage;
