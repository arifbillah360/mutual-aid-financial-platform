import React, { useState, useEffect } from 'react';
// Fix: Import TableColumn from components/Table
import { Table, TableColumn } from '../../components/Table';
import { Button } from '../../components/Button';
import { useAuth } from '../../App';
import { Transaction } from '../../types';

// Mock Data
const mockTransactions: Transaction[] = [
  { id: 't1', userId: 'user-alex-123', type: 'sent', amount: -21, currency: '€', status: 'done', date: '2026-01-09' },
  { id: 't2', userId: 'user-alex-123', type: 'received', amount: 147, currency: '€', status: 'done', date: '2026-01-10' },
  { id: 't3', userId: 'user-alex-123', type: 'sent', amount: -100, currency: '€', status: 'pending', date: '2026-01-11' },
  { id: 't4', userId: 'user-alex-123', type: 'received', amount: 700, currency: '€', status: 'pending', date: '2026-01-15' },
  { id: 't5', userId: 'user-alex-123', type: 'withdrawal', amount: -50, currency: '€', status: 'done', date: '2026-01-20' },
];

export const PaymentHistory: React.FC = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<'All' | 'sent' | 'received' | 'withdrawal'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate fetching user's transactions
    if (user) {
      setLoading(true);
      setTimeout(() => {
        setTransactions(mockTransactions);
        setLoading(false);
      }, 500);
    }
  }, [user]);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesType = filterType === 'All' || transaction.type === filterType;
    const matchesSearch = searchTerm === '' ||
                          transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          transaction.date.includes(searchTerm) ||
                          String(transaction.amount).includes(searchTerm);
    return matchesType && matchesSearch;
  });

  const totalSent = transactions.filter(t => t.type === 'sent' || t.type === 'withdrawal').reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalReceived = transactions.filter(t => t.type === 'received').reduce((sum, t) => sum + t.amount, 0);
  const netBalance = totalReceived - totalSent;

  // Fix: Explicitly type the columns array to resolve TypeScript inference issues
  const transactionColumns: TableColumn<Transaction>[] = [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'type', label: 'Type', sortable: true, render: (t: Transaction) => {
      switch (t.type) {
        case 'sent': return 'Envoyé';
        case 'received': return 'Reçu';
        case 'transfer': return 'Transfert';
        case 'withdrawal': return 'Retrait';
        default: return t.type;
      }
    }},
    { key: 'amount', label: 'Montant', sortable: true, render: (t: Transaction) => `${t.type === 'sent' || t.type === 'withdrawal' ? '-' : '+'}${Math.abs(t.amount).toLocaleString('fr-FR')}€` },
    { key: 'status', label: 'Statut', sortable: true, render: (t: Transaction) => (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        t.status === 'done' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
      }`}>
        {t.status === 'done' ? '✓ Fait' : '⏳ En attente'}
      </span>
    )},
    { key: 'id', label: 'ID', render: (t: Transaction) => `#${t.id.slice(-3)}` },
  ];

  const handleExport = (format: 'pdf' | 'csv') => {
    alert(`Exportation de l'historique de paiement au format ${format.toUpperCase()} simulée.`);
    console.log(`Simulating export to ${format}:`, filteredTransactions);
  };

  if (loading) {
    return <div className="text-center py-10 text-xl">Chargement de l'historique de paiement...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold text-white mb-6">Historique des Paiements</h1>

      {/* Filters and Search */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-wrap gap-4 items-center">
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant={filterType === 'All' ? 'primary' : 'secondary'}
            onClick={() => setFilterType('All')}
            size="sm"
          >
            Tout
          </Button>
          <Button
            variant={filterType === 'sent' ? 'primary' : 'secondary'}
            onClick={() => setFilterType('sent')}
            size="sm"
          >
            Envoyé
          </Button>
          <Button
            variant={filterType === 'received' ? 'primary' : 'secondary'}
            onClick={() => setFilterType('received')}
            size="sm"
          >
            Reçu
          </Button>
          <Button
            variant={filterType === 'withdrawal' ? 'primary' : 'secondary'}
            onClick={() => setFilterType('withdrawal')}
            size="sm"
          >
            Retrait
          </Button>
        </div>
        <input
          type="text"
          placeholder="Rechercher..."
          className="p-2 rounded-md bg-gray-700 border border-gray-600 text-white flex-grow max-w-xs md:max-w-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Transaction Table */}
      <section className="bg-gray-800 p-8 rounded-lg shadow-xl">
        {/* Fix: Explicitly type 't' in keyExtractor */}
        <Table data={filteredTransactions} columns={transactionColumns} keyExtractor={(t: Transaction) => t.id} />
      </section>

      {/* Balance Summary */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md text-lg space-y-2">
        <p>Total Envoyé: <span className="font-bold text-red-400">{totalSent.toLocaleString('fr-FR')}€</span></p>
        <p>Total Reçu: <span className="font-bold text-green-400">{totalReceived.toLocaleString('fr-FR')}€</span></p>
        <p>Solde Net: <span className="font-bold text-emerald-300">{netBalance.toLocaleString('fr-FR')}€</span></p>
      </div>

      {/* Export Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <Button onClick={() => handleExport('pdf')} variant="outline">
          Télécharger PDF
        </Button>
        <Button onClick={() => handleExport('csv')} variant="outline">
          Exporter CSV
        </Button>
      </div>
    </div>
  );
};