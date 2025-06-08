import express from 'express';
import setupSwagger from '~/configs/swagger.js';
import corsConfig from '~/configs/corsConfig.js';
import router from '~/routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsConfig); // Cors
setupSwagger(app); // Configurar Swagger
app.use(router); // Rutas

export default app;
