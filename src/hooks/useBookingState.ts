import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { addDays, format } from 'date-fns';
import { getAvailableDifficulties } from '@/lib/bookingData';

// Types
export type BookingStep = 'difficulty' | 'type' | 'schedule' | 'confirm' | 'complete';

// Class type definition
export interface ClassType {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
  description: string;
}

// Difficulty level definition
export interface DifficultyLevel {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
  description: string;
}

// Class data interface
export interface ClassData {
  id: string;
  type: string;
  difficulty: string;
  day: string;
  time: string;
  name: string;
  description: string;
  pointsCost: number;
  instructor: string;
  maxCapacity: number;
  availableSpots: number;
}

export const useBookingState = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Initialize state from URL parameters or defaults
  const [currentStep, setCurrentStep] = useState<BookingStep>('difficulty');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(searchParams.get('difficulty') || null);
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Auto-navigate when selecting a type with only one difficulty level
  useEffect(() => {
    if (selectedType && currentStep === 'type') {
      const availableDifficulties = getAvailableDifficulties(selectedType);
      if (availableDifficulties.length === 1) {
        setSelectedDifficulty(availableDifficulties[0].id);
        setTimeout(() => {
          setCurrentStep('schedule');
        }, 100);
      }
    }
  }, [selectedType, currentStep]);
  
  // Mock user points data - in a real app this would come from a user context or API
  const userPoints = 15;
  
  // Class type selection handler with auto-navigation
  const setSelectedTypeWithNavigation = (type: string) => {
    setSelectedType(type);
    const availableDifficulties = getAvailableDifficulties(type);
    
    if (availableDifficulties.length === 0) {
      toast({
        title: "No Classes Available",
        description: "There are no classes available for this type. Please select a different class type.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedType(type);
  };
  
  // Navigate to next step
  const goToNextStep = () => {
    switch (currentStep) {
      case 'difficulty':
        if (selectedDifficulty) {
          setCurrentStep('type');
        } else {
          toast({
            title: "Please Select a Difficulty Level",
            description: "You need to select a difficulty level to proceed.",
            variant: "destructive",
          });
        }
        break;
      case 'type':
        if (selectedType) {
          setCurrentStep('schedule');
        } else {
          toast({
            title: "Please Select a Class Type",
            description: "You need to select a class type to proceed.",
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
  
  // Navigate to previous step
  const goToPreviousStep = () => {
    switch (currentStep) {
      case 'type':
        setCurrentStep('difficulty');
        break;
      case 'schedule':
        setCurrentStep('type');
        break;
      case 'confirm':
        setCurrentStep('schedule');
        break;
      default:
        break;
    }
  };
  
  // Process booking
  const processBooking = () => {
    // In a real app, this would make an API call to create the booking
    setCurrentStep('complete');
    setBookingSuccess(true);
  };
  
  // Reset booking
  const resetBooking = () => {
    setCurrentStep('type');
    setSelectedType(null);
    setSelectedDifficulty(null);
    setSelectedClass(null);
    setSelectedDate(null);
    setBookingSuccess(false);
  };
  
  // Handle class selection
  const handleSelectClass = (classItem: ClassData) => {
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
  
  // Format booking date based on class day
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

  return {
    currentStep,
    selectedType,
    selectedDifficulty,
    selectedClass,
    selectedDate,
    bookingSuccess,
    userPoints,
    setSelectedType: setSelectedTypeWithNavigation,
    setSelectedDifficulty,
    setSelectedClass,
    goToNextStep,
    goToPreviousStep,
    processBooking,
    resetBooking,
    handleSelectClass,
    getBookingDate
  };
};
