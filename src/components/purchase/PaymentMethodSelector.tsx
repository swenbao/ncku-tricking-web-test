
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, Landmark, UserRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from '@/contexts/LanguageContext';

export type PaymentMethod = 'online' | 'bank-transfer' | 'on-site';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod | null;
  onSelectMethod: (method: PaymentMethod) => void;
  transferDigits: string;
  onTransferDigitsChange: (digits: string) => void;
}

const PaymentMethodSelector = ({
  selectedMethod,
  onSelectMethod,
  transferDigits,
  onTransferDigitsChange
}: PaymentMethodSelectorProps) => {
  const { language } = useLanguage();

  const methods = [
    { 
      id: 'online' as PaymentMethod, 
      name: language === 'en' ? 'Online Payment' : '線上支付', 
      description: language === 'en' ? 'Under Development' : '功能開發中', 
      icon: CreditCard,
      disabled: true
    },
    { 
      id: 'bank-transfer' as PaymentMethod, 
      name: language === 'en' ? 'Bank Transfer' : '銀行轉帳', 
      description: language === 'en' ? 'Transfer to our bank account' : '轉賬至我們的銀行帳戶', 
      icon: Landmark,
      disabled: false
    },
    { 
      id: 'on-site' as PaymentMethod, 
      name: language === 'en' ? 'On-Site Payment' : '現場支付', 
      description: language === 'en' ? 'Pay during class' : '課堂期間付款', 
      icon: UserRound,
      disabled: false
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">
        {language === 'en' ? 'Select Payment Method' : '選擇付款方式'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {methods.map((method) => (
          <Card 
            key={method.id}
            className={`cursor-pointer hover:shadow-md transition-all ${
              method.disabled ? 'opacity-50 cursor-not-allowed' : ''
            } ${selectedMethod === method.id ? 'ring-2 ring-primary shadow-md' : ''}`}
            onClick={() => !method.disabled && onSelectMethod(method.id)}
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{method.name}</CardTitle>
                <method.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardDescription>{method.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              {selectedMethod === method.id && method.id === 'bank-transfer' && (
                <div className="space-y-4 mt-2">
                  <div className="bg-muted p-3 rounded-md text-sm">
                    <p className="font-medium">{language === 'en' ? 'Bank Account Details' : '銀行帳戶詳情'}:</p>
                    <p className="mt-1">Bank: NCKU Tricking Club</p>
                    <p>Account: 12345678901234</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {language === 'en' 
                        ? 'Please note your name + plan name in the transfer memo'
                        : '請在轉帳備註中註明您的姓名+方案名稱'}
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="transfer-digits" className="block text-sm mb-1">
                      {language === 'en' 
                        ? 'Last 5 digits of your transfer'
                        : '您轉帳的後5位數字'}:
                    </label>
                    <Input 
                      id="transfer-digits"
                      value={transferDigits}
                      onChange={(e) => onTransferDigitsChange(e.target.value)}
                      placeholder={language === 'en' ? "e.g. 12345" : "例如 12345"}
                      maxLength={5}
                      className="max-w-[200px]"
                    />
                  </div>
                </div>
              )}
              
              {selectedMethod === method.id && method.id === 'on-site' && (
                <div className="bg-muted p-3 rounded-md text-sm mt-2">
                  <p>
                    {language === 'en' 
                      ? 'You can pay during your next class. Your booking will be confirmed immediately.'
                      : '您可以在下次課堂期間付款。您的預訂將立即確認。'}
                  </p>
                </div>
              )}
            </CardContent>
            
            <CardFooter>
              {selectedMethod === method.id && (
                <div className="text-sm text-primary flex items-center">
                  <Check className="h-4 w-4 mr-1" />
                  {language === 'en' ? 'Selected' : '已選擇'}
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
