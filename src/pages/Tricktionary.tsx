
import React, { useState } from 'react';
import { tricks, TrickLevel } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrickCard from '@/components/TrickCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/auth';
import { useLanguage } from '@/contexts/LanguageContext';

const levelOrder: TrickLevel[] = [
  'Absolute Novice',
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert',
];

const TRICK_CATEGORIES = ['Kick', 'Flip', 'Twist', 'Ground Movement', 'Transition'];

const TricktionaryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTrick, setSelectedTrick] = useState<typeof tricks[0] | null>(null);
  const [activeTab, setActiveTab] = useState<string>(levelOrder[0]);
  const { user, isAuthenticated, updateTrickStatus } = useAuth();
  const { language } = useLanguage();

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery('');
  };

  const filteredTricks = tricks.filter(trick => {
    const matchesSearch = trick.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          trick.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || 
                            trick.categories.some(category => selectedCategories.includes(category));
    
    const matchesLevel = activeTab === 'all' || trick.level === activeTab;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getTrickProgress = (trickId: string) => {
    if (!user) return null;
    return user.completedTricks.find(t => t.trickId === trickId)?.status || null;
  };

  const handleProgressUpdate = (status: 'Started' | 'Completed' | 'Proficient' | null) => {
    if (selectedTrick && isAuthenticated) {
      const currentStatus = getTrickProgress(selectedTrick.id);
      
      if (currentStatus === status) {
        updateTrickStatus(selectedTrick.id, null);
      } else {
        updateTrickStatus(selectedTrick.id, status);
      }
    }
  };

  const getProgressStatusLabel = (status: string | null) => {
    if (language === 'en') {
      switch(status) {
        case 'Started': return 'Learning';
        case 'Completed': return 'Completed';
        case 'Proficient': return 'Mastered';
        default: return 'Not Started';
      }
    } else {
      switch(status) {
        case 'Started': return '學習中';
        case 'Completed': return '已完成';
        case 'Proficient': return '已精通';
        default: return '未開始';
      }
    }
  };

  const getTranslation = (text: string, chineseText: string) => {
    return language === 'en' ? text : chineseText;
  };

  return (
    <div className="page-transition min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {language === 'en' ? 'Tricktionary' : '招式字典'}
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {language === 'en' 
                ? 'Explore our database of tricking moves, from basic to advanced techniques.' 
                : '探索我們的特技動作資料庫，從基礎到進階技巧。'}
            </p>
          </header>
          
          <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={language === 'en' ? "Search tricks..." : "搜尋招式..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-white" />
                </button>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 bg-gray-900 border-gray-700 text-white hover:bg-gray-800">
                    <Filter className="h-4 w-4" />
                    {language === 'en' ? 'Filter' : '篩選'}
                    {selectedCategories.length > 0 && (
                      <Badge variant="secondary" className="ml-1 bg-red-600 text-white">
                        {selectedCategories.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-gray-900 text-white border-gray-700">
                  <SheetHeader>
                    <SheetTitle className="text-white">
                      {language === 'en' ? 'Filter Tricks' : '篩選招式'}
                    </SheetTitle>
                    <SheetDescription className="text-gray-400">
                      {language === 'en' 
                        ? 'Select categories to filter the tricks list.' 
                        : '選擇類別來篩選招式列表。'}
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="py-6">
                    <h3 className="text-sm font-medium mb-4 text-white">
                      {language === 'en' ? 'Categories' : '類別'}
                    </h3>
                    <div className="space-y-3">
                      {TRICK_CATEGORIES.map((category) => (
                        <div key={category} className="flex items-center">
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryChange(category)}
                            className="border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                          />
                          <Label
                            htmlFor={`category-${category}`}
                            className="ml-2 text-sm font-medium leading-none text-white"
                          >
                            {/* Don't translate trick categories */}
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={clearFilters} 
                      size="sm"
                      className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                    >
                      {language === 'en' ? 'Clear Filters' : '清除篩選'}
                    </Button>
                    <SheetClose asChild>
                      <Button 
                        size="sm"
                        className="bg-red-600 text-white hover:bg-red-700"
                      >
                        {language === 'en' ? 'Apply Filters' : '套用篩選'}
                      </Button>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>
              
              {(searchQuery || selectedCategories.length > 0) && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-gray-400 hover:text-white hover:bg-gray-800"
                >
                  {language === 'en' ? 'Clear All' : '清除全部'}
                </Button>
              )}
            </div>
          </div>
          
          <Tabs defaultValue={levelOrder[0]} value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8 flex overflow-x-auto pb-2 scrollbar-hide bg-gray-900 p-1 border border-gray-800">
              {levelOrder.map((level) => (
                <TabsTrigger 
                  key={level} 
                  value={level} 
                  className="min-w-max data-[state=active]:bg-gray-800 data-[state=active]:text-white data-[state=active]:shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                >
                  {/* Don't translate trick levels */}
                  {level}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {levelOrder.map((level) => (
              <TabsContent key={level} value={level} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTricks.length > 0 ? (
                    filteredTricks.map((trick) => (
                      <TrickCard
                        key={trick.id}
                        trick={trick}
                        onClick={() => setSelectedTrick(trick)}
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <h3 className="text-lg font-medium mb-2 text-white">
                        {language === 'en' ? 'No tricks found' : '找不到招式'}
                      </h3>
                      <p className="text-gray-400">
                        {language === 'en' 
                          ? 'Try adjusting your filters or search query.' 
                          : '嘗試調整您的篩選或搜尋條件。'}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      
      <Footer />
      
      {/* Trick Detail Dialog */}
      <Dialog open={!!selectedTrick} onOpenChange={(open) => !open && setSelectedTrick(null)}>
        <DialogContent className="sm:max-w-lg bg-gray-900 border-gray-700 text-white">
          {selectedTrick && (
            <>
              <DialogHeader>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <Badge 
                    variant="outline" 
                    className="border-gray-600 text-gray-300"
                  >
                    {/* Don't translate trick level */}
                    {selectedTrick.level}
                  </Badge>
                  
                  {selectedTrick.categories.map((category, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-800 text-gray-300">
                      {/* Don't translate trick categories */}
                      {category}
                    </Badge>
                  ))}
                </div>
                
                <DialogTitle className="text-xl mt-2 text-white">
                  {/* Don't translate trick name */}
                  {selectedTrick.name}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="aspect-video bg-gray-800 rounded-md flex items-center justify-center mb-4 border border-gray-700">
                  <p className="text-gray-400">
                    {language === 'en' ? 'Demo animation' : '動作示範'}
                  </p>
                </div>
                
                <DialogDescription className="text-base text-gray-300">
                  {selectedTrick.description}
                </DialogDescription>
                
                {selectedTrick.prerequisites && selectedTrick.prerequisites.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-1 text-white">
                      {language === 'en' ? 'Prerequisites' : '先決條件'}
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-400">
                      {selectedTrick.prerequisites.map((prereq, index) => (
                        <li key={index}>{prereq}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {user && (
                  <div className="border-t border-gray-700 pt-4 mt-6">
                    <h4 className="text-sm font-medium mb-3 text-white">
                      {language === 'en' ? 'Update Your Progress' : '更新您的進度'}
                    </h4>
                    
                    <div className="grid grid-cols-3 gap-2">
                      {(['Started', 'Completed', 'Proficient'] as const).map((status) => {
                        const currentStatus = getTrickProgress(selectedTrick.id);
                        const isActive = currentStatus === status;
                        return (
                          <Button 
                            key={status}
                            variant={isActive ? "default" : "outline"} 
                            size="sm"
                            className={cn(
                              "relative overflow-hidden transition-all duration-300",
                              isActive 
                                ? "bg-red-600 text-white font-medium hover:bg-red-700" 
                                : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                            )}
                            onClick={() => handleProgressUpdate(isActive ? null : status)}
                          >
                            {getProgressStatusLabel(status)}
                            {isActive && (
                              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white/30" />
                            )}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              
              {!user && (
                <DialogFooter>
                  <p className="text-gray-400 text-sm mr-auto">
                    {language === 'en' ? 'Log in to track your progress' : '登入以追踪您的進度'}
                  </p>
                  <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
                    <Link to="/login">
                      {language === 'en' ? 'Log In' : '登入'}
                    </Link>
                  </Button>
                </DialogFooter>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TricktionaryPage;
