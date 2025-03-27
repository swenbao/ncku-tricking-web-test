
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash, ArrowUp, ArrowDown } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { pointPackages, PointPackage } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

interface CourseCardFormData {
  id?: string;
  name: string;
  points: number;
  price: number;
  description: string;
  popular?: boolean;
  validity?: string;
  eligibleBuyers?: string[];
}

const CourseCardManager = () => {
  const { toast } = useToast();
  const [courseCards, setCourseCards] = useState<PointPackage[]>(pointPackages);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<PointPackage | null>(null);
  const [formData, setFormData] = useState<CourseCardFormData>({
    name: '',
    points: 0,
    price: 0,
    description: '',
    validity: 'Unlimited',
    eligibleBuyers: ['All'],
  });
  
  const handleAddCard = () => {
    setFormData({
      name: '',
      points: 0,
      price: 0,
      description: '',
      validity: 'Unlimited',
      eligibleBuyers: ['All'],
    });
    setIsAddDialogOpen(true);
  };
  
  const handleEditCard = (card: PointPackage) => {
    setSelectedCard(card);
    setFormData({
      id: card.id,
      name: card.name,
      points: card.points,
      price: card.price,
      description: card.description,
      popular: card.popular,
      validity: 'Unlimited', // Default value, would come from database in real app
      eligibleBuyers: ['All'], // Default value, would come from database in real app
    });
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteCard = (cardId: string) => {
    setCourseCards(prev => prev.filter(card => card.id !== cardId));
    toast({
      title: "Course Card Deleted",
      description: "The course card has been removed from the system.",
    });
  };
  
  const handleSaveCard = () => {
    // Validation
    if (!formData.name || formData.points <= 0 || formData.price <= 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields with valid values.",
        variant: "destructive",
      });
      return;
    }
    
    if (isAddDialogOpen) {
      // Add new course card
      const newCard: PointPackage = {
        id: Date.now().toString(),
        name: formData.name,
        points: formData.points,
        price: formData.price,
        description: formData.description,
        popular: formData.popular,
      };
      
      setCourseCards(prev => [...prev, newCard]);
      toast({
        title: "Course Card Added",
        description: "The new course card has been added to the system.",
      });
      setIsAddDialogOpen(false);
    } else if (isEditDialogOpen && selectedCard) {
      // Edit existing course card
      setCourseCards(prev => 
        prev.map(card => 
          card.id === selectedCard.id ? {
            ...card,
            name: formData.name,
            points: formData.points,
            price: formData.price,
            description: formData.description,
            popular: formData.popular,
          } : card
        )
      );
      toast({
        title: "Course Card Updated",
        description: "The course card has been updated successfully.",
      });
      setIsEditDialogOpen(false);
    }
  };
  
  const handleMoveCard = (cardId: string, direction: 'up' | 'down') => {
    const index = courseCards.findIndex(card => card.id === cardId);
    if (index === -1) return;
    
    const newCardList = [...courseCards];
    
    if (direction === 'up' && index > 0) {
      // Move up (swap with previous item)
      [newCardList[index], newCardList[index - 1]] = [newCardList[index - 1], newCardList[index]];
    } else if (direction === 'down' && index < newCardList.length - 1) {
      // Move down (swap with next item)
      [newCardList[index], newCardList[index + 1]] = [newCardList[index + 1], newCardList[index]];
    }
    
    setCourseCards(newCardList);
  };
  
  const togglePopular = (cardId: string) => {
    setCourseCards(prev => 
      prev.map(card => 
        card.id === cardId ? { ...card, popular: !card.popular } : card
      )
    );
  };
  
  return (
    <AdminLayout title="Course Card Management">
      <div className="flex justify-end mb-6">
        <Button onClick={handleAddCard}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Course Card
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courseCards.map((card, index) => (
          <Card 
            key={card.id} 
            className={`relative ${card.popular ? 'border-2 border-accent' : ''}`}
          >
            {card.popular && (
              <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/3">
                <Badge className="bg-accent text-white">Popular</Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle>{card.name}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">${card.price}</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Points:</span>
                  <span className="font-medium">{card.points}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Validity:</span>
                  <span className="font-medium">Unlimited</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Eligible Buyers:</span>
                  <span className="font-medium">All</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleMoveCard(card.id, 'up')}
                  disabled={index === 0}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleMoveCard(card.id, 'down')}
                  disabled={index === courseCards.length - 1}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => togglePopular(card.id)}
                >
                  {card.popular ? 'Remove Popular' : 'Mark Popular'}
                </Button>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditCard(card)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDeleteCard(card.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Add Card Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Course Card</DialogTitle>
            <DialogDescription>
              Create a new course card for students to purchase.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Card Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Basic Package"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="points">Points</Label>
                <Input
                  id="points"
                  type="number"
                  min="1"
                  value={formData.points}
                  onChange={(e) => setFormData({...formData, points: parseInt(e.target.value) || 0})}
                  placeholder="e.g. 10"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                  placeholder="e.g. 99.99"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="validity">Validity Period</Label>
              <Select
                value={formData.validity}
                onValueChange={(value) => setFormData({...formData, validity: value})}
              >
                <SelectTrigger id="validity">
                  <SelectValue placeholder="Select validity period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 Month">1 Month</SelectItem>
                  <SelectItem value="3 Months">3 Months</SelectItem>
                  <SelectItem value="6 Months">6 Months</SelectItem>
                  <SelectItem value="1 Year">1 Year</SelectItem>
                  <SelectItem value="Unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="eligibleBuyers">Eligible Buyers</Label>
              <Select
                value={formData.eligibleBuyers?.[0] || "All"}
                onValueChange={(value) => setFormData({...formData, eligibleBuyers: [value]})}
              >
                <SelectTrigger id="eligibleBuyers">
                  <SelectValue placeholder="Select eligible buyers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Members</SelectItem>
                  <SelectItem value="Beginner">Beginner Students</SelectItem>
                  <SelectItem value="Advanced">Advanced Students</SelectItem>
                  <SelectItem value="Club">Club Members Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Enter card description"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="popular"
                checked={formData.popular || false}
                onChange={(e) => setFormData({...formData, popular: e.target.checked})}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <Label htmlFor="popular">Mark as popular</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCard}>Save Course Card</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Card Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Course Card</DialogTitle>
            <DialogDescription>
              Update course card details.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Card Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Basic Package"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-points">Points</Label>
                <Input
                  id="edit-points"
                  type="number"
                  min="1"
                  value={formData.points}
                  onChange={(e) => setFormData({...formData, points: parseInt(e.target.value) || 0})}
                  placeholder="e.g. 10"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Price ($)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                  placeholder="e.g. 99.99"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-validity">Validity Period</Label>
              <Select
                value={formData.validity}
                onValueChange={(value) => setFormData({...formData, validity: value})}
              >
                <SelectTrigger id="edit-validity">
                  <SelectValue placeholder="Select validity period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 Month">1 Month</SelectItem>
                  <SelectItem value="3 Months">3 Months</SelectItem>
                  <SelectItem value="6 Months">6 Months</SelectItem>
                  <SelectItem value="1 Year">1 Year</SelectItem>
                  <SelectItem value="Unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-eligibleBuyers">Eligible Buyers</Label>
              <Select
                value={formData.eligibleBuyers?.[0] || "All"}
                onValueChange={(value) => setFormData({...formData, eligibleBuyers: [value]})}
              >
                <SelectTrigger id="edit-eligibleBuyers">
                  <SelectValue placeholder="Select eligible buyers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Members</SelectItem>
                  <SelectItem value="Beginner">Beginner Students</SelectItem>
                  <SelectItem value="Advanced">Advanced Students</SelectItem>
                  <SelectItem value="Club">Club Members Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Enter card description"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="edit-popular"
                checked={formData.popular || false}
                onChange={(e) => setFormData({...formData, popular: e.target.checked})}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <Label htmlFor="edit-popular">Mark as popular</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCard}>Update Course Card</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default CourseCardManager;
