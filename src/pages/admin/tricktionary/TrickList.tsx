
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Trick } from './types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

interface TrickListProps {
  tricks: Trick[];
  isLoading: boolean;
  error: string | null;
  onEditClick: (trick: Trick) => void;
  onDeleteClick: (id: string) => void;
}

const TrickList: React.FC<TrickListProps> = ({
  tricks,
  isLoading,
  error,
  onEditClick,
  onDeleteClick,
}) => {
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (tricks.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">No tricks found. Try adjusting your filters or add a new trick.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>
        {tricks.length} tricks in the database
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Level</TableHead>
          <TableHead>Categories</TableHead>
          <TableHead className="w-[150px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tricks.map((trick) => (
          <TableRow key={trick.id}>
            <TableCell className="font-medium">{trick.name}</TableCell>
            <TableCell>
              <Badge variant={
                trick.level === 'beginner' ? 'default' :
                trick.level === 'intermediate' ? 'secondary' :
                trick.level === 'advanced' ? 'destructive' : 'outline'
              }>
                {trick.level.charAt(0).toUpperCase() + trick.level.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {trick.categories.map((category) => (
                  <Badge key={category} variant="outline" className="mr-1">
                    {category}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEditClick(trick)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete ${trick.name}?`)) {
                      onDeleteClick(trick.id);
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TrickList;
