
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ClassTypeCardProps {
  type: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  language: string;
}

const ClassTypeCard: React.FC<ClassTypeCardProps> = ({
  type,
  name,
  icon,
  color,
  language
}) => {
  const navigate = useNavigate();
  
  const handleBookClass = (classType: string) => {
    navigate(`/booking?type=${classType}`);
  };

  return (
    <div 
      className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
      onClick={() => handleBookClass(type)}
    >
      <div className={`p-6 text-center ${color}`}>
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="rounded-full bg-white/20 p-3">
            {icon}
          </div>
          <h3 className="text-xl font-bold">{name}</h3>
          <Button variant="secondary" className="mt-2 w-full">
            {language === 'en' ? 'Book Now' : '立即預約'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClassTypeCard;
