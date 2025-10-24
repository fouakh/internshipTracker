import React from 'react';
import { Filter, Calendar, ArrowUpDown } from 'lucide-react';
import { ApplicationStatus } from '../types/application';

interface FilterBarProps {
  statusFilter: ApplicationStatus | 'All';
  typeFilter: string;
  sourceFilter: string;
  sortBy: 'newest' | 'oldest';
  onStatusFilterChange: (status: ApplicationStatus | 'All') => void;
  onTypeFilterChange: (type: string) => void;
  onSourceFilterChange: (source: string) => void;
  onSortChange: (sort: 'newest' | 'oldest') => void;
  availableTypes: string[];
  availableSources: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  statusFilter,
  typeFilter,
  sourceFilter,
  sortBy,
  onStatusFilterChange,
  onTypeFilterChange,
  onSourceFilterChange,
  onSortChange,
  availableTypes,
  availableSources
}) => {
  const statusOptions: (ApplicationStatus | 'All')[] = [
    'All', 'Draft', 'Applied', 'In Review', 'Interview', 'Offer', 'Rejected', 'Archived'
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
      <div className="flex items-center space-x-4 flex-wrap gap-y-3">
        <div className="flex items-center space-x-2">
          <Filter size={16} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value as ApplicationStatus | 'All')}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">
            Type
          </label>
          <select
            value={typeFilter}
            onChange={(e) => onTypeFilterChange(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200"
          >
            <option value="All">All Types</option>
            {availableTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">
            Source
          </label>
          <select
            value={sourceFilter}
            onChange={(e) => onSourceFilterChange(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200"
          >
            <option value="All">All Sources</option>
            {availableSources.map(source => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2 ml-auto">
          <Calendar size={16} className="text-gray-500" />
          <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">
            Sort by Date
          </label>
          <button
            onClick={() => onSortChange(sortBy === 'newest' ? 'oldest' : 'newest')}
            className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-150"
          >
            <ArrowUpDown size={14} className="mr-1.5" />
            {sortBy === 'newest' ? 'Newest First' : 'Oldest First'}
          </button>
        </div>
      </div>
    </div>
  );
};