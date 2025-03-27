
import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageToggleProps {
  variant?: 'default' | 'minimal';
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ variant = 'default' }) => {
  const { language, toggleLanguage } = useLanguage();
  
  if (variant === 'minimal') {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleLanguage} 
        className="mr-2"
      >
        <Globe className="h-5 w-5" />
      </Button>
    );
  }
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleLanguage} 
      className="rounded-full"
    >
      <Globe className="h-5 w-5" />
      <span className="ml-1 text-xs">{language === 'en' ? 'EN' : '中'}</span>
    </Button>
  );
};

export default LanguageToggle;
