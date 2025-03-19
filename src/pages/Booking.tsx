
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { classSchedule } from '@/lib/data';
import { 
  CalendarIcon, 
  Clock, 
  Users, 
  ChevronRight, 
  AlertCircle, 
  CreditCard, 
  CheckCircle2,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { format, addDays, isSameDay, isAfter, isBefore } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

// Steps in the booking process
type BookingStep = 'date' | 'class' | 'confirm' | 'complete';

const BookingPage = () => {
  // State for each step in the booking process
  const [currentStep, setCurrentStep] = useState<BookingStep>('date');
  const [date, setDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const { toast } = useToast();
  
  // Mock user points data
  const userPoints = 15;
  
  // Filter classes available on the selected day
  const availableClasses = React.useMemo(() => {
    const dayName = format(date, 'EEEE');
    return classSchedule.find(day => day.day === dayName)?.sessions || [];
  }, [date]);
  
  // Calculate dates where classes are available (for highlighting in calendar)
  const availableDates = React.useMemo(() => {
    const dates: Date[] = [];
    const today = new Date();
    const nextFourWeeks = addDays(today, 28);
    
    // Find all the class days in the next 4 weeks
    for (let i = 0; i < 28; i++) {
      const currentDate = addDays(today, i);
      const dayName = format(currentDate, 'EEEE');
      
      // Check if there are classes on this day of the week
      if (classSchedule.some(day => day.day === dayName)) {
        dates.push(currentDate);
      }
    }
    
    return dates;
  }, []);
  
  // Handle class selection
  const handleSelectClass = (classItem: any) => {
    if (userPoints < classItem.pointsCost) {
      toast({
        title: "Insufficient Points",
        description: "You don't have enough points to book this class.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedClass(classItem);
    setCurrentStep('confirm');
  };
  
  // Process booking
  const processBooking = () => {
    // Here you would handle the actual booking process
    setCurrentStep('complete');
    setBookingSuccess(true);
  };
  
  // Navigate to previous step
  const goToPreviousStep = () => {
    switch (currentStep) {
      case 'class':
        setCurrentStep('date');
        break;
      case 'confirm':
        setCurrentStep('class');
        break;
      default:
        break;
    }
  };
  
  // Navigate to next step
  const goToNextStep = () => {
    switch (currentStep) {
      case 'date':
        setCurrentStep('class');
        break;
      case 'class':
        if (selectedClass) {
          setCurrentStep('confirm');
        } else {
          toast({
            title: "Please Select a Class",
            description: "You need to select a class before proceeding.",
            variant: "destructive",
          });
        }
        break;
      default:
        break;
    }
  };
  
  // Reset booking process
  const resetBooking = () => {
    setCurrentStep('date');
    setSelectedClass(null);
    setBookingSuccess(false);
  };
  
  return (
    <div className="page-transition min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {['date', 'class', 'confirm', 'complete'].map((step, index) => (
                  <div key={step} className="flex flex-col items-center w-1/4">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center mb-2 text-sm font-medium transition-colors",
                      currentStep === step 
                        ? "bg-primary text-primary-foreground" 
                        : currentStep === 'complete' || (index < ['date', 'class', 'confirm', 'complete'].indexOf(currentStep))
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-500"
                    )}>
                      {currentStep === 'complete' || (index < ['date', 'class', 'confirm', 'complete'].indexOf(currentStep)) 
                        ? <CheckCircle2 className="h-5 w-5" /> 
                        : index + 1}
                    </div>
                    <span className={cn(
                      "text-xs font-medium text-center",
                      currentStep === step ? "text-primary" : "text-gray-500"
                    )}>
                      {step === 'date' && "Select Date"}
                      {step === 'class' && "Choose Class"}
                      {step === 'confirm' && "Confirm"}
                      {step === 'complete' && "Complete"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <div className="h-1 bg-green-500 rounded"></div>
                <div className={cn("h-1 rounded", currentStep === 'date' ? "bg-gray-200" : "bg-green-500")}></div>
                <div className={cn("h-1 rounded", currentStep === 'date' || currentStep === 'class' ? "bg-gray-200" : "bg-green-500")}></div>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Step 1: Date Selection */}
              {currentStep === 'date' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Select a Date</h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="mb-4">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              size="lg"
                              className={cn(
                                "w-full justify-start text-left font-normal h-14",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-5 w-5" />
                              {date ? format(date, "EEEE, MMMM d, yyyy") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={(newDate) => newDate && setDate(newDate)}
                              disabled={(date) => {
                                // Disable dates in the past
                                if (isBefore(date, new Date())) return true;
                                
                                // Disable dates more than 4 weeks in the future
                                if (isAfter(date, addDays(new Date(), 28))) return true;
                                
                                // Only enable dates where classes are available
                                return !availableDates.some(availableDate => 
                                  isSameDay(date, availableDate)
                                );
                              }}
                              initialFocus
                              className="p-3 pointer-events-auto"
                              modifiers={{
                                highlighted: availableDates
                              }}
                              modifiersClassNames={{
                                highlighted: "bg-accent/20",
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-800 mb-1">
                              Available Class Days
                            </p>
                            <div className="text-sm text-blue-700 flex flex-wrap gap-2">
                              {[...new Set(classSchedule.map(day => day.day))].map((day, index) => (
                                <Badge key={index} variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                                  {day}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Your Selected Date</h3>
                      <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 text-center">
                        <div className="flex flex-col items-center">
                          <div className="bg-primary/10 rounded-full p-3 mb-4">
                            <CalendarIcon className="h-8 w-8 text-primary" />
                          </div>
                          <h4 className="text-2xl font-bold mb-1">{format(date, 'EEEE')}</h4>
                          <p className="text-lg text-gray-600">{format(date, 'MMMM d, yyyy')}</p>
                          
                          <div className="mt-6 w-full">
                            <Badge className="w-full py-2 text-center justify-center text-sm bg-green-500 hover:bg-green-600">
                              {availableClasses.length} Classes Available
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">Your Points</h4>
                            <p className="text-2xl font-bold">{userPoints}</p>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href="/points">Buy More</a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 2: Class Selection */}
              {currentStep === 'class' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">Select a Class</h2>
                  <p className="text-gray-500 mb-6">
                    Classes available on {format(date, 'EEEE, MMMM d, yyyy')}
                  </p>
                  
                  <Tabs defaultValue="all" className="mb-6">
                    <TabsList className="mb-4">
                      <TabsTrigger value="all" className="text-sm">All Classes</TabsTrigger>
                      <TabsTrigger value="beginner" className="text-sm">Beginner</TabsTrigger>
                      <TabsTrigger value="advanced" className="text-sm">Advanced</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all" className="space-y-4">
                      {availableClasses.length > 0 ? (
                        availableClasses.map((session, index) => (
                          <Card 
                            key={index}
                            className={cn(
                              "border-2 transition-all cursor-pointer hover:bg-gray-50",
                              selectedClass === session ? "border-primary" : "border-transparent"
                            )}
                            onClick={() => handleSelectClass(session)}
                          >
                            <CardContent className="p-0">
                              <div className="flex flex-col md:flex-row">
                                <div className={cn(
                                  "p-5 flex flex-col justify-center items-center md:w-1/4 text-white",
                                  session.level === 'Beginner' ? "bg-blue-500" : "bg-purple-600"
                                )}>
                                  <Badge className="mb-2 bg-white/20 hover:bg-white/30 border-none">
                                    {session.level}
                                  </Badge>
                                  <p className="text-xl font-bold">{session.time}</p>
                                  <div className="flex items-center text-white/90 text-sm mt-1">
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>{session.time.split('-')[1].substring(0, 2) - session.time.split('-')[0].substring(0, 2)} hours</span>
                                  </div>
                                </div>
                                
                                <div className="p-5 flex-1">
                                  <div className="flex flex-col md:flex-row justify-between mb-3">
                                    <div>
                                      <h3 className="text-xl font-bold">{session.name}</h3>
                                      <p className="text-gray-500">{session.description}</p>
                                    </div>
                                    <div className="mt-2 md:mt-0 flex items-start">
                                      <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                                        <CreditCard className="h-3 w-3 mr-1" />
                                        {session.pointsCost} points
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex flex-wrap gap-3 items-center">
                                    <div className="flex items-center text-gray-600 text-sm">
                                      <Users className="h-4 w-4 mr-1" />
                                      <span>10 spots available</span>
                                    </div>
                                    
                                    {userPoints < session.pointsCost ? (
                                      <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                                        Insufficient Points
                                      </Badge>
                                    ) : (
                                      <Badge 
                                        variant="outline" 
                                        className={cn(
                                          "transition-colors",
                                          selectedClass === session 
                                            ? "bg-green-100 text-green-800 border-green-200" 
                                            : "bg-gray-100 text-gray-800"
                                        )}
                                      >
                                        {selectedClass === session ? "Selected" : "Available"}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 text-center">
                          <h3 className="text-lg font-medium mb-2">No Classes Available</h3>
                          <p className="text-gray-500 mb-4">
                            There are no classes scheduled for this date. Please select another date.
                          </p>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="beginner" className="space-y-4">
                      {availableClasses.filter(c => c.level === 'Beginner').length > 0 ? (
                        availableClasses.filter(c => c.level === 'Beginner').map((session, index) => (
                          <Card 
                            key={index}
                            className={cn(
                              "border-2 transition-all cursor-pointer hover:bg-gray-50",
                              selectedClass === session ? "border-primary" : "border-transparent"
                            )}
                            onClick={() => handleSelectClass(session)}
                          >
                            {/* Same card content as above, but for beginner classes */}
                            <CardContent className="p-0">
                              <div className="flex flex-col md:flex-row">
                                <div className="p-5 flex flex-col justify-center items-center md:w-1/4 text-white bg-blue-500">
                                  <Badge className="mb-2 bg-white/20 hover:bg-white/30 border-none">
                                    {session.level}
                                  </Badge>
                                  <p className="text-xl font-bold">{session.time}</p>
                                  <div className="flex items-center text-white/90 text-sm mt-1">
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>{session.time.split('-')[1].substring(0, 2) - session.time.split('-')[0].substring(0, 2)} hours</span>
                                  </div>
                                </div>
                                
                                <div className="p-5 flex-1">
                                  <div className="flex flex-col md:flex-row justify-between mb-3">
                                    <div>
                                      <h3 className="text-xl font-bold">{session.name}</h3>
                                      <p className="text-gray-500">{session.description}</p>
                                    </div>
                                    <div className="mt-2 md:mt-0 flex items-start">
                                      <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                                        <CreditCard className="h-3 w-3 mr-1" />
                                        {session.pointsCost} points
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex flex-wrap gap-3 items-center">
                                    <div className="flex items-center text-gray-600 text-sm">
                                      <Users className="h-4 w-4 mr-1" />
                                      <span>10 spots available</span>
                                    </div>
                                    
                                    {userPoints < session.pointsCost ? (
                                      <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                                        Insufficient Points
                                      </Badge>
                                    ) : (
                                      <Badge 
                                        variant="outline" 
                                        className={cn(
                                          "transition-colors",
                                          selectedClass === session 
                                            ? "bg-green-100 text-green-800 border-green-200" 
                                            : "bg-gray-100 text-gray-800"
                                        )}
                                      >
                                        {selectedClass === session ? "Selected" : "Available"}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 text-center">
                          <h3 className="text-lg font-medium mb-2">No Beginner Classes</h3>
                          <p className="text-gray-500">
                            There are no beginner classes scheduled for this date.
                          </p>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="advanced" className="space-y-4">
                      {availableClasses.filter(c => c.level === 'Advanced').length > 0 ? (
                        availableClasses.filter(c => c.level === 'Advanced').map((session, index) => (
                          <Card 
                            key={index}
                            className={cn(
                              "border-2 transition-all cursor-pointer hover:bg-gray-50",
                              selectedClass === session ? "border-primary" : "border-transparent"
                            )}
                            onClick={() => handleSelectClass(session)}
                          >
                            {/* Same card content as above, but for advanced classes */}
                            <CardContent className="p-0">
                              <div className="flex flex-col md:flex-row">
                                <div className="p-5 flex flex-col justify-center items-center md:w-1/4 text-white bg-purple-600">
                                  <Badge className="mb-2 bg-white/20 hover:bg-white/30 border-none">
                                    {session.level}
                                  </Badge>
                                  <p className="text-xl font-bold">{session.time}</p>
                                  <div className="flex items-center text-white/90 text-sm mt-1">
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>{session.time.split('-')[1].substring(0, 2) - session.time.split('-')[0].substring(0, 2)} hours</span>
                                  </div>
                                </div>
                                
                                <div className="p-5 flex-1">
                                  <div className="flex flex-col md:flex-row justify-between mb-3">
                                    <div>
                                      <h3 className="text-xl font-bold">{session.name}</h3>
                                      <p className="text-gray-500">{session.description}</p>
                                    </div>
                                    <div className="mt-2 md:mt-0 flex items-start">
                                      <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                                        <CreditCard className="h-3 w-3 mr-1" />
                                        {session.pointsCost} points
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex flex-wrap gap-3 items-center">
                                    <div className="flex items-center text-gray-600 text-sm">
                                      <Users className="h-4 w-4 mr-1" />
                                      <span>10 spots available</span>
                                    </div>
                                    
                                    {userPoints < session.pointsCost ? (
                                      <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                                        Insufficient Points
                                      </Badge>
                                    ) : (
                                      <Badge 
                                        variant="outline" 
                                        className={cn(
                                          "transition-colors",
                                          selectedClass === session 
                                            ? "bg-green-100 text-green-800 border-green-200" 
                                            : "bg-gray-100 text-gray-800"
                                        )}
                                      >
                                        {selectedClass === session ? "Selected" : "Available"}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 text-center">
                          <h3 className="text-lg font-medium mb-2">No Advanced Classes</h3>
                          <p className="text-gray-500">
                            There are no advanced classes scheduled for this date.
                          </p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              )}
              
              {/* Step 3: Confirmation */}
              {currentStep === 'confirm' && selectedClass && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Confirm Your Booking</h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                        <h3 className="text-lg font-bold mb-4">Class Details</h3>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Class</span>
                            <span className="font-medium">{selectedClass.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Date</span>
                            <span className="font-medium">{format(date, 'EEEE, MMMM d, yyyy')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Time</span>
                            <span className="font-medium">{selectedClass.time}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duration</span>
                            <span className="font-medium">{selectedClass.time.split('-')[1].substring(0, 2) - selectedClass.time.split('-')[0].substring(0, 2)} hours</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Level</span>
                            <span className="font-medium">{selectedClass.level}</span>
                          </div>
                          <div className="border-t pt-3 mt-3">
                            <div className="flex justify-between font-medium">
                              <span>Point Cost</span>
                              <span>{selectedClass.pointsCost} points</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 mb-4">
                        <h3 className="text-lg font-bold mb-4">Your Points</h3>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between text-lg">
                            <span className="text-gray-600">Current Balance</span>
                            <span className="font-medium">{userPoints} points</span>
                          </div>
                          <div className="flex justify-between text-lg text-red-600">
                            <span>Cost</span>
                            <span>-{selectedClass.pointsCost} points</span>
                          </div>
                          <div className="border-t pt-3 mt-3">
                            <div className="flex justify-between font-bold text-lg">
                              <span>Remaining Balance</span>
                              <span>{userPoints - selectedClass.pointsCost} points</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100 mb-6">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-yellow-800 mb-1">
                              Important Information
                            </p>
                            <p className="text-sm text-yellow-700">
                              Please arrive 10 minutes before class starts. Wear comfortable clothing and bring water.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full h-14 text-lg" 
                        onClick={processBooking}
                      >
                        Confirm Booking
                        <ChevronRight className="ml-1 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 4: Booking Complete */}
              {currentStep === 'complete' && selectedClass && (
                <div className="p-6 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-green-100 p-3">
                      <CheckCircle2 className="h-16 w-16 text-green-600" />
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-2">Booking Successful!</h2>
                  <p className="text-gray-500 mb-8">
                    Your class has been booked successfully. We look forward to seeing you!
                  </p>
                  
                  <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-6 border border-gray-100 mb-8">
                    <h3 className="text-lg font-bold mb-4 text-left">Booking Details</h3>
                    
                    <div className="space-y-4 text-left">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Class</span>
                        <span className="font-medium">{selectedClass.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date</span>
                        <span className="font-medium">{format(date, 'EEEE, MMMM d, yyyy')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time</span>
                        <span className="font-medium">{selectedClass.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location</span>
                        <span className="font-medium">Tricking Club, Studio 3</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      variant="outline" 
                      className="flex-1 max-w-xs" 
                      onClick={resetBooking}
                    >
                      Book Another Class
                    </Button>
                    <Button 
                      className="flex-1 max-w-xs" 
                      asChild
                    >
                      <a href="/profile">View My Bookings</a>
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Navigation Footer */}
              {currentStep !== 'complete' && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between">
                  {currentStep !== 'date' ? (
                    <Button
                      variant="outline"
                      onClick={goToPreviousStep}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  
                  {currentStep !== 'confirm' && (
                    <Button
                      onClick={goToNextStep}
                    >
                      {currentStep === 'date' ? 'Select Class' : 'Continue'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingPage;
