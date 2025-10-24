import React from 'react';
import { ExternalLink, Calendar, User, Tag, Globe, FileText } from 'lucide-react';
import { Application } from '../types/application';
import { StatusBadge } from './StatusBadge';

interface ApplicationTableProps {
  applications: Application[];
  onRowClick: (application: Application) => void;
}

export const ApplicationTable: React.FC<ApplicationTableProps> = ({
  applications,
  onRowClick
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (applications.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
        <FileText size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No applications found
        </h3>
        <p className="text-gray-500">
          Try adjusting your filters or create a new application
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white shadow-sm rounded-xl border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company & Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type & Source
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Link
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map((application) => (
              <tr
                key={application.id}
                onClick={() => onRowClick(application)}
                className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {application.companyName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {application.position}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <Calendar size={14} className="mr-2 text-gray-400" />
                    {formatDate(application.appliedOn)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <User size={14} className="mr-2 text-gray-400" />
                    {application.contactPerson || 'Not specified'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-900">
                      <Tag size={14} className="mr-2 text-gray-400" />
                      {application.applicationType}
                    </div>
                    {application.source && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Globe size={14} className="mr-2 text-gray-400" />
                        {application.source}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={application.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {application.applicationLink ? (
                    <a
                      href={application.applicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-150"
                    >
                      <ExternalLink size={14} className="mr-1" />
                      Open
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm">No link</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};