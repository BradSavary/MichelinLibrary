import { Router } from 'express';
import * as bookController from '../controllers/bookController';

const router = Router();

// GET /api/books - Récupérer tous les livres (avec filtres optionnels)
router.get('/', bookController.getAllBooks);

// GET /api/books/categories - Récupérer toutes les catégories uniques
router.get('/categories', bookController.getCategories);

// GET /api/books/stats - Statistiques des livres (pour data visualization)
router.get('/stats', bookController.getBookStats);

// GET /api/books/:id - Récupérer un livre par son ID
router.get('/:id', bookController.getBookById);

// POST /api/books - Créer un nouveau livre
router.post('/', bookController.createBook);

// PUT /api/books/:id - Mettre à jour un livre
router.put('/:id', bookController.updateBook);

// DELETE /api/books/:id - Supprimer un livre
router.delete('/:id', bookController.deleteBook);

export default router;
