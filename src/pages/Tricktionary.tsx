import React, { useState, useEffect } from 'react';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
import { useAuth } from '@/contexts/AuthContext';

const levelOrder: TrickLevel[] = [
  'Absolute Novice',
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert',
];

const TricktionaryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTrick, setSelectedTrick] = useState<typeof tricks[0] | null>(null);
  const [activeTab, setActiveTab] = useState<string>(levelOrder[0]);
  const { user, isAuthenticated, updateTrickStatus } = useAuth();

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

  const handleProgressUpdate = (status: 'Started' | 'Completed' | 'Proficient') => {
    if (selectedTrick && isAuthenticated) {
      updateTrickStatus(selectedTrick.id, status);
    }
  };

  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tricktionary</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our database of tricking moves, from basic to advanced techniques.
            </p>
          </header>
          
          <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tricks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                    {selectedCategories.length > 0 && (
                      <Badge variant="secondary" className="ml-1">
                        {selectedCategories.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Tricks</SheetTitle>
                    <SheetDescription>
                      Select categories to filter the tricks list.
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="py-6">
                    <h3 className="text-sm font-medium mb-4">Categories</h3>
                    <div className="space-y-3">
                      {['Kick', 'Flip', 'Twist', 'Transition'].map((category) => (
                        <div key={category} className="flex items-center">
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryChange(category)}
                          />
                          <Label
                            htmlFor={`category-${category}`}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={clearFilters} size="sm">
                      Clear Filters
                    </Button>
                    <SheetClose asChild>
                      <Button size="sm">Apply Filters</Button>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>
              
              {(searchQuery || selectedCategories.length > 0) && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              )}
            </div>
          </div>
          
          <Tabs defaultValue={levelOrder[0]} value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8 flex overflow-x-auto pb-2 scrollbar-hide">
              {levelOrder.map((level) => (
                <TabsTrigger key={level} value={level} className="min-w-max">
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
                      <h3 className="text-lg font-medium mb-2">No tricks found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your filters or search query.
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
        <DialogContent className="sm:max-w-lg">
          {selectedTrick && (
            <>
              <DialogHeader>
                <DialogTitle className="flex justify-between items-center">
                  <span>{selectedTrick.name}</span>
                  <Badge 
                    variant="outline" 
                    className="ml-2"
                  >
                    {selectedTrick.level}
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  {selectedTrick.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTrick.categories.map((category, index) => (
                      <Badge key={index} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {selectedTrick.prerequisites && selectedTrick.prerequisites.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Prerequisites</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {selectedTrick.prerequisites.map((prereq, index) => (
                        <li key={index}>{prereq}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {user && (
                  <div className="border-t pt-4 mt-4">
                    <h4 className="text-sm font-medium mb-2">Update Your Progress</h4>
                    <RadioGroup 
                      defaultValue={getTrickProgress(selectedTrick.id) || ""} 
                      onValueChange={(value) => handleProgressUpdate(value as 'Started' | 'Completed' | 'Proficient')}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Started" id="started" />
                        <Label htmlFor="started">Started learning/practicing</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Completed" id="completed" />
                        <Label htmlFor="completed">Successfully completed once</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Proficient" id="proficient" />
                        <Label htmlFor="proficient">Proficient</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
                
                {selectedTrick.videoUrl && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Reference Video</h4>
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Video unavailable</p>
                    </div>
                  </div>
                )}
              </div>
              
              {!user && (
                <DialogFooter>
                  <p className="text-muted-foreground text-sm mr-auto">Log in to track your progress</p>
                  <Button asChild>
                    <Link to="/login">Log In</Link>
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
