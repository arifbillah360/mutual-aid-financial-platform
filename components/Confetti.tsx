import React from 'react';

// Basic CSS for confetti animation
// For a more robust solution, a library might be used, but this suffices for the description.
const ConfettiPiece: React.FC<{ index: number }> = ({ index }) => {
  const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const delay = Math.random() * 2; // Random delay for each piece
  const duration = 3 + Math.random() * 2; // Random duration

  return (
    <div
      className="absolute bg-opacity-70 rounded-full"
      style={{
        width: `${5 + Math.random() * 10}px`,
        height: `${5 + Math.random() * 10}px`,
        backgroundColor: randomColor,
        left: `${Math.random() * 100}%`,
        animation: `fall ${duration}s linear infinite`,
        animationDelay: `${delay}s`,
        opacity: Math.random() * 0.7 + 0.3,
        zIndex: 0,
      }}
    >
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

interface ConfettiProps {
  count?: number;
}

export const Confetti: React.FC<ConfettiProps> = ({ count = 50 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <ConfettiPiece key={i} index={i} />
      ))}
    </div>
  );
};