import app from './app';
import config from './config/env';
import { loadICD } from './services/icd.services';

const server = app.listen(config.port, () => {
    loadICD();
    console.log('');
    console.log(`  version : ${config.appVersion}  ${config.appMoniker}`);
    console.log(`  env     : ${config.nodeEnv}`);
    console.log(`  port    : ${config.port}`);
    console.log('');
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
