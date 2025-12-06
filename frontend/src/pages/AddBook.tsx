import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookService } from '../services/bookService';
import { Button, Input, Textarea } from '../components/ui';

export default function AddBook() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    publishedYear: '',
    description: '',
    coverImage: '',
  });

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
      setLoading(true);
      await bookService.createBook({
        ...formData,
        publishedYear: formData.publishedYear ? parseInt(formData.publishedYear) : null,
        description: formData.description || null,
        coverImage: formData.coverImage || null,
      });
      navigate('/');
    } catch (error) {
      console.error('Error creating book:', error);
      alert('Erreur lors de la création du livre');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ajouter un livre</h1>
        <p className="text-gray-600">Remplissez les informations du nouveau livre</p>
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
            placeholder="Le Petit Prince"
            required
          />

          {/* Auteur */}
          <Input
            label="Auteur"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Antoine de Saint-Exupéry"
            required
          />

          {/* Catégorie */}
          <Input
            label="Catégorie"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Roman"
            required
          />

          {/* Année de publication */}
          <Input
            type="number"
            label="Année de publication"
            name="publishedYear"
            value={formData.publishedYear}
            onChange={handleChange}
            placeholder="1943"
          />

          {/* Description */}
          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="Résumé ou description du livre..."
          />

          {/* URL de l'image */}
          <div>
            <Input
              type="url"
              label="URL de l'image de couverture"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
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
          <Button type="submit" isLoading={loading} className="flex-1">
            {loading ? 'Création en cours...' : 'Créer le livre'}
          </Button>
          <Button type="button" variant="secondary" onClick={() => navigate('/')} className="flex-1">
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
}
