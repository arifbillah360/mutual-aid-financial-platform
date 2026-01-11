import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
  valueClassName?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, className, valueClassName }) => {
  return (
    <div className={`bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4 ${className}`}>
      {icon && <div className="text-4xl text-emerald-400">{icon}</div>}
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className={`text-2xl font-bold text-gray-100 ${valueClassName}`}>{value}</p>
      </div>
    </div>
  );
};