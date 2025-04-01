
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseCardPlan, CourseCardType } from '@/lib/data';
import { useLanguage } from '@/contexts/LanguageContext';
import { PaymentMethod } from './PaymentMethodSelector';

interface PurchaseSummaryProps {
  selectedPlan: CourseCardPlan;
  courseCardTypes: CourseCardType[];
  quantity: number;
  paymentMethod: PaymentMethod | null;
}

const PurchaseSummary = ({ 
  selectedPlan, 
  courseCardTypes, 
  quantity, 
  paymentMethod 
}: PurchaseSummaryProps) => {
  const { language } = useLanguage();
  const cardType = courseCardTypes.find(type => type.id === selectedPlan.includedCards.type);

  const translateCardType = (name: string): string => {
    const translations: Record<string, string> = {
      'Beginner Course Card': '初學者課程卡',
      'Advanced Course Card': '進階課程卡',
    };
    return language === 'en' ? name : translations[name] || name;
  };

  const translatePaymentMethod = (method: PaymentMethod | null): string => {
    if (!method) return language === 'en' ? 'Not selected' : '未選擇';
    
    const translations: Record<PaymentMethod, string> = {
      'online': '線上支付',
      'bank-transfer': '銀行轉帳',
      'on-site': '現場支付'
    };
    
    const englishNames: Record<PaymentMethod, string> = {
      'online': 'Online Payment',
      'bank-transfer': 'Bank Transfer',
      'on-site': 'On-Site Payment'
    };
    
    return language === 'en' ? englishNames[method] : translations[method];
  };

  // Total cards calculation
  const totalCards = selectedPlan.includedCards.quantity * quantity;
  
  // Total price calculation
  const totalPrice = selectedPlan.price * quantity;

  return (
    <Card className="bg-background/50">
      <CardHeader>
        <CardTitle>{language === 'en' ? 'Purchase Summary' : '購買摘要'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{language === 'en' ? 'Plan' : '方案'}:</span>
            <span className="font-medium">
              {language === 'en' ? selectedPlan.name : `${selectedPlan.difficultyLevel === 'Beginner' ? '初學者' : '進階'} ${selectedPlan.name.includes('Single') ? '單堂' : '學期'}`}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">{language === 'en' ? 'Price per unit' : '單價'}:</span>
            <span className="font-medium">NT${selectedPlan.price}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">{language === 'en' ? 'Quantity' : '數量'}:</span>
            <span className="font-medium">{quantity}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">{language === 'en' ? 'Course Cards' : '課程卡'}:</span>
            <span className="font-medium">
              {totalCards} x {cardType ? translateCardType(cardType.name) : ''}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">{language === 'en' ? 'Expiry' : '有效期'}:</span>
            <span className="font-medium">
              {selectedPlan.expiryDate 
                ? selectedPlan.expiryDate 
                : (language === 'en' ? 'No expiration' : '永久有效')}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">{language === 'en' ? 'Payment Method' : '付款方式'}:</span>
            <span className="font-medium">{translatePaymentMethod(paymentMethod)}</span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-border">
          <div className="flex justify-between font-bold text-lg">
            <span>{language === 'en' ? 'Total' : '總計'}:</span>
            <span className="text-primary">NT${totalPrice}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PurchaseSummary;
