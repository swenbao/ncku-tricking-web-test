
import React from 'react';
import { UserMenuProps } from './types';
import { UserAvatar } from '@/components/ui/user-avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const UserMenu: React.FC<UserMenuProps> = ({ user, language, navigate, handleLogout }) => {
  if (!user) {
    return (
      <Button
        variant="default"
        size="sm"
        onClick={() => navigate('/login')}
      >
        {language === 'en' ? 'Login' : '登入'}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <UserAvatar />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {user?.name || 'User'}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onSelect={() => navigate('/profile')}>
          {language === 'en' ? 'Profile' : '個人資料'}
        </DropdownMenuItem>
        
        <DropdownMenuItem onSelect={() => navigate('/booking-history')}>
          {language === 'en' ? 'Booking History' : '預約紀錄'}
        </DropdownMenuItem>
        
        {user?.role === 'official' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => navigate('/admin')}>
              {language === 'en' ? 'Admin Panel' : '管理員面板'}
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleLogout}>
          {language === 'en' ? 'Logout' : '登出'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
