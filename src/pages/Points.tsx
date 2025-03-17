
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { pointPackages } from '@/lib/data';
import { Check, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

const PointsPage = () => {
  const [selectedPackage, setSelectedPackage] = useState(pointPackages[1].id);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const { toast } = useToast();

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulating purchase process
    toast({
      title: "Processing your payment...",
      description: "This will only take a moment.",
    });
    
    // Simulating a successful payment after 1.5 seconds
    setTimeout(() => {
      setPurchaseSuccess(true);
    }, 1500);
  };

  const handleDialogClose = () => {
    setPurchaseSuccess(false);
  };

  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Buy Points</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Purchase points to book classes at our tricking club.
            </p>
          </header>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {pointPackages.map((pkg) => (
                <Card 
                  key={pkg.id}
                  className={`relative overflow-hidden transition-all hover:shadow-md ${
                    selectedPackage === pkg.id ? 'ring-2 ring-accent shadow-md' : ''
                  } ${pkg.popular ? 'md:scale-105' : ''}`}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-accent text-accent-foreground text-xs font-bold uppercase py-1 px-3 transform rotate-0 origin-bottom-right">
                        Popular
                      </div>
                    </div>
                  )}
                  
                  <CardHeader>
                    <CardTitle>{pkg.name}</CardTitle>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="text-center">
                      <span className="text-4xl font-bold">NT${pkg.price.toLocaleString()}</span>
                      <div className="text-xl font-medium text-accent mt-2">
                        {pkg.points} Points
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        NT${(pkg.price / pkg.points).toFixed(0)} per point
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className="w-full"
                      variant={selectedPackage === pkg.id ? "default" : "outline"}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      {selectedPackage === pkg.id ? (
                        <>
                          <Check className="mr-2 h-4 w-4" /> Selected
                        </>
                      ) : (
                        'Select Package'
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="bg-muted/50 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Info className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">How Points Work</h3>
                  <p className="text-muted-foreground">
                    Points are used to book classes at our tricking club. Different classes require different numbers of points. Once purchased, points do not expire and can be used for any bookable class.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white shadow-sm border border-border rounded-xl overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold">Checkout</h2>
              </div>
              
              <form onSubmit={handlePurchase}>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                  
                  <Tabs defaultValue="credit" value={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="credit">Credit Card</TabsTrigger>
                      <TabsTrigger value="transfer">Bank Transfer</TabsTrigger>
                      <TabsTrigger value="line">Line Pay</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="credit" className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input id="card-number" placeholder="xxxx xxxx xxxx xxxx" />
                        </div>
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div>
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="xxx" />
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor="name">Cardholder Name</Label>
                          <Input id="name" placeholder="Name as it appears on card" />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="transfer" className="space-y-4 mt-4">
                      <div className="border rounded-md p-4 bg-muted/30">
                        <h4 className="font-medium mb-2">Bank Transfer Instructions</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Please transfer the exact amount to the following account:
                        </p>
                        <div className="text-sm">
                          <p>Bank: Taiwan Tricking Bank</p>
                          <p>Account: 12345678901234</p>
                          <p>Name: Tricktopia Club</p>
                          <p className="mt-2">
                            After making the transfer, please enter the transaction reference below.
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="reference">Transaction Reference</Label>
                        <Input id="reference" placeholder="Enter bank transaction reference" />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="line" className="space-y-4 mt-4">
                      <div className="text-center p-6 border rounded-md bg-muted/30">
                        <div className="w-32 h-32 mx-auto bg-muted flex items-center justify-center mb-4 rounded-md">
                          <span className="text-muted-foreground">QR Code</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Scan this QR code with your Line Pay app to complete the payment.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                
                <div className="bg-muted/20 border-t p-6">
                  <div className="flex justify-between mb-2">
                    <span>Package</span>
                    <span className="font-medium">
                      {pointPackages.find(pkg => pkg.id === selectedPackage)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span>Points</span>
                    <span className="font-medium">
                      {pointPackages.find(pkg => pkg.id === selectedPackage)?.points} Points
                    </span>
                  </div>
                  
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-lg font-bold">
                        NT${pointPackages.find(pkg => pkg.id === selectedPackage)?.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" size="lg">
                    Complete Purchase
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Success Dialog */}
      <Dialog open={purchaseSuccess} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Successful!</DialogTitle>
            <DialogDescription>
              Your points have been added to your account and are ready to use.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center justify-center py-6">
            <div className="bg-accent/10 rounded-full p-3">
              <Check className="h-6 w-6 text-accent" />
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-md p-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Package</span>
              <span className="font-medium">
                {pointPackages.find(pkg => pkg.id === selectedPackage)?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Points Added</span>
              <span className="font-medium">
                {pointPackages.find(pkg => pkg.id === selectedPackage)?.points} Points
              </span>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-start">
            <Button type="button" onClick={handleDialogClose}>
              Close
            </Button>
            <Button type="button" variant="outline" asChild>
              <a href="/booking">Book a Class</a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PointsPage;
