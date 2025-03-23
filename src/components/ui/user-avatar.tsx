
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/auth';

export const UserAvatar = () => {
  const { user } = useAuth();
  
  const getInitials = (name?: string | null) => {
    if (!name) return '?';
    return name.split(' ')
      .map(part => part[0]?.toUpperCase() || '')
      .join('')
      .substring(0, 2);
  };
  
  return (
    <Avatar>
      {user?.profileImage ? (
        <AvatarImage src={user.profileImage} alt={user.name || 'User'} />
      ) : (
        <AvatarFallback>
          {getInitials(user?.name)}
        </AvatarFallback>
      )}
    </Avatar>
  );
};
