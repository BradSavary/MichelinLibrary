import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { bookService } from '../services/bookService';
import { Button, Input, Textarea } from '../components/ui';

export default function EditBook() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    publishedYear: '',
    description: '',
    coverImage: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBook();
    }
  }, [id]);

  const fetchBook = async () => {
    try {
      const book = await bookService.getBookById(id!);
      setFormData({
        title: book.title,
        author: book.author,
        category: book.category,
        publishedYear: book.publishedYear?.toString() || '',
        description: book.description || '',
        coverImage: book.coverImage || '',
      });
    } catch (error) {
      console.error('Error fetching book:', error);
      alert('Erreur lors du chargement du livre');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.author || !formData.category) {
      alert("Le titre, l'auteur et la catégorie sont obligatoires");
      return;
    }

    try {
      setSaving(true);
      await bookService.updateBook(id!, {
        ...formData,
        publishedYear: formData.publishedYear
          ? parseInt(formData.publishedYear)
          : null,
        description: formData.description || null,
        coverImage: formData.coverImage || null,
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Erreur lors de la modification du livre');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gray-900 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Chargement du livre...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Modifier le livre</h1>
        <p className="text-gray-600">Mettez à jour les informations du livre</p>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="space-y-6">
          {/* Titre */}
          <Input
            label="Titre"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          {/* Auteur */}
          <Input
            label="Auteur"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />

          {/* Catégorie */}
          <Input
            label="Catégorie"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />

          {/* Année de publication */}
          <Input
            type="number"
            label="Année de publication"
            name="publishedYear"
            value={formData.publishedYear}
            onChange={handleChange}
          />

          {/* Description */}
          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
          />

          {/* URL de l'image */}
          <div>
            <Input
              type="url"
              label="URL de l'image de couverture"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
            />
            {formData.coverImage && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Aperçu :</p>
                <img
                  src={formData.coverImage}
                  alt="Aperçu"
                  className="w-32 h-48 object-cover rounded border border-gray-300"
                  onError={(e) => {
                    e.currentTarget.src = '';
                    e.currentTarget.alt = 'Image invalide';
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Boutons */}
        <div className="mt-8 flex gap-4">
          <Button type="submit" isLoading={saving} className="flex-1">
            {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </Button>
          <Button type="button" variant="secondary" onClick={() => navigate('/')} className="flex-1">
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
}
