import React, { useState, useEffect } from 'react';
import { Button } from '../../components/Button';
// Fix: Import TableColumn from components/Table
import { Table, TableColumn } from '../../components/Table';
import { useAuth } from '../../App';
import { Referral } from '../../types';

// Mock Data
const mockReferrals: Referral[] = [
  { id: 'ref1', referrerId: 'user-alex-123', refereeId: 'user-sophie-2', refereeName: 'Sophie M.', bonusEarned: 0, status: 'active', joinedAt: '2026-01-10' },
  { id: 'ref2', referrerId: 'user-alex-123', refereeId: 'user-jean-3', refereeName: 'Jean K.', bonusEarned: 5, status: 'completed_tour_1', joinedAt: '2026-01-11' },
];

export const ReferralSystem: React.FC = () => {
  const { user } = useAuth();
  const [referralLink, setReferralLink] = useState('');
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    // Simulate fetching referral data
    if (user) {
      setLoading(true);
      setTimeout(() => {
        setReferralLink(`https://7ensemble.ch/ref/${user.referralCode}`);
        setReferrals(mockReferrals);
        setLoading(false);
      }, 500);
    }
  }, [user]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopySuccess('Copié!');
    setTimeout(() => setCopySuccess(''), 2000);
  };

  const handleShare = (platform: 'email' | 'whatsapp' | 'facebook') => {
    const text = `Rejoignez 7 Ensemble et transformez 21€ en 1,575,747€ ! Mon lien de parrainage: ${referralLink}`;
    switch (platform) {
      case 'email':
        window.open(`mailto:?subject=Rejoignez 7 Ensemble !&body=${encodeURIComponent(text)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent(text)}`);
        break;
    }
  };

  const totalReferrals = referrals.length;
  const totalBonusEarned = referrals.reduce((sum, ref) => sum + ref.bonusEarned, 0);

  // Fix: Explicitly type the columns array to resolve TypeScript inference issues
  const referralColumns: TableColumn<Referral>[] = [
    { key: 'refereeName', label: 'Nom', sortable: true },
    { key: 'joinedAt', label: 'Inscrit le', sortable: true },
    { key: 'status', label: 'Statut', sortable: true, render: (r: Referral) => (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        r.status === 'completed_tour_1' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
      }`}>
        {r.status === 'completed_tour_1' ? 'Actif (Tour 1 terminé)' : 'Tour 1'}
      </span>
    )},
    { key: 'bonusEarned', label: 'Bonus Gagné', render: (r: Referral) => `${r.bonusEarned.toLocaleString('fr-FR')}€` },
  ];

  if (loading) {
    return <div className="text-center py-10 text-xl">Chargement du système de parrainage...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold text-white mb-6">Programme de Parrainage</h1>

      {/* Referral Link */}
      <section className="bg-gray-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-emerald-400 mb-6">Votre Lien de Parrainage</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-grow p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-200 text-sm break-all">
            {referralLink}
          </div>
          <Button onClick={handleCopyLink} variant="outline" className="min-w-[80px]">
            {copySuccess || 'Copier'}
          </Button>
        </div>
        <div className="flex justify-center sm:justify-start gap-4 mt-6">
          <Button onClick={() => handleShare('email')} variant="secondary" size="sm">📧 Email</Button>
          <Button onClick={() => handleShare('whatsapp')} variant="secondary" size="sm">📱 WhatsApp</Button>
          <Button onClick={() => handleShare('facebook')} variant="secondary" size="sm">📘 Facebook</Button>
        </div>
      </section>

      {/* Your Referrals */}
      <section className="bg-gray-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-emerald-400 mb-6">Vos Parrainages</h2>
        {/* Fix: Explicitly type 'r' in keyExtractor */}
        <Table data={referrals} columns={referralColumns} keyExtractor={(r: Referral) => r.id} />
        <div className="mt-6 flex flex-wrap justify-between items-center text-lg font-semibold text-gray-200">
          <p>Total Parrainages: <span className="text-emerald-300">{totalReferrals}</span></p>
          <p>Bonus Gagné: <span className="text-yellow-400">{totalBonusEarned.toLocaleString('fr-FR')}€</span></p>
        </div>
        <div className="mt-8 p-4 bg-blue-700 bg-opacity-30 rounded-lg text-blue-200 text-center text-lg">
          <p>💡 Gagnez <span className="font-bold text-yellow-300">5€</span> pour chaque parrainage qui termine le Tour 1 !</p>
        </div>
      </section>
    </div>
  );
};