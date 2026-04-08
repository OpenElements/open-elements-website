import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import prettierPlugin from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  ...nextVitals,
  globalIgnores([
    '.next/**',
    'node_modules/**',
    'build/**',
    'next-env.d.ts',
    'content/**',
    'public/**',
    'react-src/**',
  ]),
  {
    ...prettierPlugin,
    files: ['src/**'],
  },
]);
