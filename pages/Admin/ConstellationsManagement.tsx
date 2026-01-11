import React, { useState, useEffect } from 'react';
// Fix: Import TableColumn from components/Table
import { Table, TableColumn } from '../../components/Table';
import { Button } from '../../components/Button';
import { AdminConstellation, ConstellationType } from '../../types';

// Mock Data
const mockAdminConstellations: AdminConstellation[] = [
  { id: '#12', type: ConstellationType.PLEIADES, alcyone: 'Marie Dubois', members: '7/7 Full', currentTour: '4/7' },
  { id: '#13', type: ConstellationType.TRIANGULUM, alcyone: 'Jean Dupont', members: '2/3', currentTour: '1/7' },
  { id: '#14', type: ConstellationType.PLEIADES, alcyone: 'Sophie Laurent', members: '5/7', currentTour: '2/7' },
  { id: '#15', type: ConstellationType.TRIANGULUM, alcyone: 'Pierre Garnier', members: '3/3 Full', currentTour: '3/7' },
];

export const ConstellationsManagement: React.FC = () => {
  const [constellations, setConstellations] = useState<AdminConstellation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching constellations from backend
    setTimeout(() => {
      setConstellations(mockAdminConstellations);
      setLoading(false);
    }, 500);
  }, []);

  const handleView = (constellation: AdminConstellation) => {
    alert(`Voir les détails de la constellation ${constellation.id} (Alcyone: ${constellation.alcyone}) - Simulé`);
    // In a real app, navigate to a detailed view or open a modal
  };

  // Fix: Explicitly type the columns array to resolve TypeScript inference issues
  const constellationColumns: TableColumn<AdminConstellation>[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'alcyone', label: 'Alcyone', sortable: true },
    { key: 'members', label: 'Membres', sortable: true },
    { key: 'currentTour', label: 'Tour', sortable: true },
    { key: 'actions', label: 'Actions', render: (constellation: AdminConstellation) => (
      <Button size="sm" variant="outline" onClick={() => handleView(constellation)}>Voir</Button>
    )},
  ];

  if (loading) {
    return <div className="text-center py-10 text-xl">Chargement des constellations...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold text-white mb-6">GESTION DES CONSTELLATIONS</h1>

      <section className="bg-gray-800 p-8 rounded-lg shadow-xl">
        {/* Fix: Explicitly type 'c' in keyExtractor */}
        <Table data={constellations} columns={constellationColumns} keyExtractor={(c: AdminConstellation) => c.id} />
        <div className="mt-6">
          <Button onClick={() => alert('Créer une nouvelle constellation - Simulé')} variant="primary">
            + Créer une Constellation
          </Button>
        </div>
      </section>
    </div>
  );
};