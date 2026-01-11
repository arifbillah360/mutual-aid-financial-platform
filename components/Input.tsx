import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={props.id || props.name} className="text-gray-200 text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={props.id || props.name}
        className={`w-full p-3 rounded-md bg-gray-700 border ${
          error ? 'border-red-500' : 'border-gray-600'
        } text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};