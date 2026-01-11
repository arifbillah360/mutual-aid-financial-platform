import React from 'react';

// A simple dancing animation using CSS keyframes
// The 'dance' keyframe is defined inline here for clarity within the component,
// but for a larger app, it might be in a CSS file or index.html style block.

const DancingSilhouette: React.FC<{ index: number }> = ({ index }) => {
  // Variations for animation delay and duration for a more organic look
  const animationDelay = `${index * 0.1}s`;
  const animationDuration = `${2 + (index % 3) * 0.2}s`;

  return (
    <div
      className="absolute bg-emerald-400 rounded-full"
      style={{
        width: '40px',
        height: '40px',
        opacity: 0.8,
        animation: `dance ${animationDuration} infinite ease-in-out alternate-reverse`,
        animationDelay: animationDelay,
        // Positioning will be handled by the parent container or random if truly dynamic
      }}
    >
      {/* Inline style for the dance keyframe */}
      <style>{`
        @keyframes dance {
          0% {
            transform: translateY(0) scale(1);
          }
          25% {
            transform: translateY(-10px) scale(0.95) translateX(${index % 2 === 0 ? '5px' : '-5px'});
          }
          50% {
            transform: translateY(0) scale(1.05);
          }
          75% {
            transform: translateY(-8px) scale(0.98) translateX(${index % 2 === 0 ? '-5px' : '5px'});
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export const DancingSilhouettes: React.FC = () => {
  // Positions for the 7 silhouettes to create a visually interesting layout
  const positions = [
    'top-1/4 left-1/4',
    'top-1/4 right-1/4',
    'top-1/2 left-1/3',
    'top-1/2 right-1/3',
    'bottom-1/4 left-1/4',
    'bottom-1/4 right-1/4',
    'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', // Center
  ];

  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className={`absolute ${positions[i]} transition-all duration-300`}>
          <DancingSilhouette index={i} />
        </div>
      ))}
    </div>
  );
};