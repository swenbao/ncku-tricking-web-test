
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/auth';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { courseCardPlans, courseCardTypes, purchaseFlow } from '@/lib/data';
import TabNavigation from '@/components/purchase/TabNavigation';
import CourseCardPlanCard from '@/components/purchase/CourseCardPlanCard';
import PaymentMethodSelector, { PaymentMethod } from '@/components/purchase/PaymentMethodSelector';
import PurchaseSummary from '@/components/purchase/PurchaseSummary';
import PurchaseConfirmation from '@/components/purchase/PurchaseConfirmation';

const PointsPage = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // State for the purchase flow
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [selectedTabIds, setSelectedTabIds] = useState<string[]>([]);
  const [filteredPlans, setFilteredPlans] = useState(courseCardPlans);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [transferDigits, setTransferDigits] = useState('');
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  // Get current level based on index
  const currentLevel = purchaseFlow[currentLevelIndex];
  
  // Get selected plan from selected plan ID
  const selectedPlan = selectedPlanId 
    ? courseCardPlans.find(plan => plan.id === selectedPlanId) 
    : null;

  // Effect to filter plans based on selected tabs
  useEffect(() => {
    let filtered = [...courseCardPlans];
    
    // Apply filters based on selected tabs
    selectedTabIds.forEach((tabId, index) => {
      if (index >= purchaseFlow.length) return;
      
      const level = purchaseFlow[index];
      const tab = level.tabs.find(tab => tab.id === tabId);
      
      if (!tab) return;
      
      filtered = filtered.filter(plan => {
        const planValue = plan[tab.filterField];
        
        if (tab.filterOperation === 'equals') {
          // Handle special case for includedCards
          if (tab.filterField === 'includedCards') {
            return plan.includedCards.quantity === tab.filterValue.quantity;
          }
          return planValue === tab.filterValue;
        }
        
        if (tab.filterOperation === 'greater-than') {
          // Handle special case for includedCards
          if (tab.filterField === 'includedCards') {
            return plan.includedCards.quantity > tab.filterValue.quantity;
          }
          return planValue > tab.filterValue;
        }
        
        if (tab.filterOperation === 'less-than') {
          // Handle special case for includedCards
          if (tab.filterField === 'includedCards') {
            return plan.includedCards.quantity < tab.filterValue.quantity;
          }
          return planValue < tab.filterValue;
        }
        
        return true;
      });
    });
    
    setFilteredPlans(filtered);
    
    // Reset selected plan if it's not in the filtered list
    if (selectedPlanId && !filtered.some(plan => plan.id === selectedPlanId)) {
      setSelectedPlanId(null);
    }
  }, [selectedTabIds]);

  // Handler for tab selection
  const handleTabSelect = (tabId: string) => {
    // Update selected tabs up to current level
    const newSelectedTabs = [...selectedTabIds.slice(0, currentLevelIndex), tabId];
    setSelectedTabIds(newSelectedTabs);
    
    // Move to next level if available
    if (currentLevelIndex < purchaseFlow.length - 1) {
      setCurrentLevelIndex(currentLevelIndex + 1);
    }
  };

  // Handler for going back to previous level
  const handleBack = () => {
    if (currentLevelIndex > 0) {
      setCurrentLevelIndex(currentLevelIndex - 1);
    }
  };

  // Handler for plan selection
  const handlePlanSelect = (planId: string) => {
    setSelectedPlanId(planId);
    
    // Reset quantity to 1 when selecting a new plan
    setQuantity(1);
  };

  // Handler for quantity change
  const handleQuantityChange = (planId: string, newQuantity: number) => {
    if (planId === selectedPlanId) {
      setQuantity(newQuantity);
    }
  };

  // Handler for payment method selection
  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setPaymentMethod(method);
  };

  // Handler for purchase
  const handlePurchase = () => {
    if (!selectedPlan) return;
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast({
        title: language === 'en' ? "Login Required" : "需要登入",
        description: language === 'en' 
          ? "Please login to purchase course cards."
          : "請登入以購買課程卡。",
        variant: "destructive",
      });
      
      // Redirect to login page
      navigate('/login');
      return;
    }
    
    // Check if payment method is selected
    if (!paymentMethod) {
      toast({
        title: language === 'en' ? "Payment Method Required" : "需要選擇付款方式",
        description: language === 'en'
          ? "Please select a payment method."
          : "請選擇付款方式。",
        variant: "destructive",
      });
      return;
    }
    
    // For bank transfer, check if transfer digits are entered
    if (paymentMethod === 'bank-transfer' && transferDigits.length !== 5) {
      toast({
        title: language === 'en' ? "Transfer Details Required" : "需要轉賬詳情",
        description: language === 'en'
          ? "Please enter the last 5 digits of your transfer."
          : "請輸入您轉賬的後5位數字。",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: language === 'en' ? "Processing your purchase..." : "處理您的購買...",
      description: language === 'en' 
        ? "This will only take a moment."
        : "這只需要一會兒。",
    });
    
    // Simulate a successful purchase after 1.5 seconds
    setTimeout(() => {
      setPurchaseSuccess(true);
    }, 1500);
  };

  // Handler for closing success dialog
  const handleDialogClose = () => {
    setPurchaseSuccess(false);
    
    // Reset the purchase flow
    setCurrentLevelIndex(0);
    setSelectedTabIds([]);
    setSelectedPlanId(null);
    setQuantity(1);
    setPaymentMethod(null);
    setTransferDigits('');
  };

  // Determine if we're at the final purchase step
  const isAtFinalStep = currentLevelIndex === purchaseFlow.length || 
    (currentLevelIndex === purchaseFlow.length - 1 && filteredPlans.length === 1);

  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {language === 'en' ? "Course Cards" : "課程卡"}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'en' 
                ? "Purchase course cards to book classes with NCKU Tricking Club"
                : "購買課程卡以預訂NCKU Tricking社團的課程"}
            </p>
          </header>
          
          <div className="max-w-5xl mx-auto">
            {/* Navigation Breadcrumb */}
            {(currentLevelIndex > 0 || selectedPlanId) && (
              <Button 
                variant="ghost" 
                onClick={handleBack} 
                className="mb-6"
                disabled={currentLevelIndex === 0 && !selectedPlanId}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Back' : '返回'}
              </Button>
            )}
            
            {/* Purchase Flow - Tab Navigation */}
            {!selectedPlanId && currentLevelIndex < purchaseFlow.length && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">
                  {language === 'en' 
                    ? 'Step ' + (currentLevelIndex + 1) + ': Select ' + (currentLevel?.id || 'Option')
                    : '步驟 ' + (currentLevelIndex + 1) + ': 選擇 ' + (currentLevel?.id === 'difficulty-level' ? '難度等級' : '課程類型')}
                </h2>
                
                <TabNavigation 
                  tabs={currentLevel?.tabs || []}
                  activeTabId={selectedTabIds[currentLevelIndex] || null}
                  onSelectTab={handleTabSelect}
                />
              </div>
            )}
            
            {/* Display Course Card Plans */}
            {(isAtFinalStep || selectedPlanId) && !purchaseSuccess && (
              <div className="mb-12">
                {!selectedPlanId ? (
                  <>
                    <h2 className="text-2xl font-bold mb-6">
                      {language === 'en' ? 'Select a Course Card Plan' : '選擇課程卡方案'}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredPlans.map(plan => (
                        <CourseCardPlanCard
                          key={plan.id}
                          plan={plan}
                          courseCardTypes={courseCardTypes}
                          isSelected={selectedPlanId === plan.id}
                          onSelect={handlePlanSelect}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                      <div>
                        <h2 className="text-2xl font-bold mb-6">
                          {language === 'en' ? 'Your Selected Plan' : '您選擇的方案'}
                        </h2>
                        
                        <CourseCardPlanCard
                          plan={selectedPlan}
                          courseCardTypes={courseCardTypes}
                          isSelected={true}
                          onSelect={() => {}}
                          onQuantityChange={handleQuantityChange}
                          quantity={quantity}
                        />
                      </div>
                      
                      <PaymentMethodSelector
                        selectedMethod={paymentMethod}
                        onSelectMethod={handlePaymentMethodSelect}
                        transferDigits={transferDigits}
                        onTransferDigitsChange={setTransferDigits}
                      />
                    </div>
                    
                    <div>
                      <PurchaseSummary
                        selectedPlan={selectedPlan}
                        courseCardTypes={courseCardTypes}
                        quantity={quantity}
                        paymentMethod={paymentMethod}
                      />
                      
                      <div className="mt-6">
                        <Button 
                          size="lg" 
                          className="w-full"
                          onClick={handlePurchase}
                          disabled={!paymentMethod || (paymentMethod === 'bank-transfer' && transferDigits.length !== 5)}
                        >
                          {language === 'en' ? 'Complete Purchase' : '完成購買'}
                        </Button>
                        {!isAuthenticated && (
                          <p className="text-xs text-muted-foreground mt-2 text-center">
                            {language === 'en' 
                              ? 'You will need to log in to complete your purchase'
                              : '您需要登入才能完成購買'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Success Dialog */}
      <Dialog open={purchaseSuccess} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-md p-0">
          {selectedPlan && paymentMethod && (
            <PurchaseConfirmation
              planName={language === 'en' ? selectedPlan.name : `${selectedPlan.difficultyLevel === 'Beginner' ? '初學者' : '進階'} ${selectedPlan.name.includes('Single') ? '單堂' : '學期'}`}
              totalPrice={selectedPlan.price * quantity}
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
