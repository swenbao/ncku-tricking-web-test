
import React from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth, UserAvatar } from '@/contexts/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';

const UserMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const { language } = useLanguage();

  if (!user) {
    return (
      <Button asChild variant="ghost" className="ml-2">
        <Link to="/login">{language === 'en' ? 'Log In' : '登入'}</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="ml-2 rounded-full">
          <UserAvatar />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span>{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>{language === 'en' ? 'Profile' : '個人資料'}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => logout()} className="cursor-pointer text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          <span>{language === 'en' ? 'Log out' : '登出'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
