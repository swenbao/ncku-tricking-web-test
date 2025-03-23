
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Skeleton from '@/components/ui/skeleton';
import { Trick } from '@/lib/data';

interface TrickListProps {
  tricks: Trick[];
  isLoading: boolean;
  onEdit: (trick: Trick) => void;
  onDelete: (id: string) => void;
}

const TrickList: React.FC<TrickListProps> = ({ tricks, isLoading, onEdit, onDelete }) => {
  return (
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
          ) : tricks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">
                <p className="text-muted-foreground">No tricks found for the selected level.</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="mt-2"
                  onClick={() => document.getElementById('add-trick-button')?.click()}
                >
                  Add your first trick
                </Button>
              </TableCell>
            </TableRow>
          ) : (
            tricks.map((trick) => (
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
                    onClick={() => onEdit(trick)}
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(trick.id)}
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
  );
};

export default TrickList;
