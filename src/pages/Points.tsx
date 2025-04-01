
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import PurchasePointsContainer from '@/components/purchase/PurchasePointsContainer';
import PurchaseConfirmation from '@/components/purchase/PurchaseConfirmation';
import { usePointsPurchase } from '@/hooks/usePointsPurchase';

const PointsPage = () => {
  const { 
    selectedPlan, 
    paymentMethod, 
    purchaseSuccess, 
    handleDialogClose
  } = usePointsPurchase();

  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Course Cards
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Purchase course cards to book classes with NCKU Tricking Club
            </p>
          </header>
          
          <PurchasePointsContainer />
        </div>
      </main>
      
      <Footer />
      
      {/* Success Dialog */}
      <Dialog open={purchaseSuccess} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-md p-0">
          {selectedPlan && paymentMethod && (
            <PurchaseConfirmation
              planName={selectedPlan.name}
              totalPrice={selectedPlan.price * 1} // We'll get the quantity from the hook in future
              paymentMethod={paymentMethod}
              onClose={handleDialogClose}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PointsPage;
