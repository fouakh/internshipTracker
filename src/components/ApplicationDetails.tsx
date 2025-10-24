import React from 'react';
import { X, Calendar, User, ExternalLink, Tag, Globe, FileText, CreditCard as Edit2 } from 'lucide-react';
import { Application } from '../types/application';
import { StatusBadge } from './StatusBadge';

interface ApplicationDetailsProps {
  application: Application;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
}

export const ApplicationDetails: React.FC<ApplicationDetailsProps> = ({
  application,
  isOpen,
  onClose,
  onEdit
}) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />
        
        <div className="inline-block w-full max-w-2xl p-6 my-8 text-left transition-all transform bg-white shadow-xl rounded-xl align-middle">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {application.companyName}
              </h2>
              <p className="text-lg text-gray-600">
                {application.position}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={onEdit}
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100"
                title="Edit Application"
              >
                <Edit2 size={20} />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <StatusBadge status={application.status} />
              {application.applicationLink && (
                <a
                  href={application.applicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors duration-150"
                >
                  <ExternalLink size={14} className="mr-1.5" />
                  View Application
                </a>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar size={16} className="text-purple-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Applied On</p>
                    <p className="text-sm text-gray-600">
                      {formatDate(application.appliedOn)}
                    </p>
                  </div>
                </div>

                {application.contactPerson && (
                  <div className="flex items-center space-x-3">
                    <User size={16} className="text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Contact Person</p>
                      <p className="text-sm text-gray-600">
                        {application.contactPerson}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <Tag size={16} className="text-indigo-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Application Type</p>
                    <p className="text-sm text-gray-600">
                      {application.applicationType}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {application.source && (
                  <div className="flex items-center space-x-3">
                    <Globe size={16} className="text-teal-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Source</p>
                      <p className="text-sm text-gray-600">
                        {application.source}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3">
                  <FileText size={16} className="text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Created</p>
                    <p className="text-sm text-gray-600">
                      {formatDateTime(application.createdAt)}
                    </p>
                  </div>
                </div>

                {application.updatedAt !== application.createdAt && (
                  <div className="flex items-start space-x-3">
                    <FileText size={16} className="text-yellow-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Last Updated</p>
                      <p className="text-sm text-gray-600">
                        {formatDateTime(application.updatedAt)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {application.notes && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Notes</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {application.notes}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};