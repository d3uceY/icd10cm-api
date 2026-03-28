const config = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    nodeEnv: process.env.NODE_ENV ?? 'development',
    icdTextName: process.env.ICD_TEXT_NAME ?? 'icd10cm-codes-April-1-2026.txt'
};

export default config;
