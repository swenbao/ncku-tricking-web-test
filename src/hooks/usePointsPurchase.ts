
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/auth';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { courseCardPlans, courseCardTypes, purchaseFlow, CourseCardPlan } from '@/lib/data';
import { PaymentMethod } from '@/components/purchase/PaymentMethodSelector';

export const usePointsPurchase = () => {
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
  }, [selectedTabIds, selectedPlanId]);

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
    if (selectedPlanId) {
      setSelectedPlanId(null);
    } else if (currentLevelIndex > 0) {
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

  return {
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
    purchaseSuccess,
    isAtFinalStep,
    isAuthenticated,
    handleBack,
    handleTabSelect,
    handlePlanSelect,
    handleQuantityChange,
    handlePaymentMethodSelect,
    setTransferDigits,
    handlePurchase,
    handleDialogClose
  };
};
