import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { classSchedule } from '@/lib/data';
import { 
  CalendarIcon, 
  Clock, 
  Users, 
  ChevronRight, 
  AlertCircle, 
  BookOpen, 
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Flame,
  FlipHorizontal,
  Dumbbell,
  ArrowDown,
  ArrowRight as ArrowRightIcon,
  ArrowUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { format, addDays, isSameDay, isAfter, isBefore, parseISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

// Steps in the booking process
type BookingStep = 'type' | 'difficulty' | 'schedule' | 'confirm' | 'complete';

// Enhanced class types definitions - updated to remove gymnastics and specialization
const classTypes = [
  {
    id: 'tricking',
    name: 'Tricking',
    icon: <Flame className="h-5 w-5" />,
    color: 'bg-orange-800/70 text-orange-200',
    description: 'Learn martial arts-inspired acrobatic movements and combinations.'
  },
  {
    id: 'flip',
    name: 'Flip',
    icon: <FlipHorizontal className="h-5 w-5" />,
    color: 'bg-purple-800/70 text-purple-200',
    description: 'Master various flipping techniques both on ground and with trampolines.'
  },
  {
    id: 'kicking',
    name: 'Kicking',
    icon: <Dumbbell className="h-5 w-5" />,
    color: 'bg-blue-800/70 text-blue-200',
    description: 'Build strength and technique with advanced kicking training.'
  }
];

// Difficulty levels
const difficultyLevels = [
  {
    id: 'beginner',
    name: 'Beginner',
    icon: <ArrowDown className="h-5 w-5" />,
    color: 'bg-green-800/70 text-green-200',
    description: 'For those new to tricking or with minimal experience.'
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    icon: <ArrowRightIcon className="h-5 w-5" />,
    color: 'bg-yellow-800/70 text-yellow-200',
    description: 'For those with basic knowledge who want to build on their skills.'
  },
  {
    id: 'advanced',
    name: 'Advanced',
    icon: <ArrowUp className="h-5 w-5" />,
    color: 'bg-red-800/70 text-red-200',
    description: 'For experienced trickers looking to master complex techniques.'
  },
];

// Updated class data to match the four specified classes
const enhancedClassData = [
  {
    id: '1',
    type: 'tricking',
    difficulty: 'beginner',
    day: 'Friday',
    time: '19:30-21:00',
    name: 'Beginner Tricking',
    description: 'Introduction to basic tricking movements and fundamentals.',
    pointsCost: 2,
    instructor: 'Alex Chen',
    maxCapacity: 12,
    availableSpots: 8,
  },
  {
    id: '2',
    type: 'tricking',
    difficulty: 'advanced',
    day: 'Monday',
    time: '19:30-21:00',
    name: 'Advanced Tricking',
    description: 'Advanced combination moves and sequences for experienced trickers.',
    pointsCost: 3,
    instructor: 'Sarah Johnson',
    maxCapacity: 10,
    availableSpots: 4,
  },
  {
    id: '3',
    type: 'flip',
    difficulty: 'advanced',
    day: 'Monday',
    time: '18:30-19:30',
    name: 'Advanced Flips',
    description: 'Master complex flipping techniques and combinations.',
    pointsCost: 2,
    instructor: 'Mike Wilson',
    maxCapacity: 8,
    availableSpots: 5,
  },
  {
    id: '4',
    type: 'kicking',
    difficulty: 'advanced',
    day: 'Friday',
    time: '18:00-19:30',
    name: 'Advanced Kicking Techniques',
    description: 'Develop advanced kicking techniques and improve execution.',
    pointsCost: 3,
    instructor: 'Lisa Wong',
    maxCapacity: 10,
    availableSpots: 6,
  }
];

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Initialize state from URL parameters or defaults
  const [currentStep, setCurrentStep] = useState<BookingStep>('type');
  const [selectedType, setSelectedType] = useState<string | null>(searchParams.get('type') || null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Mock user points data
  const userPoints = 15;
  
  // Effect to update step based on URL parameters
  useEffect(() => {
    if (selectedType) {
      setCurrentStep('difficulty');
    }
  }, [selectedType]);
  
  // Filter classes by selected criteria
  const getFilteredClasses = () => {
    let filtered = [...enhancedClassData];
    
    if (selectedType) {
      filtered = filtered.filter(c => c.type === selectedType);
    }
    
    if (selectedDifficulty) {
      filtered = filtered.filter(c => c.difficulty === selectedDifficulty);
    }
    
    return filtered;
  };
  
  // Get available dates based on filtered classes
  const getAvailableDates = () => {
    const filtered = getFilteredClasses();
    const uniqueDays = [...new Set(filtered.map(c => c.day))];
    
    const today = new Date();
    const dates: Date[] = [];
    
    // Generate dates for the next 4 weeks
    for (let i = 0; i < 28; i++) {
      const date = addDays(today, i);
      const dayName = format(date, 'EEEE');
      
      if (uniqueDays.includes(dayName)) {
        dates.push(date);
      }
    }
    
    return dates;
  };
  
  // Get class type details
  const getClassTypeDetails = (typeId: string) => {
    return classTypes.find(type => type.id === typeId) || classTypes[0];
  };
  
  // Get difficulty level details
  const getDifficultyDetails = (difficultyId: string) => {
    return difficultyLevels.find(level => level.id === difficultyId) || difficultyLevels[0];
  };
  
  // Handle navigation to the next step
  const goToNextStep = () => {
    switch (currentStep) {
      case 'type':
        if (selectedType) {
          setCurrentStep('difficulty');
        } else {
          toast({
            title: "Please Select a Class Type",
            description: "You need to select a class type to proceed.",
            variant: "destructive",
          });
        }
        break;
      case 'difficulty':
        if (selectedDifficulty) {
          setCurrentStep('schedule');
        } else {
          toast({
            title: "Please Select a Difficulty Level",
            description: "You need to select a difficulty level to proceed.",
            variant: "destructive",
          });
        }
        break;
      case 'schedule':
        if (selectedClass) {
          setCurrentStep('confirm');
        } else {
          toast({
            title: "Please Select a Class",
            description: "You need to select a class to proceed.",
            variant: "destructive",
          });
        }
        break;
      default:
        break;
    }
  };
  
  // Handle navigation to the previous step
  const goToPreviousStep = () => {
    switch (currentStep) {
      case 'difficulty':
        setCurrentStep('type');
        break;
      case 'schedule':
        setCurrentStep('difficulty');
        break;
      case 'confirm':
        setCurrentStep('schedule');
        break;
      default:
        break;
    }
  };
  
  // Process the booking
  const processBooking = () => {
    // Here you would handle the actual booking logic
    setCurrentStep('complete');
    setBookingSuccess(true);
  };
  
  // Reset the booking process
  const resetBooking = () => {
    setCurrentStep('type');
    setSelectedType(null);
    setSelectedDifficulty(null);
    setSelectedClass(null);
    setSelectedDate(null);
    setBookingSuccess(false);
  };
  
  // Select a class from the available options
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
  };
  
  // Format the booking date based on class day
  const getBookingDate = (day: string) => {
    const today = new Date();
    const dayMapping: Record<string, number> = {
      'Sunday': 0,
      'Monday': 1,
      'Tuesday': 2,
      'Wednesday': 3,
      'Thursday': 4,
      'Friday': 5,
      'Saturday': 6
    };
    
    const targetDay = dayMapping[day];
    const todayDay = today.getDay();
    let daysToAdd = targetDay - todayDay;
    
    if (daysToAdd <= 0) {
      daysToAdd += 7; // Go to next week if target day is today or has passed
    }
    
    return addDays(today, daysToAdd);
  };
  
  return (
    <div className="page-transition min-h-screen flex flex-col booking-page">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {['type', 'difficulty', 'schedule', 'confirm', 'complete'].map((step, index) => (
                  <div key={step} className="flex flex-col items-center w-1/5">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center mb-2 text-sm font-medium transition-colors",
                      currentStep === step 
                        ? "bg-primary text-primary-foreground" 
                        : currentStep === 'complete' || (index < ['type', 'difficulty', 'schedule', 'confirm', 'complete'].indexOf(currentStep))
                          ? "bg-green-500 text-white"
                          : "bg-gray-600 text-gray-300"
                    )}>
                      {currentStep === 'complete' || (index < ['type', 'difficulty', 'schedule', 'confirm', 'complete'].indexOf(currentStep)) 
                        ? <CheckCircle2 className="h-5 w-5" /> 
                        : index + 1}
                    </div>
                    <span className={cn(
                      "text-xs font-medium text-center",
                      currentStep === step ? "text-primary" : "booking-text-muted"
                    )}>
                      {step === 'type' && "Class Type"}
                      {step === 'difficulty' && "Difficulty"}
                      {step === 'schedule' && "Schedule"}
                      {step === 'confirm' && "Confirm"}
                      {step === 'complete' && "Complete"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-2 grid grid-cols-4 gap-2">
                <div className={cn("h-1 rounded", currentStep === 'type' ? "bg-gray-600" : "bg-green-500")}></div>
                <div className={cn("h-1 rounded", currentStep === 'type' || currentStep === 'difficulty' ? "bg-gray-600" : "bg-green-500")}></div>
                <div className={cn("h-1 rounded", currentStep === 'type' || currentStep === 'difficulty' || currentStep === 'schedule' ? "bg-gray-600" : "bg-green-500")}></div>
                <div className={cn("h-1 rounded", currentStep !== 'complete' ? "bg-gray-600" : "bg-green-500")}></div>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="booking-card rounded-xl shadow-sm border overflow-hidden">
              {/* Step 1: Class Type Selection */}
              {currentStep === 'type' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Select Class Type</h2>
                  <p className="text-muted-foreground mb-6">
                    Choose the type of class you're interested in attending.
                  </p>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    {classTypes.map((type) => (
                      <Card 
                        key={type.id}
                        className={cn(
                          "cursor-pointer transition-all hover:shadow-md overflow-hidden",
                          selectedType === type.id ? "ring-2 ring-primary" : "border"
                        )}
                        onClick={() => setSelectedType(type.id)}
                      >
                        <CardContent className="p-0">
                          <div className={`${type.color} p-4`}>
                            <div className="flex items-center mb-3">
                              <div className="bg-white/20 p-2 rounded-full mr-3">
                                {type.icon}
                              </div>
                              <h3 className="text-xl font-bold">{type.name}</h3>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-muted-foreground mb-3">{type.description}</p>
                            {selectedType === type.id && (
                              <Badge className="bg-primary hover:bg-primary/90">Selected</Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Step 2: Difficulty Level Selection */}
              {currentStep === 'difficulty' && selectedType && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">Select Difficulty Level</h2>
                  <p className="text-muted-foreground mb-6">
                    Choose the difficulty level that matches your experience.
                  </p>
                  
                  <div className="mb-4">
                    <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-800/50 flex items-start gap-3 mb-6">
                      <div className={`${getClassTypeDetails(selectedType).color} p-2 rounded-full`}>
                        {getClassTypeDetails(selectedType).icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-300 mb-1">
                          Selected Class Type
                        </p>
                        <p className="text-sm text-blue-300">
                          {getClassTypeDetails(selectedType).name} - {getClassTypeDetails(selectedType).description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-3">
                    {difficultyLevels.map((level) => (
                      <Card 
                        key={level.id}
                        className={cn(
                          "cursor-pointer transition-all hover:shadow-md overflow-hidden",
                          selectedDifficulty === level.id ? "ring-2 ring-primary" : "border"
                        )}
                        onClick={() => setSelectedDifficulty(level.id)}
                      >
                        <CardContent className="p-0">
                          <div className={`${level.color} p-4`}>
                            <div className="flex items-center mb-3">
                              <div className="bg-white/20 p-2 rounded-full mr-3">
                                {level.icon}
                              </div>
                              <h3 className="text-xl font-bold">{level.name}</h3>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-muted-foreground mb-3">{level.description}</p>
                            {selectedDifficulty === level.id && (
                              <Badge className="bg-primary hover:bg-primary/90">Selected</Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Step 3: Class Schedule */}
              {currentStep === 'schedule' && selectedType && selectedDifficulty && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">Select a Class</h2>
                  <p className="text-muted-foreground mb-6">
                    Choose from available classes that match your selection.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-800/50 flex items-start gap-3">
                      <div className={`${getClassTypeDetails(selectedType).color} p-2 rounded-full`}>
                        {getClassTypeDetails(selectedType).icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-300 mb-1">
                          Selected Class Type
                        </p>
                        <p className="text-sm text-blue-300">
                          {getClassTypeDetails(selectedType).name}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-800/50 flex items-start gap-3">
                      <div className={`${getDifficultyDetails(selectedDifficulty).color} p-2 rounded-full`}>
                        {getDifficultyDetails(selectedDifficulty).icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-300 mb-1">
                          Selected Difficulty
                        </p>
                        <p className="text-sm text-blue-300">
                          {getDifficultyDetails(selectedDifficulty).name}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {getFilteredClasses().length > 0 ? (
                      getFilteredClasses().map((classItem) => (
                        <Card 
                          key={classItem.id}
                          className={cn(
                            "border-2 transition-all cursor-pointer hover:bg-gray-800/20",
                            selectedClass === classItem ? "border-primary" : "border-transparent"
                          )}
                          onClick={() => handleSelectClass(classItem)}
                        >
                          <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row">
                              <div className={cn(
                                "p-5 flex flex-col justify-center items-center md:w-1/4 text-white",
                                `bg-${classItem.type === 'tricking' ? 'orange' : 
                                        classItem.type === 'flip' ? 'purple' : 
                                        classItem.type === 'kicking' ? 'blue' : 
                                        'emerald'}-800`
                              )}>
                                <div className="mb-2">
                                  {classItem.type === 'tricking' ? <Flame className="h-6 w-6" /> :
                                   classItem.type === 'flip' ? <FlipHorizontal className="h-6 w-6" /> :
                                   classItem.type === 'kicking' ? <Dumbbell className="h-6 w-6" /> :
                                   <Star className="h-6 w-6" />}
                                </div>
                                <p className="text-xl font-bold">{classItem.day}</p>
                                <div className="flex items-center text-white/90 text-sm mt-1">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{classItem.time}</span>
                                </div>
                              </div>
                              
                              <div className="p-5 flex-1">
                                <div className="flex flex-col md:flex-row justify-between mb-3">
                                  <div>
                                    <h3 className="text-xl font-bold">{classItem.name}</h3>
                                    <p className="text-muted-foreground">{classItem.description}</p>
                                  </div>
                                  <div className="mt-2 md:mt-0 flex items-start">
                                    <div className="flex items-center bg-yellow-900/60 text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                                      <BookOpen className="h-3 w-3 mr-1" />
                                      {classItem.pointsCost} points
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-3 items-center">
                                  <div className="flex items-center text-muted-foreground text-sm">
                                    <Users className="h-4 w-4 mr-1" />
                                    <span>{classItem.availableSpots} of {classItem.maxCapacity} spots available</span>
                                  </div>
                                  
                                  {userPoints < classItem.pointsCost ? (
                                    <Badge variant="outline" className="text-red-400 border-red-800 bg-red-900/30">
                                      Insufficient Points
                                    </Badge>
                                  ) : (
                                    <Badge 
                                      variant="outline" 
                                      className={cn(
                                        "transition-colors",
                                        selectedClass === classItem 
                                          ? "bg-green-900/30 text-green-300 border-green-700" 
                                          : "bg-gray-800/30 text-gray-300 border-gray-700"
                                      )}
                                    >
                                      {selectedClass === classItem ? "Selected" : "Available"}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="booking-highlight border rounded-lg p-8 text-center">
                        <h3 className="text-lg font-medium mb-2">No Classes Available</h3>
                        <p className="text-muted-foreground mb-4">
                          There are no classes that match your selected criteria. Please try a different combination.
                        </p>
                        <Button onClick={goToPreviousStep}>
                          Go Back
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Step 4: Confirmation */}
              {currentStep === 'confirm' && selectedClass && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Confirm Your Booking</h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="booking-highlight rounded-lg p-6 border">
                        <h3 className="text-lg font-bold mb-4">Class Details</h3>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Class Type</span>
                            <span className="font-medium flex items-center">
                              {selectedClass.type === 'tricking' ? <Flame className="h-4 w-4 mr-1" /> :
                               selectedClass.type === 'flip' ? <FlipHorizontal className="h-4 w-4 mr-1" /> :
                               selectedClass.type === 'kicking' ? <Dumbbell className="h-4 w-4 mr-1" /> :
                               <Star className="h-4 w-4 mr-1" />}
                              {getClassTypeDetails(selectedClass.type).name}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Class</span>
                            <span className="font-medium">{selectedClass.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Difficulty</span>
                            <span className="font-medium flex items-center">
                              {selectedClass.difficulty === 'beginner' ? <ArrowDown className="h-4 w-4 mr-1" /> :
                               selectedClass.difficulty === 'intermediate' ? <ArrowRightIcon className="h-4 w-4 mr-1" /> :
                               <ArrowUp className="h-4 w-4 mr-1" />}
                              {selectedClass.difficulty.charAt(0).toUpperCase() + selectedClass.difficulty.slice(1)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Day</span>
                            <span className="font-medium">{selectedClass.day}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Date</span>
                            <span className="font-medium">{format(getBookingDate(selectedClass.day), 'MMMM d, yyyy')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Time</span>
                            <span className="font-medium">{selectedClass.time}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Instructor</span>
                            <span className="font-medium">{selectedClass.instructor}</span>
                          </div>
                          <div className="border-t border-[hsl(var(--booking-border))] pt-3 mt-3">
                            <div className="flex justify-between font-medium">
                              <span>Point Cost</span>
                              <span>{selectedClass.pointsCost} points</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="booking-highlight rounded-lg p-6 border mb-4">
                        <h3 className="text-lg font-bold mb-4">Your Points</h3>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between text-lg">
                            <span className="text-muted-foreground">Current Balance</span>
                            <span className="font-medium">{userPoints} points</span>
                          </div>
                          <div className="flex justify-between text-lg text-red-400">
                            <span>Cost</span>
                            <span>-{selectedClass.pointsCost} points</span>
                          </div>
                          <div className="border-t border-[hsl(var(--booking-border))] pt-3 mt-3">
                            <div className="flex justify-between font-bold text-lg">
                              <span>Remaining Balance</span>
                              <span>{userPoints - selectedClass.pointsCost} points</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-900/30 rounded-lg p-4 border border-yellow-800/50 mb-6">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-yellow-300 mb-1">
                              Important Information
                            </p>
                            <p className="text-sm text-yellow-300">
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
              
              {/* Step 5: Booking Complete */}
              {currentStep === 'complete' && selectedClass && (
                <div className="p-6 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-green-900/30 p-3">
                      <CheckCircle2 className="h-16 w-16 text-green-400" />
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-2">Booking Successful!</h2>
                  <p className="text-muted-foreground mb-8">
                    Your class has been booked successfully. We look forward to seeing you!
                  </p>
                  
                  <div className="max-w-md mx-auto booking-highlight rounded-lg p-6 border mb-8">
                    <h3 className="text-lg font-bold mb-4 text-left">Booking Details</h3>
                    
                    <div className="space-y-4 text-left">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Class</span>
                        <span className="font-medium">{selectedClass.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type</span>
                        <span className="font-medium">{getClassTypeDetails(selectedClass.type).name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date</span>
                        <span className="font-medium">{format(getBookingDate(selectedClass.day), 'EEEE, MMMM d, yyyy')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time</span>
                        <span className="font-medium">{selectedClass.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location</span>
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
                <div className="px-6 py-4 border-t border-[hsl(var(--booking-border))] flex justify-between">
                  {currentStep !== 'type' ? (
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
                      {currentStep === 'type' ? 'Choose Difficulty' : 
                       currentStep === 'difficulty' ? 'Select Schedule' : 
                       'Continue'}
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
