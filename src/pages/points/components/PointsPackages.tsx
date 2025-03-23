
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pointPackages } from '@/lib/data';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import PackageGrid from './PackageGrid';
import PaymentDialog from './PaymentDialog';
import { PointPackage } from '@/lib/data';
import { useAuth } from '@/contexts/auth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const PointsPackages = () => {
  const { language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [selectedPackage, setSelectedPackage] = useState<PointPackage | null>(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [transferCode, setTransferCode] = useState('');
  const [quantity, setQuantity] = useState(1);
  
  const handlePurchase = (pkg: PointPackage) => {
    if (!isAuthenticated) {
      toast({
        title: language === 'en' ? 'Login Required' : '需要登入',
        description: language === 'en' 
          ? 'Please login to purchase course cards.' 
          : '請登入以購買課程卡。',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }
    
    setSelectedPackage(pkg);
    setQuantity(1);
    setPaymentDialogOpen(true);
  };
  
  const handlePaymentComplete = () => {
    if (!selectedPackage || !paymentMethod) return;
    
    // For bank transfer, validate transfer code
    if (paymentMethod === 'bank_transfer' && !transferCode) {
      toast({
        title: language === 'en' ? 'Transfer Code Required' : '需要轉帳代碼',
        description: language === 'en' ? 'Please enter the last 5 digits of your transfer.' : '請輸入轉帳後5碼',
        variant: 'destructive',
      });
      return;
    }
    
    toast({
      title: language === 'en' ? 'Purchase Successful' : '購買成功',
      description: language === 'en' 
        ? `Your purchase is being processed. ${paymentMethod === 'on_site' ? 'Please pay at our next class.' : 'You can check your order status in your profile.'}` 
        : `您的購買正在處理中。${paymentMethod === 'on_site' ? '請在下一堂課時付款。' : '您可以在個人資料中查看訂單狀態。'}`,
    });
    
    setPaymentDialogOpen(false);
    setPaymentMethod('');
    setTransferCode('');
  };

  return (
    <Tabs defaultValue="beginner" className="max-w-4xl mx-auto">
      <div className="flex justify-center mb-8">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="beginner">
            {language === 'en' ? 'Beginner Cards' : '初學者課程卡'}
          </TabsTrigger>
          <TabsTrigger value="advanced">
            {language === 'en' ? 'Advanced Cards' : '進階課程卡'}
          </TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="beginner">
        <PackageGrid 
          packages={pointPackages.slice(0, 2)} 
          handlePurchase={handlePurchase}
        />
      </TabsContent>
      
      <TabsContent value="advanced">
        <PackageGrid 
          packages={pointPackages.slice(1)} 
          handlePurchase={handlePurchase}
          columnsCount={3}
        />
      </TabsContent>

      <PaymentDialog
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        selectedPackage={selectedPackage}
        paymentMethod={paymentMethod}
        onPaymentMethodChange={setPaymentMethod}
        transferCode={transferCode}
        onTransferCodeChange={setTransferCode}
        quantity={quantity}
        onQuantityChange={setQuantity}
        onPaymentComplete={handlePaymentComplete}
      />
    </Tabs>
  );
};

export default PointsPackages;
