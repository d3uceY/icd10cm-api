// eslint-disable-next-line @typescript-eslint/no-require-imports
const { version } = require('../../package.json') as { version: string };

const config = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    nodeEnv: process.env.NODE_ENV ?? 'development',
    icdTextName: process.env.ICD_TEXT_NAME ?? 'icd10cm-codes-April-1-2026.txt',
    appMoniker: process.env.APP_MONIKER ?? 'ICD-10-CM API',
    appVersion: version,
};

export default config;
