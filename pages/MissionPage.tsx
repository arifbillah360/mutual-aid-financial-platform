import React, { useState } from 'react';
import { Button } from '../components/Button';
import { BlinkingText } from '../components/BlinkingText';
import { Confetti } from '../components/Confetti';
import { RegisterModal } from '../components/RegisterModal';
import { MISSION_GOALS } from '../constants';

export const MissionPage: React.FC = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Rainbow gradient colors in reversed order for the blocks
  const rainbowColors = [
    'from-purple-500 to-blue-500',
    'from-blue-500 to-teal-500',
    'from-teal-500 to-emerald-500',
    'from-emerald-500 to-yellow-500',
    'from-yellow-500 to-orange-500',
    'from-orange-500 to-red-500',
    'from-red-500 to-pink-500', // Adjusted to have 7 unique gradients, if needed
  ];

  return (
    <div className="relative container mx-auto px-4 py-8 overflow-hidden">
      <Confetti />
      <h2 className="text-5xl font-extrabold text-center text-white mb-6 relative z-10">
        🎉 NOTRE MISSION 🎉
      </h2>

      <p className="text-xl md:text-2xl text-center text-gray-300 mb-12 relative z-10">
        <BlinkingText className="font-semibold text-emerald-400">7 Ensemble</BlinkingText> vision:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-16 relative z-10">
        {MISSION_GOALS.map((goal, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center p-8 bg-gradient-to-br ${
              rainbowColors[MISSION_GOALS.length - 1 - index] || rainbowColors[0]
            } rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out w-full max-w-xs h-48`}
          >
            <span className="text-6xl mb-4 leading-none">{goal.icon}</span>
            <p className="text-2xl font-bold text-white text-center">{goal.text}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12 relative z-10">
        <Button
          onClick={() => setIsRegisterModalOpen(true)}
          size="lg"
          className="bg-emerald-500 hover:bg-emerald-600 text-white py-4 px-8 rounded-full text-2xl font-bold animate-glow-zoom"
        >
          Je Rejoins la Mission Maintenant!
        </Button>
      </div>

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        title="✨ Rejoindre 7 Ensemble ✨"
        subtitle="Votre aventure commence ici 💖"
      />
    </div>
  );
};