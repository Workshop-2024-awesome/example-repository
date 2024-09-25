import { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
    schemaFile: 'http://localhost:3000/api-json',
    apiFile: './src/api/base.ts',
    apiImport: 'base',
    outputFile: './src/api/generated.ts',
    exportName: 'generated',
    hooks: true,
    mergeReadWriteOnly: true,
};

export default config;
