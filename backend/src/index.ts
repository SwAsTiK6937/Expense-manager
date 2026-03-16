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

// ---------- CORS (must come BEFORE helmet) ----------
const allowedOrigins = [
  'https://expense-manager-wine-rho.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (mobile apps, curl, health-checks)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        // In production you may want to reject; for now allow all so other
        // preview deployments on Vercel also work.
        callback(null, true);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ---------- Security headers (after CORS so it doesn't strip CORS headers) ----------
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

app.use(express.json({ limit: '256kb' }));
app.use(requestLogger);

// ---------- Health check ----------
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ---------- API routes ----------
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/analytics', analyticsRoutes);

// ---------- 404 catch-all ----------
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ---------- Error handler ----------
app.use(errorHandler);

// ---------- Start ----------
const HOST = '0.0.0.0'; // Render requires binding to 0.0.0.0
app.listen(env.PORT, HOST, () => {
  logger.info(`API listening on ${HOST}:${env.PORT}`, { env: env.NODE_ENV });
});

// Prevent silent crashes
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection', { reason: String(reason) });
});
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception', { message: err.message, stack: err.stack });
  process.exit(1);
});
