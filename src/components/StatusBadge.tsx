import React from 'react';
import { ApplicationStatus, STATUS_CONFIG } from '../types/application';

interface StatusBadgeProps {
  status: ApplicationStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = STATUS_CONFIG[status];
  
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-200"
      style={{
        backgroundColor: config.bgColor,
        color: config.textColor,
        borderColor: config.color,
        borderWidth: '1px'
      }}
    >
      <div
        className="w-2 h-2 rounded-full mr-1.5"
        style={{ backgroundColor: config.color }}
      />
      {status}
    </span>
  );
};