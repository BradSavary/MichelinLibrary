import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface BookStats {
  totalBooks: number;
  booksByCategory: { category: string; count: number }[];
  booksByAuthor: { author: string; count: number }[];
  booksByDecade: { decade: string; count: number }[];
}

export default function Stats() {
  const [stats, setStats] = useState<BookStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/books/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      alert('Erreur lors du chargement des statistiques');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gray-900 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Chargement des statistiques...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Aucune statistique disponible
        </h3>
        <p className="text-gray-600">Les données ne peuvent pas être chargées pour le moment.</p>
      </div>
    );
  }

  // Couleurs vibrantes pour les graphiques
  const chartColors = [
    '#FCE300', // Michelin yellow
    '#002C5F', // Michelin blue
    '#10B981', // emerald-500
    '#F59E0B', // amber-500
    '#8B5CF6', // violet-500
    '#EC4899', // pink-500
    '#14B8A6', // teal-500
    '#F97316', // orange-500
    '#6366F1', // indigo-500
    '#EF4444', // red-500
    '#06B6D4', // cyan-500
    '#84CC16', // lime-500
  ];

  // Données pour le graphique des catégories (Bar)
  const categoryData = {
    labels: stats.booksByCategory.map((item) => item.category),
    datasets: [
      {
        label: 'Nombre de livres',
        data: stats.booksByCategory.map((item) => item.count),
        backgroundColor: chartColors[0],
        borderColor: chartColors[0],
        borderWidth: 1,
      },
    ],
  };

  // Données pour le graphique des auteurs (Pie)
  const authorData = {
    labels: stats.booksByAuthor.map((item) => item.author),
    datasets: [
      {
        label: 'Livres par auteur',
        data: stats.booksByAuthor.map((item) => item.count),
        backgroundColor: chartColors,
        borderColor: '#FFFFFF',
        borderWidth: 2,
      },
    ],
  };

  // Données pour le graphique des décennies (Bar)
  const decadeData = {
    labels: stats.booksByDecade.map((item) => item.decade),
    datasets: [
      {
        label: 'Nombre de livres',
        data: stats.booksByDecade.map((item) => item.count),
        backgroundColor: chartColors[3],
        borderColor: chartColors[3],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#111827',
        padding: 12,
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        borderColor: '#374151',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#6B7280',
        },
        grid: {
          color: '#E5E7EB',
        },
      },
      x: {
        ticks: {
          color: '#6B7280',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#374151',
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: '#111827',
        padding: 12,
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        borderColor: '#374151',
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Statistiques</h1>
        <p className="text-gray-600">Vue d'ensemble de votre bibliothèque</p>
      </div>

      {/* Carte de résumé */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-gray-600 text-sm font-medium mb-1">Total de livres</p>
            <p className="text-5xl font-bold text-gray-900">{stats.totalBooks}</p>
          </div>
        </div>
      </div>

      {/* Grille de graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Graphique des catégories */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Livres par catégorie</h2>
          <div className="h-96">
            <Bar data={categoryData} options={chartOptions} />
          </div>
        </div>

        {/* Graphique des auteurs */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Top 10 auteurs</h2>
          <div className="h-96">
            <Pie data={authorData} options={pieOptions} />
          </div>
        </div>
      </div>

      {/* Graphique des décennies sur toute la largeur */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Livres par décennie de publication
        </h2>
        <div className="h-96">
          <Bar data={decadeData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
