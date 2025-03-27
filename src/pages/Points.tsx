
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

type CourseType = 'introductory' | 'advanced' | null;
type CourseCard = {
  id: string;
  name: string;
  price: number;
  description: string;
  validity: string;
  popular?: boolean;
};

const PointsPage = () => {
  const [courseType, setCourseType] = useState<CourseType>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Course card data
  const introductoryCourseCards: CourseCard[] = [
    {
      id: 'intro-single',
      name: 'Single Session',
      price: 30,
      description: 'Access to a single introductory class',
      validity: 'No expiration',
    },
    {
      id: 'intro-semester',
      name: 'Full Semester',
      price: 250,
      description: 'Access to all introductory classes for a semester',
      validity: 'Valid for 6 months',
      popular: true,
    },
  ];

  const advancedCourseCards: CourseCard[] = [
    {
      id: 'adv-single',
      name: 'Single Session',
      price: 50,
      description: 'Access to a single advanced class',
      validity: 'No expiration',
    },
    {
      id: 'adv-semester-1',
      name: 'Semester (1 Class/Week)',
      price: 600,
      description: 'Access to 1 advanced class per week',
      validity: 'Valid for 6 months',
    },
    {
      id: 'adv-semester-2',
      name: 'Semester (2 Classes/Week)',
      price: 650,
      description: 'Access to 2 advanced classes per week',
      validity: 'Valid for 6 months',
      popular: true,
    },
    {
      id: 'adv-semester-3',
      name: 'Semester (3 Classes/Week)',
      price: 700,
      description: 'Access to 3 advanced classes per week',
      validity: 'Valid for 6 months',
    },
  ];

  // Function to handle course type selection
  const handleCourseTypeSelect = (type: CourseType) => {
    setCourseType(type);
    setSelectedCard(null);
  };

  // Function to handle card selection
  const handleCardSelect = (cardId: string) => {
    setSelectedCard(cardId);
  };

  // Go back to course type selection
  const handleBackToTypes = () => {
    setCourseType(null);
    setSelectedCard(null);
  };

  // Simulate purchase process
  const handlePurchase = () => {
    if (!selectedCard) return;
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to purchase a course card.",
        variant: "destructive",
      });
      
      // Redirect to login page
      navigate('/login');
      return;
    }
    
    // Get selected card details
    const cardList = courseType === 'introductory' ? introductoryCourseCards : advancedCourseCards;
    const card = cardList.find(c => c.id === selectedCard);
    
    if (!card) return;
    
    toast({
      title: "Processing your payment...",
      description: "This will only take a moment.",
    });
    
    // Simulate a successful payment after 1.5 seconds
    setTimeout(() => {
      setPurchaseSuccess(true);
    }, 1500);
  };

  // Close success dialog
  const handleDialogClose = () => {
    setPurchaseSuccess(false);
    setCourseType(null);
    setSelectedCard(null);
  };

  // Get the current selected card
  const getCurrentCard = (): CourseCard | undefined => {
    if (!selectedCard) return undefined;
    
    const cardList = courseType === 'introductory' ? introductoryCourseCards : advancedCourseCards;
    return cardList.find(c => c.id === selectedCard);
  };

  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {courseType === null ? 
                "Course Cards" : 
                courseType === 'introductory' ? "Introductory Course Cards" : "Advanced Course Cards"}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {courseType === null ? 
                "Choose the type of tricking course you're interested in" : 
                "Select a course card option that fits your needs"}
            </p>
          </header>
          
          {courseType === null ? (
            // Initial course type selection
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card 
                className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/50"
                onClick={() => handleCourseTypeSelect('introductory')}
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl">Introductory Course Cards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40 bg-gradient-to-br from-red-900/50 to-red-700/50 dark:from-red-900/50 dark:to-red-800/50 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl font-semibold">For Beginners</span>
                  </div>
                  <p className="text-muted-foreground">Perfect for those starting their tricking journey</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Explore Introductory Options</Button>
                </CardFooter>
              </Card>
              
              <Card 
                className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/50"
                onClick={() => handleCourseTypeSelect('advanced')}
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl">Advanced Course Cards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40 bg-gradient-to-br from-red-900/50 to-red-700/50 dark:from-red-900/50 dark:to-red-800/50 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl font-semibold">For Experienced Trickers</span>
                  </div>
                  <p className="text-muted-foreground">Take your skills to the next level</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Explore Advanced Options</Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            // Course cards display
            <div className="max-w-5xl mx-auto">
              <Button 
                variant="ghost" 
                onClick={handleBackToTypes} 
                className="mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Selection
              </Button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {(courseType === 'introductory' ? introductoryCourseCards : advancedCourseCards).map((card) => (
                  <Card 
                    key={card.id}
                    className={`relative overflow-hidden transition-all hover:shadow-md ${
                      selectedCard === card.id ? 'ring-2 ring-accent shadow-md' : ''
                    } ${card.popular ? 'md:scale-105' : ''}`}
                    onClick={() => handleCardSelect(card.id)}
                  >
                    {card.popular && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-accent text-accent-foreground text-xs font-bold uppercase py-1 px-3 transform rotate-0 origin-bottom-right">
                          Popular
                        </div>
                      </div>
                    )}
                    
                    <CardHeader>
                      <CardTitle>{card.name}</CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="text-center">
                        <span className="text-4xl font-bold">NT${card.price}</span>
                        <div className="text-sm text-muted-foreground mt-2">
                          {card.description}
                        </div>
                        <div className="text-sm font-medium mt-2">
                          {card.validity}
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        className="w-full"
                        variant={selectedCard === card.id ? "default" : "outline"}
                      >
                        {selectedCard === card.id ? (
                          <>
                            <Check className="mr-2 h-4 w-4" /> Selected
                          </>
                        ) : (
                          'Select'
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {selectedCard && (
                <div className="mt-8 text-center">
                  <Button 
                    size="lg" 
                    className="px-8"
                    onClick={handlePurchase}
                  >
                    Purchase Card
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      
      {/* Success Dialog */}
      <Dialog open={purchaseSuccess} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Purchase Successful!</DialogTitle>
            <DialogDescription>
              Your course card has been added to your account and is ready to use.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center justify-center py-6">
            <div className="bg-accent/10 rounded-full p-3">
              <Check className="h-6 w-6 text-accent" />
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-md p-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Course Card</span>
              <span className="font-medium">
                {getCurrentCard()?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Price</span>
              <span className="font-medium">
                NT${getCurrentCard()?.price}
              </span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-muted-foreground">Validity</span>
              <span className="font-medium">
                {getCurrentCard()?.validity}
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
