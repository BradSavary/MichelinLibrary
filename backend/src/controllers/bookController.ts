import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/books - Récupérer tous les livres avec filtres optionnels
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { title, author, category, search } = req.query;

    const where: any = {};

    if (title) {
      where.title = { contains: title as string, mode: 'insensitive' };
    }
    if (author) {
      where.author = { contains: author as string, mode: 'insensitive' };
    }
    if (category) {
      where.category = { contains: category as string, mode: 'insensitive' };
    }

    // Recherche globale
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { author: { contains: search as string, mode: 'insensitive' } },
        { category: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const books = await prisma.book.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

// GET /api/books/categories - Récupérer toutes les catégories uniques
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.book.findMany({
      select: {
        category: true,
      },
      distinct: ['category'],
      orderBy: {
        category: 'asc',
      },
    });

    // Extraire uniquement les noms de catégories
    const categoryNames = categories.map((book) => book.category).filter(Boolean);
    
    res.json(categoryNames);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// GET /api/books/stats - Statistiques pour data visualization
export const getBookStats = async (req: Request, res: Response) => {
  try {
    // Nombre total de livres
    const totalBooks = await prisma.book.count();

    // Nombre de livres par catégorie
    const booksByCategory = await prisma.book.groupBy({
      by: ['category'],
      _count: {
        category: true,
      },
      orderBy: {
        _count: {
          category: 'desc',
        },
      },
    });

    // Nombre de livres par auteur (top 10)
    const booksByAuthor = await prisma.book.groupBy({
      by: ['author'],
      _count: {
        author: true,
      },
      orderBy: {
        _count: {
          author: 'desc',
        },
      },
      take: 10,
    });

    // Livres par décennie
    const allBooks = await prisma.book.findMany({
      where: {
        publishedYear: {
          not: null,
        },
      },
      select: {
        publishedYear: true,
      },
    });

    // Grouper par décennie manuellement
    const decadeMap = new Map<string, number>();
    allBooks.forEach((book) => {
      if (book.publishedYear !== null) {
        const year = book.publishedYear;
        let decade: string;
        
        if (year < 0) {
          // Pour les années avant J.C., garder tel quel
          decade = `${year}`;
        } else if (year < 1000) {
          // Pour les années entre 0 et 999
          const decadeValue = Math.floor(year / 10) * 10;
          decade = `${decadeValue}s`;
        } else {
          // Pour les années >= 1000, grouper par décennie (ex: 1940s, 1950s, etc.)
          const decadeValue = Math.floor(year / 10) * 10;
          decade = `${decadeValue}s`;
        }
        
        decadeMap.set(decade, (decadeMap.get(decade) || 0) + 1);
      }
    });

    // Convertir en array et trier
    const booksByDecade = Array.from(decadeMap.entries())
      .map(([decade, count]) => ({
        decade,
        count,
        // Pour le tri, extraire la valeur numérique
        sortValue: decade.includes('s') 
          ? parseInt(decade.replace('s', '')) 
          : parseInt(decade)
      }))
      .sort((a, b) => a.sortValue - b.sortValue)
      .map(({ decade, count }) => ({ decade, count }));

    res.json({
      totalBooks,
      booksByCategory: booksByCategory.map((item) => ({
        category: item.category,
        count: item._count.category,
      })),
      booksByAuthor: booksByAuthor.map((item) => ({
        author: item.author,
        count: item._count.author,
      })),
      booksByDecade,
    });
  } catch (error) {
    console.error('Error fetching book stats:', error);
    res.status(500).json({ error: 'Failed to fetch book statistics' });
  }
};

// GET /api/books/:id - Récupérer un livre par son ID
export const getBookById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const book = await prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Failed to fetch book' });
  }
};

// POST /api/books - Créer un nouveau livre
export const createBook = async (req: Request, res: Response) => {
  try {
    const {
      title,
      author,
      category,
      publishedYear,
      description,
      coverImage,
    } = req.body;

    // Validation basique
    if (!title || !author || !category) {
      return res.status(400).json({ error: 'Title, author, and category are required' });
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        category,
        publishedYear: publishedYear ? parseInt(publishedYear) : null,
        description,
        coverImage,
      },
    });

    res.status(201).json(book);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Failed to create book' });
  }
};

// PUT /api/books/:id - Mettre à jour un livre
export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      author,
      category,
      publishedYear,
      description,
      coverImage,
    } = req.body;

    const book = await prisma.book.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(author && { author }),
        ...(category && { category }),
        ...(publishedYear !== undefined && { publishedYear: parseInt(publishedYear) }),
        ...(description !== undefined && { description }),
        ...(coverImage !== undefined && { coverImage }),
      },
    });

    res.json(book);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Failed to update book' });
  }
};

// DELETE /api/books/:id - Supprimer un livre
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.book.delete({
      where: { id },
    });

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Failed to delete book' });
  }
};
