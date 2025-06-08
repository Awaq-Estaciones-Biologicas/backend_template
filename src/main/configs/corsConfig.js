import cors from 'cors';
import { environment } from '~/configs/environment.js';

// Lista de orígenes permitidos
const allowedOrigins = [
  `http://localhost:${environment.FRONTEND_PORT}`,
  `http://localhost:${environment.PORT}`,
  environment.CORS_ORIGIN_PROD,
];

// Configuración de CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

export default cors(corsOptions);
