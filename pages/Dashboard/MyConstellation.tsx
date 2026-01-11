import React, { useState, useEffect } from 'react';
import { useAuth } from '../../App';
import { Constellation, ConstellationMember, ConstellationType, User } from '../../types';
import { Button } from '../../components/Button'; // For potential actions

// Mock Data
const mockAlcyone: User = {
  id: 'user-marie-456',
  name: 'Marie Dubois',
  email: 'marie.dubois@email.com',
  country: 'France',
  referralCode: 'MD789',
  role: 'user',
  createdAt: '2025-12-01T08:00:00Z',
  updatedAt: '2026-01-05T12:00:00Z',
};

const mockConstellationMembers: ConstellationMember[] = [
  { id: 'cm1', userId: 'user-pierre-1', name: 'Pierre L.', position: 1, contributionStatus: 'pending', joinedAt: '2026-01-12' },
  { id: 'cm2', userId: 'user-sophie-2', name: 'Sophie M.', position: 2, contributionStatus: 'pending', joinedAt: '2026-01-13' },
  { id: 'cm3', userId: 'user-jean-3', name: 'Jean K.', position: 3, contributionStatus: 'pending', joinedAt: '2026-01-14' },
  { id: 'cm4', userId: 'user-lucie-4', name: 'Lucie A.', position: 4, contributionStatus: 'pending', joinedAt: '2026-01-15' },
  { id: 'cm5', userId: 'user-marc-5', name: 'Marc V.', position: 5, contributionStatus: 'pending', joinedAt: '2026-01-16' },
  { id: 'cm6', userId: 'user-claire-6', name: 'Claire T.', position: 6, contributionStatus: 'pending', joinedAt: '2026-01-17' },
  { id: 'cm7', userId: 'user-etienne-7', name: 'Étienne P.', position: 7, contributionStatus: 'pending', joinedAt: '2026-01-18' },
];

const mockUserConstellation: Constellation = {
  id: 'const-alex-1',
  type: ConstellationType.PLEIADES,
  alcyoneId: mockAlcyone.id,
  alcyoneName: mockAlcyone.name,
  currentTour: 1,
  status: 'active',
  members: mockConstellationMembers,
  createdAt: '2026-01-09T10:00:00Z',
  updatedAt: '2026-01-18T12:00:00Z',
};

export const MyConstellation: React.FC = () => {
  const { user } = useAuth();
  const [constellation, setConstellation] = useState<Constellation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user's constellation data
    if (user) {
      setLoading(true);
      setTimeout(() => {
        // In a real app, this would fetch the actual constellation for the logged-in user
        setConstellation(mockUserConstellation);
        setLoading(false);
      }, 500);
    }
  }, [user]);

  if (loading) {
    return <div className="text-center py-10 text-xl">Chargement de votre constellation...</div>;
  }

  if (!constellation) {
    return <div className="text-center py-10 text-xl text-red-400">Impossible de charger votre constellation.</div>;
  }

  const totalMembers = constellation.type === ConstellationType.TRIANGULUM ? 3 : 7;
  const contributedMembers = constellation.members.filter(m => m.contributionStatus === 'paid').length;
  const pendingMembersCount = totalMembers - contributedMembers;

  const contributionsReceived = contributedMembers * (constellation.currentTour === 1 ? 21 : 0); // Simplified mock calculation

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold text-white mb-6">
        Ma Constellation - {constellation.type} ({totalMembers} Personnes)
      </h1>

      {/* Your Position & Alcyone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <p className="text-gray-400 text-sm">Votre Position:</p>
          <p className="text-2xl font-semibold text-emerald-300">Membre</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <p className="text-gray-400 text-sm">Votre Alcyone:</p>
          <p className="text-2xl font-semibold text-purple-400">{constellation.alcyoneName}</p>
        </div>
      </div>

      {/* Alcyone Details Card */}
      <div className="bg-gradient-to-br from-purple-800 to-indigo-800 p-8 rounded-lg shadow-xl text-white text-center">
        <h3 className="text-3xl font-bold mb-4">Alcyone (Centre)</h3>
        <p className="text-2xl font-semibold mb-2">👤 {constellation.alcyoneName}</p>
        <p className="text-xl">Tour {mockAlcyone.id === 'user-marie-456' ? '4/7' : `${constellation.currentTour}/${totalMembers}`}</p> {/* Mock Tour 4/7 for Marie */}
        <p className="text-lg">Statut: <span className="font-semibold text-emerald-300">Actif</span></p>
      </div>

      {/* Your Constellation Members */}
      <section className="bg-gray-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-emerald-400 mb-6">Votre Constellation (Vous soutenant)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Membre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Statut
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Contribution
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {constellation.members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-700 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                    {member.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${member.contributionStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                    >
                      {member.contributionStatus === 'paid' ? 'Actif' : 'En attente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                    {member.contributionStatus === 'paid' ? '21€' : '0€'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 p-4 bg-blue-700 bg-opacity-30 rounded-lg text-blue-200 text-center text-lg">
          <p>
            💡 Une fois que tous les {totalMembers} membres auront contribué, vous recevrez{' '}
            <span className="font-bold text-yellow-300">147€</span>!
          </p>
          {pendingMembersCount > 0 && (
            <p className="mt-2 text-base text-blue-300">
              Il reste {pendingMembersCount} membre(s) en attente.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};