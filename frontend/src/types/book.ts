export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn?: string | null;
  publishedYear?: number | null;
  publisher?: string | null;
  description?: string | null;
  coverImage?: string | null;
  quantity: number;
  available: number;
  createdAt: string;
  updatedAt: string;
}

export interface BookStats {
  totalBooks: number;
  booksByCategory: { category: string; count: number }[];
  booksByAuthor: { author: string; count: number }[];
  booksByYear: { year: number | null; count: number }[];
}
