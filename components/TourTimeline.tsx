import React from 'react';
import { Tour } from '../types';

interface TourTimelineProps {
  tours: Tour[];
  currentTourNumber: number;
}

export const TourTimeline: React.FC<TourTimelineProps> = ({ tours, currentTourNumber }) => {
  const totalTours = 7;
  const stars = Array.from({ length: totalTours }).map((_, i) => i + 1);

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 py-6 bg-gray-800 rounded-lg shadow-md">
      {stars.map((tourNum) => {
        const tour = tours.find((t) => t.tourNumber === tourNum);
        const isComplete = tour?.status === 'complete';
        const isInProgress = tour?.status === 'in_progress' || tour?.status === 'waiting_payment';
        const isCurrent = tourNum === currentTourNumber;

        return (
          <div
            key={tourNum}
            className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300
              ${isComplete ? 'bg-emerald-700 bg-opacity-30' : ''}
              ${isCurrent && !isComplete ? 'bg-blue-700 bg-opacity-30 border border-blue-400' : ''}
              ${!isComplete && !isCurrent ? 'opacity-60' : ''}
            `}
          >
            <div
              className={`text-4xl ${
                isComplete ? 'text-emerald-400' : isCurrent ? 'text-blue-400' : 'text-gray-500'
              }`}
            >
              {isComplete ? '★' : '☆'}
            </div>
            <span
              className={`text-sm font-medium mt-1 ${
                isComplete ? 'text-emerald-200' : isCurrent ? 'text-blue-200' : 'text-gray-400'
              }`}
            >
              Tour {tourNum}
            </span>
          </div>
        );
      })}
    </div>
  );
};