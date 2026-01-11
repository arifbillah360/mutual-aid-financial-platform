import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        id={props.id || props.name}
        className="form-checkbox h-5 w-5 text-emerald-500 bg-gray-700 border-gray-600 rounded focus:ring-emerald-500 transition-colors duration-200"
        {...props}
      />
      <label htmlFor={props.id || props.name} className="ml-2 text-gray-200 cursor-pointer">
        {label}
      </label>
      {error && <p className="text-red-500 text-xs mt-1 ml-2">{error}</p>}
    </div>
  );
};