
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useBookingState } from '@/hooks/useBookingState';

// Import the step components
import BookingProgressIndicator from '@/components/booking/BookingProgressIndicator';
import ClassTypeStep from '@/components/booking/ClassTypeStep';
import DifficultyStep from '@/components/booking/DifficultyStep';
import ScheduleStep from '@/components/booking/ScheduleStep';
import ConfirmationStep from '@/components/booking/ConfirmationStep';
import CompletionStep from '@/components/booking/CompletionStep';
import BookingNavigation from '@/components/booking/BookingNavigation';

const BookingPage = () => {
  const {
    currentStep,
    selectedType,
    selectedDifficulty,
    selectedClass,
    userPoints,
    setSelectedType,
    setSelectedDifficulty,
    goToNextStep,
    goToPreviousStep,
    processBooking,
    resetBooking,
    handleSelectClass,
    getBookingDate
  } = useBookingState();
  
  return (
    <div className="page-transition min-h-screen flex flex-col booking-page">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Progress Indicator */}
            <BookingProgressIndicator currentStep={currentStep} />
            
            {/* Main Content Area */}
            <div className="booking-card rounded-xl shadow-sm border overflow-hidden">
              {/* Step 1: Class Type Selection */}
              {currentStep === 'type' && (
                <ClassTypeStep 
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                />
              )}
              
              {/* Step 2: Difficulty Level Selection */}
              {currentStep === 'difficulty' && selectedType && (
                <DifficultyStep
                  selectedType={selectedType}
                  selectedDifficulty={selectedDifficulty}
                  setSelectedDifficulty={setSelectedDifficulty}
                />
              )}
              
              {/* Step 3: Class Schedule */}
              {currentStep === 'schedule' && selectedType && selectedDifficulty && (
                <ScheduleStep
                  selectedType={selectedType}
                  selectedDifficulty={selectedDifficulty}
                  selectedClass={selectedClass}
                  userPoints={userPoints}
                  onSelectClass={handleSelectClass}
                  onPrevious={goToPreviousStep}
                />
              )}
              
              {/* Step 4: Confirmation */}
              {currentStep === 'confirm' && selectedClass && (
                <ConfirmationStep
                  selectedClass={selectedClass}
                  userPoints={userPoints}
                  onConfirm={processBooking}
                  getBookingDate={getBookingDate}
                />
              )}
              
              {/* Step 5: Booking Complete */}
              {currentStep === 'complete' && selectedClass && (
                <CompletionStep
                  selectedClass={selectedClass}
                  onReset={resetBooking}
                  getBookingDate={getBookingDate}
                />
              )}
              
              {/* Navigation Footer */}
              <BookingNavigation 
                currentStep={currentStep}
                onPrevious={goToPreviousStep}
                onNext={goToNextStep}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingPage;
