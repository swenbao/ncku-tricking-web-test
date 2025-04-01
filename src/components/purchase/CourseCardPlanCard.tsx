
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, MinusCircle, PlusCircle } from "lucide-react";
import { CourseCardPlan, CourseCardType } from '@/lib/data';
import { useLanguage } from '@/contexts/LanguageContext';

interface CourseCardPlanCardProps {
  plan: CourseCardPlan;
  courseCardTypes: CourseCardType[];
  isSelected: boolean;
  onSelect: (planId: string) => void;
  onQuantityChange?: (planId: string, quantity: number) => void;
  quantity?: number;
}

const CourseCardPlanCard = ({ 
  plan, 
  courseCardTypes, 
  isSelected, 
  onSelect, 
  onQuantityChange,
  quantity = 1
}: CourseCardPlanCardProps) => {
  const { language } = useLanguage();
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  
  const cardType = courseCardTypes.find(type => type.id === plan.includedCards.type);
  
  const handleIncrement = () => {
    if (!plan.quantitySelectionAllowed) return;
    const newQuantity = currentQuantity + 1;
    setCurrentQuantity(newQuantity);
    if (onQuantityChange) {
      onQuantityChange(plan.id, newQuantity);
    }
  };
  
  const handleDecrement = () => {
    if (!plan.quantitySelectionAllowed || currentQuantity <= 1) return;
    const newQuantity = currentQuantity - 1;
    setCurrentQuantity(newQuantity);
    if (onQuantityChange) {
      onQuantityChange(plan.id, newQuantity);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!plan.quantitySelectionAllowed) return;
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setCurrentQuantity(value);
      if (onQuantityChange) {
        onQuantityChange(plan.id, value);
      }
    }
  };

  const translateCardType = (name: string): string => {
    const translations: Record<string, string> = {
      'Beginner Course Card': '初學者課程卡',
      'Advanced Course Card': '進階課程卡',
    };
    return language === 'en' ? name : translations[name] || name;
  };

  // Expiry date display
  const expiryDisplay = plan.expiryDate 
    ? (language === 'en' ? `Valid until ${plan.expiryDate}` : `有效期至 ${plan.expiryDate}`) 
    : (language === 'en' ? 'No expiration' : '永久有效');

  // Total price calculation
  const totalPrice = plan.price * currentQuantity;
  
  return (
    <Card 
      className={`relative overflow-hidden transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary shadow-md' : ''
      } ${plan.popular ? 'md:scale-105' : ''}`}
      onClick={() => onSelect(plan.id)}
    >
      {plan.popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-primary text-primary-foreground text-xs font-bold uppercase py-1 px-3">
            {language === 'en' ? 'Popular' : '熱門'}
          </div>
        </div>
      )}
      
      <CardHeader>
        <CardTitle>{language === 'en' ? plan.name : `${plan.difficultyLevel === 'Beginner' ? '初學者' : '進階'} ${plan.name.includes('Single') ? '單堂' : '學期'}`}</CardTitle>
        <CardDescription className="text-muted-foreground">{expiryDisplay}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="text-center">
          <span className="text-4xl font-bold">NT${plan.price}</span>
          {plan.quantitySelectionAllowed && (
            <div className="mt-4">
              <div className="flex items-center justify-center space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDecrement();
                  }}
                  disabled={currentQuantity <= 1}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  min="1"
                  value={currentQuantity}
                  onChange={handleInputChange}
                  onClick={(e) => e.stopPropagation()}
                  className="w-16 text-center"
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIncrement();
                  }}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 text-sm font-medium">
                {language === 'en' ? 'Total' : '總計'}: NT${totalPrice}
              </div>
            </div>
          )}
          
          <div className="mt-4 text-sm text-muted-foreground">
            <span className="font-medium">
              {language === 'en' ? 'Includes' : '包含'}: {plan.includedCards.quantity} x {cardType ? translateCardType(cardType.name) : ''}
            </span>
          </div>
          
          <div className="mt-4 text-sm">
            {language === 'en' ? plan.description : (
              plan.difficultyLevel === 'Beginner' 
                ? '適合初學者建立基礎的課程' 
                : '適合進階學習者的深入培訓'
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full"
          variant={isSelected ? "default" : "outline"}
        >
          {isSelected ? (
            <>
              <Check className="mr-2 h-4 w-4" /> {language === 'en' ? 'Selected' : '已選擇'}
            </>
          ) : (
            language === 'en' ? 'Select' : '選擇'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCardPlanCard;
