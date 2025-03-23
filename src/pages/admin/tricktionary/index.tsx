
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useTricktionaryManager } from './useTricktionaryManager';
import TrickList from './TrickList';
import TrickDialog from './TrickDialog';
import TrickFilterBar from './TrickFilterBar';

const TricktionaryManager = () => {
  const {
    tricks,
    allTricks,
    isLoading,
    error,
    selectedTrick,
    isDialogOpen,
    filterCategory,
    filterLevel,
    searchQuery,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    saveTrick,
    deleteTrick,
    setFilterCategory,
    setFilterLevel,
    setSearchQuery,
  } = useTricktionaryManager();

  // Extract all unique categories from all tricks
  const allCategories = React.useMemo(() => {
    const categories = new Set<string>();
    allTricks.forEach(trick => {
      trick.categories.forEach(category => {
        categories.add(category);
      });
    });
    return Array.from(categories).sort();
  }, [allTricks]);

  return (
    <AdminLayout title="Tricktionary Manager">
      <TrickFilterBar
        categories={allCategories}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterLevel={filterLevel}
        setFilterLevel={setFilterLevel}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCreateClick={openCreateDialog}
      />

      <TrickList
        tricks={tricks}
        isLoading={isLoading}
        error={error}
        onEditClick={openEditDialog}
        onDeleteClick={deleteTrick}
      />

      <TrickDialog
        isOpen={isDialogOpen}
        trick={selectedTrick}
        onClose={closeDialog}
        onSave={saveTrick}
        categories={allCategories}
      />
    </AdminLayout>
  );
};

export default TricktionaryManager;
