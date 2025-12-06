import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Tag, User } from 'lucide-react';
import { Button } from './Button';

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  publishedYear?: number | null;
  description?: string | null;
  coverImage?: string | null;
}

interface BookCardProps {
  book: Book;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onDelete, isDeleting }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Image de couverture */}
      {book.coverImage ? (
        <div className="overflow-hidden">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />
        </div>
      ) : (
        <div className=' overflow-hidden'>
        <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center transition-transform duration-300 hover:scale-105">
          <BookOpen className="w-16 h-16 text-gray-400 " />
        </div>
        </div>
      )}

      {/* Contenu */}
      <div className="p-6 space-y-4">
        {/* Titre */}
        <h3 className="font-bold text-xl text-gray-900 line-clamp-2 min-h-[3.5rem]">
          {book.title}
        </h3>

        {/* Métadonnées */}
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="line-clamp-1">{book.author}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            <span className="line-clamp-1">{book.category}</span>
          </div>
          
          {book.publishedYear && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{book.publishedYear}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {book.description && (
          <p className="text-gray-600 text-sm line-clamp-3">
            {book.description}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-gray-100">
          <Link to={`/edit/${book.id}`} className="flex-1">
            <Button className="w-full" size='sm'>
              Modifier
            </Button>
          </Link>
          {onDelete && (
            <Button
              variant="danger"
              onClick={() => onDelete(book.id)}
              isLoading={isDeleting}
              className="flex-1"
              size="sm"
            >
              {isDeleting ? 'Suppression...' : 'Supprimer'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
