
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserStatus } from '@/contexts/AuthContext';

interface StatusCardProps {
  status: UserStatus;
}

const StatusCard: React.FC<StatusCardProps> = ({ status }) => {
  let bgGradient = '';
  let accentColor = 'border-red-600';
  let statusDetail = '';
  
  switch (status) {
    case 'Blank Card':
      bgGradient = 'bg-black';
      accentColor = 'border-gray-400';
      statusDetail = 'Begin your tricking journey with basic access';
      break;
    case 'Beginner Card':
      bgGradient = 'bg-black';
      accentColor = 'border-red-400';
      statusDetail = 'Access to all beginner-level classes and resources';
      break;
    case 'Advanced Card':
      bgGradient = 'bg-black';
      accentColor = 'border-red-600';
      statusDetail = 'Full access to all classes and exclusive content';
      break;
  }
  
  return (
    <Card className={`mb-8 overflow-hidden shadow-lg border-2 ${accentColor}`}>
      <div className={`${bgGradient} h-full p-8 text-white`}>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-3">
              <div className={`w-16 h-16 rounded-full border-4 ${accentColor} bg-black flex items-center justify-center mr-4 shadow-md`}>
                <span className="text-3xl font-bold text-white">{status.charAt(0)}</span>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wide font-medium text-gray-400 mb-1">Membership Status</p>
                <h3 className="text-2xl font-bold text-white">{status}</h3>
              </div>
            </div>
            <div className="space-y-2 ml-1 pl-1 border-l-2 border-red-600">
              <p className="font-medium text-white">Premium Membership</p>
              <p className="text-gray-300">{statusDetail}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="px-5 py-3 rounded-lg bg-black border border-red-600 mb-3">
              <div className="text-xs uppercase tracking-wide mb-1 text-gray-400">NCKU Tricking Club</div>
              <div className="text-sm font-medium text-white">{new Date().getFullYear()} Member</div>
            </div>
            <Button 
              variant="outline" 
              className="text-white border-2 border-red-600 hover:bg-red-900 hover:text-white"
            >
              View Membership Details
            </Button>
            <Button 
              variant="outline" 
              className="text-white border-2 border-red-600 hover:bg-red-900 hover:text-white"
              asChild
            >
              <Link to="/booking-history">
                <Clock className="mr-2 h-4 w-4" />
                View Booking History
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StatusCard;
