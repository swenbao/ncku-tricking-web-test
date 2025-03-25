
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, X } from 'lucide-react';
import { tricks } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';

// Types
interface TrickWithSelected extends Trick {
  selected: boolean;
}

interface Trick {
  id: string;
  name: string;
  level: string;
  description: string;
  categories: string[];
}

const PrerequisitesManager = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTricks, setSelectedTricks] = useState<string[]>(() => {
    // Initialize with some tricks (in a real app, this would come from the database)
    return tricks.slice(0, 15).map(trick => trick.id);
  });
  
  // Create a list of tricks with selected status
  const tricksWithSelected: TrickWithSelected[] = tricks.map(trick => ({
    ...trick,
    selected: selectedTricks.includes(trick.id)
  }));
  
  // Filter tricks based on search query
  const filteredTricks = tricksWithSelected.filter(trick => 
    trick.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trick.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle trick selection
  const handleTrickSelection = (trickId: string) => {
    setSelectedTricks(prev => {
      if (prev.includes(trickId)) {
        return prev.filter(id => id !== trickId);
      } else {
        return [...prev, trickId];
      }
    });
  };
  
  // Handle save
  const handleSave = () => {
    // In a real app, this would save to the database
    toast({
      title: "Prerequisites Saved",
      description: `${selectedTricks.length} tricks set as prerequisites for advanced classes.`,
    });
  };
  
  return (
    <AdminLayout title="Advanced Class Prerequisites">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Selected Prerequisites</CardTitle>
            <CardDescription>
              These tricks will be shown on the homepage as prerequisites for joining advanced classes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              {selectedTricks.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {filteredTricks
                    .filter(trick => selectedTricks.includes(trick.id))
                    .map(trick => (
                      <Badge 
                        key={trick.id} 
                        variant="secondary"
                        className="py-2 pl-3 pr-2 flex items-center gap-1"
                      >
                        {trick.name}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 rounded-full"
                          onClick={() => handleTrickSelection(trick.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No prerequisites selected. Add tricks from the right panel.
                </p>
              )}
            </ScrollArea>
            
            <Button 
              className="w-full mt-4" 
              onClick={handleSave}
              disabled={selectedTricks.length === 0}
            >
              Save Prerequisites
            </Button>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Available Tricks</CardTitle>
            <CardDescription>
              Select tricks from the tricktionary to add as prerequisites.
            </CardDescription>
            <div className="relative mt-2">
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
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {filteredTricks.map(trick => (
                  <div
                    key={trick.id}
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox
                      id={`trick-${trick.id}`}
                      checked={trick.selected}
                      onCheckedChange={() => handleTrickSelection(trick.id)}
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={`trick-${trick.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {trick.name}
                      </label>
                      <p className="text-xs text-muted-foreground mt-1">
                        {trick.level}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {trick.categories.map((category, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default PrerequisitesManager;
