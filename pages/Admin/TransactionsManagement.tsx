import React, { useState, useEffect } from 'react';
// Fix: Import TableColumn from components/Table
import { Table, TableColumn } from '../../components/Table';
import { Button } from '../../components/Button';
import { Select } from '../../components/Select';
import { Input } from '../../components/Input';
import { AdminTransaction } from '../../types';

// Mock Data
const mockAdminTransactions: AdminTransaction[] = [
  { id: '1', date: '2026-01-09', user: 'Alex', amount: 21, status: '✓ Done', action: 'V' },
  { id: '2', date: '2026-01-10', user: 'Marie', amount: 100, status: '⏳ Pend', action: 'A' },
  { id: '3', date: '2026-01-10', user: 'Jean', amount: 50, status: '✓ Done', action: 'V' },
  { id: '4', date: '2026-01-11', user: 'Sophie', amount: 200, status: '⏳ Pend', action: 'A' },
  { id: '5', date: '2026-01-12', user: 'Pierre', amount: 21, status: '✓ Done', action: 'V' },
  { id: '6', date: '2026-01-12', user: 'Lucie', amount: 300, status: '⏳ Pend', action: 'A' },
];

export const TransactionsManagement: React.FC = () => {
  const [transactions, setTransactions] = useState<AdminTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'All' | '✓ Done' | '⏳ Pend'>('All');
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState('2026-01-31');

  useEffect(() => {
    // Simulate fetching transactions from backend
    setTimeout(() => {
      setTransactions(mockAdminTransactions);
      setLoading(false);
    }, 500);
  }, []);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesStatus = filterStatus === 'All' || transaction.status === filterStatus;
    const transactionDate = new Date(transaction.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    const matchesDateRange = transactionDate >= start && transactionDate <= end;

    return matchesStatus && matchesDateRange;
  });

  const handleApprove = (transaction: AdminTransaction) => {
    alert(`Approuver la transaction ${transaction.id} par ${transaction.user} - Simulé`);
    // In a real app, update transaction status in backend
    setTransactions(prev => prev.map(t => t.id === transaction.id ? { ...t, status: '✓ Done' } : t));
  };

  const handleApproveAllPending = () => {
    if (window.confirm('Êtes-vous sûr de vouloir approuver toutes les transactions en attente ?')) {
      setTransactions(prev => prev.map(t => t.status === '⏳ Pend' ? { ...t, status: '✓ Done' } : t));
      alert('Toutes les transactions en attente ont été approuvées - Simulé');
    }
  };

  const handleExport = () => {
    alert('Exportation des transactions - Simulé');
  };

  // Fix: Explicitly type the columns array to resolve TypeScript inference issues
  const transactionColumns: TableColumn<AdminTransaction>[] = [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'user', label: 'Utilisateur', sortable: true },
    { key: 'amount', label: 'Montant', sortable: true, render: (t: AdminTransaction) => `${t.amount.toLocaleString('fr-FR')}€` },
    { key: 'status', label: 'Statut', sortable: true, render: (t: AdminTransaction) => (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        t.status === '✓ Done' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
      }`}>
        {t.status === '✓ Done' ? '✓ Fait' : '⏳ En attente'}
      </span>
    )},
    { key: 'action', label: 'Act.', render: (t: AdminTransaction) => (
      t.status === '⏳ Pend' ? (
        <Button size="sm" variant="primary" onClick={() => handleApprove(t)}>A</Button>
      ) : (
        <Button size="sm" variant="outline" onClick={() => alert(`Voir transaction ${t.id} - Simulé`)}>V</Button>
      )
    )},
  ];

  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const pendingTransactionsCount = filteredTransactions.filter(t => t.status === '⏳ Pend').length;

  if (loading) {
    return <div className="text-center py-10 text-xl">Chargement des transactions...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold text-white mb-6">GESTION DES TRANSACTIONS</h1>

      {/* Filters */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-wrap gap-4 items-center">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            label="Date de début:"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-auto"
          />
          <Input
            label="Date de fin:"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-auto"
          />
        </div>
        <Select
          label="Statut:"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as 'All' | '✓ Done' | '⏳ Pend')}
          options={[
            { value: 'All', label: 'Tous' },
            { value: '✓ Done', label: 'Terminés' },
            { value: '⏳ Pend', label: 'En attente' },
          ]}
          className="max-w-[150px]"
        />
      </div>

      {/* Transactions Table */}
      <section className="bg-gray-800 p-8 rounded-lg shadow-xl">
        {/* Fix: Explicitly type 't' in keyExtractor */}
        <Table data={filteredTransactions} columns={transactionColumns} keyExtractor={(t: AdminTransaction) => t.id} />
        <div className="mt-6 flex flex-wrap justify-between items-center text-lg font-semibold text-gray-200">
          <p>Total: <span className="text-emerald-300">{totalAmount.toLocaleString('fr-FR')}€</span></p>
          <p>En attente: <span className="text-yellow-400">{pendingTransactionsCount} transactions</span></p>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Button onClick={handleApproveAllPending} variant="primary" disabled={pendingTransactionsCount === 0}>
            Approuver toutes les transactions en attente
          </Button>
          <Button onClick={handleExport} variant="outline">
            Exporter
          </Button>
        </div>
      </section>
    </div>
  );
};