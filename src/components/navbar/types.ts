
import { User } from '@/contexts/auth/types';

export interface NavLinkProps {
  to: string;
  label: string;
  onClick?: () => void;
}

export interface MobileMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
  language: string;
  toggleLanguage: () => void;
  isAuthenticated: boolean;
  user: User | null;
  handleLogout: () => void;
  navigate: (path: string) => void;
}

export interface UserMenuProps {
  user: User | null;
  language: string;
  navigate: (path: string) => void;
  handleLogout: () => void;
}

export interface NavbarContainerProps {
  children: React.ReactNode;
  scrolled: boolean;
  visible: boolean;
}
