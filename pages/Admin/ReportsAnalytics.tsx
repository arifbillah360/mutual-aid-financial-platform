import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell,
  AreaChart, Area // For funnel-like completion
} from 'recharts';
import { Button } from '../../components/Button';

// Mock Data for Charts
const mockUserGrowthData = [
  { name: 'Jan', signups: 100 },
  { name: 'Feb', signups: 120 },
  { name: 'Mar', signups: 150 },
  { name: 'Apr', signups: 130 },
  { name: 'May', signups: 180 },
  { name: 'Jun', signups: 200 },
];

const mockRevenueData = [
  { name: 'Week 1', revenue: 5000 },
  { name: 'Week 2', revenue: 7000 },
  { name: 'Week 3', revenue: 6500 },
  { name: 'Week 4', revenue: 8000 },
];

const mockTourCompletionData = [
  { name: 'Tour 1', value: 800 },
  { name: 'Tour 2', value: 600 },
  { name: 'Tour 3', value: 400 },
  { name: 'Tour 4', value: 250 },
  { name: 'Tour 5', value: 150 },
  { name: 'Tour 6', value: 80 },
  { name: 'Tour 7', value: 30 },
];

const mockGeoDistributionData = [
  { name: 'France', value: 300 },
  { name: 'Suisse', value: 150 },
  { name: 'Belgique', value: 100 },
  { name: 'Canada', value: 80 },
  { name: 'Maroc', value: 50 },
  { name: 'Autres', value: 167 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6666', '#66B2FF'];

export const ReportsAnalytics: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleExportReport = () => {
    alert('Exportation du rapport complet au format PDF - Simulé');
  };

  if (loading) {
    return <div className="text-center py-10 text-xl">Chargement des rapports et analyses...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold text-white mb-6">RAPPORTS & ANALYSES</h1>

      {/* User Growth Chart */}
      <section className="bg-gray-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-emerald-400 mb-6">📊 Croissance des utilisateurs</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockUserGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
              <XAxis dataKey="name" stroke="#cbd5e0" />
              <YAxis stroke="#cbd5e0" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a202c', border: 'none', borderRadius: '4px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend wrapperStyle={{ color: '#fff' }} />
              <Line type="monotone" dataKey="signups" stroke="#8884d8" activeDot={{ r: 8 }} name="Inscriptions" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Revenue Chart */}
      <section className="bg-gray-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-emerald-400 mb-6">💰 Revenus</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
              <XAxis dataKey="name" stroke="#cbd5e0" />
              <YAxis stroke="#cbd5e0" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a202c', border: 'none', borderRadius: '4px' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value: number) => `${value.toLocaleString('fr-FR')}€`}
              />
              <Legend wrapperStyle={{ color: '#fff' }} />
              <Bar dataKey="revenue" fill="#82ca9d" name="Revenus" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Tour Completion Rate Funnel Chart (simulated with AreaChart for visual effect) */}
      <section className="bg-gray-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-emerald-400 mb-6">🎯 Taux d'achèvement des tours</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={mockTourCompletionData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
              <XAxis dataKey="name" stroke="#cbd5e0" />
              <YAxis stroke="#cbd5e0" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a202c', border: 'none', borderRadius: '4px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.8} name="Membres" />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-center text-sm text-gray-400 mt-4">
            (Représente le nombre de membres ayant atteint chaque tour)
          </p>
        </div>
      </section>

      {/* Geographic Distribution Chart */}
      <section className="bg-gray-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-emerald-400 mb-6">🌍 Distribution Géographique</h2>
        <div className="h-80 flex justify-center items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockGeoDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {mockGeoDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1a202c', border: 'none', borderRadius: '4px' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value: number, name: string) => [`${value} utilisateurs`, name]}
              />
              <Legend wrapperStyle={{ color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="text-center mt-8">
        <Button onClick={handleExportReport} variant="primary" size="lg">
          Exporter le rapport complet PDF
        </Button>
      </div>
    </div>
  );
};