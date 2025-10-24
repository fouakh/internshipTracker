import React from 'react';
import { Plus, Moon, Sun, Download, Upload, FileText } from 'lucide-react';

interface HeaderProps {
  onNewApplication: () => void;
  onExportData: () => void;
  onImportData: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  applicationCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onNewApplication,
  onExportData,
  onImportData,
  isDarkMode,
  onToggleDarkMode,
  applicationCount
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">
                  Internship Tracker
                </h1>
                <p className="text-sm text-gray-500">
                  {applicationCount} total {applicationCount === 1 ? 'application' : 'applications'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <button
                onClick={onExportData}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                title="Export Data"
              >
                <Download size={16} className="mr-2" />
                Export
              </button>

              <button
                onClick={handleImportClick}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                title="Import Data"
              >
                <Upload size={16} className="mr-2" />
                Import
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={onImportData}
                className="hidden"
              />
            </div>

            <button
              onClick={onNewApplication}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-150 shadow-sm"
            >
              <Plus size={16} className="mr-2" />
              New Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};