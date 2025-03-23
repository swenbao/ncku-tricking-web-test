
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import TrickList from './TrickList';
import TrickDialog from './TrickDialog';
import TrickFilterBar from './TrickFilterBar';
import { useTricktionaryManager } from './useTricktionaryManager';

const TricktionaryManager = () => {
  const navigate = useNavigate();
  const {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    filteredTricks,
    isLoading,
    isAddDialogOpen,
    isEditDialogOpen,
    formData,
    createTrickMutation,
    updateTrickMutation,
    handleOpenAddDialog,
    handleOpenEditDialog,
    handleCloseDialog,
    handleInputChange,
    handleCategoryChange,
    handleLevelChange,
    handleSave,
    handleDelete,
  } = useTricktionaryManager();

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
        <Button id="add-trick-button" onClick={handleOpenAddDialog}>Add Trick</Button>
      </div>

      <TrickFilterBar
        searchQuery={searchQuery}
        activeTab={activeTab}
        onSearchChange={setSearchQuery}
        onTabChange={setActiveTab}
      />

      <TrickList
        tricks={filteredTricks}
        isLoading={isLoading}
        onEdit={handleOpenEditDialog}
        onDelete={handleDelete}
      />

      <TrickDialog
        isOpen={isAddDialogOpen || isEditDialogOpen}
        isEditing={isEditDialogOpen}
        formData={formData}
        isSubmitting={createTrickMutation.isPending || updateTrickMutation.isPending}
        onInputChange={handleInputChange}
        onCategoryChange={handleCategoryChange}
        onLevelChange={handleLevelChange}
        onSave={handleSave}
        onClose={handleCloseDialog}
      />
    </AdminLayout>
  );
};

export default TricktionaryManager;
