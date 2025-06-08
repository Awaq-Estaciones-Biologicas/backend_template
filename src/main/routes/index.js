import express from 'express';
import articleRoutes from '~/routes/endpoints/articleRoutes.js';

const router = express.Router();

// Rutas para la versión 1 de la API
router.use('/articles', articleRoutes);

export default router;
