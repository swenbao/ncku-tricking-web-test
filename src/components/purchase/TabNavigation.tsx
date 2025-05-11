
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PurchaseTab } from '@/lib/data';
import { useLanguage } from '@/contexts/LanguageContext';

interface TabNavigationProps {
  tabs: PurchaseTab[];
  activeTabId: string | null;
  onSelectTab: (tabId: string) => void;
}

const TabNavigation = ({ tabs, activeTabId, onSelectTab }: TabNavigationProps) => {
  const { language } = useLanguage();

  const translateTitle = (title: string): string => {
    // Simple translation map - in a real app, this would use a more comprehensive translation system
    const translations: Record<string, string> = {
      'Beginner Plans': '初學者課程',
      'Advanced Plans': '進階課程',
      'Single Session': '單堂課程',
      'Semester Bundle': '學期套裝',
    };

    return language === 'en' ? title : translations[title] || title;
  };

  const translateDescription = (description: string): string => {
    const translations: Record<string, string> = {
      'Course card plans suitable for beginners': '適合初學者的課程卡方案',
      'Course card plans suitable for advanced learners': '適合進階學習者的課程卡方案',
      'One-time class experience': '一次性課堂體驗',
      'Long-term training packages': '長期訓練套裝',
    };

    return language === 'en' ? description : translations[description] || description;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {tabs.map((tab) => (
        <Card 
          key={tab.id}
          className={`relative overflow-hidden transition-all cursor-pointer hover:shadow-md hover:shadow-white/10 hover:border-primary/50 ${
            activeTabId === tab.id ? 'border-2 border-primary shadow-lg shadow-primary/20' : ''
          }`}
          onClick={() => onSelectTab(tab.id)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/5 to-background/20 pointer-events-none" />
          <CardHeader className="relative z-10">
            <CardTitle className="text-xl">{translateTitle(tab.title)}</CardTitle>
            <CardDescription>{translateDescription(tab.description)}</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="h-20 flex items-center justify-center">
              <span className="text-xl font-semibold text-center">
                {activeTabId === tab.id && (
                  <span className="text-primary">{language === 'en' ? 'Selected' : '已選擇'}</span>
                )}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TabNavigation;
