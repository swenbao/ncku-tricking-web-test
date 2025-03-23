
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Trick, TrickLevel } from './types';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface TrickDialogProps {
  isOpen: boolean;
  trick: Trick | null;
  onClose: () => void;
  onSave: (trick: Trick) => void;
  categories: string[];
}

const TrickDialog: React.FC<TrickDialogProps> = ({
  isOpen,
  trick,
  onClose,
  onSave,
  categories,
}) => {
  const [formData, setFormData] = useState<Trick>({
    id: '',
    name: '',
    description: '',
    level: 'beginner',
    videoUrl: '',
    prerequisites: [],
    categories: [],
  });
  const [newCategory, setNewCategory] = useState('');
  const [newPrerequisite, setNewPrerequisite] = useState('');

  // Reset form when trick changes
  useEffect(() => {
    if (trick) {
      setFormData({
        ...trick,
        videoUrl: trick.videoUrl || trick.video_url || '',
      });
    }
  }, [trick]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLevelChange = (value: string) => {
    setFormData(prev => ({ ...prev, level: value as TrickLevel }));
  };

  const handleAddCategory = () => {
    if (newCategory && !formData.categories.includes(newCategory)) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory],
      }));
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== category),
    }));
  };

  const handleAddPrerequisite = () => {
    if (newPrerequisite && !formData.prerequisites?.includes(newPrerequisite)) {
      setFormData(prev => ({
        ...prev,
        prerequisites: [...(prev.prerequisites || []), newPrerequisite],
      }));
      setNewPrerequisite('');
    }
  };

  const handleRemovePrerequisite = (prerequisite: string) => {
    setFormData(prev => ({
      ...prev,
      prerequisites: prev.prerequisites?.filter(p => p !== prerequisite) || [],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {trick?.id ? 'Edit Trick' : 'Create New Trick'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Trick Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Difficulty Level</Label>
              <Select 
                value={formData.level} 
                onValueChange={handleLevelChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input
                id="videoUrl"
                name="videoUrl"
                value={formData.videoUrl || ''}
                onChange={handleChange}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <div className="space-y-2">
              <Label>Categories</Label>
              <div className="flex space-x-2">
                <Input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Add a category"
                  list="category-suggestions"
                />
                <datalist id="category-suggestions">
                  {categories.map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
                <Button type="button" onClick={handleAddCategory}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.categories.map((category) => (
                  <Badge key={category} variant="secondary" className="flex items-center gap-1">
                    {category}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handleRemoveCategory(category)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Prerequisites</Label>
              <div className="flex space-x-2">
                <Input
                  value={newPrerequisite}
                  onChange={(e) => setNewPrerequisite(e.target.value)}
                  placeholder="Add a prerequisite trick"
                />
                <Button type="button" onClick={handleAddPrerequisite}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.prerequisites?.map((prerequisite) => (
                  <Badge key={prerequisite} variant="outline" className="flex items-center gap-1">
                    {prerequisite}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handleRemovePrerequisite(prerequisite)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {trick?.id ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TrickDialog;
