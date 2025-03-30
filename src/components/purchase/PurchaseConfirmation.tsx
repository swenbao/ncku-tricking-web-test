
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Check } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { PaymentMethod } from './PaymentMethodSelector';

interface PurchaseConfirmationProps {
  planName: string;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  onClose: () => void;
}

const PurchaseConfirmation = ({ 
  planName, 
  totalPrice, 
  paymentMethod,
  onClose 
}: PurchaseConfirmationProps) => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const translatePaymentMethod = (method: PaymentMethod): string => {
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

  const getConfirmationMessage = () => {
    if (paymentMethod === 'bank-transfer') {
      return language === 'en' 
        ? 'Please complete your bank transfer. Your order is pending verification.'
        : '請完成您的銀行轉賬。您的訂單正在等待驗證。';
    } else if (paymentMethod === 'on-site') {
      return language === 'en'
        ? 'Your order has been confirmed. Please pay during your next class.'
        : '您的訂單已確認。請在下次課堂期間付款。';
    }
    return '';
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-primary/20 p-3 rounded-full">
            <Check className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl">
          {language === 'en' ? 'Purchase Successful!' : '購買成功！'}
        </CardTitle>
        <CardDescription>
          {getConfirmationMessage()}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="bg-muted/30 rounded-md p-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'en' ? 'Plan' : '方案'}:</span>
              <span className="font-medium">{planName}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'en' ? 'Payment Method' : '付款方式'}:</span>
              <span className="font-medium">{translatePaymentMethod(paymentMethod)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'en' ? 'Total' : '總計'}:</span>
              <span className="font-medium">NT${totalPrice}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <Button 
            className="flex-1"
            onClick={onClose}
          >
            {language === 'en' ? 'Purchase Another' : '購買另一張'}
          </Button>
          
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate('/profile')}
          >
            {language === 'en' ? 'View Your Cards' : '查看您的卡'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PurchaseConfirmation;
