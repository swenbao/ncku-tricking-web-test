
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TabNavigation from '@/components/purchase/TabNavigation';
import CourseCardPlanCard from '@/components/purchase/CourseCardPlanCard';
import PaymentMethodSelector from '@/components/purchase/PaymentMethodSelector';
import PurchaseSummary from '@/components/purchase/PurchaseSummary';
import { usePointsPurchase } from '@/hooks/usePointsPurchase';
import { useLanguage } from '@/contexts/LanguageContext';

const PurchasePointsContainer = () => {
  const { language } = useLanguage();
  const { 
    currentLevelIndex,
    currentLevel,
    selectedTabIds,
    filteredPlans,
    selectedPlanId,
    selectedPlan,
    courseCardTypes,
    quantity,
    paymentMethod,
    transferDigits,
    isAtFinalStep,
    isAuthenticated,
    handleBack,
    handleTabSelect,
    handlePlanSelect,
    handleQuantityChange,
    handlePaymentMethodSelect,
    setTransferDigits,
    handlePurchase
  } = usePointsPurchase();

  return (
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
      {!selectedPlanId && currentLevelIndex < (currentLevel ? 100 : 0) && (
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
      {(isAtFinalStep || selectedPlanId) && !false && (
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
  );
};

export default PurchasePointsContainer;
