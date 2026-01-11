import React, { useState, useEffect } from 'react';
import { StatCard } from '../../components/StatCard';
import { ConstellationVisualization } from '../../components/ConstellationVisualization';
// Fix: Import TableColumn from components/Table
import { Table, TableColumn } from '../../components/Table';
import { useAuth } from '../../App';
import { User, ConstellationType, Transaction, Tour } from '../../types';
import { PLEIADES_TOURS } from '../../constants';

// Mock Data
const mockTransactions: Transaction[] = [
  { id: 't1', userId: 'user-alex-123', type: 'sent', amount: -21, currency: '€', status: 'done', date: '2026-01-09' },
  { id: 't2', userId: 'user-alex-123', type: 'received', amount: 147, currency: '€', status: 'done', date: '2026-01-10' },
  { id: 't3', userId: 'user-alex-123', type: 'sent', amount: -100, currency: '€', status: 'pending', date: '2026-01-11' },
];

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
    amountPaid: 0, // Not paid yet for tour 2
    amountReceived: 0,
    amountKept: 0,
    status: 'waiting_payment',
    createdAt: '2026-01-10',
  },
];


export const DashboardOverview: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [totalBalance, setTotalBalance] = useState(0);
  const [currentTour, setCurrentTour] = useState<Tour | null>(null);
  const [constellationType, setConstellationType] = useState<ConstellationType>(ConstellationType.PLEIADES);
  const [recentActivity, setRecentActivity] = useState<Transaction[]>([]);

  useEffect(() => {
    // Simulate fetching user-specific data
    if (user) {
      setLoading(true);
      setTimeout(() => {
        // Calculate total balance from mock transactions (or directly fetch if from backend)
        const balance = mockTransactions.reduce((acc, trans) => acc + trans.amount, 0);
        setTotalBalance(balance);

        // Find current tour
        const activeTour = mockTours.find(tour => tour.status !== 'complete') || mockTours[mockTours.length - 1];
        setCurrentTour(activeTour);

        // Assume constellation type is Pléiades for this mock
        setConstellationType(ConstellationType.PLEIADES);

        setRecentActivity(mockTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        setLoading(false);
      }, 500);
    }
  }, [user]);

  if (loading) {
    return <div className="text-center py-10 text-xl">Chargement du tableau de bord...</div>;
  }

  const currentTourDetails = currentTour ? PLEIADES_TOURS.find(t => t.tour === currentTour.tourNumber) : undefined;
  const receivedAmount = PLEIADES_TOURS.find(t => t.tour === currentTour?.tourNumber)?.recu || 0;
  const toPayAmount = currentTour?.status === 'waiting_payment' ? PLEIADES_TOURS.find(t => t.tour === currentTour?.tourNumber)?.offert || 0 : 0;
  const progressStars = currentTour ? '★'.repeat(currentTour.tourNumber) + '☆'.repeat(7 - currentTour.tourNumber) : '☆☆☆☆☆☆☆';

  // Fix: Explicitly type the columns array to resolve TypeScript inference issues
  const transactionColumns: TableColumn<Transaction>[] = [
    { key: 'date', label: 'Date' },
    { key: 'amount', label: 'Montant', render: (t: Transaction) => `${t.amount.toLocaleString('fr-FR')}€` },
    { key: 'type', label: 'Type', render: (t: Transaction) => t.type.charAt(0).toUpperCase() + t.type.slice(1) },
    { key: 'status', label: 'Statut', render: (t: Transaction) => (t.status === 'done' ? '✓ Fait' : '⏳ En attente') },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold text-white mb-6">Bienvenue {user?.name}! 🎉</h1>

      {/* Balance & Current Tour */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 p-6 rounded-lg shadow-xl text-white flex justify-between items-center flex-wrap gap-4">
        <div>
          <p className="text-xl font-semibold">Solde Total:</p>
          <p className="text-5xl font-bold">{totalBalance.toLocaleString('fr-FR')}€</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Tour Actuel:</p>
          <p className="text-3xl font-bold">{currentTour?.tourNumber || 1}/7</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Reçu" value={`${receivedAmount.toLocaleString('fr-FR')}€`} icon="💰" />
        <StatCard title="À Payer" value={`${toPayAmount.toLocaleString('fr-FR')}€`} icon="💸" />
        <StatCard title="Constellation" value={constellationType} icon="✨" />
        <StatCard title="Progression" value={progressStars} icon="🚀" valueClassName="text-3xl font-mono tracking-widest" />
      </div>

      {/* Constellation Visualization */}
      <section className="bg-gray-800 p-8 rounded-lg shadow-xl text-center">
        <h2 className="text-3xl font-bold text-emerald-400 mb-6">🌟 VOTRE CONSTELLATION 🌟</h2>
        <div className="flex justify-center">
          <ConstellationVisualization type={constellationType} result="Mon Groupe" isAnimated={true} />
        </div>
        <p className="mt-4 text-gray-400 italic">Votre position est marquée par 'Alcyone' au centre, attendant le soutien de vos membres.</p>
      </section>

      {/* Recent Activity */}
      <section className="bg-gray-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-emerald-400 mb-6">📊 ACTIVITÉ RÉCENTE</h2>
        {/* Fix: Explicitly type 't' in keyExtractor */}
        <Table data={recentActivity} columns={transactionColumns} keyExtractor={(t: Transaction) => t.id} />
      </section>
    </div>
  );
};