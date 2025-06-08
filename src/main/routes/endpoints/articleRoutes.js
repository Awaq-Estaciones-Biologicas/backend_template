import express from 'express';
import * as ArticleController from '~/controllers/articleController.js';
import validateArticle from '~/middlewares/validateArticle.js';

const router = express.Router();

router.post('/', validateArticle, ArticleController.createArticle);

export default router;
