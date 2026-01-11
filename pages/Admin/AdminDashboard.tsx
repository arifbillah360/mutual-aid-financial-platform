import React, { useState, useEffect } from 'react';
import { StatCard } from '../../components/StatCard';
// Fix: Import TableColumn from components/Table
import { Table, TableColumn } from '../../components/Table';
import { AdminStats, AdminActivity } from '../../types';

// Mock Data
const mockAdminStats: AdminStats = {
  totalUsers: 847,
  totalConstellations: 121,
  totalTransactions: 2300,
  totalEarnings: 45000,
  recentActivity: [
    { user: 'Alex', action: 'Join', amount: 21, time: '2m ago' },
    { user: 'Marie', action: 'Payment', amount: 100, time: '1h ago' },
    { user: 'Jean', action: 'Withdrawal', amount: -500, time: '3h ago' },
    { user: 'Sophie', action: 'Tour Complete', amount: 1575747, time: 'yesterday' },
  ],
  alerts: [
    '3 pending payments',
    '1 support ticket',
    'New user registration: David L.',
  ],
};

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching admin stats from a backend API
    setTimeout(() => {
      setStats(mockAdminStats);
      setLoading(false);
    }, 500);
  }, []);

  // Fix: Explicitly type the columns array to resolve TypeScript inference issues
  const activityColumns: TableColumn<AdminActivity>[] = [
    { key: 'user', label: 'Utilisateur' },
    { key: 'action', label: 'Action' },
    { key: 'amount', label: 'Montant', render: (item: AdminActivity) => `${item.amount.toLocaleString('fr-FR')}€` },
    { key: 'time', label: 'Heure' },
  ];

  if (loading) {
    return <div className="text-center py-10 text-xl">Chargement du tableau de bord Admin...</div>;
  }

  if (!stats) {
    return <div className="text-center py-10 text-xl text-red-400">Erreur de chargement des données.</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold text-white mb-6">ADMIN OVERVIEW</h1>

      {/* Overview Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Utilisateurs" value={stats.totalUsers.toLocaleString('fr-FR')} icon="👥" className="bg-indigo-800" />
        <StatCard title="Constellations" value={stats.totalConstellations.toLocaleString('fr-FR')} icon="✨" className="bg-purple-800" />
        <StatCard title="Transactions" value={stats.totalTransactions.toLocaleString('fr-FR')} icon="💸" className="bg-blue-800" />
        <StatCard title="Gains" value={`${stats.totalEarnings.toLocaleString('fr-FR')}€`} icon="💰" className="bg-emerald-800" />
      </div>

      {/* Recent Activity */}
      <section className="bg-gray-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-emerald-400 mb-6">📊 ACTIVITÉ RÉCENTE</h2>
        {/* Fix: Explicitly type 'item' in keyExtractor */}
        <Table data={stats.recentActivity} columns={activityColumns} keyExtractor={(item: AdminActivity) => `${item.user}-${item.time}`} />
      </section>

      {/* Alerts */}
      <section className="bg-red-900 bg-opacity-30 p-8 rounded-lg shadow-xl border border-red-700">
        <h2 className="text-3xl font-bold text-red-400 mb-6">🚨 ALERTES</h2>
        <ul className="list-disc list-inside space-y-2 text-red-200">
          {stats.alerts.map((alert, index) => (
            <li key={index}>{alert}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};