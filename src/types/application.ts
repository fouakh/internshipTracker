export interface Application {
  id: string;
  companyName: string;
  position: string;
  appliedOn: string;
  contactPerson: string;
  applicationLink: string;
  applicationType: 'Spontaneous' | 'Job Posting';
  source: string;
  status: ApplicationStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type ApplicationStatus = 
  | 'Draft'
  | 'Applied'
  | 'In Review'
  | 'Interview'
  | 'Offer'
  | 'Rejected'
  | 'Archived';

export const STATUS_CONFIG: Record<ApplicationStatus, { color: string; bgColor: string; textColor: string }> = {
  Draft: { color: '#6B7280', bgColor: '#F3F4F6', textColor: '#374151' },
  Applied: { color: '#3B82F6', bgColor: '#EBF8FF', textColor: '#1E40AF' },
  'In Review': { color: '#F59E0B', bgColor: '#FFFBEB', textColor: '#92400E' },
  Interview: { color: '#F97316', bgColor: '#FFF7ED', textColor: '#C2410C' },
  Offer: { color: '#10B981', bgColor: '#ECFDF5', textColor: '#047857' },
  Rejected: { color: '#EF4444', bgColor: '#FEF2F2', textColor: '#DC2626' },
  Archived: { color: '#9CA3AF', bgColor: '#F9FAFB', textColor: '#6B7280' }
};