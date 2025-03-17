
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { classSchedule } from '@/lib/data';
import { CalendarIcon, Clock, Users, ChevronRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, addDays, isSameDay, startOfWeek, isAfter, isBefore } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const BookingPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [bookingClass, setBookingClass] = useState<any>(null);
  const [confirmBooking, setConfirmBooking] = useState(false);
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
  
  const handleBookClass = (session: any) => {
    if (userPoints < session.pointsCost) {
      toast({
        title: "Insufficient Points",
        description: "You don't have enough points to book this class.",
        variant: "destructive",
      });
      return;
    }
    
    setBookingClass(session);
    setConfirmBooking(true);
  };
  
  const processBooking = () => {
    // Here you would handle the actual booking process
    setConfirmBooking(false);
    setBookingSuccess(true);
  };
  
  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Book a Class</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Use your points to reserve a spot in our tricking classes.
            </p>
          </header>
          
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/3">
                <div className="bg-white shadow-sm rounded-xl border border-border p-6 mb-6">
                  <h2 className="text-lg font-medium mb-4">Select Date</h2>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
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
                
                <div className="bg-white shadow-sm rounded-xl border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">Your Points</h2>
                    <span className="text-lg font-bold">{userPoints}</span>
                  </div>
                  
                  <div className="bg-muted/30 rounded-md p-3 mb-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        You need points to book classes. Each class requires a different number of points.
                      </p>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/points">Buy More Points</a>
                  </Button>
                </div>
              </div>
              
              <div className="lg:w-2/3">
                <h2 className="text-2xl font-bold mb-6">
                  Classes on {format(date, 'EEEE, MMMM d')}
                </h2>
                
                {availableClasses.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {availableClasses.map((session, index) => (
                      <Card 
                        key={index}
                        className="border-border/50 hover:shadow-md transition-shadow"
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl">{session.name}</CardTitle>
                              <CardDescription>{session.description}</CardDescription>
                            </div>
                            <Badge variant={session.level === 'Beginner' ? 'default' : 'secondary'}>
                              {session.level}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{session.time}</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              <span>10 spots available</span>
                            </div>
                            <div className="flex items-center font-medium text-foreground">
                              <span>{session.pointsCost} points required</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            className="w-full"
                            onClick={() => handleBookClass(session)}
                            disabled={userPoints < session.pointsCost}
                          >
                            {userPoints < session.pointsCost ? "Insufficient Points" : "Book This Class"}
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="bg-muted/20 border border-border/50 rounded-xl p-8 text-center">
                    <h3 className="text-lg font-medium mb-2">No Classes Available</h3>
                    <p className="text-muted-foreground mb-4">
                      There are no classes scheduled for this date. Please select another date.
                    </p>
                    
                    <div className="bg-muted/30 inline-block rounded-md p-3 text-left">
                      <h4 className="font-medium mb-2">Available Class Days:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {classSchedule.map((day, index) => (
                          <li key={index}>{day.day}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Confirm Booking Dialog */}
      <Dialog open={confirmBooking} onOpenChange={setConfirmBooking}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Booking</DialogTitle>
            <DialogDescription>
              Please review the details before confirming your booking.
            </DialogDescription>
          </DialogHeader>
          
          {bookingClass && (
            <div className="py-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">{bookingClass.name}</h3>
                  <p className="text-sm text-muted-foreground">{bookingClass.description}</p>
                </div>
                
                <div className="bg-muted/30 rounded-md p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date</span>
                    <span className="text-sm font-medium">{format(date, 'EEEE, MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Time</span>
                    <span className="text-sm font-medium">{bookingClass.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Point Cost</span>
                    <span className="text-sm font-medium">{bookingClass.pointsCost} points</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-sm text-muted-foreground">Your Points After Booking</span>
                    <span className="text-sm font-medium">{userPoints - bookingClass.pointsCost} points</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmBooking(false)}>
              Cancel
            </Button>
            <Button onClick={processBooking}>
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Success Dialog */}
      <Dialog open={bookingSuccess} onOpenChange={setBookingSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Booking Successful!</DialogTitle>
            <DialogDescription>
              Your class has been successfully booked.
            </DialogDescription>
          </DialogHeader>
          
          {bookingClass && (
            <div className="py-4">
              <div className="bg-muted/30 rounded-md p-4 space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Class</span>
                  <span className="text-sm font-medium">{bookingClass.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Date</span>
                  <span className="text-sm font-medium">{format(date, 'EEEE, MMMM d, yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Time</span>
                  <span className="text-sm font-medium">{bookingClass.time}</span>
                </div>
              </div>
              
              <p className="text-sm text-center mb-4">
                We look forward to seeing you at the class!
              </p>
            </div>
          )}
          
          <DialogFooter className="sm:justify-start">
            <Button onClick={() => setBookingSuccess(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingPage;
