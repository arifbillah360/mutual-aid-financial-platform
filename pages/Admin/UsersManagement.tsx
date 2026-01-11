import React, { useState, useEffect } from 'react';
// Fix: Import TableColumn from components/Table
import { Table, TableColumn } from '../../components/Table';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { AdminUser } from '../../types';

// Mock Data
const mockAdminUsers: AdminUser[] = [
  { id: '#123', name: 'Alex Martin', email: 'alex@email.com', currentTour: '2/7', status: 'Active' },
  { id: '#124', name: 'Marie Dubois', email: 'marie@email.com', currentTour: '4/7', status: 'Active' },
  { id: '#125', name: 'Jean Dupont', email: 'jean@email.com', currentTour: '1/7', status: 'Inactive' },
  { id: '#126', name: 'Sophie Laurent', email: 'sophie@email.com', currentTour: '3/7', status: 'Active' },
  { id: '#127', name: 'Pierre Garnier', email: 'pierre@email.com', currentTour: '1/7', status: 'Active' },
];

export const UsersManagement: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Inactive' | 'Suspended'>('All');

  useEffect(() => {
    // Simulate fetching users from backend
    setTimeout(() => {
      setUsers(mockAdminUsers);
      setLoading(false);
    }, 500);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' ||
                          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.id.includes(searchTerm);
    const matchesStatus = filterStatus === 'All' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (user: AdminUser) => {
    alert(`Éditer l'utilisateur ${user.name} (ID: ${user.id}) - Simulé`);
    // In a real app, open a modal with user details for editing
  };

  const handleDelete = (user: AdminUser) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.name} ?`)) {
      setUsers(prev => prev.filter(u => u.id !== user.id));
      alert(`Utilisateur ${user.name} supprimé - Simulé`);
    }
  };

  // Fix: Explicitly type the columns array to resolve TypeScript inference issues
  const userColumns: TableColumn<AdminUser>[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Nom', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'currentTour', label: 'Tour', sortable: true },
    { key: 'status', label: 'Statut', sortable: true, render: (user: AdminUser) => (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        user.status === 'Active' ? 'bg-green-100 text-green-800' : user.status === 'Inactive' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
      }`}>
        {user.status}
      </span>
    )},
    { key: 'actions', label: 'Actions', render: (user: AdminUser) => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => handleEdit(user)}>Éditer</Button>
        <Button size="sm" variant="danger" onClick={() => handleDelete(user)}>Supprimer</Button>
      </div>
    )},
  ];

  if (loading) {
    return <div className="text-center py-10 text-xl">Chargement des utilisateurs...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold text-white mb-6">GESTION DES UTILISATEURS</h1>

      {/* Search and Filter */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-wrap gap-4 items-center">
        <Input
          label=""
          type="text"
          placeholder="Rechercher par nom, email ou ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow max-w-sm"
        />
        <Select
          label=""
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as 'All' | 'Active' | 'Inactive' | 'Suspended')}
          options={[
            { value: 'All', label: 'Tous' },
            { value: 'Active', label: 'Actifs' },
            { value: 'Inactive', label: 'Inactifs' },
            { value: 'Suspended', label: 'Suspendus' },
          ]}
          className="max-w-[150px]"
        />
        <Button onClick={() => alert('Recherche simulée')} variant="secondary" className="px-4">🔍</Button>
      </div>

      {/* Users Table */}
      <section className="bg-gray-800 p-8 rounded-lg shadow-xl">
        {/* Fix: Explicitly type 'user' in keyExtractor */}
        <Table data={filteredUsers} columns={userColumns} keyExtractor={(user: AdminUser) => user.id} />
        <div className="flex justify-between mt-6">
          <Button onClick={() => alert('Ajouter un nouvel utilisateur - Simulé')} variant="primary">
            + Ajouter un nouvel utilisateur
          </Button>
          <Button onClick={() => alert('Exportation CSV - Simulé')} variant="outline">
            Exporter CSV
          </Button>
        </div>
      </section>
    </div>
  );
};