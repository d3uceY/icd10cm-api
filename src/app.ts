import express, { Application } from 'express';
import healthRoutes from './routes/health.routes';
import apiRoutes from './routes/api.routes';
import icdRoutes from './routes/icd.routes';
import { errorHandler, notFoundHandler } from './utils/errorHandler';

const app: Application = express();

// ── Middleware ────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ────────────────────────────────────────────────────
app.use('/health', healthRoutes);
app.use('/api', apiRoutes);
app.use('/api/icd', icdRoutes);

// ── 404 & Error Handlers ──────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
