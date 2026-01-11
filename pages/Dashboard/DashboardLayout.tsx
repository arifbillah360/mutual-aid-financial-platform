import React from 'react';
import { Sidebar } from '../../components/Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  isAdmin?: boolean;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, isAdmin = false }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <div className="md:sticky md:top-0 md:h-screen"> {/* Make sidebar sticky on desktop */}
        <Sidebar isAdmin={isAdmin} />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4 md:p-8">
        {children}
      </div>
    </div>
  );
};