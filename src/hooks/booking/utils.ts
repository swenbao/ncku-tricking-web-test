
import { addDays } from 'date-fns';

// Format booking date based on class day
export const getBookingDate = (day: string): Date => {
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
