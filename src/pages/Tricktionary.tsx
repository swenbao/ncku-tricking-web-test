
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTricks } from '@/services/supabaseService';
import { TrickLevel } from '@/lib/data';
import TrickCard from '@/components/TrickCard';
import { SkeletonCard } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TricktionaryPage = () => {
  const [selectedLevel, setSelectedLevel] = useState<TrickLevel | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: tricks = [], isLoading, error } = useQuery({
    queryKey: ['tricks'],
    queryFn: fetchTricks,
    retry: 3,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  console.log('Tricktionary render state:', { isLoading, tricksCount: tricks.length, error });
  
  // Filter tricks based on level and search query
  const filteredTricks = tricks.filter(trick => {
    const matchesLevel = selectedLevel === 'All' || trick.level === selectedLevel;
    const matchesSearch = 
      !searchQuery || 
      trick.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (trick.description && trick.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-center mb-8">Tricktionary</h1>
        
        <div className="max-w-lg mx-auto mb-8">
          <Input
            placeholder="Search tricks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedLevel === 'All' ? 'default' : 'outline'}
              onClick={() => setSelectedLevel('All')}
            >
              All
            </Button>
            <Button
              variant={selectedLevel === 'Absolute Novice' ? 'default' : 'outline'}
              onClick={() => setSelectedLevel('Absolute Novice')}
            >
              Absolute Novice
            </Button>
            <Button
              variant={selectedLevel === 'Beginner' ? 'default' : 'outline'}
              onClick={() => setSelectedLevel('Beginner')}
            >
              Beginner
            </Button>
            <Button
              variant={selectedLevel === 'Intermediate' ? 'default' : 'outline'}
              onClick={() => setSelectedLevel('Intermediate')}
            >
              Intermediate
            </Button>
            <Button
              variant={selectedLevel === 'Advanced' ? 'default' : 'outline'}
              onClick={() => setSelectedLevel('Advanced')}
            >
              Advanced
            </Button>
            <Button
              variant={selectedLevel === 'Expert' ? 'default' : 'outline'}
              onClick={() => setSelectedLevel('Expert')}
            >
              Expert
            </Button>
          </div>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6 max-w-lg mx-auto">
            Error loading tricks. Please try again later.
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Show skeleton cards while loading
            Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          ) : filteredTricks.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium">No tricks found</h3>
              <p className="text-muted-foreground mt-2">
                {searchQuery 
                  ? 'Try a different search term or level filter.' 
                  : 'No tricks are available for the selected level.'}
              </p>
            </div>
          ) : (
            filteredTricks.map((trick) => (
              <TrickCard key={trick.id} trick={trick} />
            ))
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TricktionaryPage;
