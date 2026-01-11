import React, { useState } from 'react';
import { Button } from '../components/Button';
import { DancingSilhouettes } from '../components/DancingSilhouettes';
import { ConstellationVisualization } from '../components/ConstellationVisualization';
import { RegisterModal } from '../components/RegisterModal';
import { ConstellationType } from '../types';
import { TRIANGULUM_TOURS, PLEIADES_TOURS } from '../constants';

export const HomePage: React.FC = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center py-16 md:py-24">
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-6xl md:text-8xl text-red-500 animate-pulse">
          ❤️
        </div>
        <div className="mb-8 md:mb-12 relative z-10 flex flex-col items-center">
          <img src="https://picsum.photos/100/100" alt="Hand Illustration" className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4" />
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            "Avec tout mon amour"
          </h1>
        </div>

        <div className="my-8 md:my-12 relative z-10">
          <DancingSilhouettes />
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-emerald-400 mb-8 md:mb-10 leading-snug">
          Transform <span className="text-orange-400">21€</span> into <span className="text-yellow-400">1,575,747€</span>!
        </h2>

        <Button onClick={() => setIsRegisterModalOpen(true)} size="lg" className="z-10 animate-pulse-once">
          Créer Ma Constellation
        </Button>
      </section>

      {/* Constellation Visualizations */}
      <section className="py-16 md:py-24 bg-gray-900">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Nos Constellations</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <ConstellationVisualization
            type={ConstellationType.TRIANGULUM}
            result={TRIANGULUM_TOURS[0].total.toLocaleString('fr-FR') + '€'}
          />
          <ConstellationVisualization
            type={ConstellationType.PLEIADES}
            result={PLEIADES_TOURS[0].total.toLocaleString('fr-FR') + '€'}
          />
        </div>
        <div className="text-center mt-12">
          <Button onClick={() => setIsRegisterModalOpen(true)} size="lg">
            Rejoindre la Révolution
          </Button>
        </div>
      </section>

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        title="✨ Rejoindre 7 Ensemble ✨"
        subtitle="Votre aventure commence ici 💖"
      />
    </div>
  );
};