import React, { useState, useEffect } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../App';
import { Transaction, User } from '../../types';

// Mock Data
const mockAvailableBalance = 47; // Example balance for Alex
const mockAlcyoneName = 'Marie Dubois'; // Example Alcyone
const mockBankAccount = 'FR76 XXXX ****'; // Example bank account

export const TransferMoney: React.FC = () => {
  const { user } = useAuth();
  const [availableBalance, setAvailableBalance] = useState(mockAvailableBalance);
  const [transferAmount, setTransferAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [transferError, setTransferError] = useState('');
  const [withdrawError, setWithdrawError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In a real app, fetch current available balance from backend
    // For now, use mock data
  }, [user]);

  const handleTransferToAlcyone = async (e: React.FormEvent) => {
    e.preventDefault();
    setTransferError('');
    setWithdrawError('');
    const amount = parseFloat(transferAmount);

    if (isNaN(amount) || amount <= 0) {
      setTransferError('Veuillez entrer un montant valide.');
      return;
    }
    if (amount > availableBalance) {
      setTransferError('Fonds insuffisants.');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call for transfer
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAvailableBalance(prev => prev - amount);
      setTransferAmount('');
      alert(`Transfert de ${amount}€ à ${mockAlcyoneName} réussi!`);
      // Update transaction history in a real app
    } catch (error) {
      setTransferError('Échec du transfert. Veuillez réessayer.');
      console.error('Transfer error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawToBank = async (e: React.FormEvent) => {
    e.preventDefault();
    setTransferError('');
    setWithdrawError('');
    const amount = parseFloat(withdrawAmount);
    const minimumWithdrawal = 50;

    if (isNaN(amount) || amount <= 0) {
      setWithdrawError('Veuillez entrer un montant valide.');
      return;
    }
    if (amount < minimumWithdrawal) {
      setWithdrawError(`Le montant minimum de retrait est de ${minimumWithdrawal}€.`);
      return;
    }
    if (amount > availableBalance) {
      setWithdrawError('Fonds insuffisants.');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call for withdrawal
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAvailableBalance(prev => prev - amount);
      setWithdrawAmount('');
      alert(`Retrait de ${amount}€ vers votre compte bancaire simulé. Traitement en 3-5 jours ouvrables.`);
      // Update transaction history in a real app
    } catch (error) {
      setWithdrawError('Échec du retrait. Veuillez réessayer.');
      console.error('Withdrawal error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold text-white mb-6">Transférer de l'Argent</h1>

      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 p-6 rounded-lg shadow-xl text-white flex justify-between items-center flex-wrap gap-4">
        <div>
          <p className="text-xl font-semibold">Solde Disponible:</p>
          <p className="text-5xl font-bold">{availableBalance.toLocaleString('fr-FR')}€</p>
        </div>
      </div>

      {/* Transfer to Alcyone */}
      <section className="bg-gray-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-emerald-400 mb-6">Transférer à l'Alcyone</h2>
        <form onSubmit={handleTransferToAlcyone} className="space-y-6">
          <Input
            label="Destinataire:"
            type="text"
            value={mockAlcyoneName}
            readOnly
            disabled
            className="text-gray-400"
          />
          <Input
            label="Montant:"
            type="number"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
            placeholder="Ex: 100"
            min="1"
            step="any"
            error={transferError}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Transfert en cours...' : 'Transférer à l\'Alcyone'}
          </Button>
        </form>
      </section>

      <p className="text-center text-gray-400 text-lg font-semibold my-8">OU</p>

      {/* Withdraw to Bank */}
      <section className="bg-gray-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-emerald-400 mb-6">Retirer vers la Banque</h2>
        <form onSubmit={handleWithdrawToBank} className="space-y-6">
          <Input
            label="Compte bancaire:"
            type="text"
            value={mockBankAccount}
            readOnly
            disabled
            className="text-gray-400"
          />
          <Input
            label="Montant:"
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="Ex: 100"
            min="1"
            step="any"
            error={withdrawError}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Retrait en cours...' : 'Retirer vers la Banque'}
          </Button>
        </form>
        <div className="mt-6 p-4 bg-yellow-700 bg-opacity-20 rounded-lg text-yellow-200">
          <p className="font-semibold">⚠️ Retrait minimum: 50€</p>
          <p className="mt-1">Temps de traitement: 3-5 jours ouvrables</p>
        </div>
      </section>
    </div>
  );
};