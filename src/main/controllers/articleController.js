import * as ArticleService from '~/services/articleService.js';
import { logErrorWithResponse } from '~/helpers/logManager.js';

export const createArticle = async (req, res) => {
  try {
    const article = await ArticleService.createArticle(req.body);
    res.status(201).json(article);
  } catch (error) {
    logErrorWithResponse(error, res);
  }
};

