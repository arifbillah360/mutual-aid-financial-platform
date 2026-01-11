import React, { useState, useEffect } from 'react';
import { TourTimeline } from '../../components/TourTimeline';
import { Button } from '../../components/Button';
import { useAuth } from '../../App';
import { Tour, ConstellationType } from '../../types';
import { PLEIADES_TOURS } from '../../constants';

// Mock Data
const mockTours: Tour[] = [
  {
    id: 'tour-1-alex',
    userId: 'user-alex-123',
    tourNumber: 1,
    amountPaid: 21,
    amountReceived: 147,
    amountKept: 47,
    status: 'complete',
    completedAt: '2026-01-10',
    createdAt: '2026-01-09',
  },
  {
    id: 'tour-2-alex',
    userId: 'user-alex-123',
    tourNumber: 2,
    amountPaid: 0,
    amountReceived: 0,
    amountKept: 0,
    status: 'waiting_payment',
    createdAt: '2026-01-10',
  },
  {
    id: 'tour-3-alex',
    userId: 'user-alex-123',
    tourNumber: 3,
    amountPaid: 0,
    amountReceived: 0,
    amountKept: 0,
    status: 'locked',
    createdAt: '2026-01-10',
  },
  {
    id: 'tour-4-alex',
    userId: 'user-alex-123',
    tourNumber: 4,
    amountPaid: 0,
    amountReceived: 0,
    amountKept: 0,
    status: 'locked',
    createdAt: '2026-01-10',
  },
  {
    id: 'tour-5-alex',
    userId: 'user-alex-123',
    tourNumber: 5,
    amountPaid: 0,
    amountReceived: 0,
    amountKept: 0,
    status: 'locked',
    createdAt: '2026-01-10',
  },
  {
    id: 'tour-6-alex',
    userId: 'user-alex-123',
    tourNumber: 6,
    amountPaid: 0,
    amountReceived: 0,
    amountKept: 0,
    status: 'locked',
    createdAt: '2026-01-10',
  },
  {
    id: 'tour-7-alex',
    userId: 'user-alex-123',
    tourNumber: 7,
    amountPaid: 0,
    amountReceived: 0,
    amountKept: 0,
    status: 'locked',
    createdAt: '2026-01-10',
  },
];

export const TourProgress: React.FC = () => {
  const { user } = useAuth();
  const [userTours, setUserTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [constellationType] = useState<ConstellationType>(ConstellationType.PLEIADES); // Assuming Pléiades for mock

  useEffect(() => {
    // Simulate fetching user's tour data
    if (user) {
      setLoading(true);
      setTimeout(() => {
        setUserTours(mockTours);
        setLoading(false);
      }, 500);
    }
  }, [user]);

  if (loading) {
    return <div className="text-center py-10 text-xl">Chargement de votre progression de tour...</div>;
  }

  const currentActiveTour = userTours.find(t => t.status === 'in_progress' || t.status === 'waiting_payment') || userTours.find(t => t.status === 'complete');
  const currentTourNumber = currentActiveTour?.tourNumber || 1;
  const nextTourToPay = userTours.find(t => t.status === 'waiting_payment');

  const tourData = PLEIADES_TOURS; // Use Pléiades data as default for mock

  const handlePayForNextTour = () => {
    // Simulate payment process
    alert(`Paiement de ${nextTourToPay?.amountPaid || tourData[currentTourNumber - 1]?.nextPay}€ pour le Tour ${currentTourNumber + 1} simulé.`);
    // In a real app, this would trigger a payment gateway redirect and update backend
  };

  const projectedFinalEarnings = tourData[0]?.total;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold text-white mb-6">
        Progression du Tour - Votre Parcours
      </h1>

      <TourTimeline tours={userTours} currentTourNumber={currentTourNumber} />

      <div className="space-y-6">
        {userTours.map((tour, index) => {
          const tourDetails = tourData.find(td => td.tour === tour.tourNumber);
          const isCurrentOrNext = tour.tourNumber === currentTourNumber || tour.tourNumber === (currentTourNumber + 1);
          const isCompleted = tour.status === 'complete';
          const isWaitingPayment = tour.status === 'waiting_payment';

          return (
            <div
              key={tour.id}
              className={`bg-gray-800 p-6 rounded-lg shadow-md border-l-4
                ${isCompleted ? 'border-emerald-500' : isWaitingPayment ? 'border-blue-500' : 'border-gray-600'}
                ${!isCompleted && !isWaitingPayment ? 'opacity-70' : ''}`}
            >
              <h3 className="text-2xl font-bold text-white mb-3">
                {isCompleted ? '★' : isWaitingPayment ? '☆' : '☆'} Tour {tour.tourNumber}{' '}
                {isCompleted ? '- Terminé ✓' : isWaitingPayment ? '- En Cours...' : '- Verrouillé'}
              </h3>
              <div className="ml-4 space-y-2 text-gray-300">
                <p>
                  <span className="font-semibold">Payé:</span>{' '}
                  <span className="text-red-300">{tour.amountPaid.toLocaleString('fr-FR')}€</span>
                </p>
                <p>
                  <span className="font-semibold">Reçu:</span>{' '}
                  <span className="text-green-300">{tour.amountReceived.toLocaleString('fr-FR')}€</span>
                </p>
                <p>
                  <span className="font-semibold">Gardé:</span>{' '}
                  <span className="text-yellow-300">{tour.amountKept.toLocaleString('fr-FR')}€</span>
                </p>
                <p>
                  <span className="font-semibold">Statut:</span>{' '}
                  <span className={`font-semibold ${isCompleted ? 'text-emerald-300' : isWaitingPayment ? 'text-blue-300' : 'text-gray-400'}`}>
                    {isCompleted ? 'Terminé' : isWaitingPayment ? 'En attente de paiement' : 'Verrouillé'}
                  </span>
                </p>

                {isWaitingPayment && tourDetails && (
                  <div className="mt-4 p-3 bg-blue-900 bg-opacity-20 rounded-md">
                    <p className="font-semibold text-blue-300">Pour le Tour {tour.tourNumber}:</p>
                    <p>À Payer: <span className="text-red-300">{tourDetails.offert.toLocaleString('fr-FR')}€</span></p>
                    <p>Recevra: <span className="text-green-300">{tourDetails.recu.toLocaleString('fr-FR')}€</span></p>
                    <p>Gardera: <span className="text-yellow-300">{tourDetails.avoir.toLocaleString('fr-FR')}€</span></p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {nextTourToPay && (
        <div className="text-center mt-10">
          <Button onClick={handlePayForNextTour} size="lg" className="bg-emerald-600 hover:bg-emerald-700">
            Payer {nextTourToPay.amountPaid || tourData[nextTourToPay.tourNumber - 1]?.nextPay}€ pour le Tour {nextTourToPay.tourNumber}
          </Button>
        </div>
      )}

      <div className="text-center mt-12 p-6 bg-gray-800 rounded-lg shadow-xl">
        <p className="text-xl font-semibold text-gray-200">Gains finaux projetés:</p>
        <p className="text-4xl font-bold text-yellow-400 mt-2">
          {projectedFinalEarnings?.toLocaleString('fr-FR')}€
        </p>
      </div>
    </div>
  );
};