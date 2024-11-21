import morgan from "morgan";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import taskRoutes from './routes/task.routes.js';
import authRoutes from './routes/auth.routes.js';
dotenv.config()

const app = express();
app.use(morgan("dev"));
app.use(express.static('public'));

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:5173',
      'https://crud-mern-three-omega.vercel.app',
      'https://crud-mern-32xrglv8y-gustavos-projects-131b8237.vercel.app', // Incluye cualquier URL adicional que uses
      'https://crud-mern-r67bdekxw-gustavos-projects-131b8237.vercel.app'
    ];

    // Permite peticiones sin origen (p. ej., postman) y dominios permitidos
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Permite envío de cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Permite ciertos encabezados
}));
app.options('*', cors()); // Maneja solicitudes OPTIONS para cualquier ruta

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes)
export default app;