
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash, Calendar } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { enhancedClassData, classTypes, difficultyLevels } from '@/lib/bookingData';
import { ClassData } from '@/hooks/booking/types';

interface ClassFormData {
  id?: string;
  name: string;
  type: string;
  difficulty: string;
  day: string;
  time: string;
  pointsCost: number;
  description: string;
  instructor: string;
  maxCapacity: number;
  availableSpots: number;
  location?: string;
  bookingStartDate?: string;
  bookingEndDate?: string;
}

const emptyFormData: ClassFormData = {
  name: '',
  type: '',
  difficulty: '',
  day: '',
  time: '',
  pointsCost: 1,
  description: '',
  instructor: '',
  maxCapacity: 10,
  availableSpots: 10
};

const ClassManager = () => {
  const { toast } = useToast();
  const [classes, setClasses] = useState<ClassData[]>(enhancedClassData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('classes');
  const [formData, setFormData] = useState<ClassFormData>(emptyFormData);
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  
  const handleAddClass = () => {
    setFormData(emptyFormData);
    setIsAddDialogOpen(true);
  };
  
  const handleEditClass = (classItem: ClassData) => {
    setSelectedClass(classItem);
    setFormData({
      id: classItem.id,
      name: classItem.name,
      type: classItem.type,
      difficulty: classItem.difficulty,
      day: classItem.day,
      time: classItem.time,
      pointsCost: classItem.pointsCost,
      description: classItem.description,
      instructor: classItem.instructor,
      maxCapacity: classItem.maxCapacity,
      availableSpots: classItem.availableSpots,
      location: '',
      bookingStartDate: '',
      bookingEndDate: ''
    });
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteClass = (classId: string) => {
    setClasses(prev => prev.filter(c => c.id !== classId));
    toast({
      title: "Class Deleted",
      description: "The class has been removed from the system.",
    });
  };
  
  const handleSaveClass = () => {
    // Validation
    if (!formData.name || !formData.type || !formData.difficulty || !formData.day || !formData.time) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (isAddDialogOpen) {
      // Add new class
      const newClass: ClassData = {
        id: Date.now().toString(),
        name: formData.name,
        type: formData.type,
        difficulty: formData.difficulty,
        day: formData.day,
        time: formData.time,
        pointsCost: formData.pointsCost,
        description: formData.description,
        instructor: formData.instructor,
        maxCapacity: formData.maxCapacity,
        availableSpots: formData.availableSpots
      };
      
      setClasses(prev => [...prev, newClass]);
      toast({
        title: "Class Added",
        description: "The new class has been added to the system.",
      });
      setIsAddDialogOpen(false);
    } else if (isEditDialogOpen && selectedClass) {
      // Edit existing class
      setClasses(prev => 
        prev.map(c => 
          c.id === selectedClass.id ? {
            ...c,
            name: formData.name,
            type: formData.type,
            difficulty: formData.difficulty,
            day: formData.day,
            time: formData.time,
            pointsCost: formData.pointsCost,
            description: formData.description,
            instructor: formData.instructor,
            maxCapacity: formData.maxCapacity,
            availableSpots: formData.availableSpots
          } : c
        )
      );
      toast({
        title: "Class Updated",
        description: "The class has been updated successfully.",
      });
      setIsEditDialogOpen(false);
    }
  };
  
  const handleConfigureSave = () => {
    toast({
      title: "Configuration Saved",
      description: "The booking flow configuration has been updated.",
    });
  };
  
  return (
    <AdminLayout title="Class Management">
      <Tabs defaultValue="classes" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="booking-flow">Booking Flow</TabsTrigger>
        </TabsList>
        
        <TabsContent value="classes">
          <div className="flex justify-end mb-6">
            <Button onClick={handleAddClass}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Class
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {classes.map(classItem => (
              <Card key={classItem.id} className="relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-2 h-full ${
                  classItem.difficulty === 'beginner' ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{classItem.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {classItem.day} {classItem.time}
                      </CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClass(classItem)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteClass(classItem.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-1 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">
                        {classTypes.find(t => t.id === classItem.type)?.name || classItem.type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Difficulty:</span>
                      <span className="font-medium">
                        {difficultyLevels.find(d => d.id === classItem.difficulty)?.name || classItem.difficulty}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Points Cost:</span>
                      <span className="font-medium">{classItem.pointsCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Instructor:</span>
                      <span className="font-medium">{classItem.instructor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capacity:</span>
                      <span className="font-medium">{classItem.availableSpots}/{classItem.maxCapacity}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {classItem.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="booking-flow">
          <Card>
            <CardHeader>
              <CardTitle>Booking Flow Configuration</CardTitle>
              <CardDescription>
                Configure how students navigate through the booking process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>First Selection Step</Label>
                  <Select defaultValue="difficulty">
                    <SelectTrigger>
                      <SelectValue placeholder="Select first step" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="difficulty">Difficulty Level</SelectItem>
                      <SelectItem value="type">Class Type</SelectItem>
                      <SelectItem value="day">Day of Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Second Selection Step</Label>
                  <Select defaultValue="type">
                    <SelectTrigger>
                      <SelectValue placeholder="Select second step" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="difficulty">Difficulty Level</SelectItem>
                      <SelectItem value="type">Class Type</SelectItem>
                      <SelectItem value="day">Day of Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Show Available Classes Step</Label>
                  <Select defaultValue="schedule">
                    <SelectTrigger>
                      <SelectValue placeholder="Select third step" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="schedule">Schedule View</SelectItem>
                      <SelectItem value="calendar">Calendar View</SelectItem>
                      <SelectItem value="list">List View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={handleConfigureSave} className="w-full mt-4">
                  Save Booking Flow Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add Class Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Class</DialogTitle>
            <DialogDescription>
              Create a new class in the system.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Class Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter class name"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Class Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({...formData, type: value})}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {classTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) => setFormData({...formData, difficulty: value})}
                >
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficultyLevels.map(level => (
                      <SelectItem key={level.id} value={level.id}>
                        {level.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="day">Day</Label>
                <Select
                  value={formData.day}
                  onValueChange={(value) => setFormData({...formData, day: value})}
                >
                  <SelectTrigger id="day">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monday">Monday</SelectItem>
                    <SelectItem value="Tuesday">Tuesday</SelectItem>
                    <SelectItem value="Wednesday">Wednesday</SelectItem>
                    <SelectItem value="Thursday">Thursday</SelectItem>
                    <SelectItem value="Friday">Friday</SelectItem>
                    <SelectItem value="Saturday">Saturday</SelectItem>
                    <SelectItem value="Sunday">Sunday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  placeholder="e.g. 18:30-19:30"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="pointsCost">Points Cost</Label>
                <Input
                  id="pointsCost"
                  type="number"
                  min="0"
                  value={formData.pointsCost}
                  onChange={(e) => setFormData({...formData, pointsCost: parseInt(e.target.value) || 0})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="maxCapacity">Max Capacity</Label>
                <Input
                  id="maxCapacity"
                  type="number"
                  min="1"
                  value={formData.maxCapacity}
                  onChange={(e) => setFormData({...formData, maxCapacity: parseInt(e.target.value) || 1})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="availableSpots">Available Spots</Label>
                <Input
                  id="availableSpots"
                  type="number"
                  min="0"
                  max={formData.maxCapacity}
                  value={formData.availableSpots}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setFormData({...formData, availableSpots: Math.min(value, formData.maxCapacity)});
                  }}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="instructor">Instructor</Label>
              <Input
                id="instructor"
                value={formData.instructor}
                onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                placeholder="Enter instructor name"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="location">Location (Optional)</Label>
              <Input
                id="location"
                value={formData.location || ''}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Enter class location"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Enter class description"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveClass}>Save Class</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Class Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Class</DialogTitle>
            <DialogDescription>
              Update class details in the system.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Class Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter class name"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-type">Class Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({...formData, type: value})}
                >
                  <SelectTrigger id="edit-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {classTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-difficulty">Difficulty Level</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) => setFormData({...formData, difficulty: value})}
                >
                  <SelectTrigger id="edit-difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficultyLevels.map(level => (
                      <SelectItem key={level.id} value={level.id}>
                        {level.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-day">Day</Label>
                <Select
                  value={formData.day}
                  onValueChange={(value) => setFormData({...formData, day: value})}
                >
                  <SelectTrigger id="edit-day">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monday">Monday</SelectItem>
                    <SelectItem value="Tuesday">Tuesday</SelectItem>
                    <SelectItem value="Wednesday">Wednesday</SelectItem>
                    <SelectItem value="Thursday">Thursday</SelectItem>
                    <SelectItem value="Friday">Friday</SelectItem>
                    <SelectItem value="Saturday">Saturday</SelectItem>
                    <SelectItem value="Sunday">Sunday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-time">Time</Label>
                <Input
                  id="edit-time"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  placeholder="e.g. 18:30-19:30"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-pointsCost">Points Cost</Label>
                <Input
                  id="edit-pointsCost"
                  type="number"
                  min="0"
                  value={formData.pointsCost}
                  onChange={(e) => setFormData({...formData, pointsCost: parseInt(e.target.value) || 0})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-maxCapacity">Max Capacity</Label>
                <Input
                  id="edit-maxCapacity"
                  type="number"
                  min="1"
                  value={formData.maxCapacity}
                  onChange={(e) => setFormData({...formData, maxCapacity: parseInt(e.target.value) || 1})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-availableSpots">Available Spots</Label>
                <Input
                  id="edit-availableSpots"
                  type="number"
                  min="0"
                  max={formData.maxCapacity}
                  value={formData.availableSpots}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setFormData({...formData, availableSpots: Math.min(value, formData.maxCapacity)});
                  }}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-instructor">Instructor</Label>
              <Input
                id="edit-instructor"
                value={formData.instructor}
                onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                placeholder="Enter instructor name"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-location">Location (Optional)</Label>
              <Input
                id="edit-location"
                value={formData.location || ''}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Enter class location"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Enter class description"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveClass}>Update Class</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ClassManager;
