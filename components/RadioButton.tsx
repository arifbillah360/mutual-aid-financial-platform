import React from 'react';

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({ label, className = '', ...props }) => {
  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      <input
        type="radio"
        className="form-radio h-5 w-5 text-emerald-500 bg-gray-700 border-gray-600 focus:ring-emerald-500 transition-colors duration-200"
        {...props}
      />
      <span className="ml-2 text-gray-200">{label}</span>
    </label>
  );
};