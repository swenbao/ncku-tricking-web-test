
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Loader2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  fetchTricks,
  createTrick,
  updateTrick,
  deleteTrick
} from '@/services/supabaseService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trick, TrickLevel } from '@/lib/data';
import Skeleton from '@/components/ui/skeleton';

interface TrickFormData {
  name: string;
  level: string;
  description: string;
  categories: string[];
  videoUrl: string;
  prerequisites: string[];
}

const TricktionaryManager = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('Absolute Novice');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTrick, setSelectedTrick] = useState<Trick | null>(null);
  const [formData, setFormData] = useState<TrickFormData>({
    name: '',
    level: 'Absolute Novice',
    description: '',
    categories: [],
    videoUrl: '',
    prerequisites: [],
  });
  
  const queryClient = useQueryClient();
  
  // Fetch tricks from Supabase with better error handling and automatic refresh
  const { data: trickList = [], isLoading, error: fetchError, refetch } = useQuery({
    queryKey: ['tricks'],
    queryFn: fetchTricks,
    refetchOnWindowFocus: true, // Refresh when window regains focus
    retry: 3, // Retry failed requests 3 times
  });
  
  // If there was an error fetching the tricks, show an error toast
  React.useEffect(() => {
    if (fetchError) {
      toast({
        title: "Error fetching tricks",
        description: "There was an error loading the tricks. Please try again.",
        variant: "destructive",
      });
      console.error('Fetch error:', fetchError);
    }
  }, [fetchError, toast]);
  
  // Create trick mutation
  const createTrickMutation = useMutation({
    mutationFn: createTrick,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tricks'] });
      refetch(); // Explicitly trigger a refetch
      toast({
        title: "Success!",
        description: "Trick created successfully.",
      });
      handleCloseDialog();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create trick. Please try again.",
        variant: "destructive",
      });
      console.error('Create trick error:', error);
    }
  });
  
  // Update trick mutation
  const updateTrickMutation = useMutation({
    mutationFn: updateTrick,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tricks'] });
      refetch(); // Explicitly trigger a refetch
      toast({
        title: "Success!",
        description: "Trick updated successfully.",
      });
      handleCloseDialog();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update trick. Please try again.",
        variant: "destructive",
      });
      console.error('Update trick error:', error);
    }
  });
  
  // Delete trick mutation
  const deleteTrickMutation = useMutation({
    mutationFn: deleteTrick,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tricks'] });
      refetch(); // Explicitly trigger a refetch
      toast({
        title: "Success!",
        description: "Trick deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete trick. Please try again.",
        variant: "destructive",
      });
      console.error('Delete trick error:', error);
    }
  });

  const handleOpenAddDialog = () => {
    setFormData({
      name: '',
      level: 'Absolute Novice',
      description: '',
      categories: [],
      videoUrl: '',
      prerequisites: [],
    });
    setIsAddDialogOpen(true);
  };

  const handleOpenEditDialog = (trick: Trick) => {
    setSelectedTrick(trick);
    setFormData({
      name: trick.name,
      level: trick.level,
      description: trick.description,
      categories: trick.categories,
      videoUrl: trick.videoUrl || '',
      prerequisites: trick.prerequisites || [],
    });
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setSelectedTrick(null);
    setFormData({
      name: '',
      level: 'Absolute Novice',
      description: '',
      categories: [],
      videoUrl: '',
      prerequisites: [],
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (category: string) => {
    setFormData(prev => {
      if (prev.categories.includes(category)) {
        return {
          ...prev,
          categories: prev.categories.filter(c => c !== category),
        };
      } else {
        return {
          ...prev,
          categories: [...prev.categories, category],
        };
      }
    });
  };

  const handleSave = () => {
    // Validate form data
    if (!formData.name || formData.categories.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (isEditDialogOpen && selectedTrick) {
      // Updating an existing trick
      const updatedTrick: Trick = {
        ...selectedTrick,
        name: formData.name,
        level: formData.level as TrickLevel,
        description: formData.description,
        categories: formData.categories,
        prerequisites: formData.prerequisites,
        videoUrl: formData.videoUrl,
      };
      
      updateTrickMutation.mutate(updatedTrick);
    } else {
      // Adding a new trick
      const newTrick: Omit<Trick, 'id'> = {
        name: formData.name,
        level: formData.level as TrickLevel,
        description: formData.description,
        categories: formData.categories,
        prerequisites: formData.prerequisites,
        videoUrl: formData.videoUrl,
      };
      
      createTrickMutation.mutate(newTrick);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this trick?")) {
      deleteTrickMutation.mutate(id);
    }
  };

  // Filter tricks based on active tab and search query
  const filteredTricks = useMemo(() => {
    console.log('Filtering tricks:', trickList);
    return trickList.filter(trick => 
      trick.level === activeTab &&
      (searchQuery === '' || 
        trick.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trick.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [trickList, activeTab, searchQuery]);

  return (
    <AdminLayout title="Tricktionary Manager">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate('/admin')}
            className="flex items-center justify-center"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Tricks Database</h1>
        </div>
        <Button onClick={handleOpenAddDialog}>Add Trick</Button>
      </div>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search tricks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <div className="flex space-x-2 flex-wrap gap-2">
          {['Absolute Novice', 'Beginner', 'Intermediate', 'Advanced', 'Expert'].map(level => (
            <Button
              key={level}
              variant={activeTab === level ? 'default' : 'outline'}
              onClick={() => setActiveTab(level)}
            >
              {level}
            </Button>
          ))}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-5 w-[180px]" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-[120px]" /></TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-9 w-[140px] ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredTricks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <p className="text-muted-foreground">No tricks found for the selected level.</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="mt-2"
                    onClick={handleOpenAddDialog}
                  >
                    Add your first trick
                  </Button>
                </TableCell>
              </TableRow>
            ) : (
              filteredTricks.map((trick) => (
                <TableRow key={trick.id}>
                  <TableCell className="font-medium">{trick.name}</TableCell>
                  <TableCell>{trick.description}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {trick.categories.map(category => (
                        <Badge key={category}>{category}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleOpenEditDialog(trick)}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(trick.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={isAddDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
        if (!open) {
          handleCloseDialog();
        }
      }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditDialogOpen ? 'Edit Trick' : 'Add Trick'}</DialogTitle>
            <DialogDescription>
              {isEditDialogOpen ? 'Edit the details of the selected trick.' : 'Create a new trick in the tricktionary.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="level" className="text-right">
                Level
              </Label>
              <Select value={formData.level} onValueChange={(value) => setFormData(prev => ({ ...prev, level: value }))} >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {['Absolute Novice', 'Beginner', 'Intermediate', 'Advanced', 'Expert'].map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right mt-2">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="videoUrl" className="text-right">
                Video URL
              </Label>
              <Input
                type="text"
                id="videoUrl"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Categories
              </Label>
              <div className="col-span-3 flex flex-col gap-2">
                {['Flip', 'Kick', 'Twist', 'Transition', 'Other'].map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={formData.categories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <Label htmlFor={category}>{category}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              onClick={handleSave}
              disabled={createTrickMutation.isPending || updateTrickMutation.isPending}
            >
              {(createTrickMutation.isPending || updateTrickMutation.isPending) ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditDialogOpen ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                isEditDialogOpen ? 'Update Trick' : 'Add Trick'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default TricktionaryManager;
