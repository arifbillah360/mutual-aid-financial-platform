import React from 'react';
import { ConstellationType } from '../types';

interface ConstellationVisualizationProps {
  type: ConstellationType;
  result: string;
  isAnimated?: boolean;
}

export const ConstellationVisualization: React.FC<ConstellationVisualizationProps> = ({
  type,
  result,
  isAnimated = true,
}) => {
  const membersCount = type === ConstellationType.TRIANGULUM ? 3 : 7;
  const memberLabels = Array.from({ length: membersCount }).map((_, i) => `Member ${i + 1}`);

  const circumference = 2 * Math.PI * 50; // For positioning text around a circle
  const baseRotationClass = isAnimated ? 'animate-rotate-slow' : '';

  return (
    <div className="flex flex-col items-center p-4 bg-gray-800 rounded-xl shadow-lg m-2 w-full max-w-sm">
      <h3 className="text-xl md:text-2xl font-semibold text-emerald-400 mb-4">{type} ({membersCount} People)</h3>

      <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
        {/* Central Alcyone */}
        <div className="absolute w-16 h-16 md:w-20 md:h-20 bg-purple-600 rounded-full flex items-center justify-center text-lg font-bold z-10 border-2 border-purple-400 shadow-md">
          Alcyone
        </div>
        {/* "You" indicator for dashboard context */}
        {type === ConstellationType.PLEIADES && (
          <span className="absolute text-sm text-gray-300 -right-6 top-1/2 -translate-y-1/2 hidden md:block">← You</span>
        )}

        {/* Orbiting Members */}
        <div
          className={`absolute w-full h-full rounded-full border-2 border-dashed border-gray-600 ${baseRotationClass}`}
        >
          {memberLabels.map((label, index) => {
            const angle = (360 / membersCount) * index;
            const radius = type === ConstellationType.TRIANGULUM ? 70 : 90; // Adjust radius for different types
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);

            return (
              <div
                key={index}
                className="absolute w-4 h-4 md:w-5 md:h-5 bg-blue-400 rounded-full border border-blue-200 flex items-center justify-center"
                style={{
                  top: `calc(50% + ${y}px - 8px)`, // Center the circle
                  left: `calc(50% + ${x}px - 8px)`,
                  // Counter-rotate the inner content if the parent is rotating
                  transform: isAnimated ? `rotate(${-angle}deg) rotate(-20s)` : '',
                  transformOrigin: 'center',
                }}
              >
                {/* Optional: Add member number text if desired, positioned relative to the dot */}
                {/* <span className="absolute -top-6 text-xs text-gray-300 whitespace-nowrap">{label}</span> */}
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-lg md:text-xl font-bold mt-4 text-gray-200">Result: <span className="text-emerald-300">{result}</span></p>
    </div>
  );
};