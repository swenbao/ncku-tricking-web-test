
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { pointPackages, PointPackage } from '@/lib/data';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const CourseCardsPage = () => {
  const { isAuthenticated, user } = useAuth();
  const { language } = useLanguage();
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
    <div className="page-transition min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {language === 'en' ? 'Course Cards' : '課程卡'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'en' 
                ? 'Purchase course cards to book classes and track your progress.' 
                : '購買課程卡以預約課程並追蹤您的進度。'}
            </p>
          </header>
          
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
              <div className="grid gap-8 md:grid-cols-2">
                {pointPackages.slice(0, 2).map((pkg) => (
                  <Card 
                    key={pkg.id} 
                    className={`relative overflow-hidden ${pkg.popular ? 'border-2 border-accent' : ''}`}
                  >
                    {pkg.popular && (
                      <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3">
                        <Badge className="bg-accent text-accent-foreground">
                          {language === 'en' ? 'Popular' : '熱門'}
                        </Badge>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{pkg.name}</CardTitle>
                      <CardDescription>{pkg.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="text-center">
                        <span className="text-4xl font-bold">${pkg.price}</span>
                        <span className="text-muted-foreground ml-1">NTD</span>
                      </div>
                      
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span>
                            {language === 'en' 
                              ? `${pkg.points} points` 
                              : `${pkg.points} 點數`}
                          </span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span>
                            {language === 'en' 
                              ? 'Valid for 6 months' 
                              : '有效期限：6個月'}
                          </span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span>
                            {language === 'en' 
                              ? 'Access to beginner classes' 
                              : '可參加初學者課程'}
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        onClick={() => handlePurchase(pkg)}
                      >
                        {language === 'en' ? 'Purchase' : '購買'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="advanced">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {pointPackages.slice(1).map((pkg) => (
                  <Card 
                    key={pkg.id} 
                    className={`relative overflow-hidden ${pkg.popular ? 'border-2 border-accent' : ''}`}
                  >
                    {pkg.popular && (
                      <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3">
                        <Badge className="bg-accent text-accent-foreground">
                          {language === 'en' ? 'Popular' : '熱門'}
                        </Badge>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{pkg.name}</CardTitle>
                      <CardDescription>{pkg.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="text-center">
                        <span className="text-4xl font-bold">${pkg.price}</span>
                        <span className="text-muted-foreground ml-1">NTD</span>
                      </div>
                      
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span>
                            {language === 'en' 
                              ? `${pkg.points} points` 
                              : `${pkg.points} 點數`}
                          </span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span>
                            {language === 'en' 
                              ? 'Valid for 6 months' 
                              : '有效期限：6個月'}
                          </span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span>
                            {language === 'en' 
                              ? 'Access to all class types' 
                              : '可參加所有類型課程'}
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        onClick={() => handlePurchase(pkg)}
                      >
                        {language === 'en' ? 'Purchase' : '購買'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Additional info section */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {language === 'en' ? 'Frequently Asked Questions' : '常見問題'}
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  {language === 'en' ? 'How do course cards work?' : '課程卡如何運作？'}
                </h3>
                <p className="text-muted-foreground">
                  {language === 'en' 
                    ? 'Course cards allow you to book classes. Each class costs a specific number of points from your card balance. You can view your balance in your profile.' 
                    : '課程卡允許您預約課程。每堂課都需要消耗特定數量的點數。您可以在個人資料頁面查看您的點數餘額。'}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">
                  {language === 'en' ? 'What\'s the difference between beginner and advanced cards?' : '初學者卡和進階卡有什麼區別？'}
                </h3>
                <p className="text-muted-foreground">
                  {language === 'en' 
                    ? 'Beginner cards can only be used for beginner level classes, while advanced cards can be used for all class types including advanced techniques.' 
                    : '初學者卡只能用於初學者課程，而進階卡可用於所有類型的課程，包括進階技術。'}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">
                  {language === 'en' ? 'How do I use my course card?' : '如何使用我的課程卡？'}
                </h3>
                <p className="text-muted-foreground">
                  {language === 'en' 
                    ? 'After purchasing a course card, you can immediately book classes through the booking page. The system will automatically deduct points when you book a class.' 
                    : '購買課程卡後，您可以立即通過預約頁面預約課程。系統會在您預約課程時自動扣除點數。'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Payment Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {language === 'en' ? 'Complete Your Purchase' : '完成您的購買'}
            </DialogTitle>
            <DialogDescription>
              {language === 'en' 
                ? 'Select your preferred payment method and quantity.' 
                : '選擇您偏好的付款方式和數量。'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPackage && (
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-medium">{selectedPackage.name}</h3>
                  <div className="text-xl font-bold">${selectedPackage.price}</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedPackage.description}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity">
                  {language === 'en' ? 'Quantity' : '數量'}
                </Label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <div className="flex-1 text-center font-medium">
                    {quantity}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="payment-method">
                  {language === 'en' ? 'Payment Method' : '付款方式'}
                </Label>
                <Select
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                >
                  <SelectTrigger id="payment-method">
                    <SelectValue placeholder={language === 'en' ? 'Select payment method' : '選擇付款方式'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">
                      {language === 'en' ? 'Online Payment (coming soon)' : '線上支付（即將推出）'}
                    </SelectItem>
                    <SelectItem value="bank_transfer">
                      {language === 'en' ? 'Bank Transfer' : '銀行轉帳'}
                    </SelectItem>
                    <SelectItem value="on_site">
                      {language === 'en' ? 'On-site Payment' : '現場付款'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {paymentMethod === 'bank_transfer' && (
                <div className="space-y-4 border border-border rounded-md p-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">
                      {language === 'en' ? 'Bank Transfer Information' : '銀行轉帳資訊'}
                    </h4>
                    <div className="text-sm">
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">
                          {language === 'en' ? 'Bank Name:' : '銀行名稱：'}
                        </span>
                        <span className="font-medium">Taiwan First Bank</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">
                          {language === 'en' ? 'Account Number:' : '帳號：'}
                        </span>
                        <span className="font-medium">01234-5678901234</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">
                          {language === 'en' ? 'Account Name:' : '戶名：'}
                        </span>
                        <span className="font-medium">NCKU Tricking Club</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="transfer-code">
                      {language === 'en' ? 'Last 5 digits of your transfer' : '您的轉帳後五碼'}
                    </Label>
                    <Input
                      id="transfer-code"
                      placeholder="e.g. 12345"
                      value={transferCode}
                      onChange={(e) => setTransferCode(e.target.value)}
                    />
                  </div>
                </div>
              )}
              
              {paymentMethod === 'online' && (
                <div className="border border-border rounded-md p-4 text-center">
                  <p className="text-muted-foreground">
                    {language === 'en' 
                      ? 'Online payment integration is coming soon.' 
                      : '線上支付功能即將推出。'}
                  </p>
                </div>
              )}
              
              {paymentMethod === 'on_site' && (
                <div className="border border-border rounded-md p-4 text-center">
                  <p className="text-muted-foreground">
                    {language === 'en' 
                      ? 'You can pay at our next class session. Please show your order to the instructor.' 
                      : '您可以在下一堂課時付款。請向教練出示您的訂單。'}
                  </p>
                </div>
              )}
              
              <div className="pt-2 border-t border-border">
                <div className="flex justify-between text-lg font-bold">
                  <span>{language === 'en' ? 'Total:' : '總計：'}</span>
                  <span>${selectedPackage.price * quantity} NTD</span>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-2">
            <Button 
              variant="outline" 
              onClick={() => setPaymentDialogOpen(false)}
            >
              {language === 'en' ? 'Cancel' : '取消'}
            </Button>
            <Button 
              disabled={!paymentMethod || (paymentMethod === 'online')}
              onClick={handlePaymentComplete}
            >
              {language === 'en' ? 'Complete Purchase' : '完成購買'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseCardsPage;
