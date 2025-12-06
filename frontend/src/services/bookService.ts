import axios from 'axios';
import { Book, BookStats } from '../types/book';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

export const bookService = {
  // Récupérer tous les livres avec filtres optionnels
  getAllBooks: async (filters?: {
    title?: string;
    author?: string;
    category?: string;
    search?: string;
  }): Promise<Book[]> => {
    const response = await api.get('/books', { params: filters });
    return response.data;
  },

  // Récupérer un livre par ID
  getBookById: async (id: string): Promise<Book> => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  // Créer un nouveau livre
  createBook: async (bookData: Partial<Book>): Promise<Book> => {
    const response = await api.post('/books', bookData);
    return response.data;
  },

  // Mettre à jour un livre
  updateBook: async (id: string, bookData: Partial<Book>): Promise<Book> => {
    const response = await api.put(`/books/${id}`, bookData);
    return response.data;
  },

  // Supprimer un livre
  deleteBook: async (id: string): Promise<void> => {
    await api.delete(`/books/${id}`);
  },

  // Récupérer les statistiques
  getStats: async (): Promise<BookStats> => {
    const response = await api.get('/books/stats');
    return response.data;
  },

};
