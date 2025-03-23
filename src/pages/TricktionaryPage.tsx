
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SkeletonCard } from '@/components/ui/skeleton';
import TrickCard from '@/components/TrickCard';
import { fetchTricks } from '@/services/supabaseService';
import { useQuery } from '@tanstack/react-query';
import { Trick } from '@/lib/data';

const TricktionaryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Fetch tricks from the database
  const { data: tricks = [], isLoading, error } = useQuery({
    queryKey: ['tricks'],
    queryFn: fetchTricks,
  });
  
  // Filter tricks based on search, level, and category
  const filteredTricks = tricks.filter(trick => {
    const matchesSearch = 
      searchQuery === '' || 
      trick.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trick.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesLevel = selectedLevel === 'All' || trick.level === selectedLevel;
    
    const matchesCategory = 
      selectedCategory === 'All' || 
      trick.categories.includes(selectedCategory);
      
    return matchesSearch && matchesLevel && matchesCategory;
  });
  
  // Group tricks by level
  const tricksByLevel = {
    'Absolute Novice': filteredTricks.filter(trick => trick.level === 'Absolute Novice'),
    'Beginner': filteredTricks.filter(trick => trick.level === 'Beginner'),
    'Intermediate': filteredTricks.filter(trick => trick.level === 'Intermediate'),
    'Advanced': filteredTricks.filter(trick => trick.level === 'Advanced'),
    'Expert': filteredTricks.filter(trick => trick.level === 'Expert'),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Tricktionary</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search tricks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <select 
              className="select select-bordered w-full"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="All">All Levels</option>
              <option value="Absolute Novice">Absolute Novice</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
            
            <select 
              className="select select-bordered w-full"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Flip">Flips</option>
              <option value="Kick">Kicks</option>
              <option value="Twist">Twists</option>
              <option value="Transition">Transitions</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">Error loading tricks. Please try again later.</p>
            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
        ) : filteredTricks.length === 0 ? (
          <div className="text-center py-8">
            <p>No tricks found matching your criteria.</p>
            <Button variant="outline" className="mt-4" onClick={() => {
              setSearchQuery('');
              setSelectedLevel('All');
              setSelectedCategory('All');
            }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="All" className="w-full">
            <TabsList className="grid grid-cols-6 mb-8">
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="Absolute Novice">Novice</TabsTrigger>
              <TabsTrigger value="Beginner">Beginner</TabsTrigger>
              <TabsTrigger value="Intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="Advanced">Advanced</TabsTrigger>
              <TabsTrigger value="Expert">Expert</TabsTrigger>
            </TabsList>
            
            <TabsContent value="All">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTricks.map((trick) => (
                  <TrickCard key={trick.id} trick={trick} />
                ))}
              </div>
            </TabsContent>
            
            {Object.entries(tricksByLevel).map(([level, tricks]) => (
              <TabsContent key={level} value={level}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tricks.map((trick) => (
                    <TrickCard key={trick.id} trick={trick} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default TricktionaryPage;
