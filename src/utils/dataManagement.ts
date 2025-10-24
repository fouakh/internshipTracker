import { Application } from '../types/application';

export const exportData = (applications: Application[]) => {
  const dataStr = JSON.stringify(applications, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = `internship-applications-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const importData = (file: File): Promise<Application[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (Array.isArray(data)) {
          // Validate the structure of imported data
          const validApplications = data.filter(item => 
            item.id && 
            item.companyName && 
            item.position && 
            item.status
          );
          resolve(validApplications);
        } else {
          reject(new Error('Invalid file format'));
        }
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.readAsText(file);
  });
};