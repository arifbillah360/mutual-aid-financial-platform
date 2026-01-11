import React from 'react';

interface BlinkingTextProps {
  children: React.ReactNode;
  className?: string;
}

export const BlinkingText: React.FC<BlinkingTextProps> = ({ children, className }) => {
  return (
    <span className={`animate-blink ${className}`}>
      {children}
    </span>
  );
};