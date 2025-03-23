
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { tricks, TrickLevel, Trick } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Plus, Search, Edit, Trash, ArrowUp, ArrowDown, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';

// Define available trick categories
const TRICK_CATEGORIES = ['Kick', 'Flip', 'Twist', 'Ground Movement', 'Transition'];

// Type for trick form
interface TrickFormData {
  name: string;
  level: TrickLevel;
  description: string;
  categories: string[];
  prerequisites?: string[];
}

const TricktionaryManager = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [trickList, setTrickList] = useState<Trick[]>([...tricks]);
  const [activeTab, setActiveTab] = useState<string>('Absolute Novice');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTrick, setSelectedTrick] = useState<Trick | null>(null);
  const [formData, setFormData] = useState<TrickFormData>({
    name: '',
    level: 'Absolute Novice',
    description: '',
    categories: [],
  });
  
  // Filter tricks based on search query and level
  const filteredTricks = trickList.filter(trick => {
    const matchesSearch = trick.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          trick.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLevel = activeTab === 'all' || trick.level === activeTab;
    
    return matchesSearch && matchesLevel;
  });
  
  const handleAddTrick = () => {
    // Reset form data
    setFormData({
      name: '',
      level: 'Absolute Novice',
      description: '',
      categories: [],
    });
    setIsAddDialogOpen(true);
  };
  
  const handleEditTrick = (trick: typeof tricks[0]) => {
    setSelectedTrick(trick);
    setFormData({
      name: trick.name,
      level: trick.level,
      description: trick.description,
      categories: trick.categories,
      prerequisites: trick.prerequisites || [],
    });
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteTrick = (trickId: string) => {
    // In a real app, this would delete from the database
    setTrickList(prev => prev.filter(trick => trick.id !== trickId));
    toast({
      title: "Trick Deleted",
      description: "The trick has been removed from the tricktionary.",
    });
  };
  
  const handleCategoryToggle = (category: string) => {
    setFormData(prev => {
      if (prev.categories.includes(category)) {
        return {
          ...prev,
          categories: prev.categories.filter(cat => cat !== category),
        };
      } else {
        return {
          ...prev,
          categories: [...prev.categories, category],
        };
      }
    });
  };
  
  const handleSaveTrick = () => {
    // Validation
    if (!formData.name || !formData.level || !formData.description || formData.categories.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields and select at least one category.",
        variant: "destructive",
      });
      return;
    }
    
    if (isAddDialogOpen) {
      // Adding a new trick
      const newTrick: Trick = {
        id: Date.now().toString(),
        ...formData,
      };
      
      setTrickList(prev => [...prev, newTrick]);
      toast({
        title: "Trick Added",
        description: "The new trick has been added to the tricktionary.",
      });
      setIsAddDialogOpen(false);
    } else if (isEditDialogOpen && selectedTrick) {
      // Editing an existing trick
      setTrickList(prev => 
        prev.map(trick => 
          trick.id === selectedTrick.id ? { ...trick, ...formData } : trick
        )
      );
      toast({
        title: "Trick Updated",
        description: "The trick has been updated successfully.",
      });
      setIsEditDialogOpen(false);
    }
  };
  
  const handleMoveTrick = (trickId: string, direction: 'up' | 'down') => {
    const index = trickList.findIndex(trick => trick.id === trickId);
    if (index === -1) return;
    
    const newTrickList = [...trickList];
    
    if (direction === 'up' && index > 0) {
      // Move up (swap with previous item)
      [newTrickList[index], newTrickList[index - 1]] = [newTrickList[index - 1], newTrickList[index]];
    } else if (direction === 'down' && index < newTrickList.length - 1) {
      // Move down (swap with next item)
      [newTrickList[index], newTrickList[index + 1]] = [newTrickList[index + 1], newTrickList[index]];
    }
    
    setTrickList(newTrickList);
  };
  
  return (
    <AdminLayout title="Tricktionary Management">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
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
        
        <Button onClick={handleAddTrick}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Trick
        </Button>
      </div>
      
      <Tabs defaultValue="Absolute Novice" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="Absolute Novice">Absolute Novice</TabsTrigger>
          <TabsTrigger value="Beginner">Beginner</TabsTrigger>
          <TabsTrigger value="Intermediate">Intermediate</TabsTrigger>
          <TabsTrigger value="Advanced">Advanced</TabsTrigger>
          <TabsTrigger value="Expert">Expert</TabsTrigger>
          <TabsTrigger value="all">All Levels</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === 'all' ? 'All Tricks' : `${activeTab} Tricks`}
              </CardTitle>
              <CardDescription>
                {activeTab === 'all' 
                  ? 'Manage all tricks in the tricktionary' 
                  : `Manage tricks in the ${activeTab} category`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                {filteredTricks.length > 0 ? (
                  <div className="divide-y">
                    {filteredTricks.map((trick, index) => (
                      <div key={trick.id} className="flex items-center p-4">
                        <div className="flex-1">
                          <div className="font-medium">{trick.name}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {trick.description.substring(0, 100)}
                            {trick.description.length > 100 ? '...' : ''}
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="secondary">{trick.level}</Badge>
                            {trick.categories.map((category, i) => (
                              <Badge key={i} variant="outline">
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleMoveTrick(trick.id, 'up')}
                            disabled={index === 0}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleMoveTrick(trick.id, 'down')}
                            disabled={index === filteredTricks.length - 1}
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditTrick(trick)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteTrick(trick.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">
                      No tricks found. Try a different search or category.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add Trick Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Trick</DialogTitle>
            <DialogDescription>
              Add a new trick to the tricktionary database.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Trick Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter trick name"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="level">Difficulty Level</Label>
              <Select
                value={formData.level}
                onValueChange={(value) => setFormData({...formData, level: value as TrickLevel})}
              >
                <SelectTrigger id="level">
                  <SelectValue placeholder="Select difficulty level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Absolute Novice">Absolute Novice</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Enter trick description"
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Categories</Label>
              <div className="flex flex-wrap gap-2">
                {TRICK_CATEGORIES.map((category) => (
                  <Badge
                    key={category}
                    variant={formData.categories.includes(category) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleCategoryToggle(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTrick}>Save Trick</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Trick Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Trick</DialogTitle>
            <DialogDescription>
              Modify trick details in the tricktionary.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Trick Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter trick name"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-level">Difficulty Level</Label>
              <Select
                value={formData.level}
                onValueChange={(value) => setFormData({...formData, level: value as TrickLevel})}
              >
                <SelectTrigger id="edit-level">
                  <SelectValue placeholder="Select difficulty level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Absolute Novice">Absolute Novice</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Enter trick description"
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Categories</Label>
              <div className="flex flex-wrap gap-2">
                {TRICK_CATEGORIES.map((category) => (
                  <Badge
                    key={category}
                    variant={formData.categories.includes(category) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleCategoryToggle(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTrick}>Update Trick</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default TricktionaryManager;
