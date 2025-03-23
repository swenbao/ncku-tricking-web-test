
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PointPackage } from '@/lib/data';
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPackage: PointPackage | null;
  paymentMethod: string;
  onPaymentMethodChange: (value: string) => void;
  transferCode: string;
  onTransferCodeChange: (value: string) => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onPaymentComplete: () => void;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({
  open,
  onOpenChange,
  selectedPackage,
  paymentMethod,
  onPaymentMethodChange,
  transferCode,
  onTransferCodeChange,
  quantity,
  onQuantityChange,
  onPaymentComplete,
}) => {
  const { language } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                  onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
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
                  onClick={() => onQuantityChange(quantity + 1)}
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
                onValueChange={onPaymentMethodChange}
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
                    onChange={(e) => onTransferCodeChange(e.target.value)}
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
            onClick={() => onOpenChange(false)}
          >
            {language === 'en' ? 'Cancel' : '取消'}
          </Button>
          <Button 
            disabled={!paymentMethod || (paymentMethod === 'online')}
            onClick={onPaymentComplete}
          >
            {language === 'en' ? 'Complete Purchase' : '完成購買'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
