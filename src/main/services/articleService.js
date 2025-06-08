import Article from '~/models/article.js';

export const createArticle = async (data) => {
  return Article.create(data);
};