import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import expenseRoutes from './routes/expenses.js';
import budgetRoutes from './routes/budgets.js';
import analyticsRoutes from './routes/analytics.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

const app = express();

const allowedOrigins = [
  "https://expense-manager-wine-rho.vercel.app"
];

// Security first
app.use(helmet());

// CORS (THIS IS THE FIX)
app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server & Postman
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

app.use(express.json({ limit: '256kb' }));
app.use(requestLogger);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error handler
app.use(errorHandler);

// Start server
app.listen(env.PORT, () => {
  logger.info(`API listening on port ${env.PORT}`, { env: env.NODE_ENV });
});
