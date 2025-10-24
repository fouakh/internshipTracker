import React, { useState, useEffect } from 'react';
import { Application, ApplicationStatus } from './types/application';
import { ApplicationTable } from './components/ApplicationTable';
import { ApplicationModal } from './components/ApplicationModal';
import { ApplicationDetails } from './components/ApplicationDetails';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { useLocalStorage } from './hooks/useLocalStorage';
import { exportData, importData } from './utils/dataManagement';

function App() {
  const [applications, setApplications] = useLocalStorage<Application[]>('internship-applications', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  
  // Filter and sort states
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'All'>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [sourceFilter, setSourceFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  // Get unique values for filter options
  const availableTypes = Array.from(new Set(applications.map(app => app.applicationType))).filter(Boolean);
  const availableSources = Array.from(new Set(applications.map(app => app.source))).filter(Boolean);

  // Filter and sort applications
  const filteredAndSortedApplications = applications
    .filter(app => {
      if (statusFilter !== 'All' && app.status !== statusFilter) return false;
      if (typeFilter !== 'All' && app.applicationType !== typeFilter) return false;
      if (sourceFilter !== 'All' && app.source !== sourceFilter) return false;
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.appliedOn).getTime();
      const dateB = new Date(b.appliedOn).getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

  const handleNewApplication = () => {
    setSelectedApplication(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEditApplication = (application: Application) => {
    setSelectedApplication(application);
    setModalMode('edit');
    setIsDetailsOpen(false);
    setIsModalOpen(true);
  };

  const handleRowClick = (application: Application) => {
    setSelectedApplication(application);
    setIsDetailsOpen(true);
  };

  const handleSaveApplication = (applicationData: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    
    if (modalMode === 'create') {
      const newApplication: Application = {
        ...applicationData,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      };
      setApplications([...applications, newApplication]);
    } else if (selectedApplication) {
      const updatedApplication: Application = {
        ...selectedApplication,
        ...applicationData,
        updatedAt: now,
      };
      setApplications(applications.map(app => 
        app.id === selectedApplication.id ? updatedApplication : app
      ));
    }
  };

  const handleExportData = () => {
    exportData(applications);
  };

  const handleImportData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const importedApplications = await importData(file);
        // Merge with existing applications, avoiding duplicates
        const existingIds = new Set(applications.map(app => app.id));
        const newApplications = importedApplications.filter(app => !existingIds.has(app.id));
        
        if (newApplications.length > 0) {
          setApplications([...applications, ...newApplications]);
          alert(`Successfully imported ${newApplications.length} applications!`);
        } else {
          alert('No new applications to import.');
        }
      } catch (error) {
        alert('Error importing file: ' + (error as Error).message);
      }
    }
    // Clear the input
    event.target.value = '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onNewApplication={handleNewApplication}
        onExportData={handleExportData}
        onImportData={handleImportData}
        applicationCount={applications.length}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterBar
          statusFilter={statusFilter}
          typeFilter={typeFilter}
          sourceFilter={sourceFilter}
          sortBy={sortBy}
          onStatusFilterChange={setStatusFilter}
          onTypeFilterChange={setTypeFilter}
          onSourceFilterChange={setSourceFilter}
          onSortChange={setSortBy}
          availableTypes={availableTypes}
          availableSources={availableSources}
        />

        <ApplicationTable
          applications={filteredAndSortedApplications}
          onRowClick={handleRowClick}
        />
      </main>

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveApplication}
        application={selectedApplication}
        mode={modalMode}
      />

      {selectedApplication && (
        <ApplicationDetails
          application={selectedApplication}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          onEdit={() => handleEditApplication(selectedApplication)}
        />
      )}
    </div>
  );
}

export default App;