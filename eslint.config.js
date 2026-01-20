import { defineConfig, globalIgnores } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier/flat';
import nextVitals from 'eslint-config-next/core-web-vitals'

export default defineConfig([
  ...nextVitals,
  prettierConfig,
  globalIgnores([
    ".next/**",
    "node_modules/**",
    "build/**",
    "next-env.d.ts",
    "content/**",
    "src/react-src/**"
  ])
]);
