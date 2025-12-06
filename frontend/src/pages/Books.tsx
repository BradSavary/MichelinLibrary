import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, BookOpen, Loader2, Search, Filter } from 'lucide-react';
import { bookService } from '../services/bookService';
import { Button, Input, Select, BookCard } from '../components/ui';

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  publishedYear?: number | null;
  description?: string | null;
  coverImage?: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    title: '',
    author: '',
    category: '',
  });

  // Charger les livres
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await bookService.getAllBooks(filters);
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
      alert('Erreur lors du chargement des livres');
    } finally {
      setLoading(false);
    }
  };

  // Charger les catégories disponibles
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/books/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Charger données initiales
  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  // Debounce pour recherche automatique (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBooks();
    }, 300);

    return () => clearTimeout(timer);
  }, [filters.title, filters.author, filters.category]);

  // Réinitialiser les filtres et rechercher automatiquement
  const handleReset = () => {
    setFilters({
      title: '',
      author: '',
      category: '',
    });
    // fetchBooks sera automatiquement appelé via useEffect debounce
  };

  // Supprimer un livre
  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
      return;
    }

    try {
      await bookService.deleteBook(id);
      await fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Erreur lors de la suppression du livre');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Bibliothèque</h1>
        <Link to="/add">
          <Button icon={<Plus className="w-5 h-5" />}>
            Ajouter un livre
          </Button>
        </Link>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filtres de recherche</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Titre */}
          <Input
            label="Titre"
            placeholder="Rechercher par titre..."
            value={filters.title}
            onChange={(e) => setFilters({ ...filters, title: e.target.value })}
            icon={<Search className="w-4 h-4" />}
          />

          {/* Auteur */}
          <Input
            label="Auteur"
            placeholder="Rechercher par auteur..."
            value={filters.author}
            onChange={(e) => setFilters({ ...filters, author: e.target.value })}
            icon={<Search className="w-4 h-4" />}
          />

          {/* Catégorie (Select) */}
          <Select
            label="Catégorie"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            options={[
              { value: '', label: 'Toutes les catégories' },
              ...categories.map((cat) => ({ value: cat, label: cat })),
            ]}
          />
        </div>

        {/* Bouton Réinitialiser */}
        <div className="mt-4 flex justify-end">
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Réinitialiser les filtres
          </Button>
        </div>
      </div>

      {/* Compteur de résultats */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <p>
          {loading ? (
            'Chargement...'
          ) : (
            `${books.length} livre${books.length > 1 ? 's' : ''} trouvé${books.length > 1 ? 's' : ''}`
          )}
        </p>
      </div>

      {/* Grille de livres */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-gray-900 mx-auto" />
            <p className="mt-4 text-gray-600">Chargement des livres...</p>
          </div>
        </div>
      ) : books.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun livre trouvé</h3>
          <p className="text-gray-600 mb-6">
            Aucun livre ne correspond à vos critères de recherche.
          </p>
          <Button onClick={handleReset}>
            Réinitialiser les filtres
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
