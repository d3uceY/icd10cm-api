import app from './app';
import config from './config/env';
import { loadICD } from './services/icd.services';

const server = app.listen(config.port, () => {
    loadICD();
    console.log(`[server] Running in ${config.nodeEnv} mode on port ${config.port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('[server] SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('[server] Process terminated.');
        process.exit(0);
    });
});

export default server;
