
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/auth/useAuth';

export const UserAvatar: React.FC<{ className?: string }> = ({ className }) => {
  const { user } = useAuth();
  
  return (
    <Avatar className={className}>
      {user?.profilePicture ? (
        <AvatarImage src={user.profilePicture} alt={user.name} />
      ) : (
        <AvatarFallback className="bg-secondary text-secondary-foreground">
          {user?.name?.charAt(0) || 'G'}
        </AvatarFallback>
      )}
    </Avatar>
  );
};
